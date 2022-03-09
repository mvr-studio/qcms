import React from 'react'
import { Stack, Button, Text, Skeleton, Icon, HStack, Avatar } from '@chakra-ui/react'
import { useGql } from 'hooks'
import { Link, useLocation } from '@reach/router'
import { FiHome, FiList } from 'react-icons/fi'
import { ReactComponent as QcmsLogo } from 'assets/logo.svg'

const Sidebar = () => {
  const location = useLocation()
  const gql = useGql()
  const { data, error } = gql.useQcmsQuery('qcms')
  const isLoading = !data && !error
  const qcms = data?.qcms

  const isPathActive = (pathname: string) => location.pathname === pathname

  return (
    <Stack padding="1rem" gridGap="2rem">
      <HStack>
        <QcmsLogo />
        <Text fontSize="1.25rem" fontWeight={700}>
          Admin
        </Text>
      </HStack>
      {isLoading ? (
        <Skeleton height="6rem" />
      ) : (
        <Stack>
          <Button
            as={Link}
            variant="ghost"
            to="/dashboard"
            textTransform="capitalize"
            leftIcon={<Icon as={FiHome} boxSize="1.5rem" />}
            justifyContent="flex-start"
            backgroundColor={isPathActive('/dashboard') ? 'primary.100' : 'transparent'}
            color={isPathActive('/dashboard') ? 'primary.800' : 'black'}
          >
            Dashboard
          </Button>
          {Object.values(qcms?.schema).map((object: any) => (
            <Button
              as={Link}
              variant="ghost"
              key={object.plural}
              to={`/dashboard/${object.plural}`}
              textTransform="capitalize"
              leftIcon={<Avatar name={object.plural} size="xs" borderRadius="0.5rem" />}
              justifyContent="flex-start"
              backgroundColor={isPathActive(`/dashboard/${object.plural}`) ? 'primary.100' : 'transparent'}
              color={isPathActive(`/dashboard/${object.plural}`) ? 'primary.800' : 'black'}
            >
              {object.plural}
            </Button>
          ))}
        </Stack>
      )}
    </Stack>
  )
}

export default Sidebar
