import { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "../utils/components/ReservationForm";
import { today } from "../utils/date-time";
import { createReservation } from "../utils/api";
import FormErrors from "../errors/FormErrors";
import reservationFormValidation from "../errors/reservationFormValidation";

function NewReservation() {
  const initialFormData = {
    first_name: "",
    last_name: "",
    people: "",
    mobile_number: "",
    reservation_date: today(),
    reservation_time: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [reservationErrors, setReservationErrors] = useState([]);
  const history = useHistory();

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

    const errors = reservationFormValidation(formData);
    if (errors.length) {
      setReservationErrors(errors);
    } else {
      try {
        await createReservation(formData, abortController.signal);
        history.push("/dashboard");
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("NewReservation Aborted");
        } else {
          setReservationErrors([error]);
        }
      }
    }
    return () => abortController.abort();
  };

  return (
    <main>
      {reservationErrors.length > 0 && (
        <FormErrors errors={reservationErrors} />
      )}
      <ReservationForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
        legendTitle="New reservation"
      />
    </main>
  );
}

export default NewReservation;
