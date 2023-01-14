import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren, useState } from "react";
import { Button } from "../../Common/Button";

interface IItemList{
    name:string;
    check:boolean;
}
interface IListItmeProps{
    list:IItemList[],
    setList:(list:IItemList[])=>void;
    addList:(name:string)=>void;
    title:string
}

const ListItem=({list,setList,addList,title}:PropsWithChildren<IListItmeProps>)=>{

    const [input,setInput]=useState<string>('')

    const listUpdate=(array:IItemList[],index:number,check:boolean)=>{
        const newData =[...array];
        newData[index].check= check
        console.log(newData)
        return newData
    }

    const setItemList=()=>{
        return list.map((item,index)=><div 
        className={`border w-auto cursor-pointer flex items-center justify-center 
        ${item.check?`bg-blue-400 text-white`:``}`}
        key={item.name}
        onClick={()=>{setList(listUpdate(list,index,!item.check))}}
        >
            <FontAwesomeIcon icon={faPlus}/>
            {item.name}</div>)
    }

    // const addItemList=(name:string)=>{
    //     setList([...list,{name,check:false}])
    // }

    return(
        <div className="w-full border">
        <div>{title}</div>
        <div className="h-20 flex flex-wrap">
            {setItemList()}
        </div>
        <div className="flex gap-5">
            <div className="border relative flex items-center">
                <input 
                className="pl-7"
                placeholder="키워드를 추가해주세요"
                onChange={(e)=>setInput(e.currentTarget.value)}
                value={input}
                />
                <FontAwesomeIcon 
                className=" absolute left-3"
                icon={faPlus}/>
            </div>
            <Button 
            // onClick={addList(input)!}
            >
                {title} 추가</Button>
        </div>
    </div>
    )
}

export {ListItem}