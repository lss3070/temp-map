import create from 'zustand'


interface IModalStoreProps{
    onModal:boolean;
    setModal:(onModal:boolean)=>void;
}
export const useModalStore=create<IModalStoreProps>((set)=>({
    onModal:false,
    setModal:(onModal)=>set((state)=>({onModal})),
}));