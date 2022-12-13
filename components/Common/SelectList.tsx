import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PropsWithChildren, useState } from "react"

const SelectList=({}:PropsWithChildren)=>{

    const [showList,setShowList]=useState<boolean>(false);
    const [showName,setShowName]=useState<string>('')

    return(
        <div className=" relative z-50">
            <input type="text" className=" rounded-lg"
            placeholder="eee"
            value={showName}
            onClick={()=>setShowList(!showList)}/>
            <div className=" absolute top-0 right-2">
                {
                    showList?<FontAwesomeIcon icon={faChevronUp}/>:<FontAwesomeIcon icon={faChevronDown}/>
                }
            </div>
            {
                showList&&(
                    <div className=" absolute top-5 bg-white border w-full">
                        <div 
                        onClick={()=>{
                            setShowName('도보시간')
                            setShowList(false);
                        }}
                        className="px-2 hover:bg-gray-400 bg-opacity-70 cursor-pointer">
                            거리순</div>
                        <div 
                        onClick={()=>{
                            setShowName('별점')
                            setShowList(false);
                        }}
                        className="px-2 hover:bg-gray-400 bg-opacity-70 cursor-pointer">
                            별점</div>
                    </div>
                )
            }
        </div>
    )
}
export {SelectList}