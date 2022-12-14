'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import useGeolocation from "../../hooks/useGeolocation";
// import Map from "./map";
import { Circle, Map, MapMarker, useInjectKakaoMapApi, useMap } from "react-kakao-maps-sdk"
import { useRoadStore } from "../../store/road.store";

import { RestaurantMain } from "../restaurant/RestaurantMain";
import Mark from "../Mark";
import { RoadGuide } from "./RoadGuide";
import { IMyPoistion, useMyPositionStore } from "../../store/myPosition.store";


const KakaoMap=()=>{
    const location = useGeolocation();

    const [myPosition,setMyPosition]=useMyPositionStore((state)=>[state.myPosition,state.setMyPosition])

    const [centerPosition,setCenterPosition] = useState<IMyPoistion>()
    const [
      onRoad,
      selectMark
    ]=useRoadStore((state)=>[
      state.onRoad,
      state.selectMark
    ])

    useEffect(()=>{
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
      if(myPosition){
        setCenterPosition({
       lat:myPosition?.lat!,
       lng:myPosition?.lng!-0.003
     })
    }
    },[myPosition])

    useEffect(()=>{
      if(selectMark){
         setCenterPosition({
        lat:selectMark?.lat!,
        lng:selectMark?.lng!-0.005
      })
      }
    },[selectMark])

    return(
           <Map  
                className="w-full h-full"
                 center={
                  centerPosition? 
                  centerPosition:
                  { lat: 37.497945847809255, 
                  lng: 127.02771185232572 }}
                 style={{ width: "100%", height: "100%" }}
               >
                {
                  onRoad&&myPosition&&(
                    <Circle
                    radius={500}
                    strokeWeight={5} // 선의 두께입니다
                    strokeColor={"#75B8FA"} // 선의 색깔입니다
                    strokeOpacity={2} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle={'solid'} // 선의 스타일 입니다
                    fillColor={"#CFE7FF"} // 채우기 색깔입니다
                    fillOpacity={0.7} // 채우기 불투명도 입니다
                    center={myPosition}
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
                      <>
                        <Mark 
                        myPosition={myPosition!} 
                        setMyPosition={setMyPosition as any}/>
                        <RoadGuide myPosition={myPosition}/>
                      </>
                    )
                }
            </Map>      
    )
}

export {KakaoMap};