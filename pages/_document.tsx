import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
      <Html>
        <Head >
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
        <Script strategy="beforeInteractive"
         src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=046f31cfae67c4eb66f86f01861abf28&libraries=services,clusterer&autoload=false`}
        />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }