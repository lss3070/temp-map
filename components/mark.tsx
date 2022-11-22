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

const Mark=({myPosition}:IRoadProps)=>{
    
    const [restaurantMark,selectMark]=useRoadStore((state)=>[state.restaurantMark,state.selectMark])

    return(
        <>
        {/* My Position */}
          <MapMarker 
                 image={{
                    src: '/assets/human.png',
                    size:{
                        width:25,
                        height:25
                    }
                }} 
          position={myPosition}>
            내위치
        </MapMarker>
        {/* 가게위치 */}
        {
            restaurantMark?.map((item,index)=>{
                return(
                    <MapMarker key={index}
                    image={{
                        src: '/assets/blackMark.png',
                        size:{
                            width:30,
                            height:30
                        }
                    }} 
                    position={{
                        lat:item.lat,lng:item.lng
                    }}>
                        {item.name}
                    </MapMarker>
                )
            })
        }
        {/* 선택한 가게 위치 */}
        {
            selectMark&&(
                <MapMarker
                image={{
                    src: '/assets/blueMark.png',
                    size:{
                        width:30,
                        height:30
                    }
                }} 
                position={{
                    lat:selectMark?.lat!,
                    lng:selectMark?.lng!
                }}
                >
                    {selectMark?.name}
                </MapMarker>
            )
        }
        </>
    )
}
export default Mark