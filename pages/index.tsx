import Head from 'next/head'
import Image from 'next/image'
import { GoogleWrapper } from '../components/GoogleWrapper'
import { KakaoMap } from '../components/Kakao/KakaoMap'
import { LeftMenu } from '../components/LeftMenu'
import { LeftRestaurantList } from '../components/LeftRestaurantList'
import { NaverMap } from '../components/Naver/NaverMap'
import PositionLoading from '../components/positionLoading/positionLoading'
import { RestaurantDetail } from '../components/restaurant/RestaurantDetail'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className='w-full h-full'>
      {/* <NaverMap/> */}
      {/* <GoogleWrapper/> */}
      <KakaoMap/>
      <PositionLoading/>
      <LeftMenu/>
    </div>
  )
}
