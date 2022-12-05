import { faArrowDown, faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import { useRoadGuideStore } from "../../store/roadGuide.store"

const RestaurantRoadGuide=()=>{

    const [onDown,setOnDown] = useState<boolean>(false);

    const roadGuide = useRoadGuideStore((state)=>state.roadGuide)
    return(
        <div className="grid w-full bg-white rounded-lg">
            <div className="flex w-full">
                <div className="flex items-center justify-center">
                    {Math.floor(+roadGuide?.totalTime!/60)} 분
                    {roadGuide?.totalDistance}m
                </div>
                <FontAwesomeIcon className="cursor-pointer" 
                onClick={()=>setOnDown(!onDown)}
                icon={faCaretDown} /> 
            </div>
            {
                onDown&&(
                    <div>
                        {
                            roadGuide?.roadStep.map((step)=>{
                                return(
                                    <div key={step.name}>
                                        {/* <div>{step.name}</div> */}
                                        <div>{step.description}</div>
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