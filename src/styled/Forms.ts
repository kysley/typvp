import styled from 'styled-components'

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

  p {
    margin: 0 0 2em 0;
    line-break: auto;
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
