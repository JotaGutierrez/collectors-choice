
const Select = ({ children, name, onChange, selected }) =>
    <select
        name={name}
        onChange={onChange}
        value={selected}
        aria-label=""
    >
        {children}
    </select>

export default Select
