import axios from "axios";
import { useForm } from "react-hook-form";
import { useLoginModalStore } from "../../store/login.store";
import { useTokenStore } from "../../store/token.store";

const LoginModal=()=>{

    const [onModal,setModal]= useLoginModalStore((state)=>[state.onModal,state.setModal])

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const setToken = useTokenStore((state)=>state.setToken)

    const onLogin=(data:any)=>{
        console.log(data)
    }

    const kakaoLoginClick=()=>{
        const  popup = window.open(
            `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${window.location.origin+'/oauth/kakao'}`,
            'kakao로그인','popup')

        popup?.addEventListener('beforeunload',()=>{
            const token= localStorage.getItem('token');

            console.log(token)
            document.cookie=`token=${token}`
            axios.get(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/kakaoLogin`,
            {
                headers:{
                    cookie:`token=${token};`
                },
                withCredentials: true
            })
            setToken(token!);
        })} 
        
    return(
        <>
       { 
       onModal&&
        <div 
        onClick={(e)=>{
            setModal(false)
        }}
        className=" absolute left-0 top-0 w-full h-full bg-black bg-opacity-80 z-20 flex items-center justify-center">
            <div 
             onClick={(e)=>e.stopPropagation()}
            className=" w-1/3 h-1/3 bg-white rounded-lg p-5 grid">
                <form 
                className="grid gap-2"
                onSubmit={handleSubmit(onLogin)} >
                    <input type="text" placeholder="아이디" {...register("id", { required: true })} />
                    <input type="password" placeholder="비밀번호" {...register("password", { required: true })} />
                    <input 
                    className="bg-blue-500 text-white rounded-lg cursor-pointer"
                    type="submit" value="로그인"/>
                </form>
                <div className="w-full text-center">회원가입</div>
                <hr/>
                <div className="w-full">
                    <div 
                    className="w-full h-10 bg-yellow-500 text-white rounded-lg cursor-pointer
                     text-center items-center justify-center flex"
                    onClick={kakaoLoginClick}>
                        KaKao Login
                    </div>
                </div>
            </div>
        </div>
        }
        </>
    
    )
}

export {LoginModal}