import React, { Component } from 'react';
import TOC from "./components/TOC";
import Content from "./components/Content";
import Subject from "./components/Subject";
import './App.css';

//컴포넌트를 만드는 코드!!
//javascript가 아님 (jsx! 알아서 자바스크립트 코드로 컨버팅해준다)
class App extends Component {
  //어떤 컴포넌트가 실행될 때 render보다 먼저 실행되면서, 
  //해당 컴포넌트를 초기화시켜주고 싶은 코드는 constructor안에 작성한다.
  //즉, constructor는 제일 먼저 실행되면서 초기화를 담당한다.
  constructor(props){
    super(props);
    this.state = {
      mode:'read',
      selected_content_id:2,
      subject:{title:'WEB', sub:'World Wide Web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'} 
      ]
    }
  }
  render() {
    //state의 값이 바뀌면 그 state를 가지고 있는 component의 render함수가 다시 호출된다 (하위 component의 render함수도 재호출)
    var _title, _desc = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if(this.state.mode === 'read') {
      var i = 0;
      while(i < this.state.contents.length) {
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      
    }
    console.log(this); //App 전체가 출력된다. (this: render함수가 속해있는 Component 그 자체)
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          //해당 이벤트(onChangePage)에 설치한 함수를 호출하도록 만들기
          //props로 이벤트 전달된다.
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
        ></Subject>
        {/* <header>
            <h1><a href="/" onClick={function(e){
              console.log(e);
              //debugger; //: 브라우저가 실행을 멈춰준당

              //기본적인 이벤트 막기
              e.preventDefault();

              //this.state.mode = 'welcome';
              //1. 함수 내부에서는 this에 아무 값도 설정되어 있지 않다 (event 내부에서) -> 뒤쪽에 .bind(this) 붙여주면 this를 주입할 수 있다.
              //2. 동적으로 state의 값 변경시, state의 값이 바뀌었다는 것을 알려줘야 한다 -> setState를 통해 값이 변경된 것을 세팅해준다.
              this.setState({
                mode:'welcome'
              });
            }.bind(this)}>{this.state.subject.title}</a></h1>
            {this.state.subject.sub}
        </header> */}
        <TOC 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
            });
          }.bind(this)} 
          data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
