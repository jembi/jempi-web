import { MoreHorizOutlined } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Container, Link } from '@mui/material'
import Divider from '@mui/material/Divider'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSortModel
} from '@mui/x-data-grid'
import { MakeGenerics, useSearch } from '@tanstack/react-location'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import React, { useCallback, useMemo } from 'react'
import { useAppConfig } from '../../hooks/useAppConfig'
import ApiClient from '../../services/ApiClient'
import {
  ApiSearchResult,
  CustomSearchQuery,
  SearchQuery
} from '../../types/SimpleSearch'
import PageHeader from '../shell/PageHeader'

type UrlQueryParams = MakeGenerics<{
  Search: {
    payload: SearchQuery | CustomSearchQuery
  }
}>

type SearchResultProps = {
  isGoldenRecord: boolean
  title: string
}

const SearchResult: React.FC<SearchResultProps> = ({
  isGoldenRecord,
  title
}) => {
  const { payload: searchPayload } = useSearch<UrlQueryParams>()
  const [payload, setPayLoad] = React.useState<SearchQuery | CustomSearchQuery>(
    searchPayload!
  )
  const { availableFields } = useAppConfig()

  const columns: GridColDef[] = useMemo(
    () =>
      availableFields.map(({ fieldName, fieldLabel }) => {
        if (fieldName === 'uid') {
          return {
            field: fieldName,
            headerName: `${isGoldenRecord ? 'Golden ID' : 'Record ID'}`,
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params: GridRenderCellParams<string>) => {
              return isGoldenRecord ? (
                <Link
                  href={`/golden-record/${params.row.uid}`}
                  key={params.row.uid}
                >
                  {params.row.uid}
                </Link>
              ) : (
                <Link
                  href={`/patient-record/${params.row.uid}`}
                  key={params.row.uid}
                >
                  {params.row.uid}
                </Link>
              )
            },
            filterable: false
          }
        }
        return {
          field: fieldName,
          headerName: fieldLabel,
          minWidth: 150,
          flex: 2,
          align: 'center',
          headerAlign: 'center',
          filterable: false
        }
      }),
    [availableFields, isGoldenRecord]
  )

  const { data: searchResults, isLoading } = useQuery<
    ApiSearchResult,
    AxiosError
  >({
    queryKey: [isGoldenRecord ? 'golden-record' : 'patient-record', payload],
    queryFn: () => {
      return ApiClient.searchQuery(payload, isGoldenRecord)
    },
    refetchOnWindowFocus: false
  })

  const handleRequestToSort = useCallback(
    (model: GridSortModel) => {
      setPayLoad({
        ...payload!,
        sortAsc: model[0]?.sort === 'asc' ? true : false,
        sortBy: model[0]?.field
      })
    },
    [payload]
  )

  const handlePaginate = useCallback(
    (page: number) => {
      setPayLoad({
        ...payload,
        offset: page * payload.limit
      })
    },
    [setPayLoad, payload]
  )

  const handlePageSizeChange = useCallback(
    (size: number) => {
      setPayLoad({
        ...payload,
        limit: size
      })
    },
    [setPayLoad, payload]
  )

  return (
    <Container maxWidth={false}>
      <PageHeader
        description={title}
        title="Search Results"
        breadcrumbs={[
          {
            icon: <MoreHorizOutlined />
          },
          {
            icon: <SearchIcon />,
            title: 'Search'
          }
        ]}
      />
      <Divider />

      <DataGrid
        columns={columns}
        rows={searchResults ? searchResults.records.data : []}
        sx={{ mt: 4 }}
        autoHeight={true}
        getRowId={row => row.uid}
        onSortModelChange={handleRequestToSort}
        pagination
        rowsPerPageOptions={[
          payload.limit / 2,
          payload.limit,
          payload.limit * 2
        ]}
        pageSize={payload.limit}
        onPageChange={handlePaginate}
        onPageSizeChange={handlePageSizeChange}
        rowCount={searchResults?.records.pagination.total || 0}
        paginationMode="server"
        loading={isLoading}
      />
    </Container>
  )
}

export default SearchResult
