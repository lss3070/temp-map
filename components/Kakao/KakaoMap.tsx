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
import { useInitPositionStore } from "../../store/initPosition.store";


const KakaoMap=()=>{
    const location = useGeolocation();

    const [myPosition,setMyPosition]=useMyPositionStore((state)=>[state.myPosition,state.setMyPosition])

    const [centerPosition,setCenterPosition] = useState<IMyPoistion>();
    const setInitPosition=useInitPositionStore((state)=>state.setInitPosition);
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
          setInitPosition({
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
                    strokeWeight={5} // ?????? ???????????????
                    strokeColor={"#75B8FA"} // ?????? ???????????????
                    strokeOpacity={2} // ?????? ???????????? ????????? 1?????? 0 ????????? ????????? 0??? ??????????????? ???????????????
                    strokeStyle={'solid'} // ?????? ????????? ?????????
                    fillColor={"#CFE7FF"} // ????????? ???????????????
                    fillOpacity={0.7} // ????????? ???????????? ?????????
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