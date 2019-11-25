import React, {useContext, createContext, useReducer, useMemo} from 'react'

interface IToastContext {
  toasts: []
  add: (...args: any[]) => any
  remove: (...args: any[]) => any
}

const ToastContext = createContext<IToastContext>({
  toasts: [],
  add: () => {},
  remove: () => {},
})

export function useToast() {
  const {add, remove} = useContext(ToastContext)
  return {add, remove}
}

function toastReducer(toasts, action) {
  switch (action.type) {
    case 'remove':
      return toasts.filter(toast => toast.id !== action.id)
    case 'add':
      return [...toasts, action.toast]
    default:
      return
  }
}

export function ToastProvider({children}: any) {
  const [toasts, dispatch] = useReducer(toastReducer, [])

  const remove = (id: string) => dispatch({type: 'remove', id})

  const add = (message: string) => {
    const id = Math.random()
      .toString(36)
      .substring(2, 15)

    dispatch({type: add, toast: {id, message}})
    setTimeout(() => remove(id), 3000)
    return id
  }
  const contextValue = useMemo(() => ({add, remove, toasts}), [toasts])

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  )
}
