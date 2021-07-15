import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    //state의 값으로 사용하지 않은 이유?
    //max_content_id는 UI에 영향을 주는 것이 아니기 때문에
    //불필요한 렌더링을 방지하기 위해서!
    this.state = {
      mode:'create',
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
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
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
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
        //add content to this.state.contents
        this.max_content_id = this.max_content_id+1;

        //state에 값을 추가할 때
        //original data를 변경하는 방식인 push를 이용하는 방법은 좋지 않다.
        //아래와 같은 방법은 original data인 state.contents를 변경한다.
        //추후 성능을 개선할 때 까다롭다.
        //this.state.contents.push(
        //  {id:this.max_content_id, title:_title, desc:_desc}
        //);
        //push 대신 concat이용
        //concat은 original data를 변경하지 않고 복제하는 개념이다.

        //state가 변경될 때마다 각 컴포넌트의 render()함수를 재호출하는데, 
        //이는 성능을 떨어지게 할 수 있는 문제이다.
        //이 때 사용할 수 있는 함수: sholdComponentUpdate(newProps, newState){};
        //sholdComponentUpdate는 render() 이전에 실행된다
        //sholdComponentUpdate가 return true면 render()가 실행되고, return false면 render()가 실행되지 않는다.
        //sholdComponentUpdate는 새롭게 바뀐 값과 이전 값에 접근할 수 있다.
        //so, 들어오는 값이 바뀌었을 때만 render가 호출되게 할 수 있다.
        // ㄴ> TOC.js파일에서 이어서 설명!
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        )

        //push를 사용하고 싶다면
        //Array.from을 사용해서 복제 후, 값 넣기
        //var newContents = Array.from(this.state.contents);
        //newContents.push(
        //    {id:this.max_content_id, title:_title, desc:_desc}
        //  );

        //만약 Array가 아닌경우

        this.setState({
          //push 사용한 경우 -> contents: this.state.contents
          //concat 사용한 경우
          contents: _contents
          //Array.from 사용한 경우 -> contents:newContents
        });
      }.bind(this)}></CreateContent>
    }
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
        ></Subject>
        <TOC 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id) 
            });
          }.bind(this)} 
          data={this.state.contents}></TOC>
        <Control onChangeMode={function(_mode){
          this.setState({
            mode:_mode
          })
        }.bind(this)}></Control>
        {_article}
      </div>
    );
  }
}

export default App;
