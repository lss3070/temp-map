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

    const deg2rad=(deg:number)=>{
        return deg*(Math.PI/180)
    }
    const getDistance=(
        lat1:number,
        lng1:number,
        lat2:number,
        lng2:number)=>{
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2-lat1);  // deg2rad below
            var dLon = deg2rad(lng2-lng1);
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c; // Distance in km
            return d;

    }

    useEffect(()=>{
        console.log(data);
        if(data){
            const list = data.map((item:any)=>{
               const distance = getDistance(lat,lng,item.geometry.location.lat,item.geometry.location.lng)
                return{
                    name:item.name,
                    id:item.place_id,
                    lat:item.geometry.location.lat,
                    lng:item.geometry.location.lng,
                    photos:item.photos?.length>0?
                    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${item.photos[0].photo_reference}&key=AIzaSyD7hySl2ct4VunK1C99CeZ-9ithi1dlOZY`:
                    `/assets/noImage.png`,
                    rating:item.rating,
                    vicinity:item.vicinity,
                    priceLevel:item.price_level?item.price_level:undefined,
                    distance
                }
            })
            list.sort((a:any,b:any)=>a.distance-b.distance)
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
                       photoUrl={data[randomKey].photos?.length>0?
                    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${data[randomKey].photos[0].photo_reference}&key=AIzaSyD7hySl2ct4VunK1C99CeZ-9ithi1dlOZY`:
                    `/assets/noImage.png`
                    }
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