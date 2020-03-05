import React, {FC, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {Redirect} from 'react-router'
import TimeAgo from 'timeago-react'
import {useQuery, useMutation} from 'urql'

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
import {MY_RESULTS} from '@/graphql/queries'
import Pagination from '@/components/Pagination'
import {PageHeader} from '@/styled/Theme'
import {Bubble} from '@/components/Bubble'
import {Banner} from '@/components/Banner'
import InlineEditable from '@/components/InlineEditable'
import {UPDATE_COLOR} from '@/graphql/mutations'

function normalizeHexCode(hexCode: string) {
  if (!hexCode.startsWith('#')) hexCode = `#${hexCode}`
  if (hexCode.length === 1) return ''
  return hexCode
}

const MyProfile: FC = observer(() => {
  const {UserStore} = useStore()
  const [pagination, setPagination] = useState({
    first: 15,
    skip: 0,
    date: 'createdAt_DESC',
    type: '',
  })
  const [result] = useQuery({
    query: MY_RESULTS,
    requestPolicy: 'cache-first',
    variables: {
      ...pagination,
    },
  })

  const [, execMutation] = useMutation(UPDATE_COLOR)

  useEffect(() => {
    if (result.data) {
      const {
        data: {
          me: {filterResults},
        },
      } = result
      // console.log(me)
      if (UserStore.me) {
        // UserStore.me!.results = results
        if (
          pagination.type === '' &&
          filterResults.length > (UserStore.me!.testCount || 0)
        ) {
          UserStore.me!.testCount = filterResults.length
        }
      }
    }
  }, [result.data])

  const handleColorUpdate = async (colorCallback: string) => {
    const {
      data: {updateAccountColor: account},
    } = await execMutation({
      color: normalizeHexCode(colorCallback),
    })
    console.log(account)
    UserStore.me = {...UserStore.me, ...account} as any
  }

  if (UserStore.me === undefined && !UserStore.fetchingUser) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <PageHeader>My Profile</PageHeader>
      {UserStore.me && (
        <>
          {!UserStore.me.confirmed && (
            <Banner
              title="Account Verification Pending"
              intent="warning"
              message="We recommend confirming your email address to verify your typvp account."
            />
          )}
          <ProfileGrid>
            <AboutArea color={UserStore.me.color}>
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
                <ProfileHeader>started</ProfileHeader>
                <ProfileValue>
                  <TimeAgo datetime={UserStore.me.createdAt} />
                </ProfileValue>
              </div>
              <div>
                <ProfileHeader>color</ProfileHeader>
                <ProfileValue>
                  <InlineEditable
                    currentValue={UserStore.me.color || 'Not Set'}
                    onConfirm={handleColorUpdate}
                  />
                </ProfileValue>
              </div>
            </AboutArea>
            <ResultsArea>
              <ResultFilter>
                <div>
                  <label>Sort by:</label>
                  <Bubble
                    values={[
                      {
                        name: 'Date Taken (New First)',
                        value: 'createdAt_DESC',
                      },
                      {name: 'Date Taken (Old First)', value: 'createdAt_ASC'},
                    ]}
                    callback={opt =>
                      setPagination(prev => {
                        return {...prev, date: opt.value}
                      })
                    }
                  />
                  <label>Filter by:</label>
                  <Bubble
                    values={[
                      {name: 'All', value: ''},
                      {name: 'Singleplayer', value: 'SINGLEPLAYER'},
                      {name: 'Trial', value: 'TRIAL'},
                    ]}
                    callback={opt =>
                      setPagination(prev => {
                        return {...prev, type: opt.value}
                      })
                    }
                  />
                </div>
                <Pagination
                  totalRecords={
                    (result.data && result.data.me.testCountByType) ||
                    UserStore.me.testCount
                  }
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
                  {result.data.me.filterResults &&
                    result.data.me.filterResults.map((result: any) => (
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
          </ProfileGrid>
        </>
      )}
    </>
  )
})

export default MyProfile
