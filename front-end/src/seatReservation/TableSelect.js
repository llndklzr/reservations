import { useHistory } from "react-router-dom";
import ErrorAlert from "../errors/ErrorAlert";
import { Button } from "../utils/components/buttons";

function TableSelect({ tables, reservation, handleChange, handleSubmit }) {
  const history = useHistory();
  if (!tables || !reservation) return null;
  let maxTableCapacity = 0;

  // filter down to large enough tables that are free
  // find the largest table in the restaurant at the same time
  const availableTables = tables.filter((table) => {
    if (table.capacity > maxTableCapacity) {
      maxTableCapacity = table.capacity;
    }
    return table.capacity >= reservation.people && !table.occupied;
  });

  // if the largest table is smaller than the group, return bad news
  if (maxTableCapacity < reservation.people) {
    return (
      <div>
        <ErrorAlert
          error={{
            message: `Group size is ${reservation.people}.
          This restaurant's largest table fits ${maxTableCapacity}.`,
          }}
        />
        <Button onClick={() => history.goBack()}>Back</Button>
      </div>
    );
  }

  // if we have big enough tables but they're all full please wait
  if (availableTables.length < 1) {
    return (
      <ErrorAlert
        error={{
          message: "Please wait for a large enough table to become available.",
        }}
      />
    );
  }

  // happy path
  const selectOptions = availableTables.map((table) => {
    return (
      <option key={table.table_id} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  return (
    <form onSubmit={handleSubmit}>
      <legend>
        <h2>
          <em>Seat Reservation</em>
        </h2>
        <p className="text-muted mb-0">{`${
          reservation.reservation_date
        } at ${reservation.reservation_time.slice(0, 5)}: ${
          reservation.first_name
        } ${reservation.last_name} party of ${reservation.people} `}</p>
      </legend>
      <div className="d-md-flex mb-3">
        <select
          className="form-select bg-dark"
          onChange={handleChange}
          name="table_id"
        >
          <option defaultValue>Available tables</option>
          {selectOptions}
        </select>
      </div>
      <Button type="submit">Submit</Button>
      <Button onClick={() => history.goBack()}>Cancel</Button>
    </form>
  );
}

export default TableSelect;
