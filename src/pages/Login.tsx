import React, {FC, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {useMutation} from 'urql'

import {loginSchema} from '@/helpers/validation'
import {Input, Label} from '@/styled/TextInput'
import {SignupForm, SignupFormContainer, FormErrorMsg} from '@/styled/Forms'
import Button from '@/styled/Button'
import {useStore} from '@/stores'
import LOGIN from '@/graphql/mutations/login'

interface ILoginSchema {
  username: string
  password: string
}

export function containsError(errors: any, formState: any, name: string) {
  console.log(formState)
  // if (formState.touched.includes(name)) {
  //   if (!!errors[name]) {
  //     return true
  //   }
  // }
  return false
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
      <h1>Hey Speed Typer</h1>
      <p>Log In to your typvp account.</p>
      <div>
        {!mutation.data && mutation.error && (
          <p>{mutation.error.graphQLErrors[0].message}</p>
        )}
      </div>
      <SignupForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            // placeholder="Username"
            name="username"
            hasWarning={containsError(errors, formState, 'username')}
            ref={register}
            type="text"
            autoComplete="off"
          />
          {containsError(errors, formState, 'username') && (
            <FormErrorMsg>{errors.username!.message}</FormErrorMsg>
          )}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            // placeholder="Password"
            name="password"
            type="password"
            hasWarning={containsError(errors, formState, 'password')}
            ref={register}
            autoComplete="current-password"
          />
          {containsError(errors, formState, 'password') && (
            <FormErrorMsg>{errors.password!.message}</FormErrorMsg>
          )}
        </div>
        <Button
          intent="none"
          appearance="primary"
          disabled={!formState.dirty}
          type="submit"
        >
          Log In
        </Button>
      </SignupForm>
    </SignupFormContainer>
  )
}

export default Login
