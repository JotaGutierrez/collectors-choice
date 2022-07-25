
const Table = ({ properties, children }) => {

  return (<table className="table-auto w-full border-collapse">
    <thead className="border-b">
      <tr>
        <th className="text-sm font-bold text-gray-400 px-6 py-2 text-left">Name</th>
        {properties.map((property, key) => <td key={key} className="text-sm font-bold text-gray-400 px-6 py-2 text-left">{property}</td>)}
        <th className="text-sm font-bold text-gray-400 px-6 py-2 text-left">Comments</th>
        <th className="text-sm font-bold text-gray-400 px-6 py-2 text-left"></th>
      </tr>
    </thead>
    <tbody>
      {children}
    </tbody>
  </table>)
}

export default Table;
