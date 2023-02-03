import { MoreHorizOutlined } from '@mui/icons-material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Container,
  Grid,
  Link,
  Paper,
  TableSortLabel
} from '@mui/material'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { visuallyHidden } from '@mui/utils'
import { MakeGenerics, useSearch } from '@tanstack/react-location'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import React from 'react'
import { useAppConfig } from '../../hooks/useAppConfig'
import ApiClient from '../../services/ApiClient'
import { DisplayField } from '../../types/Fields'
import {
  CustomGoldenRecord,
  Data,
  PatientRecord
} from '../../types/SearchResults'
import { SearchQuery } from '../../types/SimpleSearch'
import Loading from '../common/Loading'
import PageHeader from '../shell/PageHeader'

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof CustomGoldenRecord
  ) => void
  sortAsc: boolean
  sortBy: string
  rowCount: number
  availableFields: DisplayField[]
}

interface HeadCell {
  id: keyof CustomGoldenRecord
  label: string
}

type ResultProps = MakeGenerics<{
  Search: {
    payload: SearchQuery
  }
}>

function EnhancedTableHead(props: EnhancedTableProps) {
  const { sortAsc, sortBy, onRequestSort, availableFields } = props

  let order: 'asc' | 'desc' = sortAsc ? 'asc' : 'desc'

  const createSortHandler =
    (property: keyof CustomGoldenRecord) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center"></TableCell>
        {availableFields.map(headCell => (
          <TableCell
            key={headCell.fieldName}
            sortDirection={sortBy === headCell.fieldName ? order : false}
            align="left"
            padding="none"
            width={'295px'}
          >
            <TableSortLabel
              active={sortBy === headCell.fieldName}
              direction={sortBy === headCell.fieldName ? order : 'asc'}
              onClick={createSortHandler(
                headCell.fieldName as keyof CustomGoldenRecord
              )}
            >
              {headCell.fieldName === 'uid' ? 'Golden ID' : headCell.fieldLabel}

              {sortBy === headCell.fieldName ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

function Row(props: { row: PatientRecord }) {
  const { availableFields } = useAppConfig()

  const { row } = props
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell width={'8px'} key={'arrow'}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {availableFields.map((field, index) => (
          <>
            {index < 1 ? (
              <TableCell component="th" scope="row" align="left" padding="none">
                <Link key={index}>
                  {
                    row.customGoldenRecord[
                      field.fieldName as keyof CustomGoldenRecord
                    ]
                  }
                </Link>
              </TableCell>
            ) : (
              <TableCell
                align="left"
                padding="none"
                width={'295px'}
                key={index}
              >
                {
                  row.customGoldenRecord[
                    field.fieldName as keyof CustomGoldenRecord
                  ]
                }
              </TableCell>
            )}
          </>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ mb: 1 }}>
              <Grid container direction={'row'}>
                <Grid item minWidth={'66px'}></Grid>
                <Typography variant="h6" gutterBottom component="div">
                  Linked Records
                </Typography>
              </Grid>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.mpiEntityList.map((linkedRecord, index) => (
                    <TableRow key={index} sx={{ mt: 2 }}>
                      <TableCell align="center" width={'70px'} />
                      {availableFields.map((field, index) => (
                        <>
                          {index < 1 ? (
                            <TableCell
                              component="th"
                              scope="row"
                              align="left"
                              padding="none"
                              width={'295px'}
                            >
                              <Link key={index}>
                                {
                                  linkedRecord.entity[
                                    field.fieldName as keyof CustomGoldenRecord
                                  ]
                                }
                              </Link>
                            </TableCell>
                          ) : (
                            <TableCell
                              align="left"
                              padding="none"
                              width={'295px'}
                              key={index}
                            >
                              {
                                linkedRecord.entity[
                                  field.fieldName as keyof CustomGoldenRecord
                                ]
                              }
                            </TableCell>
                          )}
                        </>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const SearchResult: React.FC = () => {
  const { availableFields } = useAppConfig()

  const searchParams = useSearch<ResultProps>()

  const [payload, setPayLoad] = React.useState<SearchQuery>(
    searchParams.payload!
  )
  const [page, setPage] = React.useState(0)

  const { data: patientRecord, isLoading } = useQuery<Data, AxiosError>({
    queryKey: ['searchResult', payload],
    queryFn: () => {
      return ApiClient.postSimpleSearchQuery(payload)
    },
    refetchOnWindowFocus: false
  })

  const HandleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof CustomGoldenRecord
  ) => {
    const isAsc = payload.sortBy === property && payload.sortAsc

    const updatedPayload: SearchQuery = {
      ...payload!,
      sortAsc: isAsc ? false : true,
      sortBy: property
    }

    setPayLoad(updatedPayload)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  if (isLoading) {
    return <Loading />
  }

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
            title: 'Search',
            link: '/search'
          }
        ]}
      />
      <Divider sx={{ mb: 3, mt: 1 }} />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <EnhancedTableHead
            sortAsc={payload.sortAsc}
            sortBy={payload.sortBy}
            onRequestSort={HandleRequestSort}
            rowCount={patientRecord!.records!.data!.length}
            availableFields={availableFields}
          />
          <TableBody>
            {patientRecord!.records!.data!.map((row, index) => {
              return <Row key={index} row={row} />
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={patientRecord!.records!.pagination.total}
        rowsPerPage={10}
        page={page}
        onPageChange={handleChangePage}
      />
    </Container>
  )
}

export default SearchResult
