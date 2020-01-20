import React, {FC, useState} from 'react'
import styled from 'styled-components'

import Button from '@/styled/Button'
import {Input} from '@/styled/TextInput'
import {EditIcon} from '@/components/icons'

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
  color: ${({theme}) => theme.colors.text};
  background: 0;
  outline: 0;
  border: 0;
  cursor: pointer;
  display: flex;
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
        <div
          style={{display: 'inline-flex', cursor: 'auto'}}
          onClick={e => {
            e.preventDefault()
            setIsEditing(true)
          }}
        >
          <span>{currentValue}</span>
          <IEButton>
            <EditIcon />
          </IEButton>
        </div>
      ) : (
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
            intent="danger"
            appearance="link"
            onClick={e => composedHandleCancel(e)}
          >
            Cancel
          </Button>
          <Button
            intent="none"
            appearance="primary"
            onClick={e => composedHandleConfirm(e)}
          >
            Save
          </Button>
        </IEContainer>
      )}
    </>
  )
}

export default InlineEditable
