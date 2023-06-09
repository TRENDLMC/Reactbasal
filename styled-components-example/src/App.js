import styled from 'styled-components';
const Simplebutton=styled.button`
color:black;
background-color:cyan;
`;

const LargeButton=styled(Simplebutton)`
font-size:50px;
`;

const React=props=>{
  //여기서 props에서 값을 받는다 아래 reactlarge버튼에서 받아온 className을 사용하여 className을
  //버튼의 class로넣어서 css를 입력시켜준다
return(
  <button className={props.className}>{props.children}</button>
  //children은 react로감싸고있는 값을 의미
  );
}

const Reactlarge=styled(React)`
font-size:50px;
`;
//리액트 라지 버튼은 여기서 먼저 받아서 위에 react로 보낸다

const PrimartButton=styled.button`
color:${props=>props.primary? 'blue':'black'};
background-color:${props=>props.primary?'red':'green'};
`;

export default function App(){
  return(
    <div>
      <Simplebutton>simple</Simplebutton><br/><br/>
      <LargeButton>Large</LargeButton><br/><br/>
      <React>react</React><br/><br/>
      <Reactlarge>Reactlarge</Reactlarge><br/><br/>
      <PrimartButton>Normal</PrimartButton><br/><br/>
      <PrimartButton primary>Primary</PrimartButton>
    </div>
  );
  
  
}
