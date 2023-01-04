import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInitPositionStore } from "../../store/initPosition.store";
import { useModalStore } from "../../store/modal.store";
import { useMyPositionStore } from "../../store/myPosition.store";
import { useRoadStore } from "../../store/road.store"
import { Button } from "../Common/Button";
import { useLoginStore } from '../../store/login.store';

const PositionChange=()=>{

    const [ee,setLoginModal] = useLoginStore((state)=>[state.onLoginModal,state.setLoginModal]);
    const setModal=useModalStore((state)=>state.setModal);
    const initPosition=useInitPositionStore((state)=>state.initPosition);
    const setMyPosition= useMyPositionStore((state)=>state.setMyPosition)
    const onRoad=useRoadStore((state)=>state.onRoad);

    const onModal=()=>{
        setModal(true);
    }
    const 위치초기화=()=>{
        setMyPosition(initPosition!)
    }
    const onLoginPopup=()=>{
        setLoginModal(true);
    }

    return(
        <>
        {
            onRoad&&
            <div className=' absolute top-2 right-2 z-10 flex gap-2'>
                <Button onClick={onModal}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    주소검색
                </Button>
                <Button onClick={위치초기화}>
                    <FontAwesomeIcon icon={faUser}/>
                    내 위치 초기화
                </Button>
                <Button onClick={onLoginPopup}>
                    로그인
                </Button>
            </div>
        }
        </>
    )
}
export{PositionChange}