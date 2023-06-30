// const colors = ["red", "orange", "yellow", "green", "blud", "indigo", "violet"];

// const SelectColors = () => {
//   return (
//     <div>
//       <h2>색상을 선택하세요</h2>
//       <div style={{ display: "flex" }}>
//         {colors.map((color) => (
//           <div
//             key={color}
//             style={{
//               background: color,
//               width: "24px",
//               height: "24px",
//               cusrsor: "pointer",
//             }}
//           />
//         ))}
//       </div>
//       <hr />
//     </div>
//   );
// };

// export default SelectColors;

// import { ColorConsumer } from '../contexts/color';
// //colorconsumer를 수입받아온다

// const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

// const SelectColors  = () => {
//     return (
//       <div>
//         <h2>색상을 선택하세요.</h2>
//         <ColorConsumer>
//         {/* colorconsumer를 호출 */}
//           {({ actions }) => (
//             <div style={{ display: 'flex' }}>
//               {colors.map(color => (
//                 //colors를 순차적으로 대입함 div에 값을 하나씩 넣어줌
//                 <div
//                   key={color}
//                   style={{ background: color, width: '24px', height: '24px', cursor: 'pointer' }}

//                   onClick={() => actions.setColor(color)}
//                   //온클릭될수 context의action의 setcolor를 불러와서 현재 선택값을 지정해서넣어준다
//                   onContextMenu={e => {
//                     e.preventDefault(); // 마우스 오른쪽 버튼 클릭 시 메뉴가 뜨는 것을 무시함/
//                     //온클릭될수 context의action의 setsubcolor를 불러와서 현재 선택값을 지정해서넣어준다
//                     actions.setSubcolor(color)
//                   }}
//                 />
//               ))}
//             </div>
//           )}
//         </ColorConsumer>
//         <hr />
//       </div>
//     );
// };

// export default SelectColors;

import React, { Component } from "react";
import ColorContext from '../contexts/color';

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

class SelectColors extends Component {
    static contextType = ColorContext;

    handleSetColor = color => {
      this.context.actions.setColor(color);
    };

    handleSetSubcolor = subcolor => {
      this.context.actions.setSubcolor(subcolor);
    };

  render() {
    return (
      <div>
        <h2>색상을 선택하세요.</h2>
        <div style={{ display: "flex" }}>
          {colors.map((color) => (
            <div
              key={color}
              style={{
                background: color,
                width: "24px",
                height: "24px",
                cursor: "pointer",
              }}
              onClick={() => this.handleSetColor(color)}
              onContextMenu={e => {
                e.preventDefault();
                this.handleSetSubcolor(color);
              }}
            />
          ))}
        </div>
        <hr />
      </div>
    );
  }
}

export default SelectColors;