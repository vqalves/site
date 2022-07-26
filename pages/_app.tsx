import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GlobalContext, GlobalContextData, GlobalContextHolder } from '../contexts/global-context'
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const context = React.useContext(GlobalContext);

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
      <Component {...pageProps} />
    </GlobalContext.Provider>
  )
}