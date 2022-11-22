import { useEffect } from "react";
import { MapMarker } from "react-kakao-maps-sdk"
import { useRoadStore } from "../store/road.store";

interface IPosition{
    lat:number;
    lng:number;
}
interface IRoadProps{
    myPosition:IPosition
}

const Road=({myPosition}:IRoadProps)=>{
    
    const restaurantPosition=useRoadStore((state)=>state.restaurantInfo)
    useEffect(()=>{
        console.log(restaurantPosition)
    },[restaurantPosition])
    return(
        <>
        {/* My Position */}
          <MapMarker position={myPosition}>
            내위치
        </MapMarker>
        {/* 가게위치 */}
        {restaurantPosition&&(
            <MapMarker position={restaurantPosition}>
                가게 위치
            </MapMarker>
        )}
        </>
      
    )
}
export default Road