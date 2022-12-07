import SelectInput from '@mui/material/Select/SelectInput'
import { ChangeEventHandler } from 'react'

interface props {
  children: any;
  name: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  selected: string;
}

const Select = ({ children, name, onChange, selected }: props) =>
  <>
    <select
      name={name}
      onChange={onChange}
      value={selected}
      aria-label=""
    >
      {children}
    </select>
    <SelectInput
      onChange={onChange}
    >
      {children}
    </SelectInput>
  </>

export default Select
