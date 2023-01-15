import Image from "next/image";

interface IRestaurantListItemProps{
    placeId:string;
    name:string;
    photos:any[]
}

const RestaurantListItem=({placeId,name,photos}:IRestaurantListItemProps)=>{
    return(
        <div key={placeId} 
        className='grid text-xl 
        borderborder-black 
        w-80 h-[200px]
        '>
            <div className="w-full h-[200px]" style={{position:'relative'}}>
                <Image
                fill
                src={photos?.length>0?
                    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photos[0].photo_reference}&key=AIzaSyD7hySl2ct4VunK1C99CeZ-9ithi1dlOZY`
                    :'/assets/noImage.png'}
                alt={name}
                />
            </div>
            <div className="w-full text-center">{name}</div>
        </div>
    )
}

export {RestaurantListItem}