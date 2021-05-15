import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import FormErrors from "../errors/FormErrors";
import {
  listTables,
  readReservation,
  updateSeatReservation,
} from "../utils/api";
import TableSelect from "./TableSelect";

function SeatReservation() {
  const { reservationId } = useParams();
  const [tables, setTables] = useState([]);
  const [errors, setErrors] = useState([]);
  const [reservation, setReservation] = useState(null);
  const [formData, setFormData] = useState({});
  const history = useHistory();

  useEffect(loadSeatReservation, [reservationId]);

  function loadSeatReservation() {
    const abortController = new AbortController();
    setErrors([]);
    listTables(abortController.signal)
      .then(setTables)
      .catch((newError) => {
        setErrors([...errors, newError]);
      });
    readReservation(reservationId, abortController.signal)
      .then(setReservation)
      .catch((newError) => setErrors([...errors, newError]));
    return () => abortController.abort();
  }

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      await updateSeatReservation(
        formData.table_id,
        reservationId,
        abortController.signal
      );
      history.push("/dashboard");
    } catch (newError) {
      setErrors({ ...errors, newError });
    }
    return () => abortController.abort();
  };

  return (
    <main>
      <h1>Seat Reservation</h1>
      {errors.length > 0 && <FormErrors errors={errors} />}
      {reservation && tables && (
        <>
          <div className="d-md-flex mb-3">
            <h4 className="mb-0">{`${reservation.first_name} ${
              reservation.last_name
            } party of ${
              reservation.people
            } at ${reservation.reservation_time.slice(0, 5)}`}</h4>
          </div>
          <TableSelect
            tables={tables}
            reservation={reservation}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </main>
  );
}

export default SeatReservation;
