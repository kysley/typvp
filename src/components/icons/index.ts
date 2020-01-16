import styled from 'styled-components'

export {LoginIcon} from './Login'
export {LogoutIcon} from './Logout'
export {RefreshIcon} from './Refresh'
export {SettingsIcon} from './Settings'
export {CheckmarkIcon} from './Checkmark'
export {UserIcon} from './User'
export {AdjustIcon} from './Adjust'
export {StopwatchIcon} from './Stopwatch'
export {UsersIcon} from './Users'
export {DeviceIcon} from './Device'
export {SaveIcon} from './Save'

export const SVGDefault = styled.svg`
  height: 1.5em;
  cursor: pointer;
  fill: ${({theme}) => theme.colors.text};
  margin-right: 0.5em;

  :only-child {
    margin-right: 0;
  }
`
