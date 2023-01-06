import create from 'zustand'

interface ITokenStoreProps{
    token?:string;
    setToken:(token:string)=>void;
    initToken:()=>void;
}
export const useTokenStore=create<ITokenStoreProps>((set)=>({
    setToken:(token)=>set((state)=>({token})),
    initToken:()=>set((state)=>({token:undefined}))
}));