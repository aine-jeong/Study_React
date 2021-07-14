import React, { Component } from 'react';
import TOC from "./components/TOC";
import Content from "./components/Content";
import Subject from "./components/Subject";
import './App.css';

//컴포넌트를 만드는 코드!!
//javascript가 아님 (jsx! 알아서 자바스크립트 코드로 컨버팅해준다)
class App extends Component {
  //어떤 컴포넌트가 실행될 때 render보다 먼저 실행되면서, 
  //해당 컴포넌트를 초기화시켜주고 싶은 코드는 constructor안에 작성한당
  //즉, constructor는 제일 먼저 실행되면서 초기화를 담당한다.
  constructor(props){
    super(props);
    this.state = {
      subject:{title:'WEB', sub:'World Wide Web!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'} 
      ]
    }
  }
  render() {
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}>
        </Subject>
        <TOC data={this.state.contents}></TOC>
        <Content title="HTML" desc="HTML is HyperText Markup Language."></Content>
      </div>
    );
  }
}

export default App;
