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
  HeaderGroup,
} from '@/styled/Header'
import ME from '@/graphql/queries/me'
import {useStore} from '@/stores'
import Button from '@/styled/Button'

const Header = observer(() => {
  const {UserStore} = useStore()

  const [result] = useQuery({
    query: ME,
  })

  useEffect(() => {
    if (result.data && !result.error) {
      const {
        data: {me},
      } = result
      UserStore.persist(me)
    }
  }, [result])

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Link to="/">
          <HeaderLogo src={logo} />
        </Link>
        <LeaderboardTab to="/leaderboard">leaderboards</LeaderboardTab>
        <HeaderGroup>
          {UserStore.me ? (
            <>
              <MeTab to="/">{UserStore.me.username}</MeTab>
              <Button
                onClick={UserStore.logout}
                appearance="link"
                intent="none"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {!result.fetching && (
                <>
                  <LoginTab to="/login">login</LoginTab>
                  <SigninTab to="/signup">sign up</SigninTab>
                </>
              )}
            </>
          )}
        </HeaderGroup>
      </HeaderContainer>
    </HeaderWrapper>
  )
})

export default Header
