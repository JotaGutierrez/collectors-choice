import CloseIcon from '@mui/icons-material/Close'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import * as React from 'react'
import { AlertBagContext } from '../../pages/_app'

interface notificationProps {
  message: string
}

const Notification = ({ message }: notificationProps) => {
  const [open, setOpen] = React.useState(true)

  return <Box><Collapse in={open}>
    <Alert
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setOpen(false)
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      sx={{ mb: 2 }}
    >
      {message}
    </Alert>
  </Collapse></Box>
}

const AlertBag = () => {
  const alertBag = React.useContext(AlertBagContext)

  return (alertBag.alerts && alertBag.alerts.length > 0)
    ? alertBag.alerts.map(alert =>
      <Box key={alert.id} style={{ position: 'fixed', zIndex: 100, bottom: '10vh', width: '100vw', padding: '2rem', boxSizing: 'border-box' }}>
        <Notification message={alert.message} />
      </Box>)
    : ''
}

export default AlertBag
