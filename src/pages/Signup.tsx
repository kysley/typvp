import React, {FC, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {useMutation} from 'urql'
import {useHistory} from 'react-router-dom'

import {registerSchema} from '@/helpers/validation'
import {Input, Label} from '@/styled/TextInput'
import {SignupForm, SignupFormContainer, FormErrorMsg} from '@/styled/Forms'
import Button from '@/styled/Button'
import {useStore} from '@/stores'
import {SIGNUP} from '@/graphql/mutations'
import {containsError} from '@/pages/Login'

interface ISignupSchema {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Signup: FC = () => {
  const history = useHistory()
  const {UserStore} = useStore()
  const [mutation, execMutation] = useMutation(SIGNUP)
  const {formState, register, handleSubmit, errors} = useForm<ISignupSchema>({
    validationSchema: registerSchema,
    mode: 'onBlur',
  })

  const onSubmit = async (values: ISignupSchema) => {
    await execMutation({
      username: values.username,
      email: values.email,
      password: values.password,
    })
  }

  useEffect(() => {
    console.log(mutation)
    if (mutation.data && !mutation.error) {
      const {
        data: {
          signup: {account, token},
        },
      } = mutation
      UserStore.login(token, account)
      history.push('/')
    }
  }, [mutation])

  return (
    <SignupFormContainer>
      <h1>Ready, Set, Type!</h1>
      <p>Create your typvp account to track your results & more!</p>
      <p>
        <span style={{textDecoration: 'underline', fontWeight: 700}}>
          Note:{' '}
        </span>
        this is a beta release!
      </p>
      <div>{mutation.data && !mutation.error && <p>account created!</p>}</div>
      <div>
        {!mutation.data && mutation.error && (
          <p>{mutation.error.graphQLErrors[0].message}</p>
        )}
      </div>
      <SignupForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            name="username"
            hasWarning={containsError(errors, formState, 'username')}
            ref={register}
            type="text"
            autoComplete="off"
            autoFocus={true}
          />
          {containsError(errors, formState, 'username') && (
            <FormErrorMsg>{errors.username!.message}</FormErrorMsg>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            hasWarning={containsError(errors, formState, 'email')}
            ref={register}
            type="text"
            autoComplete="off"
          />
          {containsError(errors, formState, 'email') && (
            <FormErrorMsg>{errors.email!.message}</FormErrorMsg>
          )}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            hasWarning={containsError(errors, formState, 'password')}
            type="password"
            autoComplete="new-password"
            ref={register}
          />
          {containsError(errors, formState, 'password') && (
            <FormErrorMsg>{errors.password!.message}</FormErrorMsg>
          )}
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            name="confirmPassword"
            hasWarning={containsError(errors, formState, 'confirmPassword')}
            type="password"
            autoComplete="new-password"
            ref={register}
          />
          {containsError(errors, formState, 'confirmPassword') && (
            <FormErrorMsg>{errors.confirmPassword!.message}</FormErrorMsg>
          )}
        </div>
        <Button
          intent="none"
          appearance="primary"
          disabled={!formState.dirty && !formState.isSubmitting}
          type="submit"
        >
          Sign Up
        </Button>
      </SignupForm>
    </SignupFormContainer>
  )
}

export default Signup
