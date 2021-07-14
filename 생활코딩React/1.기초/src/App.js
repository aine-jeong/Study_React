import React, { Component } from 'react';
import './App.css';

class Subject extends Component {
  //class 안에 소속되는 함수는 function 생략 가능
  render() {
    return(
      //컴포넌트를 만들 경우 하나의 최상위 태그로 시작되어야 한다
      //여기서는 header가 최상위 태그
      <header>
          <h1>WEB</h1>
          world wide web!
      </header>
    );
  }
}

class TOC extends Component {
  render() {
    return(
      <nav>
            <ul>
                <li><a href="1.html">HTML</a></li>
                <li><a href="2.html">CSS</a></li>
                <li><a href="3.html">JavaScript</a></li>
            </ul>
        </nav>
    );
  }
}

class Content extends Component {
  render() {
    return(
      <article>
            <h2>HTML</h2>
            HTML is HyperText Markup Language.
        </article>
    );
  }
}

//컴포넌트를 만드는 코드!!
//javascript가 아님 (jsx! 알아서 자바스크립트 코드로 컨버팅해준다)
class App extends Component {
  render() {
    return (
      <div className="App">
        <Subject></Subject>
        <TOC></TOC>
        <Content></Content>
      </div>
    );
  }
}

export default App;
