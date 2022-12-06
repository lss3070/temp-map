import create from 'zustand'

interface IMyPoistion{
    lat:number;
    lng:number;
  }

interface IMyPositionProps{
    myPosition?:IMyPoistion;
    setMyPosition:(myPosition:IMyPoistion)=>void;
}
export const useMyPositionStore=create<IMyPositionProps>((set)=>({
    setMyPosition:(myPosition)=>set((state)=>({myPosition})),
}));


export type {IMyPoistion}