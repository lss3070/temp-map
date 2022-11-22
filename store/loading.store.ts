import create from 'zustand'


interface ILoadingStoreProps{
    onLoading?:boolean;
    setLoading:(value:boolean)=>void;
}
export const useLoadiingStore=create<ILoadingStoreProps>((set)=>({
    setLoading:(onLoading)=>set((state)=>({onLoading})),
}));