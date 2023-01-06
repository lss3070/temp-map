import { ModalBackGround } from "../Common/ModalBackground"
import { useLoginStore } from '../../store/login.store';
import { Button } from "../Common/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useTokenStore } from "../../store/token.store";


const LoginPopup=()=>{

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const setToken = useTokenStore((state)=>state.setToken)

    const onSubmit = (data:any)=>console.log(data);

    const kakaoLogin=()=>{
        const  popup = window.open(
            `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=046f31cfae67c4eb66f86f01861abf28&redirect_uri=${window.location.origin+'/oauth/kakao'}`,
            'kakao로그인','popup')

        popup?.addEventListener('beforeunload',async()=>{
            const token= localStorage.getItem('token');

            console.log(token)
            document.cookie=`token=${token}`
            
            const res = await axios.post('http://127.0.0.1:5001/temp-map-52a06/us-central1/app/kakaoLogin',
            {
                token:token
            },{withCredentials:true})

            setToken(token!);
            setLoginModal(false);
        })} 

    const [onLoginModal,setLoginModal] = useLoginStore((state)=>[state.onLoginModal,state.setLoginModal])
    return(
        <>
        {
            onLoginModal&&(
                <ModalBackGround onClick={()=>setLoginModal(false)}>
                    <div 
                    onClick={(e)=>e.stopPropagation()}
                    className=" w-80 h-80 bg-white rounded-lg px-2">
                        <div className=" text-2xl text-center">로그인</div>
                        <form onSubmit={handleSubmit(onSubmit)} 
                        className=" grid gap-2 py-2">
                            <input 
                            className="border "
                            {...register("id")}
                            />
                            <input 
                            {...register("password")}
                            className="border"
                            type="password"/>
                            <button className="w-full rounded-lg bg-slate-400 py-2 text-white" type="submit">
                                로그인
                            </button>
                        </form>
                        <div className="flex w-full py-2 items-center justify-center">
                            <hr className="w-full bg-black border "/>
                            <span className="w-full flex items-center justify-center">또는</span>
                            <hr className="w-full bg-black border"/>
                        </div>
                        <div className="grid gap-4">
                            <div 
                            onClick={kakaoLogin}
                            className="w-full cursor-pointer
                            bg-yellow-300 text-white p-2 text-center">
                                카카오로 시작하기
                            </div> 
                        </div>
                        <hr className=" border w-full mt-2"/>
                        <div className=" w-full rounded-lg">
                            회원가입
                        </div>
                    </div>

                </ModalBackGround>
            )
        }
        </>
    )
}
export {LoginPopup}