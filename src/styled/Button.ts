import styled from 'styled-components'

import {bundle} from '@/styled/Theme'

type ButtonProps = {
  intent: 'none' | 'success' | 'warning' | 'danger'
  appearance: 'default' | 'primary' | 'secondary' | 'link'
  to?: string
}

const Button = styled.button<ButtonProps>`
  height: 32px;
  width: auto;
  border: 0;
  outline: 0;
  border-radius: 4px;
  font-size: 0.8725rem;
  padding: 0 1.5em;
  margin-right: 1em;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 200ms ease-in-out;

  :last-of-type & :not(:last-child) {
    margin-right: 0;
  }

  :last-child {
    margin-right: 0;
  }

  &[disabled],
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  svg {
    fill: ${({theme, intent}) => `${bundle.default[intent].text[theme.name]}`}
  }

  ${({intent, appearance}) =>
    appearance === 'primary' &&
    `
      background: ${bundle.primary[intent].bg};
      color: ${bundle.primary[intent].text};
      &:hover {
        background: ${bundle.primary[intent].hover};
      }
    `}

  ${({theme, intent, appearance}) =>
    appearance === 'secondary' &&
    `
      background: ${bundle.secondary[intent].bg};
      color: ${bundle.secondary[intent].text[theme.name]};
      border: 1px solid ${bundle.secondary[intent].border[theme.name]};
    `}

  ${({theme, intent, appearance}) =>
    appearance === 'default' &&
    `
      background: ${bundle.default[intent].bg[theme.name]};
      color: ${bundle.default[intent].text[theme.name]};
      &:hover {
        background: ${bundle.default[intent].hover[theme.name]};
      }
  `}

  ${({theme, intent, appearance}) =>
    appearance === 'link' &&
    `
     background: none;
     color: ${bundle.link[intent].text[theme.name]};
     &:hover {
       text-decoration: underline;
   `}
`

Button.defaultProps = {
  intent: 'none',
  appearance: 'default',
}

export default Button
