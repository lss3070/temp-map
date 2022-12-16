import { faArrowDown, faCaretDown, faPersonWalking } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import { useRoadGuideStore } from "../../store/roadGuide.store"

const RestaurantRoadGuide=()=>{

    const [onDown,setOnDown] = useState<boolean>(false);

    const roadGuide = useRoadGuideStore((state)=>state.roadGuide)
    return(
        <div className="grid w-full bg-white rounded-lg">
            <div className="flex w-full gap-2 py-2 items-center">
                <FontAwesomeIcon icon={faPersonWalking} className=" text-gray-500"/>
                <div className="flex items-center justify-center gap-2 items-center">
                    <p>{Math.floor(+roadGuide?.totalTime!/60)} 분</p>
                    <p>{roadGuide?.totalDistance}m</p>
                </div>
                <FontAwesomeIcon className="cursor-pointer" 
                onClick={()=>setOnDown(!onDown)}
                icon={faCaretDown} /> 
            </div>
            {
                onDown&&(
                    <div className="px-4">
                        {
                            roadGuide?.roadStep.map((step)=>{
                                return(
                                    <div key={step.name}>
                                        {/* <div>{step.name}</div> */}
                                        <div className=" text-xs">{step.description}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}
export {RestaurantRoadGuide}