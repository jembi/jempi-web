import { Person, Warning } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Button, Card, Divider, Grid, Link, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { GridColumns } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid/DataGrid'
import { useMatch } from '@tanstack/react-location'
import { useAppConfig } from '../../hooks/useAppConfig'
import { useAuditTrailQuery } from '../../hooks/useAuditTrailQuery'
import { DisplayField } from '../../types/Fields'
import { ACTION_TYPE, AUDIT_TRAIL_FIELDS } from '../../utils/constants'
import { getFieldValueFormatter } from '../../utils/formatters'
import Loading from '../common/Loading'
import ApiErrorMessage from '../error/ApiErrorMessage'
import NotFound from '../error/NotFound'
import PageHeader from '../shell/PageHeader'

const displayedFields: DisplayField[] = AUDIT_TRAIL_FIELDS.map(field => {
  return {
    ...field,
    formatValue: getFieldValueFormatter(field.fieldType)
  }
})

const AuditTrail = () => {
  const {
    data: { uid }
  } = useMatch()
  const { getPatientName } = useAppConfig()
  const { patient, auditTrail, isLoading, error } = useAuditTrailQuery()

  const columns: GridColumns = displayedFields.map(
    ({ fieldName, fieldLabel, formatValue }) => {
      return {
        field: fieldName,
        headerName: fieldLabel,
        flex: 1,
        valueFormatter: ({ value }) => formatValue(value),
        renderCell: ({ value }) =>
          fieldName === 'links'
            ? value.map((link: string) => (
                <Link
                  key={link}
                  href={`patient/${link}`}
                  display="block"
                  whiteSpace="nowrap"
                >
                  {link}
                </Link>
              ))
            : fieldName === 'actionTaken'
            ? ACTION_TYPE[value]
            : value,
        sortable: false,
        disableColumnMenu: true
      }
    }
  )

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <ApiErrorMessage error={error} />
  }

  if (!auditTrail) {
    return <NotFound />
  }

  return (
    <Container>
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid item>
          {patient && (
            <PageHeader
              description={
                <Typography fontSize="16px" letterSpacing="0.15px">
                  {patient.uid}
                </Typography>
              }
              title={getPatientName(patient)}
              breadcrumbs={[
                {
                  icon: <SearchIcon />,
                  title: 'Search Results'
                },
                {
                  icon: <Person />,
                  title: `Record Details`
                },
                {
                  icon: <Warning />,
                  title: 'Audit Trail'
                }
              ]}
            />
          )}
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
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
          getRowId={({ process }) => process}
          columns={columns}
          rows={auditTrail}
          autoHeight
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#F3F3F3'
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none'
            }
          }}
        />
      </Card>
    </Container>
  )
}

export default AuditTrail
