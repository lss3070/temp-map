import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PropsWithChildren, useEffect, useState } from "react"
import { useRoadStore } from "../../store/road.store";


enum ListSortType{

    NearDistance='NearDistance',
    FarDistance='FarDistance',
    HightStar='HightStar',
    LowStar='LowStar'
}

const SelectList=({}:PropsWithChildren)=>{

    const [showList,setShowList]=useState<boolean>(false);
    const [showName,setShowName]=useState<ListSortType>(ListSortType.NearDistance);

    const [restaurantList,setRestaurantList] = useRoadStore((state)=>[state.restaurantMark,state.setRestaurantMark])


    const switchName =(value:ListSortType)=>{
        switch(value){
            case ListSortType.NearDistance:
                return '거리 가까운순';
            case ListSortType.FarDistance:
                return '거리 먼순';
            case ListSortType.LowStar:
                return '별점 낮은순';
            case ListSortType.HightStar:
                return '별점 높은순';
        }
    }

    useEffect(()=>{
        if(!showName)return 
        if(!restaurantList) return

        switch(showName){
            case ListSortType.NearDistance:
                setRestaurantList(
                    [...restaurantList!].sort((a,b)=>{
                        return a.distance!-b.distance!
                    })
                );
                break;
            case ListSortType.FarDistance:

                setRestaurantList(
                    [...restaurantList!].sort((a,b)=>{
                        return b.distance!- a.distance!
                    })
                );
                break;
            case ListSortType.LowStar:  
            setRestaurantList(
                [...restaurantList!].sort((a,b)=>{
                    return a.rating!-b.rating!
                })
            );
                break;
            case ListSortType.HightStar:  
            setRestaurantList([...restaurantList!].sort((a,b)=>{
                return b.rating!-a.rating!
            })
            );
                break;
        }
    },[showName])

    return(
        <div className=" relative z-50 w-1/2 text-sm">
            <input 
            style={{color:'transparent', textShadow:'0 0 0 black'}}
            type="text" className=" rounded-lg cursor-pointer focus:outline-none px-3 w-full"
            placeholder="정렬기준을 선택해주세요"
            value={switchName(showName!)}
            onClick={()=>setShowList(!showList)}/>
            <div className=" absolute top-0 right-2">
                {
                    showList?<FontAwesomeIcon icon={faChevronUp}/>:<FontAwesomeIcon icon={faChevronDown}/>
                }
            </div>
            {
                showList&&(
                    <div className=" absolute top-5 bg-white border w-full">
                        <div 
                        onClick={()=>{
                            setShowName(ListSortType.NearDistance)
                            setShowList(false);
                        }}
                        className="px-2 hover:bg-gray-400 bg-opacity-70 cursor-pointer">
                            거리 가까운순
                            </div>
                        <div 
                        onClick={()=>{
                            setShowName(ListSortType.HightStar)
                            setShowList(false);
                        }}
                        className="px-2 hover:bg-gray-400 bg-opacity-70 cursor-pointer">
                            별점 순
                            </div>
                        <div 
                        onClick={()=>{
                            // setShowName(ListSortType.HightStar)
                            // setShowList(false);
                        }}
                        className="px-2 hover:bg-gray-400 bg-opacity-70 cursor-pointer">
                            리뷰 순
                            </div>
                    </div>
                )
            }
        </div>
    )
}
export {SelectList}