import DaumPostcodeEmbed from "react-daum-postcode"
import { Button } from "../Common/Button"

const PostModal=()=>{

    const handleComplete = (data:any) => {
        console.log(data);
        let fullAddress = data.address;
        let extraAddress = '';
    
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
    
        console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
      };

    return(
        <div className='z-50 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] grid'>
        <p>사용자 주소 입력</p>
        <div>
          <DaumPostcodeEmbed onComplete={handleComplete}/>
        </div>
        <Button>주소변경</Button>
      </div>
    )
}
export {PostModal}