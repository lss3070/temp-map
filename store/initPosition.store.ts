import create from 'zustand'
import { IMyPoistion } from './myPosition.store';


interface IInitPositionStoreProps{
    initPosition?:IMyPoistion;
    setInitPosition:(initPosition:IMyPoistion)=>void;
}
export const useInitPositionStore=create<IInitPositionStoreProps>((set)=>({
    setInitPosition:(initPosition)=>set((state)=>({initPosition})),
}));