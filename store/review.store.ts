import create from 'zustand'


interface IReviewStoreProps{
    onReviewModal:boolean;
    setReviewModal:(onLoginModal:boolean)=>void;
}
export const useReviewStore=create<IReviewStoreProps>((set)=>({
    onReviewModal:false,
    setReviewModal:(onReviewModal)=>set((state)=>({onReviewModal})),
}));