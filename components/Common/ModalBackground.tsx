import { PropsWithChildren } from "react"

interface IModalBackground{
    onClick?:()=>void;
}


const ModalBackGround=({onClick,children}:PropsWithChildren<IModalBackground>)=>{
    return(
        <div onClick={onClick}
         className="w-full h-full absolute left-0 top-0 z-50
        bg-slate-500 bg-opacity-70 flex items-center justify-center">
            {children}
        </div>
    )
}
export {ModalBackGround}