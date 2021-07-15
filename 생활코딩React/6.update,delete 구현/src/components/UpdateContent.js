import React, { Component } from 'react';

class UpdateContent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id:this.props.data.id,
        title: this.props.data.title,
        desc: this.props.data.desc
      }
      //리팩토링
      this.inputFormHandler = this.inputFormHandler.bind(this);
    }
    inputFormHandler(e){
      //this.setState({title:e.target.value});
      //현재 이벤트가 발생하고 있는 태그의 이름을 알아내는 코드 넣기
      this.setState({[e.target.name]:e.target.value});
    }
    render() {
      console.log(this.props.data);
      return(
        <article>
              <h2>Update</h2>
              <form action="/create_process" method="post"
                onSubmit={function(e){
                  //submit버튼을 눌러도 페이지가 변경되지 않도록 이벤트 막기
                  e.preventDefault();
                  //debugger;
                  //e.target : form태그 자체
                  //e.target.title.value : name="title"에 입력된 값
                  //e.target.desc.value : name="desc"에 입력된 값
                  this.props.onSubmit(
                    this.state.id,
                    this.state.title,
                    this.state.desc
                  );
                }.bind(this)}>
                <input type="hidden" name="id" value={this.state.id}></input>
                <p>
                  <input 
                    type="text" 
                    name="title" 
                    placeholder="title"
                    //1.
                    //value={this.props.data.title}
                    //error: index.js:1 Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
                    //so, 위에 constructor 선언한 뒤 수정

                    //2.
                    value={this.state.title}
                    //여전히 값이 변경되지 않는다
                    //input의 값을 바꿨을 때 state의 값을 바꿔야 read-only상태가 아니게 된다.
                    //so, onChange를 사용해야 한다.

                    //3.
                    //onChange={function(e){
                    //  this.setState({title:e.target.value});
                    //}.bind(this)}

                    //4. 리팩토링
                    //위쪽에 inputFormHandler함수 추가
                    //onChange={this.inputFormHandler.bind(this)}

                    //5. 리팩토링 2
                    //위쪽에 미리 바인드 시켜주기!
                    onChange={this.inputFormHandler}

                  ></input>
                  </p>
                <p>
                  <textarea 
                    name="desc" 
                    placeholder="description"
                    value={this.state.desc}
                    onChange={this.inputFormHandler}
                  ></textarea>
                </p>
                <p>
                  <input type="submit"></input>
                </p>
              </form>
          </article>
      );
    }
  }

  export default UpdateContent;