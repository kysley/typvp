import React, {FC, useEffect} from 'react'
import useFormal from '@kevinwolf/formal-web'
import {useMutation} from 'urql'

import {registerSchema} from '@/helpers/validation'
import {Input, Label} from '@/styled/TextInput'
import {SignupForm, SignupFormContainer} from '@/styled/Forms'
import Button from '@/styled/Button'
import {useStore} from '@/stores'
// import SIGNUP from '@/graphql/mutations/signup'

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Login: FC = props => {
  const [mutation, execMutation] = useMutation(null)
  const formal = useFormal(initialValues, {
    schema: registerSchema,
    onSubmit: async values => {
      console.log(values)
      await execMutation({
        username: values.username,
        email: values.email,
        password: values.password,
      })
    },
  })
  const {UserStore} = useStore()

  useEffect(() => {
    console.log(mutation)
  }, [mutation])

  return (
    <SignupFormContainer>
      <div>{mutation.data && !mutation.error && <p>account created!</p>}</div>
      <div>
        {mutation.data && mutation.error && (
          <p>something went wrong while creating your account</p>
        )}
      </div>
      <SignupForm {...formal.getFormProps()}>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            hasWarning={formal.errors.username}
            {...formal.getFieldProps('username')}
            type="text"
          />
          {formal.errors.username && <div>{formal.errors.username}</div>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input {...formal.getFieldProps('email')} type="text" />
          {formal.errors.email && <div>{formal.errors.email}</div>}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input {...formal.getFieldProps('password')} type="text" />
          {formal.errors.password && <div>{formal.errors.password}</div>}
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input {...formal.getFieldProps('confirmPassword')} type="text" />
          {formal.errors.confirmPassword && (
            <div>{formal.errors.confirmPassword}</div>
          )}
        </div>
        <Button
          intent="none"
          appearance="primary"
          {...formal.getSubmitButtonProps()}
          type="submit"
        >
          Submit
        </Button>
      </SignupForm>
    </SignupFormContainer>
  )
}

export default Login
