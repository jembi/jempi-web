import { Container, Skeleton } from '@mui/material'

const Loading = () => {
  return (
    <Container>
      <Skeleton animation="wave" variant="text" height={100}></Skeleton>
      <Skeleton variant="rectangular" height={600}></Skeleton>
    </Container>
  )
}

export default Loading
