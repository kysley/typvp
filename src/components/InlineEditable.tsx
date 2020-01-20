import React, {FC, useState} from 'react'
import styled from 'styled-components'

import Button from '@/styled/Button'
import {Input} from '@/styled/TextInput'

type InlineEditableProps = {
  onCancel?: (...args: any[]) => any
  onConfirm: (...args: any[]) => any
  currentValue: string
}

const IEContainer = styled.div`
  display: grid;
  > input {
    grid-column: span 2;
    grid-row: 1;
    margin-bottom: 0.25em;
  }
  > button {
    grid-row: 2;
  }
`

const IEButton = styled.button`
  text-decoration: underline;
  color: ${({theme}) => theme.colors.text};
  background: 0;
  outline: 0;
  border: 0;
  cursor: pointer;
`

const InlineEditable: FC<InlineEditableProps> = ({
  onCancel = () => {},
  onConfirm = () => {},
  currentValue = '',
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(currentValue)

  const composedHandleCancel = (e: any) => {
    e.preventDefault()
    setIsEditing(false)
    onCancel()
  }

  const composedHandleConfirm = (e: any) => {
    e.preventDefault()
    setIsEditing(false)
    onConfirm(value)
  }

  return (
    <>
      {!isEditing ? (
        <>
          <span>{currentValue}</span>
          <IEButton
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              setIsEditing(true)
            }}
          >
            Edit
          </IEButton>
        </>
      ) : (
        <>
          <IEContainer>
            <Input
              name="color"
              type="text"
              autoComplete="off"
              autoFocus={true}
              placeholder={currentValue}
              value={value}
              onChange={e => setValue(e.target.value)}
              onClick={e => e.preventDefault()}
            />
            <Button
              intent="none"
              appearance="primary"
              onClick={e => composedHandleConfirm(e)}
            >
              Save
            </Button>
            <Button
              intent="danger"
              appearance="link"
              onClick={e => composedHandleCancel(e)}
            >
              Cancel
            </Button>
          </IEContainer>
        </>
      )}
    </>
  )
}

export default InlineEditable
