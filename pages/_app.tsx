import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GlobalContext, GlobalContextData, GlobalContextHolder } from '../contexts/global.context'
import React from 'react';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const [state, setState] = React.useState(new GlobalContextHolder({
    data: new GlobalContextData(),
    update: handleGlobalContextUpdate
  }));

  function handleGlobalContextUpdate(newData: GlobalContextData) {
    setState(new GlobalContextHolder({
      data: newData,
      update: handleGlobalContextUpdate
    }));
  }

  return  (
    <GlobalContext.Provider value={state}>
      <Head>
          {/*<link rel="canonical" href={`/${router.locale}${router.asPath}`}/>*/}

          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap" rel="stylesheet" /> 
      </Head>

      <Component {...pageProps} />
    </GlobalContext.Provider>
  )
}