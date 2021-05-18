import { TableButton } from "../utils/components/buttons";

function TablesDisplay({ tables, finishTable }) {
  const rows = tables.map((table) => {
    return (
      <tr key={table.table_id}>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td data-table-id-status={table.table_id}>
          {table.reservation_id ? "Occupied" : "Free"}
        </td>
        <td>
          {table.reservation_id ? (
            <TableButton
              data-table-id-finish={table.table_id}
              onClick={() => finishTable(table.table_id)}
            >
              Finish
            </TableButton>
          ) : null}
        </td>
      </tr>
    );
  });
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col" >Capacity</th>
          <th scope="col">Status</th>
          <th scope="col">Finish</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default TablesDisplay;
