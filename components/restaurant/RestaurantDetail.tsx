import { faHouse, faPhone, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { useRoadStore } from "../../store/road.store";
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

    return(
        <div className="border  h-full w-[320px] bg-gray-400 grid gap-4 px-1 overflow-scroll">
            {
                restaurantDetail&&(
                    <>
                      <div className="border w-[300px] h-[200px]" style={{position:'relative'}}>
                        <Image
                            fill
                            src={restaurantDetail?.photos?.length!>0?
                                `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${restaurantDetail?.photos[0].photo_reference}&key=AIzaSyD7hySl2ct4VunK1C99CeZ-9ithi1dlOZY`
                                :'/assets/noImage.png'}
                            alt={restaurantDetail?.name!}
                            />
                    </div>
                    {/* title */}
                    <div className="grid items-center justify-center bg-white rounded-lg">
                        <div className="text-center">
                            {restaurantDetail?.name!}
                        </div>
                        <div className="text-center">
                            <FontAwesomeIcon icon={faStar}/>
                            {restaurantDetail.rating}/5 - 총 {restaurantDetail.userRatingTotla}명 평가
                        </div>
                    </div>
                    {/* 주소&전화번호 */}
                    <div className="bg-white rounded-lg">
                        <div>
                            <FontAwesomeIcon icon={faHouse}/>
                            {restaurantDetail.address}
                        </div>
                        <div>
                        <FontAwesomeIcon icon={faPhone}/>
                        {restaurantDetail.phone}
                        </div>
                    </div>
                        <RestaurantRoadGuide/>
                    <div className="">
                        <div>방문자 리뷰</div>
                        {restaurantDetail.reviews?.map((item)=>
                        <div key={item.text} className="">
                            <div className=" h-8 flex items-center w-full">
                                <div className=" relative" style={{width:'35px',height:'20px'}}>
                                    <Image 
                                    alt={item.author_name}
                                    fill
                                    src={item.profile_photo_url}/>
                                </div>
                                <div className=" w-44 text-sm">{item.author_name}</div>
                                <div className="w-full text-end text-xs flex justify-end gap-2">
                                    <div>
                                        {elementLoop(+item.rating,<FontAwesomeIcon icon={faStar}/>)}
                                    </div>
                                    <p>
                                        {item.relative_time_description}
                                    </p>
                                    
                                </div> 
                            </div>
                            <div className="text-xs">{item.text}</div>
                        </div>
                        )}
                    </div>
                    </>
                )
            }
        </div>
    )
}
export {RestaurantDetail}