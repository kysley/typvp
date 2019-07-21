import styled, {css} from 'styled-components'

import {bundle} from '@/styled/Theme'

const buttonBaseStyles = css`
  height: 40px;
  width: auto;
  border: 0;
  outline: 0;
  border-radius: 4px;
  font-size: 0.8725rem;
  padding: 0 1.5em;
  margin-right: 1em;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  transition: all 200ms ease-in-out;

  :last-of-type {
    margin-right: 0;
  }

  &[disabled],
  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }

  & > svg {
    margin-right: 0.35em;
  }
`

const linkButtonStyles = css`
  :hover {
    text-decoration: underline;
    box-shadow: none;
  }
`

interface ButtonProps {
  intent: 'none' | 'success' | 'warning' | 'primary'
  appearance: 'default' | 'minimal' | 'primary' | 'link'
}

const Button = styled.button<ButtonProps>(
  ({appearance, intent}: ButtonProps) => `
    background-color: ${bundle[appearance][intent].bg};
    color: ${bundle[appearance][intent].text};
    :hover {
      box-shadow: rgba(8,35,51,0.12) 0px 6px 10px;
    }
    :active {
      background-color: ${bundle[appearance][intent].hover};
    }
    ${buttonBaseStyles}
    `,
  (p: ButtonProps) => (p.appearance === 'link' ? linkButtonStyles : null),
)

// Button.propTypes = {
//   intent: PropTypes.oneOf(['none', 'success', 'warning', 'danger']),
//   appearance: PropTypes.oneOf(['default', 'minimal', 'primary', 'link'])
//     .isRequired,
// }

// Button.defaultProps = {
//   intent: 'none',
//   appearance: 'default',
// }

export default Button
