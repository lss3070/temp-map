import { faStar, faWon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRoadStore } from "../store/road.store"

const LeftMenu=()=>{
    const [
        selectMark,
        setSelectMark,
    restuarantMark
    ]=useRoadStore((state)=>[
        state.selectMark,
        state.setSelectMark,
    state.restaurantMark
    ]);

    const priceSwitch=(level:number)=>{
        switch(level){
            case 0:
                return '무료'
            case 1:
                return '쌈'
            case 2:
                return '보통'
            case 3:
                return '비쌈'
            case 4:
                return '매우비쌈'
        }
    }

    return(
        <>
        {
            selectMark&&(
                <div className="absolute top-0 left-0 w-1/5 h-full 
                z-10 bg-gray-300 overflow-y-scroll grid gap-5 py-5">
                    {
                        restuarantMark?.map((restaurant,index)=>{
                            return(
                                <div key={index} 
                                onClick={()=>setSelectMark(restaurant)}
                                className='w-full
                                grid justify-center items-center cursor-pointer hover:bg-slate-300'>
                                    <div className="w-[240px] h-[200px] relative rounded-2xl overflow-hidden">
                                        <Image
                                        layout='fill'
                                        src={restaurant.photos!}
                                        alt={restaurant.name}
                                        />
                                    </div>
                                  
                                    <div className="w-full  flex">
                                        <div className="w-full">{restaurant.name}</div>
                                        <div className="flex w-full">
                                            <span className="w-full flex justify-end">
                                                <a>
                                                    <FontAwesomeIcon color="yellow" icon={faStar}/>
                                                </a>
                                                <a>
                                                    {restaurant.rating}
                                                </a>
                                            </span>
                                            {
                                            restaurant.priceLevel&&(
                                                <span className="w-full flex justify-end">
                                                    <a>
                                                        <FontAwesomeIcon icon={faWon}/>
                                                    </a>
                                                    <a>
                                                        {priceSwitch(restaurant.priceLevel)}
                                                    </a>
                                                </span>
                                            )
                                        }
                                        </div>
                                    </div>
                                    <div>{restaurant.vicinity}</div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
        </>
    )
}
export default LeftMenu


