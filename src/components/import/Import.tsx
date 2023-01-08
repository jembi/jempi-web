import {
  Breadcrumbs,
  Card,
  CardContent,
  Container,
  Link,
  Typography
} from '@mui/material'
import DropZone from './DropZone'

const Import = () => {
  return (
    <Container>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Import</Typography>
      </Breadcrumbs>
      <Typography color="text.primary" variant="h4">
        Import
      </Typography>
      <Typography color="rgba(0, 0, 0, 0.6)" fontSize="16px" sx={{ my: 3 }}>
        Import or submit Patient records to MPI
      </Typography>
      <Card variant="outlined" sx={{ minWidth: 360, marginTop: '5px' }}>
        <CardContent>
          <Typography variant="h6" color="rgba(0, 0, 0, 0.6)">
            Bulk Upload
          </Typography>
          <DropZone />
        </CardContent>
      </Card>
    </Container>
  )
}

export default Import
