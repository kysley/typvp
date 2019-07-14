import React from 'react'
import {Link} from 'react-router-dom'

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

const Header = () => (
  <HeaderWrapper>
    <HeaderContainer>
      <Link to="/">
        <HeaderLogo src={logo} />
      </Link>
      <LeaderboardTab to="/create">leaderboards</LeaderboardTab>
      <MeTab to="/profile">profile</MeTab>
      <LoginTab to="/register">register</LoginTab>
      <SigninTab to="/signup">sign up</SigninTab>
    </HeaderContainer>
  </HeaderWrapper>
)

export default Header
