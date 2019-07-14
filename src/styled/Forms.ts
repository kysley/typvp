import styled from 'styled-components'

export const SignupFormContainer = styled.div`
  position: relative;
  top: 10vh;
  max-width: 50vw;
  align-self: center;
`

export const SignupForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5em;
  width: 25vw;

  div {
    grid-column: span 2;
  }
  button {
    grid-column: span 2;
  }
`
