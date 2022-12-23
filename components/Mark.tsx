import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk"
import { IMyPoistion } from "../store/myPosition.store";
import { RestaurantMark, useRoadStore } from "../store/road.store";


interface IPosition{
    lat:number;
    lng:number;
}
interface IRoadProps{
    myPosition:IPosition
    setMyPosition:Dispatch<SetStateAction<IMyPoistion | undefined>>;
}

const Mark=({myPosition,setMyPosition}:IRoadProps)=>{

    const [
        restaurantMark,
        selectMark,
        setSelectMark
    ]=useRoadStore((state)=>[
        state.restaurantMark,
        state.selectMark,
        state.setSelectMark
    ])

    const myPositionChangeEvent=(e:kakao.maps.Marker)=>{
        const position = e.getPosition();
        const newMyPosition = {
            lat:position.getLat(),
            lng:position.getLng()
        }
        setMyPosition(newMyPosition);
    }

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
            draggable={true}
            onDragEnd={myPositionChangeEvent}
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
                            <div className={`
                            grid
                             
                            bg-sky-900
                            font-bold
                           text-white
                             rounded-lg
                            text-center
                            w-auto h-7 px-2
                            ${selectMark===undefined?`bg-sky-500`:`bg-sky-900`}
                            `}
                            onClick={()=>setSelectMark(undefined)}
                            >
                                <div className="h-full w-full">
                                   내위치
                                </div>
                            </div>
                        </CustomOverlayMap>
        </>
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
                                lat:selectMark?.lat!,
                                lng:selectMark?.lng!
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
                                    {selectMark?.name}
                                </div>
                            </div>
                        </CustomOverlayMap>
        {/* 가게위치 */}
        {
            restaurantMark?.map((item,index)=>{
                return(
                    item.id!==selectMark?.id&&(
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
                       
                    )
                   
                )
            })
        }
        </>
    )
}

export default Mark