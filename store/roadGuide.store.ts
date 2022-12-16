import create from 'zustand'

type IRoadStep={
    name:string;
    description:string;
    type?:string //Point,LineString
    roadType?:number;
    distance?:number;
    time?:number;
}

type IRoadGuide={
    totalTime:number;
    totalDistance:number;
    roadStep:IRoadStep[];
    drawPolyLine:any[];
}

interface IRoadGuideStoreProps{
    roadGuide?:IRoadGuide;
    setRoadGuide:(roadGuide:IRoadGuide)=>void;
    initRoadGuide:()=>void;
}
export const useRoadGuideStore=create<IRoadGuideStoreProps>((set)=>({
    setRoadGuide:(roadGuide)=>set((state)=>({roadGuide})),
    initRoadGuide:()=>set((state)=>({roadGuide:undefined}))
}));


export type {IRoadGuide,IRoadStep}