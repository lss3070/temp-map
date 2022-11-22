'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import useGeolocation from "../hooks/useGeolocation";
// import Map from "./map";
import { Circle, Map, MapMarker, useInjectKakaoMapApi, useMap } from "react-kakao-maps-sdk"
import { useRoadStore } from "../store/road.store";
import Road from "./mark";
import RestaurantMain from "./restaurant/restaurantMain";



export interface MyPoistion{
  lat:number;
  lng:number;
}
const KakaoMap=()=>{


    const [myPosition,setMyPosition]=useState<MyPoistion>()
    const location = useGeolocation();
    const [centerPosition,setCenterPosition] = useState<MyPoistion>()
    const [
      onRoad,
      selectMark,
      setRestaurantMark
    ]=useRoadStore((state)=>[
      state.onRoad,
      state.selectMark,
      state.setRestaurantMark
    ])

    useEffect(()=>{
      console.log(location);
        if(location.loaded){
          
          setMyPosition({
            lat:location.coordinates?.lat!,
            lng:location.coordinates?.lng!
          })
          setCenterPosition({
            lat:location.coordinates?.lat!,
            lng:location.coordinates?.lng!
          })
      }
    },[location])

    useEffect(()=>{
      if(selectMark){
         setCenterPosition({
        lat:selectMark?.lat!,
        lng:selectMark?.lng!
      })
      }
     
    },[selectMark])

    return(
           <Map  
                className="w-full h-full"
                 center={
                  centerPosition? 
                  centerPosition:
                  { lat: 33.5563, 
                  lng: 126.79581 }}
                 style={{ width: "100%", height: "100%" }}
               >
                {
                  centerPosition&&(
                    <Circle
                    radius={500}
                    strokeWeight={5} // 선의 두께입니다
                    strokeColor={"#75B8FA"} // 선의 색깔입니다
                    strokeOpacity={2} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle={'solid'} // 선의 스타일 입니다
                    fillColor={"#CFE7FF"} // 채우기 색깔입니다
                    fillOpacity={0.7} // 채우기 불투명도 입니다
                    center={centerPosition}
                    />
                  )
                }
               
                {
                    myPosition&&(
                        <RestaurantMain lat={myPosition.lat} lng={myPosition?.lng}/>
                    )
                }
                {
                    myPosition&&onRoad&&(
                        <Road myPosition={myPosition!}/>
                    )
                }
            </Map>      
    )
}

export default KakaoMap;