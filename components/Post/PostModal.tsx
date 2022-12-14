import DaumPostcodeEmbed from "react-daum-postcode"
import { useModalStore } from "../../store/modal.store";
import { useMyPositionStore } from "../../store/myPosition.store";
import { Button } from "../Common/Button"

const PostModal=()=>{

  const [onModal,setModal]=useModalStore((state)=>[state.onModal,state.setModal])
  const setMyPosition=useMyPositionStore((state)=>state.setMyPosition);

  const closeModal=()=>{
    setModal(false)
  }
    const handleComplete = (data:any) => {
        setModal(false);
        var geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(data.address, function(result, status) {
          console.log(status);
          console.log(result);

          if(result.length>0){
            setMyPosition({
              lat:+result[0].y,
              lng:+result[0].x
            })
          }
        })
          // let extraAddress = '';
    
        // if (data.addressType === 'R') {
        //   if (data.bname !== '') {
        //     extraAddress += data.bname;
        //   }
        //   if (data.buildingName !== '') {
        //     extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
        //   }
        //   fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        // }
    
        // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
      };

    return(
      <>
      {
        onModal&&
        <div className="bg-gray-400 w-full h-full absolute top-0 left-0 z-20 bg-opacity-80"
        onClick={closeModal}
        >
          <div className='z-50 absolute top-1/2 left-1/2 translate-x-[-50%]  translate-y-[-50%] grid
            p-2 gap-2
          '>
            <p className="w-full text-center text-lg font-bold p-2 bg-white rounded-xl">
              사용자 주소 입력
            </p>
            <div>
              <DaumPostcodeEmbed onComplete={handleComplete}/>
            </div>
          </div>
        </div>
      }
      </>
    )
}
export {PostModal}