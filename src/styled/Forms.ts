import styled from 'styled-components'

import {colors} from '@/styled/Theme'

export const SignupFormContainer = styled.div`
  position: relative;
  max-width: 30vw;
  min-width: 30vw;
  align-self: center;
  background: ${({theme}) => theme.backgrounds.accent};
  padding: 3em 3em;
  border-radius: 6px;
  color: ${({theme}) => theme.colors.text};

  h1 {
    margin: 0 0 0.5em 0;
    font-size: 2.65rem;
    font-weight: 700;
  }
`

export const SignupForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5em;
  color: ${({theme}) => theme.colors.text};

  div {
    grid-column: span 2;
  }

  button {
    grid-column: span 2;
  }
`

export const FormErrorMsg = styled.p`
  color: ${colors.r300};
  font-size: 0.85rem;
  margin-top: -2em;
  margin-bottom: 0.82em;
  /* display: block; */
`
