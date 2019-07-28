import React, {useState, useEffect} from 'react'
import {useQuery} from 'urql'
import {observer} from 'mobx-react-lite'

import LEADERBOARD from '@/graphql/queries/leaderboard'
import {
  LeaderboardGrid,
  LeaderboardRanking,
  LeaderboardHeader,
} from '@/styled/Leaderboard'

const Leaderboard = observer(() => {
  const [leaderboard, setLeaderboard] = useState([])
  const [result] = useQuery({
    query: LEADERBOARD,
  })

  useEffect(() => {
    if (result.data && !result.error) {
      const {
        data: {leaderboard},
      } = result
      setLeaderboard(leaderboard)
    }
  }, [result])

  return (
    <LeaderboardGrid>
      <LeaderboardHeader>
        <span>Pos/wpm</span>
        <span>cpm</span>
        <span>correct</span>
        <span>incorrect</span>
        <span>corrections</span>
      </LeaderboardHeader>
      {leaderboard.map((c: any, idx) => (
        <LeaderboardRanking>
          <p>
            {(idx += 1)}: {c.wpm}
          </p>
          <p>{c.cpm}</p>
          <p>{c.correct}</p>
          <p>{c.incorrect}</p>
          <p>{c.corrections}</p>
        </LeaderboardRanking>
      ))}
    </LeaderboardGrid>
  )
})

export default Leaderboard
