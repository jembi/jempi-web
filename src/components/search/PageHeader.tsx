import { Breadcrumbs, Typography } from '@mui/material'

import { Fragment } from 'react'
interface PageHeaderType {
  breadcrumbs: JSX.Element[]  
  title: string
  description: string
}

const PageHeader = (prop: PageHeaderType) => {
  return (
    <Fragment>
      <Breadcrumbs>
        {prop.breadcrumbs}
      </Breadcrumbs>
      <Typography
        variant="h5"
        sx={{
          fontSize: '34px',
          fontWeight: 400,
          color: 'rgba(0, 0, 0, 0.87)'
        }}
      >
        {prop.title}
      </Typography>
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 400,
          color: 'rgba(0, 0, 0, 0.6)'
        }}
      >
        {prop.description}
      </Typography>
    </Fragment>
  )
}

export default PageHeader
