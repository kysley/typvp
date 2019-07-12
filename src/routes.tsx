import React from 'react'
import {hot} from 'react-hot-loader/root'
import {Switch, Route} from 'react-router-dom'

import {AppContainer, AppWrapper} from '@/styled/Containers'
// import Header from '@/components/Header'

const Signup = React.lazy(() => import('@/pages/Signup'))
const Singleplayer = React.lazy(() => import('@/components/Singleplayer'))
const NoMatch = React.lazy(() => import('@/pages/NoMatch'))

const Routes = () => (
  <AppWrapper>
    <AppContainer>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={Singleplayer} />
        <Route exact path="/signup" component={Signup} />
        <Route component={NoMatch} />
      </Switch>
    </AppContainer>
  </AppWrapper>
)

export default hot(Routes)
