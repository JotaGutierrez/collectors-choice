import { Add } from '@mui/icons-material'
import { Grid, IconButton, TextField } from '@mui/material'
import { ChangeEventHandler } from 'react'

interface props {
  name: string
  placeholder: string
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

const InputButton = ({ name, placeholder, onChange }: props) =>
  <Grid container>
    <Grid item flexGrow={'grow'}>
      <TextField
        id={name}
        name={name}
        fullWidth
        type="text"
        aria-label={placeholder}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Grid>
    <Grid item>
      <IconButton type='submit'>
        <Add />
      </IconButton>
    </Grid>
  </Grid>

export default InputButton
