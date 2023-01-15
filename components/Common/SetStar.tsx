import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PropsWithChildren, useState } from "react";

interface ISettingStarProps{
    onClick:(star:number)=>void;
}

const SettingStar=({onClick}:PropsWithChildren<ISettingStarProps>)=>{

    const [starCount,setStarCount] =useState<number>(0);

    const settingStars=()=>{
        const starList = []
        for(let i=0;i<5;i++){
            starList.push(<FontAwesomeIcon 
                onClick={()=>onClick(i)}
                onMouseOver={()=>{
                    setStarCount(i)
                    onClick(i);
                }}
                icon={faStar} className={`${starCount>=i&&`text-yellow-300`}`}/>)
        }
        return starList
    }

    return(
        <div className="">
            {
                settingStars()
            }
        </div>
    )
}

export {SettingStar}