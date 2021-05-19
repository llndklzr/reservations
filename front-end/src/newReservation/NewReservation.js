import { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "../utils/components/ReservationForm";
import { today } from "../utils/date-time";
import { createReservation } from "../utils/api";
import FormErrors from "../errors/FormErrors";
import reservationFormValidation from "../errors/reservationFormValidation";
/** Defines the page to make new reservations
 *
 * @returns {JSX Element}
 */
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

  let keyPressed = null;

  window.addEventListener(
    "keydown",
    function (event) {
      keyPressed = event.key;
    },
    true
  );

  const handleChange = (event) => {
    const { target } = event;
    let newValue = target.value;
    if (!(keyPressed === "Backspace") && !(keyPressed === "Delete")) {
      // combat the form changing numbers to strings for backend validation
      if (target.type === "number") {
        newValue = Number(newValue);
      }
      if (target.type === "tel") {
        const regex1 = /^[0-9]{3}$/;
        const regex2 = /^[0-9]{3}-[0-9]{3}$/;
        const lastCharacterIsADigit = (string) => {
          const index = string.length - 1;
          const charCode = string.charCodeAt(index);
          if (!string.length || (charCode >= 48 && charCode <= 57)) {
            return true;
          }
          return false;
        };

        if (!lastCharacterIsADigit(newValue)) {
          return null;
        } else if (regex2.test(newValue)) {
          newValue = newValue + "-";
        } else if (regex1.test(newValue)) {
          newValue = newValue + "-";
        }
      }
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
