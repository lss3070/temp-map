import create from 'zustand'

interface RestaurantMark{
    name:string;
    id:string;
    lat:number;
    lng:number;
    photos?:string;
    rating?:number;
    vicinity?:string//주소
    priceLevel?:number;
    distance?:number;
}

interface IRoadStoreProps{
    onRoad?:boolean;
    restaurantMark?:RestaurantMark[];
    selectMark?:RestaurantMark
    setRoad:(value:boolean)=>void;
    setSelectMark:(selectMark:RestaurantMark)=>void
    setRestaurantMark:(restaurantInfo:RestaurantMark[])=>void;
}
export const useRoadStore=create<IRoadStoreProps>((set)=>({
    setRoad:(onRoad)=>set((state)=>({onRoad})),
    setSelectMark:(selectMark:RestaurantMark)=>set((state)=>({selectMark})),
    setRestaurantMark:(restaurantMark:RestaurantMark[])=>set((state)=>({restaurantMark}))
}));