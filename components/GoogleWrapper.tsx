import { Wrapper } from "@googlemaps/react-wrapper"
import { DirectionsRenderer, GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import { useCallback, useEffect, useMemo, useState } from "react";



const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
  const center = {
    lat: 37.3628358,
    lng: 127.1051844
  };

const destination = { lat: 37.362463, lng: 127.107542 };

const GoogleWrapper=()=>{


    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD7hySl2ct4VunK1C99CeZ-9ithi1dlOZY"
      })
      
      const [map, setMap] = useState<google.maps.Map|null>();

      const [directions,setDirections]= useState<any>()


      const onLoad = useCallback(function callback(map:any) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])

      const onUnmount = useCallback(function callback(map:any) {
        setMap(null)
      }, [])




      useEffect(()=>{
        if(isLoaded){
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({polylineOptions:{
                strokeColor:"#000",
                strokeOpacity:1,
                strokeWeight:3
            }});

            directionsService.route({
                origin:center,
                destination,
                travelMode:google.maps.TravelMode.TRANSIT
            },
            (result,status)=>{
                if(status===google.maps.DirectionsStatus.OK){
                    setDirections(result)
                }else{
                    console.log(status)
                    console.log(result)
                }
            }
            )
        }
      },[isLoaded])

    return(
        isLoaded?(
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={17}
            onLoad={onLoad}
            onUnmount={onUnmount}
            >
                {
                    directions?(
                        <DirectionsRenderer 
                        directions={directions}
                        />
                    ):<></>
                }
            
            </GoogleMap>
        ):(
            <></>
        )
      
    )
}
export {GoogleWrapper}