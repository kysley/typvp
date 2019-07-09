import React, {FC, Suspense} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {createGlobalStyle} from 'styled-components'

import IR from '@/assets/fonts/Inter-Regular.woff2'
import {StoreProvider} from '@/stores'
import {ClientProvider} from '@/services/Client'
import Routes from '@/routes'

// TODO: replace with a css import file (and loaders.. etc)
const GlobalStyle = createGlobalStyle`
  /* @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 900;
    src: url('../assets/fonts/Inter-Black.woff2') format('woff2'),
      url('../assets/fonts/Inter-Black.woff') format('woff');
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    src: url('../assets/fonts/Inter-Bold.woff2') format('woff2'),
      url('../assets/fonts/Inter-Bold.woff') format('woff');
  } */
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url(${IR}) format('woff2');
      /* url('../assets/fonts/Inter-Regular.woff') format('woff'); */
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Inter', sans-serif;
    letter-spacing: auto;
    line-height: normal;
    font-weight: 400;
    margin: 0;
    padding: 0;
    min-width: 100vw;
    max-width: 100vw;
    min-height: 100vh;
    max-height: 100vh;
    overflow-x: hidden;
  }
`

const App: FC = () => (
  <ClientProvider>
    <StoreProvider>
      <GlobalStyle />
      <Router>
        <Suspense fallback={'Loading ...'}>
          <Routes />
        </Suspense>
      </Router>
    </StoreProvider>
  </ClientProvider>
)

export default App
