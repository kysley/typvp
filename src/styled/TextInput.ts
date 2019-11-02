import styled, {css} from 'styled-components'

import {colors} from '@/styled/Theme'

const inputBaseStyles = css`
  border: 2px solid transparent;
  border-radius: 4px;
  padding: 0.75rem 0.75rem;
  margin-bottom: 2em;
  width: 100%;
  font-size: 0.8725rem;
  background-color: ${({theme}) => theme.backgrounds.input};
  color: ${({theme}) => theme.colors.text};

  &:focus,
  &:active {
    /* border-color: ${({theme}) => theme.border.active}; */
    border-color: ${colors.b300};
    outline: none;
    /* box-shadow: rgba(8, 35, 51, 0.05) 0px 6px 10px; */
  }

  &[disabled],
  &:disabled {
    background-color: ${({theme}) => theme.backgrounds.input};
    &:active {
      border: 1px solid ${({theme}) => theme.border.active};
    }
  }
`

const inputOptionalStyles = css`
  background-color: #fafafa;
  border-style: dashed;
  box-shadow: none;
`

const inputDangerStyles = css`
  border-color: ${colors.r500} !important;
  background: ${colors.r75};
  color: ${colors.black};

  &::placeholder {
    color: ${colors.r500};
  }
`

interface IInput {
  isOptional?: boolean
  hasWarning?: boolean
}

const Input = styled.input<IInput>`
  ${inputBaseStyles};
  ${p =>
    p.isOptional &&
    css`
      ${inputOptionalStyles}
    `};
  ${p =>
    p.hasWarning &&
    css`
      ${inputDangerStyles}
    `};
`

const Label = styled.label`
  margin-bottom: 0.25em;
  display: block;
`

const LabelTip = styled('sup')`
  color: #7d7d7d;
`

const LabelConstraint = styled('sup')`
  color: ${colors.r300};
`

const InlineLabel = styled.label`
  /* margin-bottom: 0.25em; */
  margin-right: 0.25em;
  margin-left: 0.25em;
  display: inline;
`
const InlineInput = styled.input`
  display: inline;
  padding: 0 0.5em;
  margin: 1em 0 0 0;
  /* height: 56px; */
  border: 0;
  font-size: 1rem;
  background: #f3f3f3;
  border-radius: 3px;
  outline: 0;
`

export {Input, Label, LabelTip, LabelConstraint, InlineLabel, InlineInput}
