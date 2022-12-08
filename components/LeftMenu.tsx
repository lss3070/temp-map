import { motion } from "framer-motion"
import { useEffect } from "react";
import { useRoadStore } from "../store/road.store";
import { LeftRestaurantList } from "./restaurant/restaurantList/LeftRestaurantList"
import { RestaurantDetail } from "./restaurant/RestaurantDetail"

const LeftMenu=()=>{

    const [onRoad,
        selectMarker,
        setSelectMark,
        setRoad
    ]=useRoadStore((state)=>[state.onRoad,
        state.selectMark,
        state.setSelectMark,state.setRoad]);

    const container={
        hidden:{opacity: 0, translateX: '-100%'},
        show:{opacity: 1, translateX: '0%'}
    }
    const temp={
        hidden:{opacity: 0, translateX: '-250%'},
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
            

        </motion.div>
    )
}

export {LeftMenu}