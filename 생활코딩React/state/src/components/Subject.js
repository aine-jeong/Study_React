import React, { Component } from 'react';

class Subject extends Component {
    //class 안에 소속되는 함수는 function 생략 가능
    render() {
      return(
        //컴포넌트를 만들 경우 하나의 최상위 태그로 시작되어야 한다
        //여기서는 header가 최상위 태그
        <header>
            <h1>{this.props.title}</h1>
            {this.props.sub}
        </header>
      );
    }
  }

export default Subject;