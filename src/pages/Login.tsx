import React, {FC, useEffect} from 'react'
import useFormal from '@kevinwolf/formal-web'
import {useMutation} from 'urql'

import {loginSchema} from '@/helpers/validation'
import {Input, Label} from '@/styled/TextInput'
import {SignupForm, SignupFormContainer} from '@/styled/Forms'
import Button from '@/styled/Button'
import {useStore} from '@/stores'
import LOGIN from '@/graphql/mutations/login'

const initialValues = {
  username: '',
  password: '',
}

const Login: FC = props => {
  const {UserStore} = useStore()
  const [mutation, execMutation] = useMutation(LOGIN)
  const formal = useFormal(initialValues, {
    schema: loginSchema,
    onSubmit: async values => {
      console.log(values)
      await execMutation({
        username: values.username,
        password: values.password,
      })
    },
  })

  useEffect(() => {
    console.log(mutation)
    if (mutation.data && !mutation.error) {
      const {
        data: {
          login: {account, token},
        },
      } = mutation
      UserStore.login(token, account)
      console.log(UserStore)
    }
  }, [mutation])

  return (
    <SignupFormContainer>
      <div>
        {mutation.data && mutation.error && (
          <p>something went wrong while logging you in</p>
        )}
      </div>
      <SignupForm {...formal.getFormProps()}>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            hasWarning={formal.errors.username}
            {...formal.getFieldProps('username')}
            type="text"
            autoComplete="off"
          />
          {formal.errors.username && <div>{formal.errors.username}</div>}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input {...formal.getFieldProps('password')} type="password" />
          {formal.errors.password && <div>{formal.errors.password}</div>}
        </div>
        <Button
          intent="none"
          appearance="primary"
          {...formal.getSubmitButtonProps()}
          type="submit"
        >
          Login
        </Button>
      </SignupForm>
    </SignupFormContainer>
  )
}

export default Login
