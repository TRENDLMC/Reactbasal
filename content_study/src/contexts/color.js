// import {createContext, useState} from 'react';

// const ColorContext=createContext({color='black'});

// export default ColorContext;

import {createContext, useState} from 'react';


const ColorContext=createContext({
    state:{color:'black',subcolor:'red'},
    ations:{
        setColor:()=>{},
        setSubcolor:()=>{}
    }
});
//약간 구현체 인터페이스 느낌인거같은데

const ColorProvider=({children})=>{
    const [color,setColor]=useState('black');
    const [subcolor,setSubcolor]=useState('red');

    const value={
        state:{color,subcolor},
        actions:{setColor,setSubcolor}
    };

    return(
        <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
    );

};

const {Consumer:ColorConsumer}=ColorContext;
// const ColorConsumer = ColorContext.Consumer 와 같은 의미

//그리고 수출을 provider와 consumer를 수출한다
export{ColorProvider,ColorConsumer};

//지정하지않으면 colorcontext가 기본으로 수출됨 
export default ColorContext;