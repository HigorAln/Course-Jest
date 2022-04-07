import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { makeServer } from '../miragejs/server'

if(process.env.NODE_ENV === "development"){
  makeServer({ environment: 'development' })
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
