import React from 'react'
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react-lite'

import logoDark from '@/assets/images/typvp-dark.svg'
import logoLight from '@/assets/images/typvp-light.svg'
import {
  HeaderWrapper,
  HeaderContainer,
  HeaderLogo,
  LeaderboardTab,
  TrialsTab,
  HeaderGroup,
  MultiplayerTab,
} from '@/styled/Header'
import {useStore} from '@/stores'
import Button from '@/styled/Button'
import {
  DropdownMenu,
  DropdownItems,
  DropdownItem,
  DropdownBorder,
} from '@/styled/Dropdown'
import {
  LoginIcon,
  UserIcon,
  AdjustIcon,
  LogoutIcon,
  SettingsIcon,
  GemIcon,
} from '@/components/icons'
import {Dropdown} from '@/components/Dropdown'

const Header = observer(() => {
  const {UserStore, GlobalStore} = useStore()

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Link to="/" aria-label="Home">
          <HeaderLogo
            src={GlobalStore.mode === 'light' ? logoDark : logoLight}
            alt="typvp"
          />
        </Link>
        <LeaderboardTab to="/leaderboard">leaderboard</LeaderboardTab>
        <TrialsTab to="/trials">trials</TrialsTab>
        <MultiplayerTab to="/multiplayer">multiplayer</MultiplayerTab>
        <HeaderGroup>
          {UserStore.me ? (
            <Dropdown header={UserStore.me.username}>
              <DropdownMenu>
                <DropdownItems>
                  <Link to="/profile">
                    <DropdownItem intent="none">
                      <SettingsIcon />
                      <span>My Profile</span>
                    </DropdownItem>
                  </Link>
                  <Link to="/pro">
                    <DropdownItem intent="none">
                      <GemIcon />
                      <span>typvp Pro</span>
                    </DropdownItem>
                  </Link>
                  <DropdownItem intent="none" onClick={GlobalStore.toggleTheme}>
                    <AdjustIcon />
                    <span>
                      {GlobalStore.mode === 'light'
                        ? 'Lights Off'
                        : 'Lights On'}
                    </span>
                  </DropdownItem>
                  <DropdownBorder />
                  <DropdownItem intent="danger" onClick={UserStore.logout}>
                    <LogoutIcon />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownItems>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              {!UserStore.fetchingUser && (
                <>
                  <Button
                    as={Link}
                    to="/login"
                    appearance="default"
                    intent="none"
                  >
                    Login
                  </Button>
                  <Button
                    as={Link}
                    to="/signup"
                    appearance="primary"
                    intent="none"
                  >
                    Sign Up
                  </Button>
                  <Dropdown header={<UserIcon />}>
                    <DropdownMenu>
                      <DropdownItems>
                        <DropdownItem
                          intent="none"
                          onClick={GlobalStore.toggleTheme}
                        >
                          <AdjustIcon />
                          <span>
                            {GlobalStore.mode === 'light'
                              ? 'Lights Off'
                              : 'Lights On'}
                          </span>
                        </DropdownItem>
                        <DropdownBorder />
                        <Link to="/signup">
                          <DropdownItem intent="none">
                            <LoginIcon />
                            <span>Sign Up</span>
                          </DropdownItem>
                        </Link>
                      </DropdownItems>
                    </DropdownMenu>
                  </Dropdown>
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
