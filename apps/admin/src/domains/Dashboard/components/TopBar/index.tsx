import React from 'react'
import { Flex, Text, Stack, Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useGql } from 'hooks'
import { navigate } from '@reach/router'

const TopBar = () => {
  const gql = useGql()
  const { data } = gql.useMeQuery('me')
  const me = data?.me

  const logOut = async () => {
    await gql.logOutUser_mutation()
    navigate('/login')
  }

  return (
    <Flex justify="space-between" align="center" padding="0.5rem 1rem">
      <Text />
      <Stack>
        <Menu>
          <MenuButton>
            <Avatar name={me?.name || ''} size="sm" />
          </MenuButton>
          <MenuList>
            <MenuItem color="red.600" onClick={logOut}>
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </Flex>
  )
}

export default TopBar
