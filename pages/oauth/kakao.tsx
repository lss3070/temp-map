import axios from "axios";
import { useEffect } from "react";

const getToken = async (code: string | null) => {
    try {
      const {
        data: { access_token },
      } = await axios({
        url: 'https://kauth.kakao.com/oauth/token',
        method: 'post',
        params: {
          grant_type: 'authorization_code',
          client_id: '299d875b014a255e5dbc247b300cf8d3',
          REDIRECT_URI: `${window.origin}/oauth/kakao`,
          code: code
        },
      });
      return access_token;
    } catch (e) {
      console.log(e);
    }
  };

const KaKao=()=>{

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');

        const accesstoken= getToken(code);
        accesstoken.then((token)=>{

          if(token){
            localStorage.setItem('kakaoToken',token)
            window.close();
          }
        }).catch(error=>console.log(error))
        
        // window.close()
      }, []);
      
    return(
        <></>
    )
}
export default KaKao