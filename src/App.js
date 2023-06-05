import './App.css';
import { useState } from 'react';

function App() {
  const [mode, setmode]=useState('WELCOME');
  const [id,setId]=useState('null');
  const [topics,settopics]=useState([
    {id:1 ,title:'html',body:'html is...'},
    {id:2 ,title:'css',body:'css is...'},
    {id:3 ,title:'js',body:'js is...'}
  ]);
  const [nextid,addid]=useState(4);
  let content=null;
  if(mode==="WELCOME"){
    content=<Article title="Welcome" body='Hello, WEB'  />
  }else if(mode==="READ"){
    let body,title=null;
    for(let i=0; i<topics.length; i++){
      if(id === topics[i].id){
        body=topics[i].body
        title=topics[i].title
      }
    }
    content=<Article title={title} body={body}  ></Article>
  }else if(mode==='Create'){
    content=<Create onCerate={(_title,_body)=>{
      //<Create를 실행시켜서 값인 onCeate를 props로 create에넘겨줌
    const newtopic={id:nextid,title:_title,body:_body};
    //Create에서 받은 값을 입력해줌 id값은 위에 전역변수로 선언된값을 사용 
    const newtopics=[...topics]
    //원시타입이아닌 배열과 obj같은경우는값을 usestate의 set을 사용하기위해서는
    //복제본을 만들어서 값을 추가해준뒤 set해주어야 값을 비교하여 다르면 저장한다
    //복제본은 ...을 찍고 변수의이름을 적으면 복제된다 
    newtopics.push(newtopic);
    settopics(newtopics);
    setmode('READ');
    setId(nextid);
    addid(nextid+1);
    //위에 과정을 완료하면 값이 변경되면서 다시 컴퍼런스 한다 그떄를 위해 mode의값을 read로변경하고 아이디의값을 주어 작성한 글을 출력하게만듬
    //그다음 글작성할시 번호를 다르게하기위해 usestate를 사용하여 값을 변경시켜준다.
    }}></Create>
  }else if(mode==='UPDATE'){

  }
  return (
    <div>
       <Header title='WEB' onChangeMode={()=>{
       setmode('WELCOME');
      }} ></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
       setmode('READ');
       setId(_id);
      }} />
       {content}
       <a href='/'onClick={(event)=>{
       event.preventDefault();
       setmode('Create');
      }} >
       Create
       </a>
    </div>
  );
}

function Header(props){
  return(
      <header>
        <h1><a href="/ream/67" onClick={(event) =>{
          event.preventDefault();
          props.onChangeMode();
        }}>{props.title}</a>
        </h1>
      </header>
  );
}

function Nav(props){
  const lis=[];
  for(let i=0; i<props.topics.length; i++){
    let t=props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));}}>
        {t.title}
      </a>
    </li>)
  }
  return(
    <div>
      <nav>
          <ol>
            {lis}
          </ol>
        </nav>
    </div>

  );
}

function Article(props){
  return(
    <div>
      <article>
        <h2>{props.title}</h2>
        {props.body}
      </article>
    </div>
  );
}

function  Create(props){
  return(
    <article> 
      <h2>Create</h2>
        <form onSubmit={(event)=>{
          event.preventDefault();
          const _title=event.target.title.value; 
          const _body=event.target.body.value;
          props.onCerate(_title,_body)
          //props로 넘어온 oncerate를 실행시킴 값은 위에서 form을 타겟으로한value를 값을넘겨줌 
        }}> 
          <p>제목<br></br><input type='text' name='title' placeholder='제목을 입력해주세요.' autoFocus /></p>
          <p>내용<br></br><textarea name='body' placeholder='내용을 입력해주세요' cols={40} rows={10} /></p>
          <input type='submit' value='등록'/>
          <input type='reset' value='내용 삭제'/>
         </form>
    </article>

  );
}



export default App;
