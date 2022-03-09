import React, { useEffect } from 'react'
import { Grid, Flex, Box, Spinner, Center } from '@chakra-ui/react'
import TopBar from '../TopBar'
import Sidebar from '../Sidebar'
import { useGql } from 'hooks'
import { navigate } from '@reach/router'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const gql = useGql()
  const { data: meData, error: meError } = gql.useMeQuery('me')
  const isLoadingMe = !meData && !meError

  useEffect(() => {
    if (!isLoadingMe && !meData) navigate('/login')
  }, [isLoadingMe, meData])

  if (isLoadingMe) {
    return (
      <Center minHeight="100vh">
        <Spinner boxSize="4rem" />
      </Center>
    )
  }

  return (
    <Grid gridTemplateColumns="1fr 5fr" minHeight="100vh">
      <Sidebar />
      <Flex direction="column" borderLeft="1px solid" borderColor="gray.200" backgroundColor="gray.50">
        <TopBar />
        <Box flex={1} padding="1rem">
          {children}
        </Box>
      </Flex>
    </Grid>
  )
}

export default DashboardLayout
