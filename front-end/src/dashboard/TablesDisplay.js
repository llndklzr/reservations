function TablesDisplay({ tables }) {
  const rows = tables.map((table) => {
    return (
      <tr key={table.table_id}>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td data-table-id-status={table.table_id}>
          {table.reservation_id ? "Occupied" : "Free"}
        </td>
      </tr>
    );
  });
  return (
    <table className="table table-dark table-striped table-hover ">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Capacity</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default TablesDisplay;
