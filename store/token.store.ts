import create from 'zustand'

interface ITokenStoreProps{
    token?:string;
    setToken:(token:string)=>void;
}
export const useTokenStore=create<ITokenStoreProps>((set)=>({
    setToken:(token)=>set((state)=>({token})),
}));