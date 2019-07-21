import styled from 'styled-components'
import {motion} from 'framer-motion'

import {colors} from '@/styled/Theme'

export const SingleplayerContainer = styled.div`
  width: 90%;
  max-width: 750px;
  display: grid;
  align-self: center;
  margin-top: 16vh;
`

export const MetaContainer = styled.div`
  position: relative;
  border-radius: 6px;
  display: grid;
  grid-auto-flow: column;
  background: ${colors.background.tint2};
  color: ${colors.black};
  margin: 1em 0;
  padding: 0.5em 1em;
  justify-content: space-between;
  overflow: hidden;
  align-items: center;
`

export const MetaTimer = styled.div`
  display: block;
  content: '';
  background: ${colors.g300};
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  transition: all 1.1s linear;
`

export const ResultsContainer = styled(motion.div)`
  display: relative;
  padding: 1em;
  border-radius: 6px;
  background: ${colors.background.tint2};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 1em;
`

export const ResultsHeader = styled.h3`
  font-weight: 400;
  font-size: 0.85rem;
  text-transform: uppercase;
  margin: 0;
`

export const ResultsNumber = styled.span`
  font-weight: 900;
  font-size: 1.5rem;
  color: ${colors.p300};
`
