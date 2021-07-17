import react from 'react';
import TodoListTemplate from './components/js/TodoListTemplate';
import Form from './components/js/Form';
import TodoItemList from './components/js/TodoItemList';

class App extends react.Component {
  constructor(props) {
    super(props);
    this.id=2;
    this.state = {
      input: "",
      todos: [
        {id:0, content:'리액트공부1', isComplete:false},
        {id:1, content:'리액트공부2', isComplete:true}
      ]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  //todos안에 있는 객체들을 화면에 보여주기 위해 todos배열을 컴포넌트 배열로 변환
  // 배열안의 원소를 모두 제곱하기
  //const numbers = [1, 3, 5, 7, 9];
  //const squared = numbers.map(number => number * number);
  //console.log(numbers);
  // [1, 9, 25, 49, 81]

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  handleCreate() {
    const { input,todos } = this.state;
    if(input === "") {
      alert("오늘 할 일을 입력해주세요!");
      return;
    }
    this.setState({
      input: "",
      //최적화할 떄 새 배열을 비교하여 리렌더링을 방지해야 하는데,
      //push를 사용한다면 최적화 할 수 없게 되므로 concat사용
      todos: todos.concat({
        id: this.id++,
        content: input,
        isComplete: false
      })
    });
  }

  handleKeyPress(event) {
    if(event.key === "Enter") {
      this.handleCreate();
    }
  }

  handleToggle(id) {
    const todos = this.state.todos;

    const isComplete = todos.find(todo => todo.id === id).isComplete;
    if(!window.confirm(isComplete ? "미완료 처리 하시겠습니까?" : "완료 처리 하시겠습니까?")) {
      return;
    }

    //파라미터로 받은 id로 몇번째 아이템인지 찾기
    const index = todos.findIndex(todo => todo.id === id);

    //선택한 객체 저장
    const selected = todos[index];

    //배열 복사
    const nextTodos = [...todos];

    //기존 값 복사 후 isComplete값 덮어쓰기
    nextTodos[index] = {
      ...selected,
      isComplete : !selected.isComplete
    };

    this.setState({
      todos: nextTodos
    });
  }

  handleRemove(id) {
      const todos = this.state.todos;

      const removeContent = todos.find(todo => todo.id === id).content;
      if(!window.confirm("'" + removeContent + "' 을 삭제하시겠습니까?")) {
          return;
      }

      this.setState({
          todos : todos.filter(todo => todo.id !== id)
      });
  }

  render() {
    return (
      <TodoListTemplate form={(
      <Form
       value={this.state.input}
       onChange={this.handleChange}
       onCreate={this.handleCreate}
       onKeyPress={this.handleKeyPress} />
      )}>
        <TodoItemList
            todos={this.state.todos}
            onToggle={this.handleToggle}
            onRemove={this.handleRemove} />
      </TodoListTemplate>
    );
  }
}

export default App;
