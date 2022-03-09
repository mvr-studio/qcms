import React, { useEffect } from 'react'
import { AppView } from 'types'
import { navigate, useParams } from '@reach/router'
import { useGql } from 'hooks'
import { Box, Button, Flex, Heading, HStack, useToast } from '@chakra-ui/react'
import { DataTable } from '@mvr-studio/protochakra'
import sanitizeColumns from 'domains/Dashboard/utils/sanitizeColumns'
import { FiFilter, FiPlus } from 'react-icons/fi'
import getObjectDefinition from 'domains/Dashboard/utils/getObjectDefinition'
import useIndexViewStore from '../../store/indexViewStore'
import shallow from 'zustand/shallow'

const ObjectAllView: AppView = () => {
  const gql: any = useGql()
  const params = useParams()
  const { collection } = params
  const toast = useToast()

  const { data, error } = gql.useQcmsQuery('qcms')
  const isSchemaLoading = !data && !error
  const qcms = data?.qcms
  const objectDefinition = qcms && getObjectDefinition(qcms, collection)
  const columns = objectDefinition?.fields && sanitizeColumns({ fields: objectDefinition?.fields, collection })

  const { items, areItemsLoading, fetchItems } = useIndexViewStore(
    (state) => ({
      items: state.items,
      areItemsLoading: state.areItemsLoading,
      fetchItems: state.fetchItems
    }),
    shallow
  )

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        await fetchItems({ gql, collection })
      } catch {
        toast({
          status: 'error',
          title: 'Collection not found'
        })
        navigate('/dashboard')
      }
    }
    fetchCollection()
  }, [collection])

  if (isSchemaLoading || areItemsLoading) return null

  return (
    <Box>
      <Flex align="center" justify="space-between" marginBottom="1rem">
        <HStack gridGap="1rem">
          <Heading size="md" textTransform="capitalize">
            {collection}
          </Heading>
          <Button leftIcon={<FiPlus />}>Create</Button>
        </HStack>
        <Button leftIcon={<FiFilter />}>Filter</Button>
      </Flex>
      <DataTable columns={columns} data={items} />
    </Box>
  )
}

export default ObjectAllView
