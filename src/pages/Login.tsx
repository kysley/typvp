import React, {FC, useEffect} from 'react'
import useForm from 'react-hook-form'
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

interface ILoginSchema {
  username: string
  password: string
}

const Login: FC = props => {
  const {UserStore} = useStore()
  const [mutation, execMutation] = useMutation(LOGIN)
  const {formState, register, handleSubmit, errors} = useForm<ILoginSchema>({
    validationSchema: loginSchema,
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
      props.history.push('/')
    }
  }, [mutation])

  return (
    <SignupFormContainer>
      <div>
        {mutation.data && mutation.error && (
          <p>something went wrong while logging you in</p>
        )}
      </div>
      <SignupForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            name="username"
            hasWarning={!!errors.username}
            ref={register}
            type="text"
            autoComplete="off"
          />
          {errors.username && <div>{errors.username}</div>}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            type="password"
            hasWarning={!!errors.password}
            ref={register}
            autoComplete="current-password"
          />
          {errors.password && <div>{errors.password}</div>}
        </div>
        <Button
          intent="none"
          appearance="primary"
          disabled={!formState.isValid}
          type="submit"
        >
          Login
        </Button>
      </SignupForm>
    </SignupFormContainer>
  )
}

export default Login
