import React from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends React.Component {

    //성능 최적화
    //업데이트가 불필요한 경우 render를 아예 실행하지 않도록 함
    //업데이터에 영향을 끼치는 조건을 return해주면 된다.
    //즉, todos값이 변경될 때 리렌더링이 일어나도록 하는 과정
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.todos !== nextProps.todos;
    }

    render() {
        //todos: todo 객체들이 들어있는 배열
        //onToggle: 체크박스를 on/off하는 함수
        //onRemove: todo 객체를 삭제하는 함수
        const {todos, onToggle, onRemove} = this.props;

        const todoList = todos.map (
            ({id, content, isComplete}) => (
                <TodoItem
                 id = {id}
                 content = {content}
                 isComplete = {isComplete}
                 onToggle = {onToggle}
                 onRemove = {onRemove}
                 key = {id} />
            )
        );

        return (
            <div>
                {todoList}
            </div>
        );
    }
}

export default TodoItemList;