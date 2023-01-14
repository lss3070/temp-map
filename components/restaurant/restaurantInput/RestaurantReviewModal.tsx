import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { PropsWithChildren, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useReviewStore } from "../../../store/review.store"
import { Button } from "../../Common/Button"
import { ModalBackGround } from "../../Common/ModalBackground"
import { SettingStar } from "../../Common/SetStar"
import { ListItem } from "./ListItem"

interface IItemList{
    name:string;
    check:boolean;
}
interface IForm{
    star:number,
    comment:string;
}

const keyWord=[
{
    name:"배달",
    check:false,
},
{
    name:"아침식사",
    check:false,
},
{
    name:"점심식사",
    check:false,
},
{
    name:"저녁식사",
    check:false,
},
{
    name:"혼밥",
    check:false,
},
{
    name:"회식",
    check:false,
},
{
    name:"데이트",
    check:false,
},
{
    name:"간식",
    check:false,
}
]
const atmosphere=[
    {
        name:"서민적인",
        check:false,
    },
    {
        name:"캐주얼한",
        check:false,
    },
    {
        name:"고급스러운",
        check:false,
    },
    {
        name:"격식있는",
        check:false,
    },
    {
        name:"가성비",
        check:false,
    },
    {
        name:"조용한",
        check:false,
    },
    {
        name:"예븐",
        check:false,
    },
    {
        name:"깔끔한",
        check:false,
    }
]


const RestaurantReview=({}:PropsWithChildren)=>{

    const {register,handleSubmit,setValue,getValues,reset}=useForm<IForm>({
        defaultValues:{
            star:0,
        }
    });

    const [onReviewModal,setReviewModal,id] = useReviewStore((state)=>[state.onReviewModal,state.setReviewModal,state.id]);

    const [keyWords,setKeyWords]=useState<IItemList[]>(keyWord);

    const [atmospheres,setAtmosphere]=useState<IItemList[]>(atmosphere);

    const onCloseEvent = ()=>{
        setReviewModal(false);
    }

    const starClickEvent=(star:number)=>{
        setValue('star',star)
    }

    const addKeyword=(name:string)=>{
        setKeyWords([...keyWord,{name,check:false}])
    }
    const addAtmospheres=(name:string)=>{
        setAtmosphere([...atmosphere,{name,check:false}])
    }

    const keywordRef = useRef<HTMLInputElement>(null)
    const atmosphereRef = useRef<HTMLInputElement>(null)
    
    const onSubmit=async(data:any)=>{
        try{
            const sendData = {...data,
                keyWords:keyWords,
                atmospheres:atmosphere
            }

            axios.post(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/review`,
            {
                restaurantId:id,
                sendData
            })
            
            
        }catch(error){
            alert(error)
        }finally{
            reset();
            setKeyWords(keyWord)
            setAtmosphere(atmosphere)
            setReviewModal(false);
        }

    }

    return(
        <>
            {
                onReviewModal&&(
                    <ModalBackGround onClick={onCloseEvent}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="w-[400px] h-auto h-min-[200px] bg-white px-4" onClick={(e)=>e.stopPropagation()}>
                                <div className="flex">
                                    <span>평점</span>
                                    <SettingStar onClick={starClickEvent}/>
                                    <span>{getValues('star')+1}</span>
                                </div>
                                <div className="w-full border">
                                    <ListItem
                                    list={keyWords}
                                    setList={setKeyWords}
                                    addList={addKeyword}
                                    title={'키워드'}
                                    />
                                </div>
                                <div className="w-full border">
                                    <ListItem
                                    list={atmospheres}
                                    setList={setAtmosphere}
                                    addList={addAtmospheres}
                                    title={'분위기'}
                                    />
                                </div>
                                <div>
                                    <div>방문후기</div>
                                    <textarea 
                                    {...register('comment',{required:true})}
                                    className="w-full h-[100px] border"/>
                                </div>
                                <Button type={'submit'} >제출</Button>
                            </div>
                        </form>
                       
                    </ModalBackGround>
                )
            }
        </>
    )
}
export {RestaurantReview}