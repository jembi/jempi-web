import { MoreHorizOutlined } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Container, Link } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { MakeGenerics, useSearch } from '@tanstack/react-location'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import ApiClient from '../../services/ApiClient'
import SearchResulstProps from '../../types/SearchResults'
import { SearchQuery } from '../../types/SimpleSearch'
import Loading from '../common/Loading'
import PageHeader from '../shell/PageHeader'

type SearchResultProps = MakeGenerics<{
  Search: {
    parameters: SearchQuery
  }
}>

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Golden ID',
    minWidth: 150,
    flex: 2,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: GridRenderCellParams<string>) => {
      return (
        <Link
          key={params.row.id}
        >
          {params.row.id}
        </Link>
      )
    }
    
  },
  {
    field: 'firstName',
    headerName: 'First Name',
    minWidth: 150,
    flex: 2,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    minWidth: 150,
    flex: 2,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'gender',
    headerName: 'Gender',
    minWidth: 150,
    flex: 2,
    align: 'center',
    headerAlign: 'center'
  }
]

const SearchResult: React.FC = () => {
  const searchParams = useSearch<SearchResultProps>()
  const { data, error, isLoading, isError } = useQuery<
    SearchResulstProps[],
    AxiosError
  >({
    queryKey: ['searchResult', searchParams],
    queryFn: () => {
      return ApiClient.postSimpleSearchQuery(searchParams.parameters!)
    },
    refetchOnWindowFocus: false
  })

  if (isLoading) {
    return <Loading />
  }

  console.log(data)

  return (
    <Container>
      <PageHeader
        description="All Records."
        title="Patient Search Results"
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

      <DataGrid
        columns={columns}
        rows={data!}
        pageSize={10}
        rowsPerPageOptions={[10]}
        sx={{ maxWidth: 1400, mt: 4 }}
        autoHeight={true}
      />
    </Container>
  )
}

export default SearchResult
