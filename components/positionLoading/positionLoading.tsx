
import useGeolocation from "../../hooks/useGeolocation";
import { useLoadiingStore } from "../../store/loading.store";
import { useRoadStore } from "../../store/road.store";

import LoadingAnimation from "./loadingAni";

const PositionLoading=()=>{
    const location = useGeolocation();
    const onLoading=useLoadiingStore((state)=>state.onLoading)

    const onRoad =useRoadStore((state)=>state.onRoad);
   
    return(
        <>
            {
                (!onRoad&&onLoading)&&(
                    <div className="w-full h-full bg-black bg-opacity-80
                    absolute z-20 top-0 left-0 grid justify-center items-center "/>
                )
            }
            {
                location.loading&&(
                    <div className="w-full h-full absolute z-30 top-0 left-0 grid justify-center items-center" >
                        <div className="justify-center w-full">
                            <LoadingAnimation/>
                            <div className="h-10 text-white text-lg font-semibold w-full">
                                <p className=" text-center">사용자 위치정보를 불러오는 중입니다.</p>
                                <p className="text-center">위치정보를 동의해주세요</p>
                            </div>
                        </div>
                    </div>
                    
                )
            }
        </>
    )
}

export default PositionLoading