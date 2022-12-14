import axios from "axios";
import { AnimatePresence, motion, useAnimationControls, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import useSWR from "swr";
import { useInterval } from "../../hooks/useInterval";
import { useRoadStore } from "../../store/road.store";
import { useSpinStore } from "../../store/spin.store";
import { getDistance } from "../../utils/getDistance";
import { RestaurantSlideDetail } from "./restaurantSlide/RestaruantSlideDetail";
import RestuarantSlide from "./restaurantSlide/RestaurantSlide";


interface IRestaurantListProps{
    lat:number;
    lng:number;
}
const fetcher = (url:string) => axios.get(url).then(res => res.data)

const RestaurantMain=({lat,lng}:IRestaurantListProps)=>{    
    const [
        onRoad,
        restaurantMark,
        setRestaurantMark,
        selectMark,
        setSelectMark
    ]=useRoadStore((state)=>[
        state.onRoad,
        state.restaurantMark,
        state.setRestaurantMark,
        state.selectMark,
        state.setSelectMark
    ]);



    const [setSpin,curCenterIndex]=useSpinStore((state)=>[state.setSpin,state.curCenterIndex])
    
    // const onLoading =useLoadiingStore((state)=>state.onLoading)
    const [onRestaurantInfo,setOnRestaurantInfo]=useState<boolean>(false);
    
    const {data,error}=useSWR(`http://${window.location.host}/api/getRestaurants?lat=${lat}&lng=${lng}`
    ,fetcher)
    
    const[randomKey,setRandomKey]=useState<number>(0)

    const resetRandomKey=()=>{
        setRandomKey(Math.floor(Math.random()*data.length-1))
    }

    const onSpin=()=>{
        setOnRestaurantInfo(false)
        const tempRandomKey= Math.floor((Math.random()*data.length-2)+1);
        setRandomKey(tempRandomKey)
        const step= tempRandomKey-curCenterIndex>0?
        tempRandomKey-curCenterIndex:
        ((data.length-1)-curCenterIndex)+tempRandomKey+1

        setSpin(true);
        setTimeout(()=>{
            setSpin(false);
            setOnRestaurantInfo(true);
        },step*100)
    }


    useEffect(()=>{
        Test();
        if(data){
            const tempData = data?.map((item:any)=>{
                return {
                    id:item.place_id,
                    address:item.vicinity,
                    name:item.name,
                    position:item.geometry.location
                }
            })
            axios.post(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/setRestaurant`,tempData).then((data)=>
            {
                console.log(data)
            })
        }
       
    },[data])

    const Test=()=>{
        if(data){
            const list = data.map((item:any)=>{
                const distance = getDistance(lat,lng,item.geometry.location.lat,item.geometry.location.lng)
                return{
                    name:item.name,
                    id:item.place_id,
                    lat:item.geometry.location.lat,
                    lng:item.geometry.location.lng,
                    photos:item.photos?.length>0?
                    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${item.photos[0].photo_reference}&key=AIzaSyA5i5Z8V7X9X5o4Q2z4e4y8Y7d5Lj5m7ZM`:
                    "/assets/noimage.png",
                    distance:distance,
                    rating:item.rating
                }
            })
            setRestaurantMark(list);
        }
    }


    useEffect(()=>{
        let selectMarkService=false;

        if(getDistance(lat,lng,selectMark?.lat!,selectMark?.lng!)<500){
            selectMarkService=true;
        }
        console.log(getDistance(lat,lng,selectMark?.lat!,selectMark?.lng!))

        if(data){
            const list = data.map((item:any)=>{

                // if(item.place_id===selectMark?.id) {
                //     selectMarkService=true;
                // }

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
        // console.log('selectMarkService')
        // console.log(selectMarkService)
        // console.log(checklist);
        if(!selectMarkService)setSelectMark(undefined)
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
                                restaurantMark&&(
                                    <RestuarantSlide 
                                    data={restaurantMark}
                                    randomKey={randomKey}
                                    setRandomKey={setRandomKey}
                                    onRestaurantView={setOnRestaurantInfo}
                                    onSpin={onSpin}
                                    />
                                )
                            }
                    </div>
                    {
                      onRestaurantInfo&&(
                       <RestaurantSlideDetail
                       restaurantInfo={restaurantMark![randomKey]}
                       onRestaurantView={setOnRestaurantInfo}
                       onSpin={onSpin}
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