import { PropsWithChildren } from "react";

interface IButton{
    onClick?:()=>void;
    type?:'submit'|'button'|'reset'
}

const Button=({onClick,children,type='button'}:PropsWithChildren<IButton>)=>{
    return(
        <button type={type}
        onClick={onClick}
        className=" bg-gray-500 w-full p-2 rounded-xl text-white font-semibold
        cursor-pointe inline-block gap-2 cursor-pointer justify-center items-center ">
            {children}
        </button>
    )
}

export {Button}