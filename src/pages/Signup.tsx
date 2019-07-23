import React, {FC, useEffect} from 'react'
import useForm from 'react-hook-form'
import {useMutation} from 'urql'

import {registerSchema} from '@/helpers/validation'
import {Input, Label} from '@/styled/TextInput'
import {SignupForm, SignupFormContainer} from '@/styled/Forms'
import Button from '@/styled/Button'
import {useStore} from '@/stores'
import SIGNUP from '@/graphql/mutations/signup'

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

interface ISignupSchema {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Signup: FC = props => {
  const {UserStore} = useStore()
  const [mutation, execMutation] = useMutation(SIGNUP)
  const {formState, register, handleSubmit, errors} = useForm<ISignupSchema>({
    validationSchema: registerSchema,
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
      props.history.push('/')
    }
  }, [mutation])

  return (
    <SignupFormContainer>
      <div>{mutation.data && !mutation.error && <p>account created!</p>}</div>
      <div>
        {mutation.data && mutation.error && (
          <p>something went wrong while creating your account</p>
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
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            hasWarning={!!errors.email}
            ref={register}
            type="text"
            autoComplete="off"
          />
          {errors.email && <div>{errors.email}</div>}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            hasWarning={!!errors.password}
            type="password"
            autoComplete="new-password"
            ref={register}
          />
          {errors.password && <div>{errors.password}</div>}
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            name="confirmPassword"
            hasWarning={!!errors.confirmPassword}
            type="password"
            autoComplete="new-password"
            ref={register}
          />
          {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
        </div>
        <Button
          intent="none"
          appearance="primary"
          disabled={!formState.isValid && !formState.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </SignupForm>
    </SignupFormContainer>
  )
}

export default Signup
