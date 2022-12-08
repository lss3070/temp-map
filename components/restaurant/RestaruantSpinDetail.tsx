import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion"
import Image from "next/image";
import { useRoadStore } from "../../store/road.store";
import { Button } from "../Common/Button";

interface IRestaurantViewProps{
    name: string,
    photoUrl:string
    location:{
        lat:number,
        lng:number
    },
    place_id:string,
    vicinity:string,
    onRestaurantView:Function;
}

const RestaurantSpinDetail=({
    name,photoUrl,location,place_id,vicinity,onRestaurantView
}:IRestaurantViewProps)=>{

    const [
        setRoad,
        setSelectMark
    ]=useRoadStore((state)=>[
        state.setRoad,
        state.setSelectMark
    ]);


    
    return(
    <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            default: {
            duration: 0.3,
            ease: [0, 0.71, 0.2, 1.01]
            },
            scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001
            }
        }}
        style={{left:'50%',top:'50%',translateX:'-50%',translateY:'-40%'}}
        className=" absolute 
        w-[500px]
        h-[600px]
        z-50">
            <div className="w-full h-8 flex justify-end">
                <FontAwesomeIcon 
                className=" cursor-pointer text-gray-500"
                icon={faClose} size={'2x'}
                onClick={()=> onRestaurantView(false)}
                />
            </div>
            <div className=" w-[500px] h-[400px] relative">
                <Image
                    alt={name}
                    layout='fill'
                        src={photoUrl}/>
            </div>
            <div className=" font-semibold text-center text-white">
                {vicinity}
            </div>
            <div className=" font-semibold text-center text-white">
                {name}
            </div>
            <div className=" flex w-full ">
                <div className='w-full flex justify-center gap-5'>
                    <Button onClick={()=>{
                        setRoad(true);
                        setSelectMark({
                            name: name,
                        lat:location.lat,
                        lng:location.lng,
                        id:place_id,
                        photos:photoUrl
                        });
                        }}>
                        길찾기
                    </Button>
                    <Button onClick={()=>{}}>
                        다시 돌리기
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

export {RestaurantSpinDetail}