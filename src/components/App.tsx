import React, {FC} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {createGlobalStyle} from 'styled-components'

import {StoreProvider} from '@/stores'
import {ClientProvider} from '@/services/Client'
import Routes from '@/routes'

const GlobalStyle = createGlobalStyle`
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
        <Routes />
      </Router>
    </StoreProvider>
  </ClientProvider>
)

export default App
