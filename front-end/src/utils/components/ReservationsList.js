import { TableButton } from "./buttons";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ErrorAlert from "../../errors/ErrorAlert";
import { updateReservationStatus } from "../api";
/** Renders a list of reservations
 *
 * @param {Array} reservations
 * An array of reservation objects
 * @param {Function} setLoading
 * Function to trigger a render
 * @returns {JSX Element}
 */
function ReservationsList({ reservations, setLoading }) {
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleCancel = async (reservation_id) => {
    const abortController = new AbortController();
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      try {
        const data = { status: "cancelled" };
        await updateReservationStatus(
          data,
          reservation_id,
          abortController.signal
        );
        setLoading(true);
        history.push("/dashboard");
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("ReservationsList handleCancel Aborted");
        } else {
          setError(error);
        }
      }
    }
    return () => abortController.abort();
  };

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
        <td className="truncate">{first_name}</td>
        <td className="truncate">{last_name}</td>
        <td>{people}</td>
        <td>
          <span className="d-none d-md-block">{status}</span>
          <span className="d-md-none">
            {status === "booked" ? "📖" : status === "seated" ? "🪑" : "❌"}
          </span>
        </td>
        <td>
          {status === "booked" ? (
            <Link to={`/reservations/${reservation_id}/seat`}>
              <TableButton>
                <span className="d-none d-md-block">Seat</span>
                <span className="d-md-none">🪑</span>
              </TableButton>
            </Link>
          ) : null}
        </td>
        <td>
          {status === "booked" ? (
            <Link to={`/reservations/${reservation_id}/edit`}>
              <TableButton>
                <span className="d-none d-md-block">Edit</span>
                <span className="d-md-none">📋</span>
              </TableButton>
            </Link>
          ) : null}
        </td>
        <td>
          {status === "booked" || status === "seated" ? (
            <TableButton
              data-reservation-id-cancel={reservation.reservation_id}
              onClick={() => handleCancel(reservation_id)}
            >
              <span className="d-none d-md-block">Cancel</span>
              <span className="d-md-none">❌</span>
            </TableButton>
          ) : null}
        </td>
      </tr>
    );
  });

  return (
    <>
      {error && <ErrorAlert error={error} />}
      <table className="table table-responsive-md table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">#</th>
            <th scope="col">Status</th>
            <th scope="col">Seat</th>
            <th scope="col">Edit</th>
            <th scope="col">Cancel</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
}

export default ReservationsList;
