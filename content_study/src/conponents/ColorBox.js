// import { ColorContext} from "../contents/color";

// const ColorBox=()=>{
//     return(
//         <Colorcontent.Consumer>
//         {/* context의 chilred값으로 함수를 사용하려면 consumer를 붙여줘야 사용이 가능하다 안붙여도 사용이가능하지만 콘솔창에 오류가발생. */}
//         {value=>(
//             <>
//             <div style={{ width:'64px', height:'64px', background:value.color}}
//             />
            
//             </>

//         )}
//         </Colorcontent.Consumer>
//     );
// };
// export default ColorBox;

// import { ColorConsumer } from "../contexts/color";

// const ColorBox=()=>{
//     return(
//         <ColorConsumer>
//         {/* context의 chilred값으로 함수를 사용하려면 consumer를 붙여줘야 사용이 가능하다 안붙여도 사용이가능하지만 콘솔창에 오류가발생. */}
//         {({state})=>(
//             <>
//             <div style={{ width:'64px', height:'64px', background:state.color}}
//             />
//             <div style={{ width:'32px', height:'32px', background:state.subcolor}}
//             />
            
//             </>

//         )}
//         </ColorConsumer>
//     );
// };
// export default ColorBox;

import { useContext } from "react";
import ColorContext, { ColorConsumer } from "../contexts/color";

const ColorBox=()=>{
    const {state}=useContext(ColorContext);
    return(
            <>
            <div style={{ width:'64px', height:'64px', background:state.color}}
            />
            <div style={{ width:'32px', height:'32px', background:state.subcolor}}
            />
            
            </>

    );
};
export default ColorBox;
