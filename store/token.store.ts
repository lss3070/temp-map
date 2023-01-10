import create from 'zustand'

interface IUser{
    id:string,
    email:string;
    name:string;
}

interface IUserStoreProps{
    token?:string;
    userInfo?:IUser;
    setToken:(token:string)=>void;
    initToken:()=>void;
    setUserInfo:(userInfo:IUser)=>void;
}
export const useTokenStore=create<IUserStoreProps>((set)=>({
    setToken:(token)=>set((state)=>({token})),
    initToken:()=>set((state)=>({token:undefined})),
    setUserInfo:(userInfo)=>set((state)=>({userInfo}))
}));