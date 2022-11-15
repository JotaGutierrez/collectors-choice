import { Button, IconButton, TextField } from '@mui/material'
import { Add } from '@mui/icons-material'

interface props {
    name: string
    placeholder: string
}

const InputButton = ({ name, placeholder }: props) =>
  <div>
        <TextField
            id={name}
            name={name}
            type="text"
            aria-label={placeholder}
            placeholder={placeholder}
        />
        <Button type='submit'>
            <IconButton>
                <Add />
            </IconButton>
        </Button>
    </div>

export default InputButton
