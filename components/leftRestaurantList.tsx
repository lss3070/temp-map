import { faStar, faWon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { stat } from "fs";
import Image from "next/image";
import { useEffect } from "react";
import { useRoadStore } from "../store/road.store"

const LeftMenu=()=>{
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

    useEffect(()=>{
        console.log(selectMark);
    },[selectMark])


    return(
        <>
        {
                <>
                   <motion.div 
                    variants={container}
                    animate={onRoad?'show':'hidden'}
                     transition={{
                       default: {
                         duration: 0.3,
                         ease: [0, 0.71, 0.2, 1.01]
                       },
                     }}
                   className="absolute top-0 left-0 w-[300px] h-full
                z-10 bg-gray-300 overflow-y-scroll grid gap-5 py-5 ">
                    {
                        restuarantMark?.map((restaurant,index)=>{
                            return(
                                <div key={index} 
                                onClick={()=>setSelectMark(restaurant)}
                                className={`w-full py-2
                                grid justify-center items-center cursor-pointer 
                                ${selectMark?.id===restaurant.id?` bg-slate-400`:`hover:bg-slate-300`}
                                `}>
                                <div className="w-[250px]">
                                        <div className="w-[240px] h-[200px] relative rounded-2xl overflow-hidden">
                                            <Image
                                            layout='fill'
                                            src={restaurant.photos!}
                                            alt={restaurant.name}
                                            />
                                        </div>
                                        <div className="w-full  flex">
                                            <div className="w-full">{restaurant.name}</div>
                                            <div className="flex w-full">
                                                <span className="w-full flex justify-end">
                                                    <a>
                                                        <FontAwesomeIcon color="yellow" icon={faStar}/>
                                                    </a>
                                                    <a>
                                                        {restaurant.rating}
                                                    </a>
                                                </span>
                                                {
                                                restaurant.priceLevel&&(
                                                    <span className="w-full flex justify-end">
                                                        <a>
                                                            <FontAwesomeIcon icon={faWon}/>
                                                        </a>
                                                        <a>
                                                            {priceSwitch(restaurant.priceLevel)}
                                                        </a>
                                                    </span>
                                                )
                                            }
                                            </div>
                                        </div>
                                        <div className=" break-words w-full">{restaurant.vicinity}</div>
                                        </div>
                                </div>
                            )
                        })
                    }
                </motion.div>
                {
                    onRoad&&(
                        <div className=" absolute bottom-1 left-[320px] z-10 bg-gray-400 p-2 rounded-2xl cursor-pointer 
                        text-white"
                        onClick={()=>{
                            setSelectMark(undefined)
                            setRoad(false)                    
                        }}
                        >
                            다시 돌리기
                        </div>
                    )
                }

                </>
        }
        </>
    )
}
export default LeftMenu


