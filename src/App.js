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
  let contextControl=null;
  //사용할 전역 변수들을 선언해준다 개발자들의 약속으로 변수들은 맨위에 선언한다
  if(mode==="WELCOME"){
    content=<Article title="Welcome" body='Hello, WEB'  />
    //변수 content를선언해준뒤 값을 넣어줌 즉 return에넣을값이 매우작아짐
  }else if(mode==="READ"){
    let body,title=null;
    //read는 처음실행후 welcome값이므로 위에항목이실행된후 아래에서 return에서 id값과
    //모드의 값을 받아오면 실행한다 id의값을 기준으로 title과body를 가져온다
    for(let i=0; i<topics.length; i++){
      if(id === topics[i].id){
        body=topics[i].body
        title=topics[i].title
      }
    }
    content=<Article title={title} body={body}  ></Article>
    //article의 내용을 id를 기준으로 가져온 title과 body의값을 출력시킨다.
    contextControl=<li><a href={'/update/'+id} onClick={event=>{
      event.preventDefault();
      setmode('Update');
    }}>Update</a></li>
    //contextcontrol값을 변경시킨다. update같은경우는 변경할값이있을때만 실행되어야하기떄문에 welcome모드에서는
    //출력되지않고 read의 값을 받으면 contextcontrol의값을설정하여 출력되게만든다.
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
  }else if(mode==='Update'){
    let body,title=null;
    for(let i=0; i<topics.length; i++){
      if(id === topics[i].id){
        body=topics[i].body
        title=topics[i].title
      }
    }
    content=<Update body={body} title={title} onUpdate={(_title,_body)=>{
      const newTopics=[...topics];
      //복사본을만든다 
      const updateedTopic={id:id, title:_title,body:_body};
      //복사본에 넣을값을 세팅한다 그리고 id의경우는 맨위에서 값이null이였지만 update에 넘어오기위해 read를거쳐왓기떄문에
      //id의값은 위에서 read에서 설정되어있고 id는 전역변수이기떄문에 update에서도 사용가능하다
      //그값을 그대로 넣어준뒤
      for(let i=0; i<newTopics.length;i++){
        if(newTopics[i].id===id){
          newTopics[i]=updateedTopic;
          //요게 set과 해준것과같음 즉 key값인 id를 기준으로 id가 위의값과 같으면 변경시켜준다.
          break;
        }
      }
      settopics(newTopics);
      //settopics하여 값을 비교하여 변경된게있으면 값을 대입한다.
      setmode('READ');
      setId(id);
    }}>
      
    </Update>
  }
  return (
    <div>
       <Header title='WEB' onChangeMode={()=>{
       setmode('WELCOME');
      }} ></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
       setmode('READ');
       setId(_id);
       //네비게이션의 topris를 누르면 mode를 read로변경하고 id값을 넣어준다
       //그래서 위에 app전역변수 id를 설정할수있다.id를설정하는것은 Nav함수에서 number변환받은값을 대입시킨다
      }} />
       {content}
       <ul>
       <li>
          <a href='/'onClick={(event)=>{
            event.preventDefault();
            setmode('Create');
            }}>
          Create</a>
       </li>
       {contextControl}
       </ul>
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
    //  topis의 값만큼 반복하여 li를 만든다
    let t=props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));}}>
        {/* 값을 target.id를 하여 위에서 id={t.id}의값을 가져온후 값을 number로변경하여 넘겨준다 */}
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
          <p>제목<br></br><input type='text' name='title' placeholder='제목을 입력해주세요' autoFocus /></p>
          {/* placfeholder는 입력예시를 input에 보여준다 autoFocus는 자동으로 커서를 옭겨준다 */}
          <p>내용<br></br><textarea name='body' placeholder='내용을 입력해주세요'cols={40} rows={10} /></p>
          {/* 내용의 길이는 길수있기떄문에 input타입이아닌 textarea를 선언하여 길이가 가변성으로 길게만들수있게선언
          name은 body로선언하고 cols와 rows는 입력상자의 크기를 설정한다.*/}
          <input type='submit' value='등록'/>
          <input type='reset' value='내용 삭제'/>
         </form>
    </article>

  );
}

function Update(props){
  const [title,setTitle]=useState(props.title);
  const [body,setBody]=useState(props.body)
  //title과 body의값은 위에 props에서 받아온 값이다. 그값을 useState를 통하여 값을 세팅해준다
  //그리고set를 사용하여 값을 변경해준다.
  return(
    <article> 
      <h2>Update</h2>
        <form onSubmit={(event)=>{
          event.preventDefault();
          const _title=event.target.title.value; 
          const _body=event.target.body.value;
          props.onUpdate(_title,_body)
        }}> 
          <p>제목<br></br><input type='text' name='title' value={title} autoFocus onChange={event=>{
            setTitle(event.target.value);
            //onchag명령어를 사용하여 value의값이 변경된다면 set을 사용하여 값을 실시간으로변경 
          }} /></p>
          <p>내용<br></br><textarea name='body' value={body} onChange={event=>{
            setBody(event.target.value);
            //onchag명령어를 사용하여 value의값이 변경된다면 set을 사용하여 값을 실시간으로변경 
          }}  cols={40} rows={10} /></p>
          <input type='submit' value='Update'/>
          <input type='reset' value='내용 삭제'/>
        </form>
    </article>
  )
}


export default App;
