import { Badge, Button, HStack, IconButton, Text } from '@chakra-ui/react'
import { FiEdit2, FiLink, FiTrash2 } from 'react-icons/fi'
import { Link } from '@reach/router'

const updatedAtColumn = {
  Header: 'Updated At',
  accessor: 'updatedAt'
}

const createdAtColumn = {
  Header: 'Created At',
  accessor: 'createdAt'
}

interface SanitizeColumnsProps {
  fields: Record<string, string>[]
  collection: string
}

const sanitizeColumns = ({ fields, collection }: SanitizeColumnsProps) => {
  const idColumn = {
    Header: 'ID',
    accessor: 'id',
    Cell: (props: any) => {
      return (
        <Link to={`/dashboard/${collection}/${props.value}`}>
          <Badge maxWidth="5rem" isTruncated>
            {props.value}
          </Badge>
        </Link>
      )
    }
  }

  const actions = {
    id: 'actions',
    Cell: (props: any) => {
      const id = props?.data?.[0]?.id
      return (
        <HStack>
          <Link to={`/dashboard/${collection}/${id}`}>
            <IconButton icon={<FiEdit2 />} aria-label="Update" />
          </Link>
          <IconButton colorScheme="red" icon={<FiTrash2 />} aria-label="Delete" />
        </HStack>
      )
    }
  }

  const columns = fields?.map((field: Record<string, string>) => ({
    Header: field.name,
    accessor: field.name,
    Cell: (props: any) => {
      switch (typeof props.value) {
        case 'string':
        case 'number':
          return (
            <Text maxWidth="12rem" isTruncated>
              {props.value || '-'}
            </Text>
          )
        case 'object':
          if (props.value instanceof Array) {
            return (
              <Button variant="ghost" leftIcon={<FiLink />}>
                {props.value?.length || 0}
              </Button>
            )
          }
          return (
            <Badge colorScheme="primary" maxWidth="5rem" isTruncated>
              {props.value?.id}
            </Badge>
          )
        default:
          return '-'
      }
    }
  }))
  return [idColumn, ...columns, updatedAtColumn, createdAtColumn, actions]
}

export default sanitizeColumns
