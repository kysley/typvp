import styled, {css} from 'styled-components'

import {colors} from '@/styled/Theme'

const inputBaseStyles = css`
  /* background-color: ${colors.n100}; */
  border: none;
  border-width: 1px;
  border-style: solid;
  border-color: ${colors.border.default};
  border-radius: 4px;
  box-shadow: rgba(8, 35, 51, 0.05) 0px 3px 6px;
  padding: 0.75rem 0.75rem;
  margin-bottom: 2em;
  transition: border-color 200ms ease-in-out;
  width: 100%;
  font-size: 0.8725rem;

  &:focus,
  &:active {
    border-color: ${colors.n200};
    outline: none;
  }

  &::placeholder {
    color: #9DA7B1;
    transition: color 200ms ease-in-out;
  }
  &[disabled],
  &:disabled {
    background-color: ${colors.background.tint1};
    &:active {
      border: 1px solid ${colors.background.tint2};
    }
  }
`

const inputOptionalStyles = css`
  background-color: #fafafa;
  border-style: dashed;
  box-shadow: none;
`

const inputDangerStyles = css`
  &:not(:focus) {
    border-color: ${colors.intent.danger};

    &::placeholder {
      color: ${colors.r200};
    }
  }
`

const Input = styled('input')`
  ${inputBaseStyles};
  ${(p: any) =>
    p.isOptional
      ? css`
          ${inputOptionalStyles}
        `
      : null};
  ${(p: any) =>
    p.hasWarning
      ? css`
          ${inputDangerStyles}
        `
      : null};
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
