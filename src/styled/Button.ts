import styled from 'styled-components'

import {bundle} from '@/styled/Theme'

interface ButtonProps {
  intent: 'none' | 'success' | 'warning' | 'danger'
  appearance: 'default' | 'primary' | 'secondary' | 'link'
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
  display: inline-block;
  text-decoration: none;
  text-align: center;
  transition: background 200ms ease-in-out;

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
