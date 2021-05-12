import ErrorAlert from "./ErrorAlert";

function ReservationFormErrors({ reservationErrors }) {
  let index = 0;
  return (
    <div className="alert alert-danger" role="alert">
      {reservationErrors.map((error) => {
        index++;
        return (
          <p key={index}>
            {error.message}
            {/* <ErrorAlert error={error} /> */}
          </p>
        );
      })}
    </div>
  );
}

export default ReservationFormErrors;
