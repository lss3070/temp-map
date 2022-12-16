import Link from "next/link";

  //rest api - 299d875b014a255e5dbc247b300cf8d3
  //jskey - 046f31cfae67c4eb66f86f01861abf28
const Login=()=>{

    const onClick=()=>{
        window.open(
            `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=046f31cfae67c4eb66f86f01861abf28&redirect_uri=${window.location.origin+'/oauth/kakao'}`,
            'kakao로그인','popup')
    }

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