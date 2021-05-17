import { Button } from "../utils/components/buttons";
import { Link } from "react-router-dom";

function DateReservations({ reservations }) {
  const rows = reservations.map((reservation) => {
    const {
      reservation_id,
      reservation_time,
      first_name,
      last_name,
      people,
      status,
    } = reservation;
    return (
      <tr key={reservation_id}>
        <td>{reservation_time.slice(0, 5)}</td>
        <td>{first_name}</td>
        <td>{last_name}</td>
        <td>{people}</td>
        <td>{status}</td>
        <td>
          {status === "booked" ? (
            <Link to={`/reservations/${reservation_id}/seat`}>
              <Button>Seat</Button>
            </Link>
          ) : null}
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-dark table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Time</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Guests</th>
          <th scope="col">Status</th>
          <th scope="col">Seat</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default DateReservations;
