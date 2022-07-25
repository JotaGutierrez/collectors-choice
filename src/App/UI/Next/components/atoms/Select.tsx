
const Select = ({ children, name, onChange, selected }) =>
    <select
        name={name}
        onChange={onChange}
        value={selected}
        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-black rounded transition ease-in-out m-0 focus:text-black focus:bg-white focus:border-black focus:outline-none"
        aria-label=""
    >
        {children}
    </select>

export default Select;
