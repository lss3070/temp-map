import { motion } from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'
import { GoogleWrapper } from '../components/GoogleWrapper'
import { KakaoMap } from '../components/Kakao/KakaoMap'
import { LeftMenu } from '../components/LeftMenu'
import { LeftRestaurantList } from '../components/restaurant/restaurantList/LeftRestaurantList'
import { NaverMap } from '../components/Naver/NaverMap'
import PositionLoading from '../components/positionLoading/positionLoading'
import { RestaurantDetail } from '../components/restaurant/RestaurantDetail'
import { useRoadStore } from '../store/road.store'
import styles from '../styles/Home.module.css'
import { Button } from '../components/Common/Button'
import DaumPostcodeEmbed from 'react-daum-postcode'
import { PostModal } from '../components/Post/PostModal'
import { PositionChange } from '../components/Post/PositionChange'
import dynamic from 'next/dynamic'

import { ModalBackGround } from '../components/Common/ModalBackground'
import { LoginPopup } from '../components/Login/LoginPopup'
import { RestaurantReview } from '../components/restaurant/restaurantInput/RestaurantReviewModal'
import { useTokenStore } from '../store/token.store'
import { useEffect } from 'react'
import axios from 'axios'

export default function Home() {

  const [onRoad,
    selectMarker,
    setSelectMark,
    setRoad
]=useRoadStore((state)=>[state.onRoad,
    state.selectMark,
    state.setSelectMark,state.setRoad]);

    const [setToken,setUserInfo] = useTokenStore((state)=>[state.setToken,state.setUserInfo])

    useEffect(()=>{
      const token = localStorage.getItem('token');


      axios.post(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/tokenLogin`,
        {
          token:token
        },{withCredentials:true}
      ).then((res)=>res.data).then((data)=>{
        localStorage.setItem('token',data.token)
            setToken(token!);
            setUserInfo(data.userInfo)
      }).catch(error=>console.log(error))
    },[])

 
  return (
    <div className='w-full h-full'>
      {/* <NaverMap/> */}
      {/* <GoogleWrapper/> */}
      <KakaoMap/>
      <PositionLoading/>
      <LeftMenu/>
      <RestaurantDetail/>
      <PositionChange/>
      <PostModal/>
      <LoginPopup/>
      <RestaurantReview/>
      {/* <PostModal/> */}
      {
            onRoad&&(
                <motion.div 
                className=" absolute right-2 bottom-2 w-28 z-10">
                    <div className="z-10 bg-gray-400 p-2 rounded-2xl cursor-pointer 
                    text-white absolute bottom-0 w-full text-center"
                    onClick={()=>{
                        setSelectMark(undefined)
                        setRoad(false)                    
                    }}
                    >
                        다시 돌리기
                    </div>
                </motion.div>
            )
        }
       
    </div>
  )
}
