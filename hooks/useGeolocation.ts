import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useLoadiingStore } from '../store/loading.store';

// loaded 완료 여부
// loading진해중인지 여부
interface locationType {
  loaded: boolean;
  loading:boolean
  coordinates?: { lat: number; lng: number };
  error?: { code: number; message: string };
}

const useGeolocation = () => {

  const setLoading=useLoadiingStore((state)=>state.setLoading);

  const [location, setLocation] = useState<locationType>({
    loaded: false,
    loading:false,
    coordinates: { lat: 0, lng: 0, }
  })

  // 성공에 대한 로직
  const onSuccess = (location: { coords: { latitude: number; longitude: number; }; }) => {
    // flushSync(()=>{
    //   setLoading(false);
    // })
   
    setLocation({
      loaded: true,
      loading:false,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      }
    })
  }

  // 에러에 대한 로직
  const onError = (error: { code: number; message: string; }) => {
    flushSync(()=>{
      setLoading(false);
    })
   
    setLocation({
      loaded: false,
      loading:false,
      error,
    })
  }

  useEffect(() => {
    // navigator 객체 안에 geolocation이 없다면
    // 위치 정보가 없는 것.
    flushSync(()=>{
      setLoading(true);
    })
   

    setLocation({
      loaded: false,
      loading:true,
      coordinates: { lat: 0, lng: 0, }
    })

    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      })
      flushSync(()=>{
        setLoading(false);
      })
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [])

  return location;
}

export default useGeolocation
