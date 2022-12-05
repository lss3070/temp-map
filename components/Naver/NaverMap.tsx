import { useEffect, useRef, useState } from "react";
import useGeolocation from "../../hooks/useGeolocation";
import { useRoadStore } from "../../store/road.store";
import { RestaurantMain } from "../restaurant/RestaurantMain";
import { NaverMark } from "./NaverMark";


interface MyPoistion{
  lat:number;
  lng:number;
}

const NaverMap=()=>{

  const [myPosition,setMyPosition]=useState<MyPoistion>()
  const [centerPosition,setCenterPosition] = useState<MyPoistion>()
  const [naverMap,setNaverMap]=useState<naver.maps.Map>();
  const [
    onRoad,
    selectMark
  ]=useRoadStore((state)=>[
    state.onRoad,
    state.selectMark
  ])
  
    const mapElement = useRef(null);
    

    const location = useGeolocation();

    useEffect(()=>{
      if(location.loaded){
        setMyPosition({
          lat:location.coordinates?.lat!,
          lng:location.coordinates?.lng!
        })
        setCenterPosition({
          lat:location.coordinates?.lat!,
          lng:location.coordinates?.lng!
        })
        naverMap?.setCenter({
          lat:location.coordinates?.lat!,
          lng:location.coordinates?.lng!
        })
    }
    },[location])
    
    useEffect(() => {
        const { naver } = window;
        if (!mapElement.current || !naver) return;
    
        // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
        const location = new naver.maps.LatLng(37.5656, 126.9769);
        const mapOptions: naver.maps.MapOptions = {
          center: location,
          zoom: 17,
          zoomControl: true,
          zoomControlOptions: {
            position: naver.maps.Position.TOP_RIGHT,
          },
        };

        const map = new naver.maps.Map(mapElement.current, mapOptions);
        setNaverMap(map);
        // new naver.maps.Marker({
        //   position: location,
        //   map,
        // });
      }, []);
      

    return(
        <div ref={mapElement} className='w-full h-full' >
          {
            myPosition&&(
              <RestaurantMain lat={myPosition.lat} lng={myPosition?.lng}/>
            )
          }
          {
            naverMap&&(
              <NaverMark/>
            )
          }
        </div>
    )
}

export {NaverMap}