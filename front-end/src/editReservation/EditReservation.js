import { useState, useEffect } from "react";
import ReservationForm from "../utils/components/ReservationForm";
import reservationFormValidation from "../errors/reservationFormValidation";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import FormErrors from "../errors/FormErrors";

function EditReservation() {
  const { reservationId } = useParams();

  const [formData, setFormData] = useState({});
  const [reservation, setReservation] = useState(null);
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  useEffect(loadReservation, [reservationId]);

  function loadReservation() {
    const abortController = new AbortController();
    setErrors([]);
    readReservation(reservationId, abortController.signal)
      .then(
        ({
          first_name,
          last_name,
          people,
          mobile_number,
          reservation_date,
          reservation_time,
        }) =>
          setFormData({
            first_name,
            last_name,
            people,
            mobile_number,
            reservation_date,
            reservation_time,
          })
      )
      .catch((error) => setErrors([error]));
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
    setErrors([]);
    const newErrors = reservationFormValidation(formData);
    if (newErrors.length) {
      setErrors(newErrors);
    } else {
      try {
        await updateReservation(
          formData,
          reservationId,
          abortController.signal
        );
        history.push("/dashboard");
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("NewReservation Aborted");
        } else {
          setErrors([error]);
        }
      }
    }
    return () => abortController.abort();
  };

  return (
    <main>
      <h1>Edit reservation</h1>
      {errors.length > 0 && <FormErrors errors={errors} />}
      <ReservationForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
      />
    </main>
  );
}

export default EditReservation;
