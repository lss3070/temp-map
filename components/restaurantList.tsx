import axios from "axios";
import { AnimatePresence, motion, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useLoadiingStore } from "../store/loading.store";
import { useRoadStore } from "../store/road.store";

interface IRestaurantList{
    lat:number;
    lng:number;
}
const fetcher = (url:string) => axios.get(url).then(res => res.data)

const RestaurantList=({lat,lng}:IRestaurantList)=>{    
    const [setRoad,
        onRoad,
        setRestaurantInfo
    ]=useRoadStore((state)=>[
        state.setRoad,
        state.onRoad,
        state.setRestaurantInfo
    ]);
    // const onLoading =useLoadiingStore((state)=>state.onLoading)
    const [onRestaurantInfo,setOnRestaurantInfo]=useState<boolean>(false);
    
    const {data,error}=useSWR(`http://${window.location.host}/api/getRestaurants?lat=${lat}&lng=${lng}`
    ,fetcher)

    const[randomKey,]=useState<number>(Math.floor(Math.random()*13))
    
    const elementRef = useRef<HTMLDivElement>(null);

    useAnimationFrame((t)=>{
        if(elementRef.current){
            if(t>2000){
                setOnRestaurantInfo(true);
                return;
            }else{
                elementRef.current.scrollTo(t*2,0)
                // elementRef.current.style.transform = `translateX(${t / 10}px)`;
            }
        }
    })

    return(
        <>{
            !onRoad&&(
                <>
                <motion.div 
                ref={elementRef}
                className=" absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] 
                        z-10 w-2/3 h-[305px] grid grid-flow-col overflow-x-scroll gap-10">
                        {
                            data&&data.map((restaurant:any,index:number)=>{
                                return(
                                    <div key={restaurant.place_id} className='grid borderborder-black 
                                    w-80 h-[300px]
                                    '>
                                        <Image
                                        src={restaurant.photos?.length>0?
                                            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${restaurant.photos[0].photo_reference}&key=AIzaSyD7hySl2ct4VunK1C99CeZ-9ithi1dlOZY`
                                            :'/assets/noImage.png'}
                                        alt={restaurant.name}
                                        width={400}
                                        height={300}
                                        />
                                        <div>{restaurant.name}</div>
                                    </div>
                                )
                            })
                        }
                    </motion.div>
                    {
                       onRestaurantInfo&&(
                            <motion.div 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              default: {
                                duration: 0.3,
                                ease: [0, 0.71, 0.2, 1.01]
                              },
                              scale: {
                                type: "spring",
                                damping: 5,
                                stiffness: 100,
                                restDelta: 0.001
                              }
                            }}
                            style={{margin:'auto'}}
                            className=" absolute 
                            top-0
                            left-0
                            bottom-0
                            right-0
                            w-[400px]
                            h-[500px]
                            z-50">
                                   <Image
                                     alt={data[randomKey].name}
                                     width={400}
                                     height={300}
                                        src={data[randomKey].photos?.length>0?
                                            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${data[randomKey].photos[0].photo_reference}&key=AIzaSyD7hySl2ct4VunK1C99CeZ-9ithi1dlOZY`
                                            :'/assets/noImage.png'}/>
                                <div className=" font-semibold text-center text-white">
                                    {data[randomKey].name}
                                </div>
                                <div className=" flex w-full ">
                                    <div className="w-full ">
                                        <div className="p-2 rounded-lg bg-gray-500 
                                     font-bold float-left
                                    text-white text-xl cursor-pointer"
                                    onClick={()=>window.location.reload()}
                                    >
                                            다시 돌리기
                                        </div>
                                        
                                    </div>
                                    <div className='w-full'>
                                        <div className=" p-2 rounded-lg bg-gray-500 
                                     font-bold float-right
                                    text-white text-xl  cursor-pointer"
                                    onClick={()=>{
                                        console.log(data[randomKey])
                                        setRoad(true)
                                        setRestaurantInfo(data[randomKey].geometry.location
                                        )
                                    }}
                                    >
                                            길찾기
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    }
            </>
            )
        }
        </>
    )
}

export default RestaurantList;