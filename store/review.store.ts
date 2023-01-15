import create from 'zustand'


interface IReviewStoreProps{
    onReviewModal:boolean;
    id?:string;
    setId:(id:string)=>void;
    setReviewModal:(onLoginModal:boolean)=>void;
}
export const useReviewStore=create<IReviewStoreProps>((set)=>({
    onReviewModal:false,
    setId:(id)=>set((state)=>({id})),
    setReviewModal:(onReviewModal)=>set((state)=>({onReviewModal})),
}));