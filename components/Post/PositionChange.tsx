import { useModalStore } from "../../store/modal.store";
import { useRoadStore } from "../../store/road.store"
import { Button } from "../Common/Button";

const PositionChange=()=>{

    const setModal=useModalStore((state)=>state.setModal);
    const onRoad=useRoadStore((state)=>state.onRoad);

    const onModal=()=>{
        setModal(true);
    }
    
    return(
        <>
        {
            onRoad&&
            <div className=' absolute top-2 right-2 z-10'>
                <Button onClick={onModal}>
                    주소검색
                </Button>
            </div>
        }
        </>
    )
}
export{PositionChange}