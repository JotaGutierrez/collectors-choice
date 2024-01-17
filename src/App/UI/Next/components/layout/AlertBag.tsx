import * as React from 'react'
import { useAlertBagContext } from '../../context/AlertBag'
import { Button } from '@/components/ui/button'

interface notificationProps {
  message: string
}

const Notification = ({ message }: notificationProps) => {
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = React.useState(true)

  return <div>
    <div>
        <Button
            aria-label="close"
            color="inherit"
            onClick={() => {
              setOpen(false)
            }}
        >
            CloseIcon
        </Button>
    </div>
      {message}
    </div>
}

const AlertBag = () => {
  const alertBag = useAlertBagContext()

  return <>{(alertBag?.alerts && alertBag.alerts.length > 0)
    ? alertBag.alerts.map(alert =>
      <div key={alert.id} style={{ position: 'fixed', zIndex: 100, bottom: '10vh', width: '100vw', padding: '2rem', boxSizing: 'border-box' }}>
        <Notification message={alert.message} />
      </div>)
    : ''}
  </>
}

export default AlertBag
