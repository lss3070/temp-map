'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import useGeolocation from "../hooks/useGeolocation";
// import Map from "./map";
import { Map, MapMarker, useInjectKakaoMapApi, useMap } from "react-kakao-maps-sdk"
import RestaurantList from "./restaurantList";
import { useRoadStore } from "../store/road.store";
import Road from "./road";



export interface MyPoistion{
  lat:number;
  lng:number;
}
const KakaoMap=()=>{


    const [myPosition,setMyPosition]=useState<MyPoistion>()
    const location = useGeolocation();
    const [centerPosition,setCenterPosition] = useState<MyPoistion>()
    const [onRoad,restaurantRoad]=useRoadStore((state)=>[state.onRoad,state.restaurantInfo])

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
      setCenterPosition(restaurantRoad)
    },[restaurantRoad])


    return(
           <Map  
                className="w-full h-full"
                 center={centerPosition? 
                  centerPosition:
                  { lat: 33.5563, 
                  lng: 126.79581 }}
                 style={{ width: "100%", height: "100%" }}
               >
                {
                    myPosition&&(
                        <RestaurantList lat={myPosition.lat} lng={myPosition?.lng}/>
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