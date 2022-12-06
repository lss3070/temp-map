## Libaray & Framework
- IDE: VsCode(1.69.2)
- 프레임 워크: NextJs(13.04)
- 언어 : Typescript(4.9.3)
- 상태관리툴 : Zustand(4.1.4),SWR(1.3.0)
- 라이브러리
```
- fontawesome(6.2.1) - 다양하게 폰트지원하는 라이브러리
- framer-motion(5.6.3) - 인터렉티브한 UI제공 라이브러리
- react-kakaomaps-sdk(1.1.5) - kakaomap 지원 라이브러리
- react-loading-skeleton(3.1.0) - sketeton ui지원 라이브러리
```

## 폴더 구조
기본적인 nextjs 폴더구조를 따라가며 next13버전에서 나온 app기반의 폴더 구조가 아닌 next12버전에서의 폴더 구조를 따라간다.

```
src
├── components
│   ├── restaurant.tsx
│   hooks
│   ├── useGeolocation.ts
│   pages
│   ├── index.tsx
│   store
│   ├── road.store.ts
```

#### pages
- page안에 파일들이 세그먼트
- 

#### components
- 

#### store
- 전역 상태관리를 하는 저장소이며 zustand 라이브러리를 이용하여 상태관리를 한다.

#### hooks
- 커스텀 hook폴더이며 지원되지않는 훅들을 자체적으로 만들어 제공한다.

## 네이밍 규칙

