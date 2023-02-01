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
import { SearchResultProps, SearchResultsLinkedRecordsProps } from '../../types/SearchResults'
import { SearchQuery } from '../../types/SimpleSearch'
import Loading from '../common/Loading'
import PageHeader from '../shell/PageHeader'
interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof SearchResultProps
  ) => void
  order: Order
  orderBy: string
  rowCount: number
}

interface HeadCell {
  disablePadding: boolean
  id: keyof SearchResultProps
  label: string
  numeric: boolean
}

type ResultProps = MakeGenerics<{
  Search: {
    parameters: SearchQuery
  }
}>

type Order = 'asc' | 'desc'

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'Golden ID'
  },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'First Name'
  },
  {
    id: 'lastName',
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

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler =
    (property: keyof SearchResultProps) =>
    (event: React.MouseEvent<unknown>) => {
      console.log(property)
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

function Row(props: { row: SearchResultProps }) {
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
          <Link key={row.id}>{row.id}</Link>
        </TableCell>
        <TableCell align="left" padding="none" width={'295px'}>
          {row.firstName}
        </TableCell>
        <TableCell align="left" padding="none" width={'295px'}>
          {row.lastName}
        </TableCell>
        <TableCell align="left" padding="none" width={'295px'}>
          {row.gender}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Grid container direction={'row'}>
                <Grid item minWidth={'66px'}></Grid>
                <Typography variant="h6" gutterBottom component="div">
                  Linked Records
                </Typography>
              </Grid>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {rows.map((linkedRecord, index) => (
                    <TableRow key={index} sx={{ mt: 2 }}>
                      <TableCell align="center" width={'70px'} />
                      <TableCell
                        component="th"
                        scope="row"
                        align="left"
                        padding="none"
                        width={'295px'}
                      >
                        <Link key={linkedRecord.goldenID}>
                          {'linkedRecord.id'}
                        </Link>
                      </TableCell>
                      <TableCell align="left" padding="none" width={'295px'}>
                        {'linkedRecord.firstName'}
                      </TableCell>
                      <TableCell align="left" padding="none" width={'295px'}>
                        {'linkedRecord.lastName'}
                      </TableCell>
                      <TableCell align="left" padding="none" width={'295px'}>
                        {'linkedRecord.gender'}
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
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof SearchResultProps>('id')

  //WILL BE USED FOR PAGINATION
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const searchParams = useSearch<ResultProps>()
  const { data, isLoading } = useQuery<
    SearchResultProps[],
    AxiosError
  >({
    queryKey: ['searchResult', searchParams],
    queryFn: () => {
      return ApiClient.postSimpleSearchQuery(searchParams.parameters!)
    },
    refetchOnWindowFocus: false
  })

  const { data: LinkedRecord } = useQuery<
    SearchResultsLinkedRecordsProps[],
    AxiosError
  >({
    queryKey: ['linkedRecord'],
    queryFn: () => {
      return ApiClient.postSimpleSearchQuery(searchParams.parameters!)
    },
    refetchOnWindowFocus: false
  })

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof SearchResultProps
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data!.length) : 0

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
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={data!.length}
          />
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort(getComparator(order, orderBy))
              .map((row, index) => {
                return (
                  <>
                    <Row key={index} row={row} />
                  </>
                )
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default SearchResult
