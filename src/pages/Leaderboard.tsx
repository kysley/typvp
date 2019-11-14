import React, {useState, useEffect} from 'react'
import {useQuery} from 'urql'
import {observer} from 'mobx-react-lite'

import LEADERBOARD from '@/graphql/queries/leaderboard'
import {
  LeaderboardGrid,
  LeaderboardRanking,
  LeaderboardHeader,
} from '@/styled/Leaderboard'
import {PageHeader} from '@/styled/Theme'

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
    <>
      <PageHeader>Leaderboard</PageHeader>
      <LeaderboardGrid>
        <LeaderboardHeader>
          <span>Pos</span>
          <span>wpm</span>
          <span>cpm</span>
          <span>correct</span>
          <span>incorrect</span>
          <span>corrections</span>
        </LeaderboardHeader>
        {leaderboard.map((c: any, idx) => (
          <LeaderboardRanking key={c.id}>
            <p>{(idx += 1)}</p>
            <p>{c.wpm}</p>
            <p>{c.cpm}</p>
            <p>{c.correct}</p>
            <p>{c.incorrect}</p>
            <p>{c.corrections}</p>
          </LeaderboardRanking>
        ))}
      </LeaderboardGrid>
    </>
  )
})

export default Leaderboard
