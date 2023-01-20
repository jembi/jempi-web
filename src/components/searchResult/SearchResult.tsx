import { MoreHorizOutlined } from '@mui/icons-material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Container, Grid, Link, Paper } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { MakeGenerics, useSearch } from '@tanstack/react-location'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import React from 'react'
import ApiClient from '../../services/ApiClient'
import { SearchResultsWithLinkedRecordsProps } from '../../types/SearchResults'
import { SearchQuery } from '../../types/SimpleSearch'
import Loading from '../common/Loading'
import PageHeader from '../shell/PageHeader'

type SearchResultProps = MakeGenerics<{
  Search: {
    parameters: SearchQuery
  }
}>

function Row(props: { row: SearchResultsWithLinkedRecordsProps }) {
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
                  {row.linkedRecord.map((linkedRecord, index) => (
                    <TableRow key={index} sx={{ mt: 2 }}>
                      <TableCell align="center" width={'70px'} />
                      <TableCell
                        component="th"
                        scope="row"
                        align="left"
                        padding="none"
                        width={'295px'}
                      >
                        <Link key={linkedRecord.id}>{linkedRecord.id}</Link>
                      </TableCell>
                      <TableCell align="left" padding="none" width={'295px'}>
                        {linkedRecord.firstName}
                      </TableCell>
                      <TableCell align="left" padding="none" width={'295px'}>
                        {linkedRecord.lastName}
                      </TableCell>
                      <TableCell align="left" padding="none" width={'295px'}>
                        {linkedRecord.gender}
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
  const searchParams = useSearch<SearchResultProps>()
  const { data, error, isLoading, isError } = useQuery<
    SearchResultsWithLinkedRecordsProps[],
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
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="left" padding="none" width={'295px'}>
                Golden ID
              </TableCell>
              <TableCell align="left" padding="none" width={'295px'}>
                First Name
              </TableCell>
              <TableCell align="left" padding="none" width={'295px'}>
                Last Name
              </TableCell>
              <TableCell align="left" padding="none" width={'295px'}>
                Genre
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(row => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default SearchResult
