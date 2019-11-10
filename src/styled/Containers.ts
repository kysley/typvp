import styled from 'styled-components'

export const AppWrapper = styled.main`
  max-width: 100vw;
  position: relative;
  display: flex;
  min-height: 100vh;
  background: ${({theme}) => theme.backgrounds.primary};
  justify-content: center;
`

export const AppContainer = styled.div`
  width: 95%;
  position: relative;
  display: flex;
  flex-direction: column;
`
