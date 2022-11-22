import axios from "axios";
import { AnimatePresence, motion, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useInterval } from "../../hooks/useInterval";
import { useRoadStore } from "../../store/road.store";
import RestaurantView from "./restaruantDetail";
import RestaurantListItem from "./restaurantListItem";

interface IRestaurantList{
    lat:number;
    lng:number;
}
const fetcher = (url:string) => axios.get(url).then(res => res.data)

const RestaurantMain=({lat,lng}:IRestaurantList)=>{    
    const [
        onRoad,
        setRestaurantMark
    ]=useRoadStore((state)=>[
        state.onRoad,
        state.setRestaurantMark
    ]);
    // const onLoading =useLoadiingStore((state)=>state.onLoading)
    const [onRestaurantInfo,setOnRestaurantInfo]=useState<boolean>(false);
    
    const {data,error}=useSWR(`http://${window.location.host}/api/getRestaurants?lat=${lat}&lng=${lng}`
    ,fetcher)

    const[randomKey,]=useState<number>(Math.floor(Math.random()*13))

    const [onCycle,setOnCycle]=useState<boolean>(false);
    
    const elementRef = useRef<HTMLDivElement>(null);

    useAnimationFrame((t,delta)=>{
        console.log
        console.log(elementRef.current?.scrollLeft)
        if(elementRef.current){
            // if(t>2000){
                if(elementRef.current?.scrollLeft>3000){
                    setOnRestaurantInfo(true);
        
                return;
            }else{
                if(onCycle){
                    elementRef.current.scrollTo(t*2,0)
                }
                // elementRef.current.style.transform = `translateX(${t / 10}px)`;
            }
        }
    })
    useEffect(()=>{
        console.log(data);
        if(data){
            const list = data.map((item:any)=>{
                return{
                    name:item.name,
                    id:item.place_id,
                    lat:item.geometry.location.lat,
                    lng:item.geometry.location.lng
                }
            })
            setRestaurantMark(list);
        }
    },[data])

    return(
        <>{
            !onRoad&&(
                <>
                <div className=" absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] 
                        z-30 w-2/3 h-[250px] ">
                            <motion.div 
                            ref={elementRef}
                            className="w-full h-full grid grid-flow-col overflow-x-scroll gap-10">
                            {
                                data&&data.map((restaurant:any,index:number)=>{
                                    return(
                                        <RestaurantListItem
                                        key={restaurant.place_id}
                                        name={restaurant.name}
                                        placeId={restaurant.place_id}
                                        photos={restaurant.photos}
                                        />
                                    )
                                })
                            }
                            </motion.div>
                            <div className=" w-full text-center">
                                <span className=" bg-gray-500 p-2 
                                 font-semibold text-lg
                                rounded-xl cursor-pointer text-white"
                                onClick={()=>setOnCycle(true)}>
                                    랜덤 돌리기
                                </span>
                            </div>
                    </div>
                   
                    {
                       onRestaurantInfo&&(
                       <RestaurantView
                       name={data[randomKey].name}
                       photos={data[randomKey].photos}
                       place_id={data[randomKey].place_id}
                       vicinity={data[randomKey].vicinity}
                       location={data[randomKey].geometry.location}
                       />
                        )
                    }
                   
            </>
            )
        }
        </>
    )
}

export default RestaurantMain;