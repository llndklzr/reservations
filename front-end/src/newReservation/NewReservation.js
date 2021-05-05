import { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "../utils/components/ReservationForm";
import { today } from "../utils/date-time";
import { createReservation } from "../utils/api";

function NewReservation() {
  const initialFormData = {
    first_name: "",
    last_name: "",
    people: "",
    mobile_number: "",
    reservation_date: today(),
    reservation_time: "",
  };
  const [formData, setformData] = useState(initialFormData);
  const history = useHistory();

  const handleChange = ({ target }) => {
    setformData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createReservation(formData, abortController.signal);
      history.push("/dashboard");
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("NewReservation Aborted");
      } else {
        throw error;
      }
    }
    return () => abortController.abort();
  };

  return (
    <ReservationForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formData={formData}
    />
  );
}

export default NewReservation;
