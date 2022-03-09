import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { AppView } from 'types'
import { SimpleForm } from '@mvr-studio/protochakra'
import { useGql } from 'hooks'
import { LogInUser_MutationMutationVariables } from 'gql'
import { navigate } from '@reach/router'

const FORM_FIELDS = [
  { label: 'Email Address', name: 'email', type: 'email', placeholder: 'your@email.com', isRequired: true },
  { label: 'Password', type: 'password', name: 'password', placeholder: '************', isRequired: true }
]

const Login: AppView = () => {
  const gql = useGql()

  const onSubmit = async (data: LogInUser_MutationMutationVariables) => {
    await gql.logInUser_mutation(data)
    navigate('/dashboard')
  }

  return (
    <Box>
      <Heading size="lg" marginBottom="1rem">
        Sign In
      </Heading>
      <SimpleForm fields={FORM_FIELDS} onSubmit={onSubmit as any} />
    </Box>
  )
}

export default Login
