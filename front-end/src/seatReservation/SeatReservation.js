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

      {errors.length > 0 && <FormErrors errors={errors} />}
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
