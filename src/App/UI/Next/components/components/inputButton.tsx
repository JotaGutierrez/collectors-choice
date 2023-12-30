import { ChangeEventHandler } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface props {
  name: string
  placeholder: string
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

const InputButton = ({ name, placeholder, onChange }: props) =>
  <div>
    <div>
      <Input
        id={name}
        name={name}
        type="text"
        aria-label={placeholder}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
    <div>
      <Button type='submit'>
        Add
      </Button>
    </div>
  </div>

export default InputButton
