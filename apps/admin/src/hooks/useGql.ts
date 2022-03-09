import { GraphQLClient } from 'graphql-request'
import { getSdkWithHooks } from 'gql'

const client = new GraphQLClient('http://localhost:3000/graphql', {
  credentials: 'include',
  mode: 'cors'
})

const useGql = () => {
  const sdk = getSdkWithHooks(client)

  return sdk
}

export default useGql
