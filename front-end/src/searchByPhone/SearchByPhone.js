import { useState } from "react";
import { listReservations } from "../utils/api";
import { Button } from "../utils/components/buttons";
import ReservationsList from "../utils/components/ReservationsList";

function SearchByPhone() {
  const initialFormData = {
    mobile_number: "",
  };

  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [lastSearchNumber, setLastSearchNumber] = useState(null);

  const phoneRegExp = /[\d -]+$/g;

  const handleChange = ({ target }) => {
    const phoneNumber = target.value;

    if (phoneNumber === "" || phoneRegExp.test(phoneNumber)) {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const mobile_number = formData.mobile_number;
    setError(null);

    try {
      const newReservations = await listReservations(
        { mobile_number },
        abortController.signal
      );
      setReservations(newReservations);
      setLastSearchNumber(mobile_number);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("SearchByPhone Aborted");
      } else {
        setError(error);
      }
    }
    return () => abortController.abort();
  };

  return (
    <main>
      <h1>Search</h1>
      <div className="d-md-flex mb-3"></div>
      <form onSubmit={handleSubmit} className="form-group">
        <label className="form-label" htmlFor="mobile_number">
          Phone number
        </label>
        <input
          className="form-control"
          type="tel"
          id="mobile_number"
          name="mobile_number"
          placeholder="Enter a customer's phone number"
          value={formData.mobile_number}
          onChange={handleChange}
        />
        <Button type="submit">Find</Button>
      </form>
      {lastSearchNumber && reservations.length < 1 && (
        <h4>{`No reservations found for ${lastSearchNumber}.`}</h4>
      )}
      {reservations.length > 0 && (
        <ReservationsList reservations={reservations} />
      )}
    </main>
  );
}

export default SearchByPhone;
