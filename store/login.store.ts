import create from 'zustand'


interface ILoginStoreProps{
    onLoginModal:boolean;
    setLoginModal:(onLoginModal:boolean)=>void;
}
export const useLoginStore=create<ILoginStoreProps>((set)=>({
    onLoginModal:false,
    setLoginModal:(onLoginModal)=>set((state)=>({onLoginModal})),
}));