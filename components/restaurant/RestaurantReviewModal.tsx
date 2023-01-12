import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useReviewStore } from "../../store/review.store"
import { ModalBackGround } from "../Common/ModalBackground"
import { SettingStar } from "../Common/SetStar"

const keyWord=[
    "배달","아침식사","점심식사","저녁식사","혼밥","회식","데이트","간식"
]
const atmosphere=[
    "서민적인","캐주얼한","고급스러운","격식있는","가성비","조용한","예븐","깔끔한"
]

const RestaurantReview=()=>{

    const [onReviewModal,setReviewModal] = useReviewStore((state)=>[state.onReviewModal,state.setReviewModal]);

    const [keyWords,setKeyWords]=useState<string[]>(keyWord);

    const [atmospheres,setAtmosphere]=useState<string[]>(atmosphere);

    const onCloseEvent = ()=>{
        setReviewModal(false);
    }
    const [starCount,setStarCount] = useState<number>(0);

    const starClickEvent=(star:number)=>{
        setStarCount(star)
    }

    const keyWordItems =()=>{
        return keyWords.map((item)=><div 
        className="border w-auto cursor-pointer"
        key={item}>
            <FontAwesomeIcon icon={faPlus}/>
            {item}</div>)
    }
    const atmosphereItems=()=>{
        return atmospheres.map((item)=><div 
        className="border w-auto cursor-pointer"
        key={item}>
            <FontAwesomeIcon icon={faPlus}/>
            {item}</div>)
    }

    return(
        <>
            {
                onReviewModal&&(
                    <ModalBackGround onClick={onCloseEvent}>
                        <div className="w-[200px] h-[200px] bg-white" onClick={(e)=>e.stopPropagation()}>
                            <div className="flex">
                                <span>평점</span>
                                <SettingStar onClick={starClickEvent}/>
                                <span>{starCount+1}</span>
                            </div>
                            <div className="w-full border">
                                <div>키워드</div>
                                <div className="h-20 flex flex-wrap">
                                    {keyWordItems()}
                                </div>
                            </div>
                            <div className="w-full border">
                                <div>분위기</div>
                                <div className="h-20 flex flex-wrap">
                                    {atmosphereItems()}
                                </div>
                            </div>
                            <div>
                                <div>방문후기</div>
                                <input type="text"/>
                            </div>
                            <div>button</div>
                        </div>
                    </ModalBackGround>
                )
            }
        </>
    )
}
export {RestaurantReview}