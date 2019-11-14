import {useRef} from 'react'
import {useHistory, useLocation} from 'react-router'

export function useQueryParams() {
  const searchParams = useRef(new URLSearchParams(useLocation().search))
  const history = useHistory()

  const hasParam = (name: string) => {
    return searchParams.current.has(name)
  }

  const getParam = (name: string) => {
    return searchParams.current.get(name)
  }

  const addParam = (name: string, value: string) => {
    searchParams.current.append(name, value)
    history.push({
      search: searchParams.current.toString(),
    })
  }

  const setParam = (name: string, value: string) => {
    searchParams.current.set(name, value)
    history.push({
      search: searchParams.current.toString(),
    })
  }

  return {
    hasParam,
    getParam,
    setParam,
    addParam,
  }
}
