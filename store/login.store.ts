import create from 'zustand'


interface ILoginStoreProps{
    onModal:boolean;
    setModal:(onModal:boolean)=>void;
}
export const useLoginModalStore=create<ILoginStoreProps>((set)=>({
    onModal:false,
    setModal:(onModal)=>set((state)=>({onModal})),
}));