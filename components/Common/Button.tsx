import { PropsWithChildren } from "react";

interface IButton{
    onClick?:()=>void;
}

const Button=({onClick,children}:PropsWithChildren<IButton>)=>{
    return(
        <div 
        onClick={onClick}
        className=" bg-gray-500 p-2 rounded-xl text-white font-semibold
        cursor-pointe flex gap-2 cursor-pointer justify-center items-center">
            {children}
        </div>
    )
}

export {Button}