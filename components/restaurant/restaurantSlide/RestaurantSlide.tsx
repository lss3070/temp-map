import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { flushSync } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCaretLeft, faCaretRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getDistance } from "../../../utils/getDistance";
import { useMyPositionStore } from "../../../store/myPosition.store";
import { Button } from "../../Common/Button";
import { RestaurantMark, useRoadStore } from "../../../store/road.store";
import { useInterval } from "../../../hooks/useInterval";
import { useSpinStore } from "../../../store/spin.store";

interface IRestaruantSlide{
    data:RestaurantMark[];
    randomKey:number;
    setRandomKey:(key:number)=>void;
    onRestaurantView:Function;
    onSpin:()=>void;
}

const RestuarantSlide=({data,randomKey,setRandomKey,onRestaurantView,onSpin}:IRestaruantSlide)=>{

    const [setRoad,setSelectMark]=useRoadStore((state)=>[state.setRoad,state.setSelectMark]);

    const [spin,curCenterIndex,setSpin,setCurCenterIndex]=useSpinStore((state)=>[
        state.spin,
        state.curCenterIndex,
        state.setSpin,
        state.setCurCenterIndex
    ])


    const assiingLeft=(index:number)=>{
        if(curCenterIndex===0){
            return index===data.length-1;
        }
        return index===curCenterIndex-1;
    }
    const assiingRight=(index:number)=>{
        if(data.length-1===curCenterIndex){
            return index===0;
        }
       return index===curCenterIndex+1;
    }

    useInterval(()=>{
        if(spin){
            setCurCenterIndex(curCenterIndex===data.length-1?0:curCenterIndex+1)
        }
    },100)


    const ShowAroundMe=()=>{
        setRoad(true);
    }

    const FindNearestRestaurant=()=>{
        setRoad(true)
        const list= [...data].sort((a,b)=>a.distance!-b.distance!)
        console.log('!@!@')
        console.log(list);
        const minDistandRestaurant =list[0]
        setSelectMark({
            name: minDistandRestaurant.name,
            lat:minDistandRestaurant.lat,
            lng:minDistandRestaurant.lng,
            id:minDistandRestaurant.id,
            photos:minDistandRestaurant.photos
        });
    }



    const ViewClickEvent=(position:string)=>{
        switch(position){
            case 'center':
                onRestaurantView(false)
                setRandomKey(curCenterIndex)
                setTimeout(()=>{
                    onRestaurantView(true)
                },100)
                break;
            case 'left':
                onRestaurantView(false)
                setRandomKey(curCenterIndex===0?data.length-1:curCenterIndex-1)
                setCurCenterIndex(curCenterIndex===0?data.length-1:curCenterIndex-1)
                setTimeout(()=>{
                    onRestaurantView(true)
                },100)
                break;
            case 'right':
                onRestaurantView(false)
                setRandomKey(curCenterIndex===data.length-1?0:curCenterIndex+1)
                setCurCenterIndex(curCenterIndex===data.length-1?0:curCenterIndex+1)
                setTimeout(()=>{
                    onRestaurantView(true)
                },100)
                break;
        }
    }
    return(
        <div className=" w-full h-[300px] grid select-none">
             <div className="w-full h-[250px] flex">
                <div className=" h-full justify-center items-center flex cursor-pointer select-none" onClick={()=>{
                    setCurCenterIndex(curCenterIndex===0?data.length-1:curCenterIndex-1)}}>
                    <FontAwesomeIcon className=" text-gray-500" icon={faCaretLeft} size={'2x'}/>
                </div>

                <motion.div onScroll={(e)=>console.log(e)}
                // animate={controls}
                // ref={elementRef}
                className="w-full h-full
                relative inline-block whitespace-nowrap overflow-hidden scroll-m-4
                ">
                {//0~19
                    data&&data.map((restaurant,index:number)=>{
                        let position =''
                        let motionStyle:any
                        if(curCenterIndex===index){
                            //center
                            position='center'
                            motionStyle={
                                left:'50%',
                                translateX:'-50%',
                                // visibility:'visible',
                                zIndex:10,
                                scale:1
                            }
                        }else if(assiingRight(index)){
                            //right
                            position='right'
                            motionStyle={
                                left:'100%',
                                translateX:'-100%',
                                // visibility:'visible',
                                zIndex:1,
                                scale:0.9
                            }
                        }else if(assiingLeft(index)){
                            //left
                            position='left'
                            motionStyle={
                                left:'0%',
                                // visibility:'visible',
                                zIndex:2,
                                scale:0.9
                            }
                        }else{
                            position='back'
                            motionStyle={
                                zIndex:-1,
                                visibility:'hidden',
                                left:'40%',
                                scale:0.7
                            }
                        }
                                               return(
                            <motion.div 
                            key={restaurant.id} 
                            animate={motionStyle}
                            onScroll={(e)=>console.log(e)}
                            onClick={()=>ViewClickEvent(position)}
                            className={`
                            cursor-pointer
                            overflow-hidden
                            absolute 
                            w-[300px] h-[250px] 
                            inline-block
                            `} >
                                <div className={`w-[300px] h-[200px]  ${randomKey===index?`border-2 border-red-500`:``}`} 
                                style={{position:'relative'}}>
                                    <Image
                                    fill
                                    // sizes="(min-width: 300px) (min-height: 200px)"
                                    src={restaurant.photos?
                                        restaurant.photos
                                        :'/assets/noImage.png'}
                                    alt={restaurant.name}
                                    />
                                    <div className=" absolute bottom-2 right-2 rounded-lg bg-gray-400 p-1 px-2 text-white flex gap-2 items-center">
                                        <FontAwesomeIcon icon={faLocationDot}/>
                                        {restaurant.distance} m
                                    </div>
                                </div>
                                <div className="w-full text-center text-white">{restaurant.name}</div>
                            </motion.div>
                        )
                    })
                }

                </motion.div>
                <div className="h-full items-center flex cursor-pointer select-none" 
                onClick={()=>{  
                    setCurCenterIndex(curCenterIndex===data.length-1?0:curCenterIndex+1)
                }}>
                    <FontAwesomeIcon className="text-gray-500" icon={faCaretRight} size={'2x'}/>
                </div>
             </div>
          
            {/* <div className="hidden"
            ref={ee}
            onClick={()=>{
                 setCurCenterIndex(curCenterIndex===data.length-1?0:curCenterIndex+1)}}>
                앞
            </div> */}
            <div className="w-full justify-center items-center flex gap-2">
                <Button onClick={onSpin}>
                    돌리기
                </Button>
                <Button onClick={ShowAroundMe}>
                    내 주변 보기
                </Button>
                <Button onClick={FindNearestRestaurant}>
                    가장 가까운 매장
                </Button>
            </div>
        </div>
    )
}

export default RestuarantSlide

//https://stackblitz.com/edit/react-pgsx84?file=index.js,style.css