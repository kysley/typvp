import React, {FC, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import useForm from 'react-hook-form'
import {useMutation} from 'urql'

import {loginSchema} from '@/helpers/validation'
import {Input, Label} from '@/styled/TextInput'
import {SignupForm, SignupFormContainer, FormErrorMsg} from '@/styled/Forms'
import Button from '@/styled/Button'
import {useStore} from '@/stores'
import LOGIN from '@/graphql/mutations/login'

const initialValues = {
  username: '',
  password: '',
}

interface ILoginSchema {
  username: string
  password: string
}

const Login: FC = () => {
  const history = useHistory()
  const {UserStore} = useStore()
  const [mutation, execMutation] = useMutation(LOGIN)
  const {formState, register, handleSubmit, errors} = useForm<ILoginSchema>({
    validationSchema: loginSchema,
    mode: 'onBlur',
  })

  const onSubmit = async (values: ILoginSchema) => {
    await execMutation({
      username: values.username,
      password: values.password,
    })
  }

  useEffect(() => {
    console.log(mutation)
    if (mutation.data && !mutation.error) {
      const {
        data: {
          login: {account, token},
        },
      } = mutation
      UserStore.login(token, account)
      history.push('/')
    }
  }, [mutation])

  return (
    <SignupFormContainer>
      <h1>Welcome back!</h1>
      <p>Log In to your typvp account.</p>
      <div>
        {!mutation.data && mutation.error && (
          <p>something went wrong while logging you in</p>
        )}
      </div>
      <SignupForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            placeholder="Username"
            name="username"
            hasWarning={!!errors.username}
            ref={register}
            type="text"
            autoComplete="off"
          />
          {errors.username && (
            <FormErrorMsg>{errors.username.message}</FormErrorMsg>
          )}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            placeholder="Password"
            name="password"
            type="password"
            hasWarning={!!errors.password}
            ref={register}
            autoComplete="current-password"
          />
          {errors.password && (
            <FormErrorMsg>{errors.password.message}</FormErrorMsg>
          )}
        </div>
        <Button
          intent="none"
          appearance="primary"
          disabled={!formState.isValid}
          type="submit"
        >
          Log In
        </Button>
      </SignupForm>
    </SignupFormContainer>
  )
}

export default Login
