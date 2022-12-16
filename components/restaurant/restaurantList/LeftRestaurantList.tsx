import { faImage, faList, faLocationDot, faMarker, faSortUp, faStar, faWon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { stat } from "fs";
import Image from "next/image";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useMyPositionStore } from "../../../store/myPosition.store";
import { RestaurantMark, useRoadStore } from "../../../store/road.store"
import { getDistance } from "../../../utils/getDistance";
import { SelectList } from "../../Common/SelectList";


enum EListType{
    image,
    text
}
interface IRestaurantTemplate{
    list:RestaurantMark[]
}

const ImageTemplate=({list}:PropsWithChildren<IRestaurantTemplate>)=>{
    const [selectMark,setSelectMark,]=useRoadStore((state)=>[
        state.selectMark,
        state.setSelectMark,
    ]);

    return(
        <>
            {
                list?.map((restaurant,index)=>{
                    return <div key={index} 
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
                                <div className={`w-full text-center font-semibold ${selectMark?.id===restaurant.id?`text-white`:`text-blue-400`}`}>
                                    {restaurant.name}
                                </div>
                            </div>
                        </div>
                    </div>

                })
            }
        </>
    )
}
const ListTemplate=({list}:PropsWithChildren<IRestaurantTemplate>)=>{
    const [selectMark,setSelectMark,]=useRoadStore((state)=>[
        state.selectMark,
        state.setSelectMark,
    ]);
    return(
        <>
        {
            list?.map((restaurant,index)=>{
                return <div key={index} 
                className={`w-full flex gap-2 cursor-pointer
                ${selectMark?.id===restaurant.id?` bg-blue-400 bg-opacity-90`:`hover:bg-blue-100 hover:bg-opacity-90  bg-white`}
                `}
                onClick={()=>setSelectMark(restaurant)}
                >
                    <div>{restaurant.name}</div>
                    <div>{restaurant.distance}m</div>
                </div>
            })
        }
        </>
    )
   
}

const LeftRestaurantList=()=>{

    const [listType,setListType]=useState<EListType>(EListType.text)

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
                className="grid py-5 bg-gray-300 overflow-y-scroll z-10 relative w-full">
                    <div className="flex w-full border">
                        <div onClick={()=>setListType(EListType.image)}
                        className="w-full text-center flex items-center justify-center gap-2 
                        cursor-pointer hover:bg-slate-400 hover:text-white">
                            <FontAwesomeIcon icon={faImage}/>
                            <p>이미지</p>
                        </div>
                        <div onClick={()=>setListType(EListType.text)}
                        className="w-full text-center flex items-center justify-center gap-2 
                        cursor-pointer hover:bg-slate-400 hover:text-white">
                            <FontAwesomeIcon icon={faList}/>
                            <p>게시판</p>
                        </div>
                    </div>
                    <div>
                        <div className="w-full flex justify-end py-1">
                            <SelectList/>
                        </div>
                    </div>
                    {
                        listType===EListType.image?
                        <ImageTemplate list={restuarantMark!}/>:
                        <ListTemplate list={restuarantMark!}/>
                    }
                    <div className="fixed right-2 bottom-2 rounded-full w-9 h-9  bg-gray-500 flex
                    items-center justify-center cursor-pointer z-50 text-white" 
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


