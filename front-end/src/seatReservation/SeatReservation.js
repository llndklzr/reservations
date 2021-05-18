import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../errors/ErrorAlert";
import {
  listTables,
  readReservation,
  updateSeatReservation,
} from "../utils/api";
import TableSelect from "./TableSelect";
/** Defines the page to assign a reservation to a table.
 *
 * @returns {JSX Element}
 */
function SeatReservation() {
  const { reservationId } = useParams();
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [formData, setFormData] = useState({});
  const history = useHistory();

  useEffect(loadSeatReservation, [reservationId]);

  function loadSeatReservation() {
    const abortController = new AbortController();
    setError(null);
    listTables(abortController.signal)
      .then(setTables)
      .then(() => readReservation(reservationId, abortController.signal))
      .then(setReservation)
      .catch((newError) => setError(newError));
    return () => abortController.abort();
  }

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setError(null);
    try {
      await updateSeatReservation(
        formData.table_id,
        reservationId,
        abortController.signal
      );
      history.push("/dashboard");
    } catch (newError) {
      setError([newError]);
    }
    return () => abortController.abort();
  };

  return (
    <main>
      {error && <ErrorAlert error={error} />}
      {reservation && tables && (
        <>
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
