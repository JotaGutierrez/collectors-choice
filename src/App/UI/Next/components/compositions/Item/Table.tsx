
const Table = ({ properties, children }) => {
  return (<table>
    <thead>
      <tr>
        <th>Name</th>
        {properties.map((property, key) => <td key={key}>{property}</td>)}
        <th>Comments</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {children}
    </tbody>
  </table>)
}

export default Table
