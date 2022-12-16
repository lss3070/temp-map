import { ChildContextProvider, PropsWithChildren, useEffect, useState } from "react"
import { Polyline } from "react-kakao-maps-sdk"
import { useRoadStore } from "../../store/road.store";
import { IRoadStep, useRoadGuideStore } from "../../store/roadGuide.store";

type Position={
    lat:number;
    lng:number;
}

interface IRoadGuide{
    myPosition:Position
}

const RoadGuide=({myPosition}:PropsWithChildren<IRoadGuide>)=>{

    const [
        selectMark,
    ]=useRoadStore((state)=>[
        state.selectMark,
    ])


    const [roadGuide,setRoadGuide,initRoadGuide]=useRoadGuideStore((state)=>
    [state.roadGuide,
    state.setRoadGuide,
    state.initRoadGuide
]);

    // const [linePath,setLinePath]=useState<Position[]>()

    useEffect(()=>{
        if(!(selectMark&&myPosition)) return
        fetch('https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result',{
            method:'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:new URLSearchParams({
                appKey : "l7xx95c641a2e0bb4e5c96baf1b29876b8f5",
                startX : myPosition?.lng.toString(),
                startY : myPosition?.lat.toString(),
                endX : selectMark!.lng.toString(),
                endY : selectMark!.lat.toString(),
                reqCoordType : "WGS84GEO",
                resCoordType : "WGS84GEO",
                startName : "출발지",
                endName : "도착지"
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log('linePath!')
            console.log(data);
            let tempItem:Position[] = [{
                lat:myPosition.lat,
                lng:myPosition.lng
            }]
            const roadStepList:IRoadStep[]=[]
            
            data.features.forEach((item:any)=>{
                
                roadStepList.push({
                    name:item.properties.name,
                    description:item.properties.description,
                    // type:'',
                    // roadType:0,
                    // distance:
                })
                if(typeof item.geometry.coordinates[0]==='number'){

                    tempItem.push({
                        lat:+item.geometry.coordinates[1],
                        lng:+item.geometry.coordinates[0]
                    })
                }else{
                    item.geometry.coordinates.forEach((qq:any)=>{
                        tempItem.push({
                            lat:+qq[1],
                            lng:+qq[0]}
                        )
    
                    })
                }
            })
            setRoadGuide({
                totalDistance:data.features[0].properties.totalDistance,
                totalTime:data.features[0].properties.totalTime,
                drawPolyLine:tempItem,
                roadStep:roadStepList
            })
            // setLinePath(tempItem)  
        })
    },[selectMark])

    useEffect(()=>{
        initRoadGuide();
    },[myPosition])

    return(
        <>
            {
            selectMark&&myPosition&&roadGuide?.drawPolyLine&&(
                <Polyline
                    path={roadGuide?.drawPolyLine as any}
                    strokeWeight={5}
                    strokeOpacity={1}
                    strokeStyle={"solid"} 
                    strokeColor={"#FFAE00"}
                />
                )
            }
        </>
    )
}

export {RoadGuide}