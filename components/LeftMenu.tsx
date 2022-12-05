import { motion } from "framer-motion"
import { useEffect } from "react";
import { useRoadStore } from "../store/road.store";
import { LeftRestaurantList } from "./LeftRestaurantList"
import { RestaurantDetail } from "./restaurant/RestaurantDetail"

const LeftMenu=()=>{

    const [onRoad,
        setSelectMark,
        setRoad
    ]=useRoadStore((state)=>[state.onRoad,state.setSelectMark,state.setRoad]);

    const container={
        hidden:{opacity: 0, translateX: '-100%'},
        show:{opacity: 1, translateX: '0%'}
    }



    return(
        <motion.div 
        variants={container}
        animate={onRoad?'show':'hidden'}
        transition={{
            default: {
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01]
            },
          }}
        className="absolute top-0 left-0 w-auto h-full z-10  flex">
            <LeftRestaurantList/>
            <RestaurantDetail/>
            {
                    onRoad&&(
                        <div className=" relative w-28">
                            <div className="z-10 bg-gray-400 p-2 rounded-2xl cursor-pointer 
                            text-white absolute bottom-0 w-full text-center"
                            onClick={()=>{
                                setSelectMark(undefined)
                                setRoad(false)                    
                            }}
                            >
                                다시 돌리기
                            </div>
                        </div>
                    )
                }
        </motion.div>
    )
}

export {LeftMenu}