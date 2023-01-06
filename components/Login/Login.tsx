import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useLoginModalStore } from "../../store/login.store";
import { useTokenStore } from "../../store/token.store";

  //rest api - 299d875b014a255e5dbc247b300cf8d3
  //jskey - 046f31cfae67c4eb66f86f01861abf28
const Login=()=>{

    const setModal=useLoginModalStore((state)=>state.setModal)
    // const token = useTokenStore((state)=>state.token);

   

    

    
        const clickEvent=()=>{
            setModal(true)
        }

    return(
        <div 
        onClick={clickEvent}>
            <a className=" z-99 w-20 h-20 top-0 left-0 translate-x-[-50%] translate-y-[-50%]">
                로그인
            </a>
        </div>
       
    )
}
export {Login}