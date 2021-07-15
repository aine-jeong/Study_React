import React, { Component } from 'react';

class TOC extends Component {
    shouldComponentUpdate(newProps, newState) {
      console.log('===> TOC render shouldComponentUpdate'
      ,newProps.data //변경된 값
      ,this.props.data ); //기존 값

      //들어오는 값이 바뀌었을 때만 render()를 실행하도록 하는 if문
      if(this.props.data === newProps.data) {
        return false;
      }
      return true;
      //## key point ##
      //만약 값을 새로 넣을 때 push를 사용한다면 여기서, 
      //값이 변경되어도 기존 값과 변경된 값이 항상 같다. (원본이 변경되었기 때문에)
    }
    render() {
      console.log('==>TOC render')
      var lists = [];
      var data = this.props.data;
      var i = 0;
      while(i < data.length){
        lists.push(<li key={data[i].id}>
            <a 
              href={"/content/"+data[i].id}
              data-id={data[i].id}
              onClick={function(e){
                //event객체 중 target속성: 해당 event가 발생한 태그를 가리킨다.
                //즉, 여기서는 a 태그 (e.target)
                //e.target.dataset.id -> 클릭한 a태그의 데이터 중 접미사가 id인 데이터의 값 
                //즉, 여기서는 클릭한 a태그의 data-id의 값

                e.preventDefault();
                //TOC가 App.js에 있는 함수를 실행시키는 것
                //실행시킬 때 인자로 우리가 클릭한 항목의 id값을 넘기면 된다.
                this.props.onChangePage(e.target.dataset.id);
              }.bind(this)}
              //위의 data-id (속성을 주는 방법) 대신 사용할 수 있는 방법
              //bind의 두번째 인자로 값을 주면 해당 함수의 첫번째 매개변수의 값으로 넣어줌 (여러개 넣을 수 있다)
              // onClick={function(id, e){
              //   e.preventDefault();
              //   this.props.onChangePage(id);
              // }.bind(this, data[i].id)
              //}
              //와 같이 사용 가능!!!!!
            
            >{data[i].title}</a>
          </li>);
        i = i+1;
      }
      return(
        <nav>
              <ul>
                  {lists}
              </ul>
          </nav>
      );
    }
}

  //TOC를 외부에서 사용할 수 있도록 하는 것
  export default TOC;