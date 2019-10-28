import React, {lazy, Suspense} from 'react'
import {hot} from 'react-hot-loader/root'
import {Switch, Route} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import {observer} from 'mobx-react-lite'

import {AppContainer, AppWrapper} from '@/styled/Containers'
import Header from '@/components/Header'
import {useStore} from '@/stores'

const Signup = lazy(() => import('@/pages/Signup'))
const Login = lazy(() => import('@/pages/Login'))
const Singleplayer = lazy(() => import('@/pages/Singleplayer'))
const NoMatch = lazy(() => import('@/pages/NoMatch'))
const Leaderboard = lazy(() => import('@/pages/Leaderboard'))
const Trials = lazy(() => import('@/pages/Trials'))
const Trial = lazy(() => import('@/pages/Trial'))

const Routes = observer(() => {
  const {GlobalStore} = useStore()
  return (
    <ThemeProvider theme={GlobalStore.theme}>
      <AppWrapper>
        <AppContainer>
          <Header />
          <Suspense fallback={<div>Loading ...</div>}>
            <Switch>
              <Route exact path="/" component={Singleplayer} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/leaderboard" component={Leaderboard} />
              <Route exact path="/trials" component={Trials} />
              <Route exact path="/trial/:id" component={Trial} />
              <Route component={NoMatch} />
            </Switch>
          </Suspense>
        </AppContainer>
      </AppWrapper>
    </ThemeProvider>
  )
})

export default hot(Routes)
