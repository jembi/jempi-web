import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  SxProps,
  Theme,
  Typography
} from '@mui/material'
import {
  DataGrid as MuiDataGrid,
  GridCellParams,
  GridColumns,
  GridRenderCellParams,
  GridValueFormatterParams,
  GridValueGetterParams
} from '@mui/x-data-grid'
import { useState } from 'react'
import { DisplayField } from 'types/Fields'
import { AnyRecord } from 'types/PatientRecord'
import { useAppConfig } from '../../hooks/useAppConfig'

interface DataGridProps {
  data: AnyRecord[]
  handleOpenLinkedRecordDialog?: (uid: string) => void
  handleOpenCreateNewGRDialog?: (uid: string) => void
  hideAction?: boolean
  sx?: SxProps<Theme>
}
const getRecordTypeClassName = (params: GridCellParams<string>) => {
  return params.row.type === 'Golden' ? 'record-type' : ''
}

const getCellClassName = (
  params: GridCellParams<string>,
  field: DisplayField,
  data: AnyRecord
) => {
  if (field.groups.includes('demographics')) {
    return params.value === data[params.field] ? 'matching-cell' : ''
  } else return ''
}

const DataGrid: React.FC<DataGridProps> = ({
  data,
  handleOpenLinkedRecordDialog,
  handleOpenCreateNewGRDialog,
  hideAction = false,
  sx
}) => {
  const { availableFields } = useAppConfig()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const isOpen = Boolean(anchorEl)
  const open = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const close = () => {
    setAnchorEl(null)
  }

  const columns: GridColumns = [
    ...availableFields.map(field => {
      const { fieldName, fieldLabel, formatValue, fieldType } = field
      switch (fieldName) {
        case 'recordType':
          return {
            field: fieldName,
            headerName: fieldLabel,
            flex: 1,
            valueFormatter: (
              params: GridValueFormatterParams<number | string | Date>
            ) => formatValue(params.value),
            cellClassName: (params: GridCellParams<string>) =>
              getRecordTypeClassName(params),
            renderCell: (params: GridRenderCellParams) => {
              switch (params.row.type) {
                case 'Current':
                  return <Typography>Patient</Typography>
                case 'Golden':
                  return (
                    <Typography color="#D79B01" fontWeight={700}>
                      Golden
                    </Typography>
                  )
                case 'Candidate':
                  if (params.row.searched) {
                    return <Typography>Searched</Typography>
                  } else {
                    return <Typography>Blocked</Typography>
                  }
                default:
                  return <></>
              }
            }
          }

        case 'uid':
          return {
            field: fieldName,
            headerName: fieldLabel,
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
              if (params.row.type === 'Current') {
                return (
                  <Link href={`/patient-record/${params.row.uid}`}>
                    {params.row.uid}
                  </Link>
                )
              }
              return (
                <Link href={`/golden-record/${params.row.uid}`}>
                  {params.row.uid}
                </Link>
              )
            }
          }
        default:
          return {
            field: fieldName,
            headerName: fieldLabel,
            flex: 1,
            valueFormatter: (
              params: GridValueFormatterParams<number | string | Date>
            ) => formatValue(params.value),
            cellClassName: (params: GridCellParams<string>) =>
              getCellClassName(params, field, data[0])
          }
      }
    }),
    {
      field: 'actions',
      headerName: 'Actions',
      maxWidth: 180,
      minWidth: 120,
      flex: 1,
      hide: hideAction,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      valueGetter: (params: GridValueGetterParams) => ({
        id: params.row.id,
        patient: params.row.patient,
        type: params.row.type
      }),
      renderCell: (params: GridRenderCellParams) => {
        switch (params.row.type) {
          case 'Current':
          case 'Golden':
            return (
              <IconButton
                aria-controls={isOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen ? 'true' : undefined}
                onClick={open}
                size="large"
                edge="end"
                disabled={true}
              >
                <MoreVertIcon />
              </IconButton>
            )
          case 'Candidate':
            return (
              <>
                <IconButton
                  aria-controls={isOpen ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={isOpen ? 'true' : undefined}
                  onClick={open}
                  size="large"
                  edge="end"
                >
                  <MoreVertIcon />
                </IconButton>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={isOpen}
                  onClose={close}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button'
                  }}
                >
                  <MenuItem>
                    <Link
                      href={`/golden-record/${params.row.uid}`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <Typography>View details</Typography>
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem
                    onClick={() =>
                      handleOpenLinkedRecordDialog &&
                      handleOpenLinkedRecordDialog(params.row.uid)
                    }
                  >
                    <Typography>Link this record</Typography>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Typography
                      onClick={() =>
                        handleOpenCreateNewGRDialog &&
                        handleOpenCreateNewGRDialog(params.row.uid)
                      }
                    >
                      New golden record
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            )
          default:
            return <></>
        }
      }
    }
  ]

  return (
    <MuiDataGrid
      columns={columns}
      rows={data}
      pageSize={10}
      rowsPerPageOptions={[10]}
      getRowId={row => row.uid}
      hideFooter
      sx={{
        '.MuiDataGrid-root': {
          borderRadius: '50px'
        },
        '& .current-patient-cell': {
          color: '#7B61FF'
        },
        '& .golden-patient-cell': {
          color: '#D79B01'
        },
        '& .matching-cell': {
          fontWeight: 'bold'
          // border: '1px dotted red'
        },
        '& .record-type': {
          borderLeft: '4px solid #D79B01'
        },
        ...sx
      }}
      autoHeight={true}
    />
  )
}

export default DataGrid
