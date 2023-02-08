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
import { CustomSearchQuery, SearchQuery } from '../../types/SimpleSearch'
import Loading from '../common/Loading'
import PageHeader from '../shell/PageHeader'

type ResultProps = MakeGenerics<{
  Search: {
    payload: SearchQuery
  }
}>

type SearchResultProps = {
  isGoldenRecord: boolean
  title: string
  isCustomSearch: boolean
}

interface SortingPropertiesProps {
  sortBy: string
  order: GridSortDirection
}

const SearchResult: React.FC<SearchResultProps> = ({
  isGoldenRecord,
  title,
  isCustomSearch
}) => {
  const searchParams = useSearch<ResultProps>()
  const { availableFields } = useAppConfig()

  const columns: GridColDef[] = availableFields.map(
    ({ fieldName, fieldLabel }) => {
      return {
        field: fieldName,
        headerName: fieldName === 'uid' ? 'Golden ID' : fieldLabel,
        minWidth: 150,
        flex: 2,
        align: 'center',
        headerAlign: 'center',
        renderCell:
          fieldName === 'uid'
            ? (params: GridRenderCellParams<string>) => {
                return (
                  <Link
                    href={`/golden-record/${params.row.uid}`}
                    key={params.row.uid}
                  >
                    {params.row.uid}
                  </Link>
                )
              }
            : undefined,
        filterable: false
      }
    }
  )

  const [payload, setPayLoad] = React.useState<SearchQuery | CustomSearchQuery>(
    searchParams.payload!
  )
  console.log(isGoldenRecord)
  const { data: patientRecord, isLoading } = useQuery<Data, AxiosError>({
    queryKey: [isGoldenRecord ? 'golden-record' : 'patient-record', payload],
    queryFn: () => {
      if (isCustomSearch) {
        if (isGoldenRecord) {
          return ApiClient.postCustomSearchGoldenRecordQuery(
            payload as CustomSearchQuery
          )
        } else {
          return ApiClient.postCustomSearchPatientRecordQuery(
            payload as CustomSearchQuery
          )
        }
      } else {
        if (isGoldenRecord) {
          return ApiClient.postSimpleSearchGoldenRecordQuery(
            payload as SearchQuery
          )
        } else {
          return ApiClient.postSimpleSearchPatientRecordQuery(
            payload as SearchQuery
          )
        }
      }
    },
    refetchOnWindowFocus: false
  })

  if (isLoading) {
    return <Loading />
  }

  console.log(patientRecord)

  const initialSortingValues: SortingPropertiesProps = {
    sortBy: 'uid',
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

    const updatedPayload = {
      ...payload!,
      sortAsc: sortingProperties?.order === 'asc' ? true : false,
      sortBy: sortingProperties?.sortBy
    }

    setPayLoad(updatedPayload)
  }

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
        rows={patientRecord!.records!.data!.map((row, index) => {
          return row
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
