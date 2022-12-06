import { faHouse, faLocationDot, faPeopleGroup, faPhone, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { useRoadStore } from "../../store/road.store";
import { TextLengthCut } from "../TextLengthCut";
import { RestaurantRoadGuide } from "./RestaurantRoadGuide";

type TRestaurantDetail={
    address:string;
    phone:string;
    status:string;
    name:string;
    priceLevel:number;
    rating:number;
    userRatingTotla:number;
    reviews:any[]
    photos:any[];
    openingHours:any;
}

const RestaurantDetail=()=>{

    const [restaurantDetail,setRestaurantDetail] =useState<TRestaurantDetail>()
    const [
        selectMark,
    ]=useRoadStore((state)=>[
        state.selectMark,
    ]);

    useEffect(()=>{
        if(selectMark){
            fetch(`api/getRestaurantDetail?id=${selectMark.id}`)
            .then(data=>data.json())
            .then(json=>{
                console.log(json)
                setRestaurantDetail({
                    address:json.formatted_address,
                    phone:json.formatted_phone_number,
                    status:json.business_status,
                    name:json.name,
                    priceLevel:json.price_level,
                    rating:json.rating,
                    userRatingTotla:json.user_ratings_total,
                    reviews:json.reviews,
                    photos:json.photos,
                    openingHours:json.opening_hours,
                })
            }
               )
        }
    },[selectMark])

    const elementLoop=(loop:number,element:ReactNode)=>{
        const result=[]
        for(let i=0;i<loop;i++){
            result.push(element);
        }
        return result;
    }
    useEffect(()=>{
        console.log('selectmark')
        console.log(selectMark)
    },[selectMark])
    
    const container={
        hidden:{opacity: 0, translateX: '-100%'},
        show:{opacity: 1, translateX: '0%'}
    }

    return(
        <motion.div 
        variants={container}
        animate={selectMark?'show':'hidden'}
        transition={{
            default: {
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01]
            },
          }}
        className="h-full w-[320px] bg-gray-400 left-[250px] top-0 absolute z-[9]  grid gap-2 px-2 overflow-scroll items-center">
            {
                restaurantDetail&&(
                    <>
                        <div className=" w-full h-[200px] shadow-xl" style={{position:'relative'}}>
                            <Image
                                fill
                                src={restaurantDetail?.photos?.length!>0?
                                    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${restaurantDetail?.photos[0].photo_reference}&key=AIzaSyD7hySl2ct4VunK1C99CeZ-9ithi1dlOZY`
                                    :'/assets/noImage.png'}
                                alt={restaurantDetail?.name!}
                                />
                        </div>
                    {/* title */}
                        <div className="grid items-center justify-center bg-white rounded-lg shadow-xl py-1">
                            <div className="text-center text-blue-500 font-semibold">
                                {restaurantDetail?.name!}
                            </div>
                            <div className="text-center">
                                <FontAwesomeIcon icon={faStar} className=' text-yellow-400'/>
                                {restaurantDetail.rating}/5 - 총 {restaurantDetail.userRatingTotla}명 평가
                            </div>
                        </div>
                    {/* 주소&전화번호 */}
                        <div className="bg-white rounded-lg shadow-xl p-2">
                            <div className="border-b border-gray-400 py-2 flex gap-2 items-center">
                                <p>
                                    <FontAwesomeIcon icon={faLocationDot} className=' text-gray-500'/>
                                </p>
                                <p className=" text-sm">
                                    {restaurantDetail.address}
                                </p>
                            </div>
                            {
                                restaurantDetail.phone&&(
                                    <div className="border-b border-gray-400 py-2 flex gap-2 items-center
                                     text-sm
                                    ">
                                        <FontAwesomeIcon icon={faPhone} className='text-gray-500'/>
                                        {restaurantDetail.phone}
                                    </div>
                                )
                            }
                            <RestaurantRoadGuide/>
                        </div>
                        <div className=" bg-white shadow-xl rounded-lg px-1 py-2">
                            <div className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faPeopleGroup} className=" text-gray-500"/>
                                <p className=" font-bold text-gray-500">방문자 리뷰</p>
                            </div>
                            {restaurantDetail.reviews?.map((item)=>
                            <div key={item.author_url} className="px-2">
                                <div className=" h-8 flex items-center w-full gap-1">
                                    <div className=" relative" style={{width:'35px',height:'20px'}}>
                                        <Image 
                                        alt={item.author_name}
                                        fill
                                        src={item.profile_photo_url}/>
                                
                                    </div>
                                    <div className="w-full text-sm">{item.author_name}</div>
                                    <div className="w-full text-end text-xs flex justify-end gap-2">
                                        <div>
                                            {elementLoop(+item.rating,<FontAwesomeIcon icon={faStar} className=" text-yellow-400"/>)}
                                        </div>
                                        <p>
                                            {item.relative_time_description}
                                        </p>
                                    </div> 
                                </div>
                                {
                                   <TextLengthCut text={item.text}/>
                                }
                            </div>
                            )}
                        </div>
                    </>
                )
            }
        </motion.div>
    )
}
export {RestaurantDetail}