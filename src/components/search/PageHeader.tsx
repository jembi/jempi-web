import { Breadcrumbs, Typography } from '@mui/material'
interface PageHeaderProps {
  breadcrumbs: JSX.Element[]
  title: string
  description: string
}

const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbs,
  title,
  description
}) => {
  return (
    <>
      <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
      <Typography
        variant="h5"
        sx={{
          fontSize: '34px',
          fontWeight: 400,
          color: 'rgba(0, 0, 0, 0.87)'
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 400,
          color: 'rgba(0, 0, 0, 0.6)'
        }}
      >
        {description}
      </Typography>
    </>
  )
}

export default PageHeader
