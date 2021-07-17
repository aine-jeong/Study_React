import React from 'react';
import '../css/TodoItem.css';

class TodoItem extends React.Component {

    //isComplete값이 변경될 때만 렌더링 되도록 성능 최적화
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.inComplete !== nextProps.isComplete;
    }

    render() {
        //content: todo내용
        //isComplete: 체크박스의 on/off상태, 오늘 할 일의 완료 유무를 판단
        //id: TodoItem의 key값
        //onToggle: 체크박스를 on/off 시키는 함수
        //onRemove: TodoItem을 삭제시키는 함수
        const {content, isComplete, id, onToggle, onRemove} = this.props;

        return (
            <div className="todo-item" onClick={() => onToggle(id)}>
                <div className="todo-item-remove" onClick={(e) => {
                    e.stopPropagation(); 
                    //onToggle이 실행되지 않도록 함
                    //만약 이 함수를 호출해두지 않으면,
                    // x를 눌렀을 때 해당 DOM의 부모의 클릭이벤트에 연결되어있는 onToggle도 실행되게 된다.
                    //이벤트의 확산을 멈춰주는 역할

                    onRemove(id)}
                    //onClick={onToggle{id}}와 같은 형식으로 하면, 해당 함수가 렌더링 될 때마다 호출된다.
                    //해당 함수가 호출되면 데이터가 변경되고, 데이터가 변경되면 리렌더링이 일어나고 .. 무한 반복이 일어나게 된다.
                }>
                    &times;
                </div>
                {/* 템플릿 리터럴 */}
                <div className={`todo-item-content ${isComplete && 'isComplete'}`}>
                    <div>
                        {content}
                    </div>
                </div>
                {
                    isComplete && (<div className="isComplete-mark">✔</div>)
                }
            </div>
        )
    }
}

export default TodoItem;