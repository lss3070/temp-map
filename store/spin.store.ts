import create from 'zustand'


interface ISpinStoreProps{
    spin:boolean;
    curCenterIndex:number;
    setSpin:(spin:boolean)=>void;
    setCurCenterIndex:(curCenterIndex:number)=>void;
}
export const useSpinStore=create<ISpinStoreProps>((set)=>({
    spin:false,
    curCenterIndex:0,
    setSpin:(spin)=>set((state)=>({spin})),
    setCurCenterIndex:(curCenterIndex=>set({curCenterIndex}))
}));