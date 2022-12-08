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

export default function Home() {

  const [onRoad,
    selectMarker,
    setSelectMark,
    setRoad
]=useRoadStore((state)=>[state.onRoad,
    state.selectMark,
    state.setSelectMark,state.setRoad]);

    
  return (
    <div className='w-full h-full'>
      {/* <NaverMap/> */}
      {/* <GoogleWrapper/> */}
      <KakaoMap/>
      <PositionLoading/>
      <LeftMenu/>
      <RestaurantDetail/>
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
