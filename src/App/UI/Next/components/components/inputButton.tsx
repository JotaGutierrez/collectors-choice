import { Add } from '@mui/icons-material'
import { Grid, IconButton, TextField } from '@mui/material'

interface props {
  name: string
  placeholder: string
}

const InputButton = ({ name, placeholder }: props) =>
  <Grid style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ flexGrow: '1' }}>
      <TextField
        id={name}
        name={name}
        type="text"
        aria-label={placeholder}
        placeholder={placeholder}
      />
    </div>
    <IconButton type='submit'>
      <Add />
    </IconButton>
  </Grid>

export default InputButton
