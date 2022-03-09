import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Router, Redirect } from '@reach/router'
import DashboardDomain from 'domains/Dashboard'
import CommonDomain from 'domains/Common'
import theme from '@mvr-studio/chakra-theme'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Redirect from="/" to="/dashboard" noThrow />
        <DashboardDomain path="/dashboard/*" />
        <CommonDomain path="*" />
      </Router>
    </ChakraProvider>
  )
}

export default App
