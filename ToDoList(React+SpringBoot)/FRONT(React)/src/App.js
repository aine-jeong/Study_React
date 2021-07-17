import react from 'react';
import TodoListTemplate from './components/js/TodoListTemplate';
import Form from './components/js/Form';
import TodoItemList from './components/js/TodoItemList';

class App extends react.Component {
  constructor(props) {
    super(props);
    // this.id=2;
    // this.state = {
    //   input: "",
    //   todos: [
    //     {id:0, content:'리액트공부1', isComplete:false},
    //     {id:1, content:'리액트공부2', isComplete:true}
    //   ]
    // }
    this.state = {
      //Form.js에서 Hook(userState) 사용으로 인해 제거
      //input: "",
      todos: [

      ]
    }
    //this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    //this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleInitInfo = this.handleInitInfo.bind(this);
  }

  //컴포넌트가 마운트 된 직후, 즉 트리에 삽입된 직후에 호출되는 함수
  //DOM노드가 있어야 하는 초기화 작업은 이 메소드에서 이루어진다.
  //외부에서 데이터를 불러와야 한다면, 네트워크 요청을 보내는 용도로 사용하면 된다.
  componentDidMount() {
    this.handleInitInfo()
    // fetch("/api/todos")
    //  .then(res => res.json())
    //  .then(todos => this.setState({todos:todos}))
    //  .catch(err => console.log(err))
  }

  //등록, 수정, 삭제 후 목록을 다시 출력하기 위한 메서드
  handleInitInfo() {
    fetch("/api/todos")
     .then(res => res.json())
     .then(todos => this.setState({todos:todos}))
     .catch(err => console.log(err))
  }

  //todos안에 있는 객체들을 화면에 보여주기 위해 todos배열을 컴포넌트 배열로 변환
  // 배열안의 원소를 모두 제곱하기
  //const numbers = [1, 3, 5, 7, 9];
  //const squared = numbers.map(number => number * number);
  //console.log(numbers);
  // [1, 9, 25, 49, 81]

  //Form.js에서 Hook(useState) 사용으로 인해 제거
  // handleChange(event) {
  //   this.setState({
  //     input: event.target.value
  //   });
  // }

  //Form.js에서 Hook(useState) 사용으로 인해 state에서 input을 제외하고 parameter로 받는다
  handleCreate(inputValue) {
    //const { input,todos } = this.state;
    const { todos } = this.state;
    if(inputValue === "") {
      alert("오늘 할 일을 입력해주세요!");
      return;
    }

    //화면에서 먼저 변경사항을 보여주는 방법으로 이용
    //'오늘 할일'을 추가로 등록할 경우 서버와의 작업이 완료될 때 까지 기다리지 않고
    //화면에서 미리 등록 처리를 보여주기 위한 코드
    this.setState({
      //Form.js에서 Hook(useState) 사용으로 인해 제거
      //input: "",
      //최적화할 때 새 배열을 비교하여 리렌더링을 방지해야 하는데,
      //push를 사용한다면 최적화 할 수 없게 되므로 concat사용
      todos: todos.concat({
        id: 0, //임의의 id를 부여하여 key error를 방지
        content: inputValue,
        isComplete: false
      })
    });

    //처리
  const data = {
    body: JSON.stringify({"content":inputValue}),
    headers: {'Content-Type': 'application/json'},
    method: 'post'
  }
  fetch("/api/todos", data)
   .then(res => {
     if(!res.ok) {
       throw new Error(res.status);
     }else {
       return this.handleInitInfo();
     }
   })
   .catch(err => console.log(err));
  }
  
  //Form.js에서 Hook(useState) 사용으로 인해 제거
  //Enter key 이벤트
  // handleKeyPress(event) {
  //   if(event.key === "Enter") {
  //     this.handleCreate();
  //   }
  // }

  handleToggle(id) {
    const {todos} = this.state;

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

    //fetch 옵션 설정
    const data = {
      headers: {'Content-Type':'application/json'},
      method:'put'
    }
    //fetch함수를 이용하여 ajax 호출
    fetch("/api/todos/" + id,data)
   .then(res => {
     if(!res.ok) {
       throw new Error(res.status);
     }else {
       return this.handleInitInfo();
     }
   })
   .catch(err => console.log(err));

  }

  //삭제
  handleRemove(id) {
      const {todos} = this.state;

      const removeContent = todos.find(todo => todo.id === id).content;
      if(!window.confirm("'" + removeContent + "' 을 삭제하시겠습니까?")) {
          return;
      }

      this.setState({
          todos : todos.filter(todo => todo.id !== id)
      });

      const data = {
        headers:{'Content-Type':'application/json'},
        method: 'delete'
      }
      fetch("/api/todos/" + id, data)
      .then(res => {
        if(!res.ok) {
          throw new Error(res.status);
        }else {
          return TouchList.handleInitInfo();
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <TodoListTemplate form={(
      <Form
      //Form.js에서 Hook(useState) 사용으로 인해 제거
       //value={this.state.input}
       //onChange={this.handleChange}
       //onCreate={this.handleCreate}
       //onKeyPress={this.handleKeyPress} />
       onCreate={this.handleCreate} />
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
