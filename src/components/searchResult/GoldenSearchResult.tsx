import { MoreHorizOutlined } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Container, Link } from '@mui/material'
import Divider from '@mui/material/Divider'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSortDirection,
  GridSortModel
} from '@mui/x-data-grid'
import { MakeGenerics, useSearch } from '@tanstack/react-location'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import React from 'react'
import { useAppConfig } from '../../hooks/useAppConfig'
import ApiClient from '../../services/ApiClient'
import { Data } from '../../types/SearchResults'
import { SearchQuery } from '../../types/SimpleSearch'
import Loading from '../common/Loading'
import PageHeader from '../shell/PageHeader'

type ResultProps = MakeGenerics<{
  Search: {
    payload: SearchQuery
  }
}>

interface sortingPropertiesProps {
  sortBy: string
  order: GridSortDirection
}

const SearchResult: React.FC = () => {
  const searchParams = useSearch<ResultProps>()
  const { availableFields } = useAppConfig()

  const columns: GridColDef[] = availableFields.map(({ fieldName, fieldLabel }) => {
    return {
      field: fieldName,
      headerName: fieldName === 'uid' ? 'Golden ID' : fieldLabel,
      minWidth: 150,
      flex: 2,
      align: 'center',
      headerAlign: 'center',
      renderCell: fieldName === 'uid' ? (params: GridRenderCellParams<string>) => {
        return <Link href={`/golden-record/${params.row.uid}`}  key={params.row.uid}>{params.row.uid}</Link>
      }: undefined,
      filterable: false
    }
  })

  const [payload, setPayLoad] = React.useState<SearchQuery>(
    searchParams.payload!
  )

  const { data: patientRecord, isLoading } = useQuery<Data, AxiosError>({
    queryKey: ['searchResult', payload],
    queryFn: () => {
      return ApiClient.postSimpleSearchQuery(payload)
    },
    refetchOnWindowFocus: false
  })

  if (isLoading) {
    return <Loading />
  }

  const initialSortingValues: sortingPropertiesProps = {
    sortBy: '',
    order: 'asc'
  }
  const handleRequestToSort = (model: GridSortModel) => {
    const sortingProperties = model?.reduce(
      (acc, curr) => ({
        sortBy: curr.field,
        order: curr.sort
      }),
      initialSortingValues
    )

    const updatedPayload: SearchQuery = {
      ...payload!,
      sortAsc: sortingProperties?.order === 'asc' ? true : false,
      sortBy: sortingProperties?.sortBy
    }

    setPayLoad(updatedPayload)
  }

  return (
    <Container maxWidth={false}>
      <PageHeader
        description="Golden Records Only"
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
        rows={patientRecord!.records!.data!.map((row, index) => {
          return row.customGoldenRecord
        })}
        pageSize={10}
        sx={{ mt: 4 }}
        autoHeight={true}
        getRowId={row => row.uid}
        onSortModelChange={handleRequestToSort}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Container>
  )
}

export default SearchResult
