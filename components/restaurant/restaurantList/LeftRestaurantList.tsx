import { faLocationDot, faMarker, faSortUp, faStar, faWon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { stat } from "fs";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useMyPositionStore } from "../../../store/myPosition.store";
import { useRoadStore } from "../../../store/road.store"
import { getDistance } from "../../../utils/getDistance";

const LeftRestaurantList=()=>{

    const areaRef=useRef<HTMLDivElement>(null)
    const myPosition=useMyPositionStore((state)=>state.myPosition)
    const [
        onRoad,
        selectMark,
        setSelectMark,
    restuarantMark,
    setRoad,
    setRestaurantInfo
    ]=useRoadStore((state)=>[
        state.onRoad,
        state.selectMark,
        state.setSelectMark,
    state.restaurantMark,
    state.setRoad,
    state.setRestaurantMark
    ]);

    const priceSwitch=(level:number)=>{
        switch(level){
            case 0:
                return '무료'
            case 1:
                return '쌈'
            case 2:
                return '보통'
            case 3:
                return '비쌈'
            case 4:
                return '매우비쌈'
        }
    }

    const container={
        hidden:{opacity: 0, translateX: '-100%'},
        show:{opacity: 1, translateX: '0%'}
    }

    const scrollTop=()=>{
       areaRef.current?.scrollTo({top:0,behavior:'smooth'})
    }
    return(
        <>
        {
                <div 
                ref={areaRef}
                className="grid py-5 bg-gray-300 overflow-y-scroll z-10 relative">
                    <div className="flex w-full border">
                        <div className="w-full text-center">이미지</div>
                        <div className="w-full text-center">게시판</div>
                    </div>
                    <div>
                        <div className="w-full flex justify-end">정렬기준</div>
                    </div>
                    {
                        restuarantMark?.map((restaurant,index)=>{
                            return(
                                <div key={index} 
                                onClick={()=>setSelectMark(restaurant)}
                                className={`w-full py-2
                                grid justify-center items-center cursor-pointer 
                                ${selectMark?.id===restaurant.id?` bg-blue-400 bg-opacity-90`:`hover:bg-blue-100 hover:bg-opacity-90  bg-white 
                                
                                `}
                                `}>
                                <div className="w-[250px] grid items-center justify-center px-2">
                                        <div className="w-[240px] h-[200px] relative rounded-2xl overflow-hidden">
                                            <Image
                                            layout='fill'
                                            src={restaurant.photos!}
                                            alt={restaurant.name}
                                            />
                                            <div className="absolute top-2 left-2 z-40 bg-gray-800 bg-opacity-60 text-white px-2 py-1 rounded-xl flex gap-1 items-center">
                                                <FontAwesomeIcon icon={faLocationDot}/>
                                                {restaurant.distance}m
                                            </div>
                                            <div className="absolute bottom-0 right-0 z-40 bg-gray-800 bg-opacity-60 text-white px-2 rounded-tl-xl flex gap-1">
                                                <a>
                                                    <FontAwesomeIcon color="yellow" icon={faStar}/>
                                                </a>
                                                <a>
                                                    {restaurant.rating}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="w-full  flex px-2">
                                            <div className={`w-full font-semibold ${selectMark?.id===restaurant.id?`text-white`:`text-blue-400`}`}>
                                                {restaurant.name}
                                            </div>
                                        </div>
                                        <div className=" break-words w-full text-sm px-2 font-extralight">{restaurant.vicinity}</div>
                                        </div>
                                </div>
                            )
                        })
                    }
                    <div className="fixed right-2 bottom-2 rounded-full w-9 h-9  bg-gray-500 flex
                    items-center justify-center cursor-pointer z-50 text-white
                    " 
                    onClick={scrollTop}
                    >
                        <FontAwesomeIcon size={'1x'} icon={faSortUp}/>
                    </div>
                </div>
        }
        </>
    )
}
export {LeftRestaurantList}


