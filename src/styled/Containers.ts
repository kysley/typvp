import styled from 'styled-components'

export const AppWrapper = styled.main`
  max-width: 100vw;
  position: relative;
  display: flex;
  min-height: 100vh;
  background: ${({theme}) => theme.backgrounds.background};
  justify-content: center;
`

export const AppContainer = styled.div`
  width: 80%;
  position: relative;
  display: flex;
  flex-direction: column;
`
