// import './App.css';
// import ColorBox from './conponents/ColorBox';
// import ColorCobntext from './contents/color';


// function App() {
//   return (
//     <div >
//       <ColorCobntext.Provider value={{color:'red'}}>
//         <ColorBox />
//     </ColorCobntext.Provider>
//     <ColorBox></ColorBox>
//     </div>

    
//   );
// }

// export default App;

import './App.css';
import ColorBox from './conponents/ColorBox';
import SelectColors from './conponents/SelectColors';
import { ColorProvider } from './contexts/color';


function App() {
  return (
    <div >
      <ColorProvider>
        <SelectColors/>
        <ColorBox />
      </ColorProvider>
    </div>

    
  );
}

export default App;
