import React, {FC, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {useHistory} from 'react-router'

import {useStore} from '@/stores'
import {
  ProfileGrid,
  ProfileHeader,
  ProfileValue,
  AboutArea,
  ResultsArea,
  ResultWrapper,
  ResultHeader,
  ResultValue,
} from '@/styled/MyProfile'

const MyProfile: FC = observer(() => {
  const {UserStore} = useStore()
  const history = useHistory()

  if (UserStore.me === undefined) {
    history.push('/login')
  }

  console.log(UserStore.me)

  return (
    <ProfileGrid>
      <AboutArea>
        <p>
          <ProfileHeader>username</ProfileHeader>
          <ProfileValue>{UserStore.me!.username}</ProfileValue>
        </p>
        <p>
          <ProfileHeader>last seen</ProfileHeader>
          <ProfileValue>{UserStore.me!.lastSeen || 'n/a'}</ProfileValue>
        </p>
        <p>
          <ProfileHeader>last played</ProfileHeader>
          <ProfileValue>{UserStore.me!.lastPlayed || 'n/a'}</ProfileValue>
        </p>
      </AboutArea>
      <ResultsArea>
        {UserStore.me!.results.map((result: any) => (
          <ResultWrapper>
            <p>{result.type}</p>
            <ResultHeader>wpm</ResultHeader>
            <ResultValue>{result.wpm}</ResultValue>
            <ResultHeader>cpm</ResultHeader>
            <ResultValue>{result.cpm}</ResultValue>
            <ResultHeader>cpm(raw)</ResultHeader>
            <ResultValue>{result.rawCpm}</ResultValue>
            <ResultHeader>corr</ResultHeader>
            <ResultValue>{result.correct}</ResultValue>
            <ResultHeader>incorr</ResultHeader>
            <ResultValue>{result.incorrect}</ResultValue>
            <ResultHeader>crrns</ResultHeader>
            <ResultValue>{result.corrections}</ResultValue>
            <ResultHeader>cmpltns</ResultHeader>
            <ResultValue>{result.wordIndex}</ResultValue>
          </ResultWrapper>
        ))}
      </ResultsArea>
    </ProfileGrid>
  )
})

export default MyProfile
