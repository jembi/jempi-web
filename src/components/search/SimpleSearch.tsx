import { MoreHorizOutlined } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Card, Container, Grid } from '@mui/material'
import Divider from '@mui/material/Divider'
import { Link as LocationLink } from '@tanstack/react-location'
import { useState } from 'react'
import {
  FlagLabel,
  SearchQuery,
  ToggleOptionsProps
} from '../../types/SimpleSearch'
import Button from '../shared/Button'
import PageHeader from '../shell/PageHeader'
import SearchFlags from './SearchFlags'
import SimpleSearchForm from './SimpleSearchForm'
import SimpleSearchHeader from './SimpleSearchHeader'

const SimpleSearch: React.FC = () => {
  const [isGoldenOnly, setIsGoldenOnly] = useState<boolean>(true)
  const [simpleSearchQuerry, setSimpleSearchQuerry] = useState<
    SearchQuery | undefined
  >(undefined)

  const options: ToggleOptionsProps[] = [
    { value: 0, label: FlagLabel.GOLDEN_ONLY },
    { value: 1, label: FlagLabel.PATIENT_ONLY }
  ]

  return (
    <Container maxWidth={false}>
      <PageHeader
        description="Quickly access the information you need with our powerful search."
        title="Simple Search"
        breadcrumbs={[
          {
            icon: <MoreHorizOutlined />
          },
          {
            icon: <SearchIcon />,
            title: 'Search'
          }
        ]}
        buttons={[
          <SearchFlags
            options={options}
            onChange={setIsGoldenOnly}
            key="search-flags"
          />,
          <Button
            variant="outlined"
            href={'/search/custom'}
            size="large"
            key="custom-search"
          >
            CUSTOM SEARCH
          </Button>
        ]}
      />
      <Divider />
      <Card
        sx={{
          marginTop: '33px',
          background: '#FFFFFF',
          boxShadow: '0px 0px 0px 1px #E0E0E0',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: '30px'
        }}
      >
        <Grid
          container
          direction="column"
          width="fit-content"
          minWidth="800px"
          alignContent="center"
        >
          <SimpleSearchHeader isGoldenOnly={isGoldenOnly} />
          <SimpleSearchForm onChange={setSimpleSearchQuerry} />
          <Grid item>
            <LocationLink
              to={`/search-results/${isGoldenOnly ? 'golden' : 'patient'}`}
              search={{ payload: simpleSearchQuerry }}
              style={{ textDecoration: 'none' }}
            >
              <Button variant="contained">Search</Button>
            </LocationLink>
          </Grid>
        </Grid>
      </Card>
    </Container>
  )
}

export default SimpleSearch
