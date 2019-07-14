import React, {lazy, Suspense} from 'react'
import {hot} from 'react-hot-loader/root'
import {Switch, Route} from 'react-router-dom'

import {AppContainer, AppWrapper} from '@/styled/Containers'
import Header from '@/components/Header'

const Signup = lazy(() => import('@/pages/Signup'))
const Singleplayer = lazy(() => import('@/components/Singleplayer'))
const NoMatch = lazy(() => import('@/pages/NoMatch'))

const Routes = () => (
  <AppWrapper>
    <AppContainer>
      <Header />
      <Suspense fallback={<div>Loading ...</div>}>
        <Switch>
          <Route exact path="/" component={Singleplayer} />
          <Route exact path="/signup" component={Signup} />
          <Route component={NoMatch} />
        </Switch>
      </Suspense>
    </AppContainer>
  </AppWrapper>
)

export default hot(Routes)
