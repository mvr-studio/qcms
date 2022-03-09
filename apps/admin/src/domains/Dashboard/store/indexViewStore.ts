import create from 'zustand'

interface FetchItemsProps {
  gql: any
  collection: string
}

interface IndexViewStore {
  items: any[]
  areItemsLoading: boolean
  fetchItems: ({ gql, collection }: FetchItemsProps) => void
}

const useIndexViewStore = create<IndexViewStore>((set) => ({
  items: [],
  areItemsLoading: true,
  fetchItems: async ({ gql, collection }) => {
    set({ items: [], areItemsLoading: true })
    const indexQuery = collection && gql[`${collection}_query`]
    const indexData = indexQuery && (await indexQuery())
    set({ items: indexData[collection], areItemsLoading: false })
  }
}))

export default useIndexViewStore
