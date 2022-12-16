import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
const client = 'm6bcbwpcqv'

export default function Document() {
    return (
      <Html>
        <Head >
          {/* kakao활성화 */}
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
        <Script strategy="beforeInteractive"
         src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=046f31cfae67c4eb66f86f01861abf28&libraries=services,clusterer&autoload=false`}
        />
        <Script 
        strategy="beforeInteractive"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=m6bcbwpcqv`}
        />
        <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.0.0/kakao.min.js"
        integrity="sha384-PFHeU/4gvSH8kpvhrigAPfZGBDPs372JceJq3jAXce11bVA6rMvGWzvP4fMQuBGL"
        // crossorigin="anonymous"
        />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
