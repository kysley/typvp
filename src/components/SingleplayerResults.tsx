import React from 'react'
import {observer} from 'mobx-react-lite'
import {Link} from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'
import {useMutation} from 'urql'

import {useStore} from '@/stores'
import {
  ResultsContainer,
  ResultsHeader,
  ResultsNumber,
  ResultsStatus,
} from '@/styled/Singleplayer'
import Button from '@/styled/Button'
import {SaveIcon} from '@/components/icons'
import {SAVE_WORD_SET} from '@/graphql/mutations'

type SingleplayerResultsProps = {
  isVisible: boolean
}

const SingleplayerResults: React.FC<SingleplayerResultsProps> = observer(
  ({isVisible}) => {
    const {GameStore, UserStore} = useStore()
    const [mutation, execMutation] = useMutation(SAVE_WORD_SET)

    const saveWordSet = () => {
      execMutation({
        wordSet: GameStore.exportedWordSet,
      })
    }

    return (
      <AnimatePresence>
        {isVisible && (
          <ResultsContainer
            color={UserStore.me && UserStore.me.color}
            animate={{opacity: [0, 1]}}
            initial
            transition={{duration: 0.425}}
            exit={{opacity: 0}}
          >
            {UserStore.me && (
              <div style={{gridColumn: '1 / span 3'}}>
                <Button
                  intent="none"
                  appearance="default"
                  onClick={saveWordSet}
                  disabled={mutation.data || false}
                >
                  <SaveIcon />
                  <span>{mutation.data ? 'Saved!' : 'Save as Trial'}</span>
                </Button>
              </div>
            )}
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
                  <Link to="/signup">Signup</Link> or{' '}
                  <Link to="/login">Login</Link> to save your results!
                </>
              )}
            </ResultsStatus>
          </ResultsContainer>
        )}
      </AnimatePresence>
    )
  },
)

export default SingleplayerResults
