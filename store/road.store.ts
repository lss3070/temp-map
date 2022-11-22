import create from 'zustand'

interface RestaurantPosition{
    lat:number;
    lng:number;
}

interface IRoadStoreProps{
    onRoad?:boolean;
    restaurantInfo?:RestaurantPosition
    setRoad:(value:boolean)=>void;
    setRestaurantInfo:(restaurantInfo:RestaurantPosition)=>void;
}
export const useRoadStore=create<IRoadStoreProps>((set)=>({
    setRoad:(onRoad)=>set((state)=>({onRoad})),
    setRestaurantInfo:(restaurantInfo:RestaurantPosition)=>set((state)=>({restaurantInfo}))
}));