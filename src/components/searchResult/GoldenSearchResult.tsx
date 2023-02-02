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
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { visuallyHidden } from '@mui/utils'
import { MakeGenerics, useSearch } from '@tanstack/react-location'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import React from 'react'
import ApiClient from '../../services/ApiClient'
import {
  CustomGoldenRecord,
  Data,
  patientRecord
} from '../../types/SearchResults'
import { SearchQuery } from '../../types/SimpleSearch'
import Loading from '../common/Loading'
import PageHeader from '../shell/PageHeader'
import TablePagination from '@mui/material/TablePagination'

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof CustomGoldenRecord
  ) => void
  order: Order
  orderBy: string
  rowCount: number
}

interface HeadCell {
  disablePadding: boolean
  id: keyof CustomGoldenRecord
  label: string
  numeric: boolean
}

type ResultProps = MakeGenerics<{
  Search: {
    payload: SearchQuery
  }
}>

type Order = 'asc' | 'desc'

const headCells: readonly HeadCell[] = [
  {
    id: 'uid',
    numeric: false,
    disablePadding: true,
    label: 'Golden ID'
  },
  {
    id: 'givenName',
    numeric: false,
    disablePadding: false,
    label: 'First Name'
  },
  {
    id: 'familyName',
    numeric: false,
    disablePadding: false,
    label: 'Last Name'
  },
  {
    id: 'gender',
    numeric: false,
    disablePadding: false,
    label: 'Genre'
  }
]

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler =
    (property: keyof CustomGoldenRecord) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center"></TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            align="left"
            padding="none"
            width={'295px'}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
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

function Row(props: { row: patientRecord }) {
  const { row } = props
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell width={'8px'}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="left" padding="none">
          <Link key={row.customGoldenRecord.uid}>
            {row.customGoldenRecord.uid}
          </Link>
        </TableCell>
        <TableCell align="left" padding="none" width={'295px'}>
          {row.customGoldenRecord.givenName}
        </TableCell>
        <TableCell align="left" padding="none" width={'295px'}>
          {row.customGoldenRecord.familyName}
        </TableCell>
        <TableCell align="left" padding="none" width={'295px'}>
          {row.customGoldenRecord.gender}
        </TableCell>
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
                      <TableCell
                        component="th"
                        scope="row"
                        align="left"
                        padding="none"
                        width={'295px'}
                      >
                        <Link key={linkedRecord.entity.uid}>
                          {linkedRecord.entity.uid}
                        </Link>
                      </TableCell>
                      <TableCell align="left" padding="none" width={'295px'}>
                        {linkedRecord.entity.givenName}
                      </TableCell>
                      <TableCell align="left" padding="none" width={'295px'}>
                        {linkedRecord.entity.familyName}
                      </TableCell>
                      <TableCell align="left" padding="none" width={'295px'}>
                        {linkedRecord.entity.gender}
                      </TableCell>
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
  const searchParams = useSearch<ResultProps>()

  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof CustomGoldenRecord>('uid')
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
    const isAsc = orderBy === property && order === 'asc'

    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)

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
            order={order}
            orderBy={orderBy}
            onRequestSort={HandleRequestSort}
            rowCount={patientRecord!.records!.data!.length}
          />
          <TableBody>
            {patientRecord!.records!.data!.map((row, index) => {
              return (
                <>
                  <Row key={index} row={row} />
                </>
              )
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
