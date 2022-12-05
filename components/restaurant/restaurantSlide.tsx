import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { flushSync } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

interface IRestaruantSlide{
    data:any[];
    randomKey:number;
    setRandomKey:(key:number)=>void;
    onRestaurantView:Function;
}

const RestuarantSlide=({data,randomKey,setRandomKey,onRestaurantView}:IRestaruantSlide)=>{
    const ee=useRef<any>()

    const [randomSelectIndex,setRandomSelectIndex]=useState<number>();

    const [curCenterIndex,setCurCenterIndex]=useState<number>(0);

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

    const Random =()=>{



        const tempRandomKey= Math.floor((Math.random()*data.length-2)+1);

        setRandomSelectIndex(tempRandomKey)
        setRandomKey(tempRandomKey)
        const step= tempRandomKey-curCenterIndex>0?
        tempRandomKey-curCenterIndex:
        ((data.length-1)-curCenterIndex)+tempRandomKey+1

        for(let i=1;i<=step;i++){
            setTimeout(()=>{
                ee.current.click();
            },100*i)
        }

        setTimeout(()=>{
            onRestaurantView(true);
        },100*step)
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
                relative inline-block whitespace-nowrap overflow-scroll scroll-m-4
                ">
                {//0~19
                    data&&data.map((restaurant:any,index:number)=>{
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
                            key={restaurant.place_id} 
                            animate={motionStyle}
                            onScroll={(e)=>console.log(e)}
                            onClick={()=>ViewClickEvent(position)}
                            className={`
                            cursor-pointer
                            overflow-scroll
                            absolute 
                            w-[300px] h-[250px] 
                            inline-block
                            `} >
                                <div className={`w-[300px] h-[200px]  ${randomSelectIndex===index?`border-2 border-red-500`:``}`} 
                                style={{position:'relative'}}>
                                    <Image
                                    fill

                                    // sizes="(min-width: 300px) (min-height: 200px)"
                                    
                                    src={restaurant.photos?.length>0?
                                        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${restaurant.photos[0].photo_reference}&key=AIzaSyD7hySl2ct4VunK1C99CeZ-9ithi1dlOZY`
                                        :'/assets/noImage.png'}
                                    alt={restaurant.name}
                                    />
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
          
            <div className="hidden"
            ref={ee}
            onClick={()=>{
                 setCurCenterIndex(curCenterIndex===data.length-1?0:curCenterIndex+1)}}>
                앞</div>
                <div className="w-full justify-center items-center flex">
                    <div className=" bg-gray-500 p-2 rounded-2xl text-white font-semibold
                     cursor-pointer"
                    onClick={()=>Random()}
                    >
                    돌리기
                    </div>
                </div>
        </div>
    )
}

export default RestuarantSlide

//https://stackblitz.com/edit/react-pgsx84?file=index.js,style.css