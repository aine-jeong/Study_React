import React, { Component } from 'react';

class CreateContent extends Component {
    render() {
      return(
        <article>
              <h2>Create</h2>
              <form action="/create_process" method="post"
                onSubmit={function(e){
                  //submit버튼을 눌러도 페이지가 변경되지 않도록 이벤트 막기
                  e.preventDefault();
                  //debugger;
                  //e.target : form태그 자체
                  //e.target.title.value : name="title"에 입력된 값
                  //e.target.desc.value : name="desc"에 입력된 값
                  this.props.onSubmit(
                    e.target.title.value,
                    e.target.desc.value
                  );
                }.bind(this)}>
                <p><input type="text" name="title" placeholder="title"></input></p>
                <p>
                  <textarea name="desc" placeholder="description"></textarea>
                </p>
                <p>
                  <input type="submit"></input>
                </p>
              </form>
          </article>
      );
    }
  }

  export default CreateContent;