import { useState, useEffect } from "react";
import ReservationForm from "../utils/components/ReservationForm";
import reservationFormValidation from "../errors/reservationFormValidation";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import FormErrors from "../errors/FormErrors";


/** Page to edit an existing reservation
 * 
 * @returns {JSX.Element}
 */
function EditReservation() {
  const { reservationId } = useParams();

  const [formData, setFormData] = useState({});
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
    let newValue = target.value;
    if (target.type === "number") {
      newValue = Number(newValue);
    }
    setFormData({
      ...formData,
      [target.name]: newValue,
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
      {errors.length > 0 && <FormErrors errors={errors} />}
      <ReservationForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
        legendTitle="Edit reservation"
      />
    </main>
  );
}

export default EditReservation;
