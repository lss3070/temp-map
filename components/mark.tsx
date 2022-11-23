import Image from "next/image";
import { useEffect } from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk"
import { useRoadStore } from "../store/road.store";

interface IPosition{
    lat:number;
    lng:number;
}
interface IRoadProps{
    myPosition:IPosition
}

const Mark=({myPosition}:IRoadProps)=>{
    
    const [
        restaurantMark,
        selectMark,
        setSelectMark
    
    ]=useRoadStore((state)=>[
        state.restaurantMark,
        state.selectMark,
        state.setSelectMark
    ])

    return(
        <>
        {/* My Position */}
        <>
            <MapMarker 
                    image={{
                        src: '/assets/human.png',
                        size:{
                            width:25,
                            height:25
                        }
                    }} 
            position={myPosition}>
            </MapMarker>
            <CustomOverlayMap
                            xAnchor={0.5}
                            yAnchor={2.2}
                            position={{
                                lat:myPosition.lat,
                                lng:myPosition.lng
                            }}
                        >
                            <div className="
                            grid
                             
                            bg-sky-900
                            font-bold
                           text-white
                             rounded-lg
                            text-center
                            w-auto h-7 px-2" 
                            >
                                <div className="h-full w-full">
                                   내위치
                                </div>
                            </div>
                        </CustomOverlayMap>
        </>
         
        {/* 가게위치 */}
        {
            restaurantMark?.map((item,index)=>{
                
                return(
                    item.id!==selectMark?.id?(
                        <>
                            <MapMarker key={index}
                            onClick={()=>setSelectMark(item)}
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
                                {/* {item.name} */}
                            </MapMarker>
                        </>
                       
                    ):(
                    <> 
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
                        </MapMarker>
                        <CustomOverlayMap
                            xAnchor={0.5}
                            yAnchor={2.2}
                            position={{
                                lat:item.lat,
                                lng:item.lng
                            }}
                        >
                            <div className="
                            grid
                             
                            bg-sky-600
                            font-bold
                           text-white
                             rounded-lg
                            text-center
                            w-auto h-7 px-2" 
                            >
                                <div className="h-full w-full">
                                    {item.name}
                                </div>
                            </div>
                        </CustomOverlayMap>
                    </>
                    )
                   
                )
            })
        }
        </>
    )
}
export default Mark