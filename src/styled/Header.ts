import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

import {colors} from '@/styled/Theme'

const HeaderWrapper = styled.header`
  width: 100%;
`

const HeaderContainer = styled.nav`
  width: 100%;
  display: grid;
  position: relative;
  grid-template-columns: auto 1fr 1fr auto 1fr auto 1fr 1fr auto;
  z-index: 99;
  align-items: center;
  top: 3vh;
`

const Tab = styled(NavLink)`
  margin: 0 1em;
  position: relative;
  text-decoration: none;
  color: ${colors.black};
  display: grid;
  align-items: center;
  justify-items: center;
  font-weight: 500;
  font-size: 0.9rem;
  :hover {
    text-decoration: underline;
  }
  &.active {
    color: ${colors.p300};
    text-decoration: underline;
  }
`

const LeaderboardTab = styled(Tab)`
  grid-column: 2;
`

const MeTab = styled(Tab)`
  grid-column: 4;
`

const LoginTab = styled(Tab)`
  grid-column: -2;
`

const SigninTab = styled(Tab)`
  grid-column: -1;
`

const HeaderLogo = styled('img')`
  height: 35px;
`

export {
  HeaderContainer,
  HeaderWrapper,
  LeaderboardTab,
  MeTab,
  LoginTab,
  SigninTab,
  HeaderLogo,
}
