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
import {ACCOUNT_RESULTS} from '@/graphql/queries'
import Pagination from '@/components/Pagination'
import {PageHeader} from '@/styled/Theme'
import {Bubble} from '@/components/Bubble'
import {Banner} from '@/components/Banner'
import InlineEditable from '@/components/InlineEditable'
import {UPDATE_ACCOUNT} from '@/graphql/mutations'
import {
  UpdateAccountMutation,
  MutationUpdateAccountArgs,
  AccountResultsQueryVariables,
  OrderByArg,
  AccountResultsQuery,
  ResultType,
  Test,
} from '@/generated/graphql'
import {client} from '@/services/Client'

function normalizeHexCode(hexCode: string) {
  if (!hexCode.startsWith('#')) hexCode = `#${hexCode}`
  if (hexCode.length === 1) return ''
  return hexCode
}

const MyProfile: FC = observer(() => {
  const {UserStore} = useStore()
  const [pagination, setPagination] = useState<AccountResultsQueryVariables>({
    first: 15,
    skip: 0,
    orderBy: {createdAt: OrderByArg.Desc},
    where: {},
    id: '',
  })
  const [results, setResults] = useState<{
    count: number
    results: Partial<Test>[]
  }>({
    count: 0,
    results: [],
  })

  const [, execMutation] = useMutation<UpdateAccountMutation>(UPDATE_ACCOUNT)

  useEffect(() => {
    let didCancel = false

    async function fetch(id: string) {
      const res = await client
        .query<AccountResultsQuery>(ACCOUNT_RESULTS, {
          ...pagination,
          id,
        } as AccountResultsQueryVariables)
        .toPromise()

      if (!didCancel) {
        if (res.data) {
          const {count, results} = res.data.accountResults
          setResults({count, results})
        }
      }
    }

    console.log(UserStore.me)
    if (UserStore.me) {
      fetch(UserStore.me.id!)
    }

    return () => {
      didCancel = true
    }
  }, [UserStore.me, pagination])

  const handleColorUpdate = async (colorCallback: string) => {
    const res = await execMutation({
      data: {
        color: normalizeHexCode(colorCallback),
      },
    } as MutationUpdateAccountArgs)

    if (res.data) {
      UserStore.me = {...UserStore.me, ...res.data.updateAccount}
    }
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
                {/* <ProfileValue>{UserStore.me.testCount || 'n/a'}</ProfileValue> */}
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
                        value: OrderByArg.Desc,
                      },
                      {name: 'Date Taken (Old First)', value: OrderByArg.Asc},
                    ]}
                    callback={opt =>
                      setPagination(prev => {
                        return {...prev, orderBy: {createdAt: opt.value}}
                      })
                    }
                  />
                  <label>Filter by:</label>
                  <Bubble
                    values={[
                      {name: 'All', value: undefined},
                      {name: 'Singleplayer', value: ResultType.Singleplayer},
                      {name: 'Trial', value: ResultType.Trial},
                    ]}
                    callback={opt =>
                      setPagination(prev => {
                        return {
                          ...prev,
                          where: {...prev.where, type: {equals: opt.value}},
                        }
                      })
                    }
                  />
                </div>
                <Pagination
                  totalRecords={results.count}
                  pageLimit={15}
                  pageNeighbours={1}
                  onPageChanged={data => {
                    setPagination(prev => {
                      return {...prev, skip: (data.currentPage - 1) * 15}
                    })
                  }}
                />
              </ResultFilter>
              {results.results.map((result: any) => (
                <ResultWrapper key={result.id}>
                  <p>
                    {result.type} | <TimeAgo datetime={result.createdAt} />
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
            </ResultsArea>
          </ProfileGrid>
        </>
      )}
    </>
  )
})

export default MyProfile
