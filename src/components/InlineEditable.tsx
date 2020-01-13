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

const InlineEditable: FC<InlineEditableProps> = ({
  onCancel = () => {},
  onConfirm = () => {},
  currentValue = '',
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(currentValue)

  const composedHandleCancel = () => {
    setIsEditing(false)
    onCancel()
  }

  const composedHandleConfirm = () => {
    setIsEditing(false)
    onConfirm(value)
  }

  return (
    <>
      {!isEditing ? (
        <span
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
            marginLeft: '0.5em',
          }}
          onClick={() => setIsEditing(true)}
        >
          Edit
        </span>
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
            />
            <Button
              intent="none"
              appearance="primary"
              onClick={composedHandleConfirm}
            >
              Save
            </Button>
            <Button
              intent="danger"
              appearance="link"
              onClick={composedHandleCancel}
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
