import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faB } from '@fortawesome/free-solid-svg-icons'
import { QueryClient, QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'


library.add(faB)

const client = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return( 
    <QueryClientProvider client={client}> 
    {
      process.env.NODE_ENV!=='production'?<ReactQueryDevtools initialIsOpen={false}/>:null
    }
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
