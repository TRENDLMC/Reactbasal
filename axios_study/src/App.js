import { useState } from 'react';
import './App.css';
import axios from '../node_modules/axios/index';

function App() {
  const [data,setData]=useState(null);
  const onClick=()=>{
    axios.get('https://jsonplaceholder.typicode.com/todos/1').then(Response=>{
      //then 은 promise에서 사용하는거아닌가
      setData(Response.data);
    });
  };
  return (
    <div >
        <div>
          <button onClick={onClick}>불러 오기</button>
        </div>
        {data&&<textarea rows={7} value={JSON.stringify(data,null,2)} readOnly={true} />}
    </div>
  );
}

export default App;

// import { useState } from 'react';
// import './App.css';
// import axios from '../node_modules/axios/index';

// const App=()=> {
//   const [data, setData] = useState(null);
//   const onClick = async () => {
//     try {
//       const response = await axios.get('https://jsonplaceholder.typicode.com/todos/',)
//       setData(response.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   return (
//     <div >
//       <div>
//         <button onClick={onClick}>불러 오기</button>
//       </div>
//       {data && <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly='true' />}
//       </div>                                       
//   );
// }

// export default App;
