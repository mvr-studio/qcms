import React from 'react'
import { Center } from '@chakra-ui/react'
import { Card } from '@mvr-studio/protochakra'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const CommonLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Center minHeight="100vh">
      <Card width="100%" maxWidth="32rem">
        {children}
      </Card>
    </Center>
  )
}

export default CommonLayout
