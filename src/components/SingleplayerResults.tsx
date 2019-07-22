import React from 'react'
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'

import {useStore} from '@/stores'
import {
  ResultsContainer,
  ResultsHeader,
  ResultsNumber,
  ResultsStatus,
} from '@/styled/Singleplayer'

const SingleplayerResults = observer(() => {
  const {GameStore, UserStore} = useStore()
  return (
    <ResultsContainer animate={{y: [0, 30, 25]}} initial>
      <div>
        <ResultsHeader>cpm (raw)</ResultsHeader>
        <ResultsNumber>{GameStore.rawCpm}</ResultsNumber>
      </div>
      <div>
        <ResultsHeader>cpm (corrected)</ResultsHeader>
        <ResultsNumber>{GameStore.cpm}</ResultsNumber>
      </div>
      <div>
        <ResultsHeader>wpm</ResultsHeader>
        <ResultsNumber>{GameStore.wpm}</ResultsNumber>
      </div>
      <div>
        <ResultsHeader>correct</ResultsHeader>
        <ResultsNumber>{GameStore.correct}</ResultsNumber>
      </div>
      <div>
        <ResultsHeader>incorrect</ResultsHeader>
        <ResultsNumber>{GameStore.incorrect}</ResultsNumber>
      </div>
      <div>
        <ResultsHeader>corrections</ResultsHeader>
        <ResultsNumber>{GameStore.corrections}</ResultsNumber>
      </div>
      <ResultsStatus>
        {UserStore.me ? (
          <>Your results have been saved!</>
        ) : (
          <>
            <Link to="/signup">Signup</Link> or <Link to="/login">Login</Link>{' '}
            to save your results!
          </>
        )}{' '}
      </ResultsStatus>
    </ResultsContainer>
  )
})

export default SingleplayerResults
