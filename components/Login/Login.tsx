import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useTokenStore } from "../../store/token.store";

  //rest api - 299d875b014a255e5dbc247b300cf8d3
  //jskey - 046f31cfae67c4eb66f86f01861abf28
const Login=()=>{

    // const token = useTokenStore((state)=>state.token);

    const setToken = useTokenStore((state)=>state.setToken)


    const onClick=()=>{
        const  popup = window.open(
            `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=046f31cfae67c4eb66f86f01861abf28&redirect_uri=${window.location.origin+'/oauth/kakao'}`,
            'kakao로그인','popup')

        popup?.addEventListener('beforeunload',()=>{
            const token= localStorage.getItem('token');

            console.log(token)
            document.cookie=`token=${token}`
            axios.get('http://localhost:5001/temp-map-52a06/us-central1/kakaoLogin',
            {
                headers:{
                    cookie:`token=${token};`
                },
                withCredentials: true
            })

            setToken(token!);
        })} 
    

    return(
        <div 
        onClick={onClick}>
            <a className=" z-99 w-20 h-20 top-0 left-0 translate-x-[-50%] translate-y-[-50%]">
                로그인
            </a>
        </div>
       
    )
}
export {Login}