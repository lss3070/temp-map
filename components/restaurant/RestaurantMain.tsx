import axios from "axios";
import { AnimatePresence, motion, useAnimationControls, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import useSWR from "swr";
import { useInterval } from "../../hooks/useInterval";
import { useRoadStore } from "../../store/road.store";
import { RestaurantSpinDetail } from "./RestaruantSpinDetail";
import RestuarantSlide from "./RestaurantSlide";


interface IRestaurantListProps{
    lat:number;
    lng:number;
}
const fetcher = (url:string) => axios.get(url).then(res => res.data)

const RestaurantMain=({lat,lng}:IRestaurantListProps)=>{    
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
    

    const[randomKey,setRandomKey]=useState<number>(0)

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
    const resetRandomKey=()=>{
        setRandomKey(Math.floor(Math.random()*data.length-1))
    }

    useEffect(()=>{
        if(data){
            console.log(data);
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
            resetRandomKey()
        }
    },[data])

    useEffect(()=>{
        if(onRoad){
            setOnRestaurantInfo(false)
        }
    },[onRoad])    


    return(
        <>{
            !onRoad&&(
                <>
                <div className=" absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-70%] 
                        z-30 w-[800px] h-[250px]">
                            {
                                data&&(
                                    <RestuarantSlide data={data}
                                    randomKey={randomKey}
                                    setRandomKey={setRandomKey}
              
                                    onRestaurantView={setOnRestaurantInfo}
                                    />
                                )
                            }
                            {/* <motion.div 
                            animate={controls}
                            ref={elementRef}
                            className="w-full border border-red-400 h-full grid grid-flow-col overflow-x-scroll gap-10">
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
                            </motion.div> */}
                            {/* <div className=" w-full text-center">
                                <span className=" bg-gray-500 p-2 
                                 font-semibold text-lg
                                rounded-xl cursor-pointer text-white"
                                onClick={()=>setOnCycle(true)}>
                                    랜덤 돌리기
                                </span>
                            </div> */}
                    </div>
                   
                    {
                      onRestaurantInfo&&(
                       <RestaurantSpinDetail
                       name={data[randomKey].name}
                       photoUrl={data[randomKey].photos?.length>0?
                    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${data[randomKey].photos[0].photo_reference}&key=AIzaSyD7hySl2ct4VunK1C99CeZ-9ithi1dlOZY`:
                    `/assets/noImage.png`
                    }
                       place_id={data[randomKey].place_id}
                       vicinity={data[randomKey].vicinity}
                       location={data[randomKey].geometry.location}
                       onRestaurantView={setOnRestaurantInfo}
                       />
                        )
                    }
                   
            </>
            )
        }
        </>
    )
}

export {RestaurantMain};