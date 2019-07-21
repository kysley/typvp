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
  grid-template-columns: auto auto 1fr auto auto;
  z-index: 99;
  align-items: center;
  margin-top: 3vh;
  margin-bottom: 7vh;
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
  padding: 0.75em;
  border-radius: 6px;
  :hover {
    text-decoration: underline;
  }
  &.active {
    color: ${colors.p300};
    text-decoration: underline;
    background-color: ${colors.background.tint1};
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
export const HeaderGroup = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${colors.background.tint1};
  grid-column: 4;
  justify-content: space-evenly;
  min-width: 14em;
  height: 100%;
  border-radius: 6px;
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
