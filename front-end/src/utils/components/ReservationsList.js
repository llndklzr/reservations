import { Button, DeleteButton } from "./buttons";
import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorAlert from "../../errors/ErrorAlert";
import { updateReservationStatus } from "../api";

function ReservationsList({ reservations, setLoading }) {
  const [error, setError] = useState(null);

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
        <td>
          {status === "booked" ? (
            <Link to={`/reservations/${reservation_id}/edit`}>
              <Button>Edit</Button>
            </Link>
          ) : null}
        </td>
        <td>
          <DeleteButton
            data-reservation-id-cancel={reservation.reservation_id}
            onClick={() => handleCancel(reservation_id)}
          >
            Cancel
          </DeleteButton>
        </td>
      </tr>
    );
  });

  return (
    <div>
      {error && <ErrorAlert error={error} />}
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Guests</th>
            <th scope="col">Status</th>
            <th scope="col">Seat</th>
            <th scope="col">Edit</th>
            <th scope="col">Cancel</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default ReservationsList;
