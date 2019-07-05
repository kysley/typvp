import React, {FC, Suspense} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {createGlobalStyle} from 'styled-components'

import {StoreProvider} from '@/stores'
import {ClientProvider} from '@/services/Client'
import Routes from '@/routes'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Manrope';
    src: url('../assets/fonts/manrope-extrabold.woff2') format('woff2');
    font-style: normal;
    font-weight: 800;
  }
  @font-face {
    font-family: 'Manrope';
    src: url('../assets/fonts/manrope-bold.woff2') format('woff2');
    font-style: normal;
    font-weight: 700;
  }
  @font-face {
    font-family: 'Manrope';
    src: url('../assets/fonts/manrope-medium.woff2') format('woff2');
    font-style: normal;
    font-weight: 500;
  }
  @font-face {
    font-family: 'Manrope';
    src: url('../assets/fonts/manrope-regular.woff2') format('woff2');
    font-style: normal;
    font-weight: 400;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Manrope', sans-serif;
    letter-spacing: auto;
    line-height: normal;
    font-weight: 300;
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
      <Router>
        <GlobalStyle />
        <Suspense fallback={'Loading ...'}>
          <Routes />
        </Suspense>
      </Router>
    </StoreProvider>
  </ClientProvider>
)

export default App
