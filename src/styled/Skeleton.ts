import styled, {keyframes} from 'styled-components'

const pulse = keyframes`
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -100% 0%;
    }
  `

export const SSkeletonPulse = styled.div`
  display: inline-block;
  height: 100%;
  width: 100%;
  background: ${({theme}) =>
    `linear-gradient(-90deg, ${theme.backgrounds.accent} 0%, ${theme.backgrounds.background} 50%, ${theme.backgrounds.input} 100%)`};
  background-size: 400% 400%;
  animation: ${pulse} 1.2s ease-in-out infinite;
`

export const SkeletonLine = styled(SSkeletonPulse)`
  width: 5em;
  border-radius: 6px;

  &::before {
    content: '\00a0';
  }
`
