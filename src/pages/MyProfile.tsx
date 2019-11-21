import React, {FC, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {Redirect} from 'react-router'
import TimeAgo from 'timeago-react'
import {useQuery} from 'urql'

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
  ResultFilter,
} from '@/styled/MyProfile'
import {MY_RESULTS} from '@/graphql/queries/me'
import Pagination from '@/components/Pagination'
import {PageHeader} from '@/styled/Theme'
import {Bubble} from '@/components/Bubble'

const MyProfile: FC = observer(() => {
  const {UserStore} = useStore()
  const [pagination, setPagination] = useState({first: 15, skip: 0})
  const [result] = useQuery({
    query: MY_RESULTS,
    variables: {
      ...pagination,
    },
  })

  useEffect(() => {
    if (result.data) {
      const {
        data: {
          myResults: {results, testCount},
        },
      } = result
      if (UserStore.me) {
        UserStore.me!.results = results
        if (UserStore.me!.testCount !== testCount) {
          UserStore.me!.testCount = testCount
        }
      }
    }
  }, [result.data])

  if (UserStore.me === undefined && !UserStore.fetchingUser) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <PageHeader>My Profile</PageHeader>
      <ProfileGrid>
        {UserStore.me && (
          <>
            <AboutArea>
              <div>
                <ProfileHeader>username</ProfileHeader>
                <ProfileValue>{UserStore.me.username}</ProfileValue>
              </div>
              <div>
                <ProfileHeader>tests taken</ProfileHeader>
                <ProfileValue>{UserStore.me.testCount || 'n/a'}</ProfileValue>
              </div>
              <div>
                <ProfileHeader>last seen</ProfileHeader>
                <ProfileValue>
                  {UserStore.me.lastSeen ? (
                    <TimeAgo datetime={UserStore.me.lastSeen} />
                  ) : (
                    'n/a'
                  )}
                </ProfileValue>
              </div>
              <div>
                <ProfileHeader>last played</ProfileHeader>
                <ProfileValue>{UserStore.me.lastPlayed || 'n/a'}</ProfileValue>
              </div>
              <div>
                <ProfileHeader>created</ProfileHeader>
                <ProfileValue>
                  <TimeAgo datetime={UserStore.me.createdAt} />
                </ProfileValue>
              </div>
            </AboutArea>
            <ResultsArea>
              <ResultFilter>
                <div>
                  <label>Sort by</label>
                  <Bubble
                    values={[
                      {
                        name: 'Date Taken (New First)',
                        value: 'createdAt_DESC',
                      },
                      {name: 'Date Taken (Old First)', value: 'createdAt_ASC'},
                    ]}
                    callback={opt => console.log(opt)}
                  />
                  <Bubble
                    values={[
                      {name: 'All', value: ''},
                      {name: 'Singleplayer', value: 'SINGLEPLAYER'},
                      {name: 'Trial', value: 'TRIAL'},
                    ]}
                    callback={opt => console.log(opt)}
                  />
                </div>
                <Pagination
                  totalRecords={UserStore.me.testCount}
                  pageLimit={15}
                  pageNeighbours={1}
                  onPageChanged={data => {
                    setPagination(prev => {
                      return {...prev, skip: (data.currentPage - 1) * 15}
                    })
                  }}
                />
              </ResultFilter>
              {!result.fetching && (
                <>
                  {UserStore.me.results &&
                    UserStore.me.results.map((result: any) => (
                      <ResultWrapper key={result.id}>
                        <p>
                          {result.type} |{' '}
                          <TimeAgo datetime={result.createdAt} />
                        </p>
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
                </>
              )}
            </ResultsArea>
          </>
        )}
      </ProfileGrid>
    </>
  )
})

export default MyProfile
