import React from 'react'
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react-lite'

import logo from '@/assets/images/typvp.svg'
import {
  HeaderWrapper,
  HeaderContainer,
  HeaderLogo,
  LeaderboardTab,
  TrialsTab,
  HeaderGroup,
} from '@/styled/Header'
import {useStore} from '@/stores'
import Button from '@/styled/Button'
import {
  DropdownMenu,
  DropdownItems,
  DropdownItem,
  DropdownBorder,
} from '@/styled/Dropdown'
import {UserIcon} from '@/components/icons/User'
import {EnterIcon} from '@/components/icons/Enter'
import {Dropdown} from '@/components/Dropdown'

const Header = observer(() => {
  const {UserStore, GlobalStore} = useStore()

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Link to="/" aria-label="Home">
          <HeaderLogo src={logo} alt="" />
        </Link>
        <LeaderboardTab to="/leaderboard">leaderboard</LeaderboardTab>
        <TrialsTab to="/trials">trials</TrialsTab>
        <HeaderGroup>
          {UserStore.me ? (
            <Dropdown header={UserStore.me.username}>
              <DropdownMenu>
                <DropdownItems>
                  <DropdownItem intent="none">
                    <Link to="/profile">My Profile</Link>
                  </DropdownItem>
                  <DropdownItem intent="none" onClick={GlobalStore.toggleTheme}>
                    {GlobalStore.mode === 'light' ? 'Lights Off' : 'Lights On'}
                  </DropdownItem>
                  <DropdownBorder />
                  <DropdownItem intent="danger" onClick={UserStore.logout}>
                    Logout
                  </DropdownItem>
                </DropdownItems>
              </DropdownMenu>
            </Dropdown>
          ) : (
            // <>
            // {!result.fetching && (
            <>
              <Button as={Link} to="/login" appearance="default" intent="none">
                Login
              </Button>
              <Button as={Link} to="/signup" appearance="primary" intent="none">
                Sign Up
              </Button>
              <Dropdown header={<UserIcon />}>
                <DropdownMenu>
                  <DropdownItems>
                    <DropdownItem
                      intent="none"
                      onClick={GlobalStore.toggleTheme}
                    >
                      {GlobalStore.mode === 'light'
                        ? 'Lights Off'
                        : 'Lights On'}
                    </DropdownItem>
                    <DropdownBorder />
                    <DropdownItem intent="none">
                      <EnterIcon />
                      <Link style={{marginLeft: '0.5em'}} to="/signup">
                        Sign Up
                      </Link>
                    </DropdownItem>
                  </DropdownItems>
                </DropdownMenu>
              </Dropdown>
            </>
          )}
          {/* </> */}
          {/* )} */}
        </HeaderGroup>
      </HeaderContainer>
    </HeaderWrapper>
  )
})

export default Header
