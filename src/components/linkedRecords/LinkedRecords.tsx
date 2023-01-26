import { People } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Button, Card, Divider, Typography } from '@mui/material'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { useMatch } from '@tanstack/react-location'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAppConfig } from '../../hooks/useAppConfig'
import ApiClient from '../../services/ApiClient'
import { PatientRecord } from '../../types/PatientRecord'
import Loading from '../common/Loading'
import ApiErrorMessage from '../error/ApiErrorMessage'
import NotFound from '../error/NotFound'
import PageHeader from '../shell/PageHeader'

const LinkedRecords = () => {
  const {
    data: { uid }
  } = useMatch()
  const { getFieldsByGroup } = useAppConfig()
  const columns: GridColumns = getFieldsByGroup('linked_records').map(
    ({ fieldName, fieldLabel, formatValue }) => {
      return {
        field: fieldName,
        headerName: fieldLabel,
        flex: 1,
        valueFormatter: ({ value }) => formatValue(value),
        sortable: false,
        disableColumnMenu: true
      }
    }
  )

  const { data, isLoading, isError, error } = useQuery<
    PatientRecord[],
    AxiosError
  >({
    queryKey: ['linked_patient'],
    queryFn: async () => await ApiClient.getLinkedRecords(uid as string),
    refetchOnWindowFocus: false
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ApiErrorMessage error={error} />
  }

  if (!data) {
    return <NotFound />
  }

  return (
    <>
      <PageHeader
        description={uid as string}
        title={'Bob smith'}
        breadcrumbs={[
          {
            icon: <SearchIcon />,
            title: 'Search Results'
          },
          {
            icon: <People />,
            title: 'Linked Records'
          }
        ]}
        buttons={[
          <Button
            variant="contained"
            sx={{
              height: '36px',
              width: '152px',
              borderColor: theme => theme.palette.primary.main
            }}
            href={`/patient/${uid}`}
          >
            <Typography variant="button">BACK TO RECORD</Typography>
          </Button>
        ]}
      />
      <Divider />
      <Card
        sx={{
          marginTop: '33px',
          background: '#FFFFFF',
          boxShadow: '0px 0px 0px 1px #E0E0E0',
          borderRadius: '4px'
        }}
      >
        <DataGrid
          getRowId={({ uid }) => uid}
          columns={columns}
          rows={data}
          autoHeight={true}
          sx={{
            '& .MuiDataGrid-columnSeparator': {
              display: 'none'
            }
          }}
        />
      </Card>
    </>
  )
}

export default LinkedRecords
