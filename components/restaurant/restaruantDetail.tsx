import { motion } from "framer-motion"
import Image from "next/image";
import { useRoadStore } from "../../store/road.store";

interface IRestaurantView{
    name: string,
    photoUrl:string
    location:{
        lat:number,
        lng:number
    },
    place_id:string,
    vicinity:string
}

const RestaurantView=({
    name,photoUrl,location,place_id,vicinity
}:IRestaurantView)=>{

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
                            style={{left:'50%',top:'50%',translateX:'-50%',translateY:'-50%'}}
                            className=" absolute 
                            w-[400px]
                            h-[500px]
                            z-50">
                                {
                                    
                                }
                                   <Image
                                     alt={name}
                                     width={400}
                                     height={300}
                                    
                                        src={photoUrl}/>
                               <div className=" font-semibold text-center text-white">
                                    {vicinity}
                                </div>
                                <div className=" font-semibold text-center text-white">
                                    {name}
                                </div>
                                <div className=" flex w-full ">
                                    <div className="w-full ">
                                        <div className="p-2 rounded-lg bg-gray-500 
                                     font-bold float-left
                                    text-white text-xl cursor-pointer"
                                    onClick={()=>window.location.reload()}
                                    >
                                            다시 돌리기
                                        </div>
                                        
                                    </div>
                                    <div className='w-full'>
                                        <div className=" p-2 rounded-lg bg-gray-500 
                                     font-bold float-right
                                    text-white text-xl  cursor-pointer"
                                    onClick={()=>{
                      
                                        setRoad(true)
                                        setSelectMark({
                                            name: name,
                                            lat:location.lat,
                                            lng:location.lng,
                                            id:place_id,
                                            photos:photoUrl
                                        }
                                        )
                                    }}
                                    >
                                            길찾기
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
    )
}

export default RestaurantView