import { Breadcrumbs, Container, Grid, Link, Typography } from '@mui/material'
import { useMatch } from '@tanstack/react-location'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAppConfig } from '../../hooks/useAppConfig'
import ApiClient from '../../services/ApiClient'
import PatientRecord from '../../types/PatientRecord'
import Loading from '../common/Loading'
import ApiErrorMessage from '../error/ApiErrorMessage'
import NotFound from '../error/NotFound'
import AddressPanel from './AddressPanel'
import DemographicsPanel from './DemographicsPanel'
import IdentifiersPanel from './IdentifiersPanel'
import RegisteringFacilityPanel from './RegisteringFacilityPanel'
import RelationshipPanel from './RelationshipPanel'
import SubHeading from './SubHeading'

const PatientDetails = () => {
  const {
    data: { uid }
  } = useMatch()
  const { getPatientName } = useAppConfig()
  const { data, error, isLoading, isError } = useQuery<
    PatientRecord,
    AxiosError
  >({
    queryKey: ['patient', uid],
    queryFn: async () => await ApiClient.getPatient(uid as string),
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
    <Container>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/search">
          Search results
        </Link>
        <Typography color="text.primary">{patientName}</Typography>
      </Breadcrumbs>
      <Typography variant="h4">{patientName}</Typography>
      <SubHeading data={data} />
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <IdentifiersPanel data={data} />
        </Grid>
        <Grid item xs={4}>
          <RegisteringFacilityPanel data={data} />
        </Grid>
        <Grid item xs={4}>
          <AddressPanel data={data} />
        </Grid>
        <Grid item xs={8}>
          <DemographicsPanel data={data} />
        </Grid>
        <Grid item xs={4}>
          <RelationshipPanel data={data} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default PatientDetails
