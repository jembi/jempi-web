import HomeIcon from '@mui/icons-material/Home'
import { Breadcrumbs, IconButton, Link, Stack, Typography } from '@mui/material'

interface PageHeaderProps {
  breadcrumbs: Array<{ icon?: JSX.Element; title?: string; link?: string }>
  title: string
  description?: string | JSX.Element
}

const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbs,
  title,
  description
}) => {
  return (
    <>
      <Breadcrumbs>
        <IconButton href="/">
          <HomeIcon />
        </IconButton>
        {breadcrumbs.map(({ icon, title, link }, idx) => {
          return (
            <Link
              underline="hover"
              color="inherit"
              href={link || '#'}
              key={idx}
            >
              <Stack direction={'row'} spacing={1}>
                {icon}
                <Typography sx={{ fontSize: '16px' }}>{title}</Typography>
              </Stack>
            </Link>
          )
        })}
      </Breadcrumbs>
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
      {typeof description === 'string' ? (
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 400,
            color: 'rgba(0, 0, 0, 0.6)'
          }}
        >
          {description}
        </Typography>
      ) : (
        description
      )}
    </>
  )
}

export default PageHeader
