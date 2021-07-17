import React, {useState} from 'react';
import '../css/Form.css';

//value: Input 내용
//onChange: Input 내용이 변경될 때 실행되는 함수
//onCreate: 버튼이 클릭될 때 실행되는 함수
//onKeyPress: 인풋에서 키를 입력할 때 실행되는 함수로 
//            추후에 Enter Key Event로 onCreate와 동일한 작업을 위한 함수

//Form.js에서 Hook(useState) 사용으로 인해 제거
// const Form = ({ value, onChange, onCreate, onKeyPress }) => {

    const Form = ({onCreate}) => {

        //React Hook > 클래스 타입에서는 사용 x
        const [input, setInput] = useState('');

        //Input값 변경
        const handleChange = (event) => {
            setInput(event.target.value);
        }

        //EnterKey event
        const handleKeyPress = (event) => {
            if(event.key === 'Enter') {
                onCreate(input);
                setInput('');
            }
        }

    return (
        <div className="form">
            <input
             value={input}
             placeholder="오늘 할 일을 입력하세요"
             onChange={handleChange}
             onKeyPress={handleKeyPress}
            />
            <div className="create-button" onClick={() => {
                    onCreate(input);
                    setInput('');
                }
            }>
                추가
            </div>
        </div>
    );
};

export default Form;
