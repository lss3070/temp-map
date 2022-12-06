import { useState } from "react";


interface ITextLengthCut{
    text:string;
}
const TextLengthCut=({text}:ITextLengthCut)=>{

    const [down,setDown]=useState<boolean>(false);

    const beforeText=text.substr(0,200)
    return(
       <>
       {
            !down&&text.length>200?
            <div className="text-xs cursor-pointer">
                <a>{text.substr(0,200)} </a>
                <a onClick={()=>setDown(true)} className=" bg-gray-400 opacity-60 w-auto rounded-lg px-2 font-bold">···</a>
            </div>
            : <div className="text-xs">{text}</div>
        }
       </>
    )
}
export {TextLengthCut}