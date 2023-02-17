import { Add } from '@mui/icons-material'
import { Grid, IconButton, TextField } from '@mui/material'

interface props {
  name: string
  placeholder: string
}

const InputButton = ({ name, placeholder }: props) =>
  <Grid container>
    <Grid item flexGrow={'grow'}>
      <TextField
        id={name}
        name={name}
        fullWidth
        type="text"
        aria-label={placeholder}
        placeholder={placeholder}
      />
    </Grid>
    <Grid item>
      <IconButton type='submit'>
        <Add />
      </IconButton>
    </Grid>
  </Grid>

export default InputButton
