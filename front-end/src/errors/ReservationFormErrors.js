import ErrorAlert from "./ErrorAlert";

function ReservationFormErrors({ reservationErrors }) {
  let index = 0;
  return (
    <ul className="list-group list-group-flush">
      {reservationErrors.map((error) => {
        index++;
        return (
          <li key={index} className="list-group-item">
            <ErrorAlert error={error} />
          </li>
        );
      })}
    </ul>
  );
}

export default ReservationFormErrors;
