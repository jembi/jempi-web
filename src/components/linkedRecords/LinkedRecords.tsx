import { People } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Button, Card, Divider, Link, Typography } from '@mui/material'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { useMatch } from '@tanstack/react-location'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAppConfig } from '../../hooks/useAppConfig'
import ApiClient from '../../services/ApiClient'
import { GoldenRecord } from '../../types/PatientRecord'
import Loading from '../common/Loading'
import ApiErrorMessage from '../error/ApiErrorMessage'
import NotFound from '../error/NotFound'
import PageHeader from '../shell/PageHeader'

const LinkedRecords = () => {
  const {
    data: { uid }
  } = useMatch()
  const { getFieldsByGroup, getPatientName } = useAppConfig()
  const columns: GridColumns = getFieldsByGroup('linked_records').map(
    ({ fieldName, fieldLabel, formatValue }) => {
      return {
        field: fieldName,
        headerName: fieldName === 'sourceId' ? 'Source' : fieldLabel,
        flex: 1,
        valueFormatter: ({ value }) => formatValue(value),
        sortable: false,
        disableColumnMenu: true,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        renderCell: (params: GridRenderCellParams<string>) => {
          if (fieldName === 'uid') {
            return (
              <Link
                href={`/patient-record/${params.row.uid}`}
                key={params.row.uid}
              >
                {params.row.uid}
              </Link>
            )
          } else if (fieldName === 'sourceId') {
            return params.row.sourceId.facility
          }
          return undefined
        }
      }
    }
  )

  const { data, isLoading, isError, error } = useQuery<
    GoldenRecord,
    AxiosError
  >({
    queryKey: ['golden-record', uid],
    queryFn: async () => await ApiClient.getGoldenRecord(uid as string),
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
  const patientName = getPatientName(data)

  return (
    <>
      <PageHeader
        description={uid as string}
        title={patientName}
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
            href={`/golden-record/${uid}`}
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
          rows={data.linkRecords || []}
          autoHeight={true}
        />
      </Card>
    </>
  )
}

export default LinkedRecords
