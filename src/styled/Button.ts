import styled, {css} from 'styled-components'

import {bundle} from '@/styled/Theme'

const buttonBaseStyles = css`
  height: 40px;
  width: auto;
  border: 0;
  outline: 0;
  border-radius: 4px;
  /* ${typography.text.small}; */
  font-size: .8725rem;
  padding: 0 1.5em;
  margin-right: 1em;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  /* transition: ${transitions.default}; */
  text-align: center;

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
