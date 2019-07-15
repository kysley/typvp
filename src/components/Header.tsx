import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useQuery} from 'urql'
import {observer} from 'mobx-react'

import logo from '@/assets/images/typvp.svg'

import {
  HeaderWrapper,
  HeaderContainer,
  HeaderLogo,
  LeaderboardTab,
  MeTab,
  LoginTab,
  SigninTab,
} from '@/styled/Header'
import ME from '@/graphql/queries/me'
import {useStore} from '@/stores'

const Header = observer(() => {
  const {UserStore} = useStore()
  const [pause, setPause] = useState<boolean>(true)
  const [result] = useQuery({
    query: ME,
    pause,
  })

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setPause(false)
    }
  }, [])

  useEffect(() => {
    if (result.data && !result.error) {
      const {
        data: {me},
      } = result
      console.log(me)
      UserStore.persist(me)
      console.log(UserStore)
    }
  }, [result])

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Link to="/">
          <HeaderLogo src={logo} />
        </Link>
        {/* <LeaderboardTab to="/create">leaderboards</LeaderboardTab> */}
        {UserStore.me ? (
          <MeTab to="/">user: {UserStore.me.username}</MeTab>
        ) : (
          <>
            {!result.fetching && pause && (
              <>
                <LoginTab to="/login">login</LoginTab>
                <SigninTab to="/signup">sign up</SigninTab>
              </>
            )}
          </>
        )}
      </HeaderContainer>
    </HeaderWrapper>
  )
})

export default Header
