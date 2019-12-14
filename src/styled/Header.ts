import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

export const HeaderWrapper = styled.header`
  width: 100%;
`

export const HeaderContainer = styled.nav`
  width: 100%;
  display: grid;
  position: relative;
  grid-template-columns: auto auto auto auto 1fr auto auto;
  z-index: 99;
  align-items: center;
  margin-top: 3vh;
  margin-bottom: 7vh;
`

export const Tab = styled(NavLink)`
  margin: 0 1em;
  position: relative;
  text-decoration: none;
  color: ${({theme}) => theme.colors.text};
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
    color: ${({theme}) => theme.colors.text};
    text-decoration: underline;
    background-color: ${({theme}) => theme.backgrounds.secondary};
  }
`

export const LeaderboardTab = styled(Tab)`
  grid-column: 2;
`

export const TrialsTab = styled(Tab)`
  grid-column: 3;
`

export const MultiplayerTab = styled(Tab)`
  grid-column: 4;
`

export const MeTab = styled(Tab)`
  grid-column: 5;
`

export const HeaderLogo = styled.img`
  height: 35px;
`
export const HeaderGroup = styled.div`
  display: flex;
  flex-direction: row;
  grid-column: -2;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  border-radius: 6px;

  a {
    margin-right: 0.5em;
  }
`
