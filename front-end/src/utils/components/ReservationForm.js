import { useState } from "react";
import { today } from "../date-time";
import { Button } from "./buttons";

function ReservationForm({ submitHandler }) {
  // TODO: implement submit functionality, controlled input, date range
  const initialFormData = {
    first_name: "",
    last_name: "",
    people: "",
    mobile_number: "",
    reservation_date: today(),
    reservation_time: "",
  };
  const [formData, setformData] = useState(initialFormData);

  const changeHandler = ({ target }) => {
    setformData({
      ...formData,
      [target.name]: target.value,
    });
    console.log(formData);
  };

  const renderView = (
    <form onSubmit={submitHandler} className="form-group">
      <label htmlFor="first_name">First name</label>
      <input
        className="form-control"
        type="text"
        id="first_name"
        name="first_name"
        value={formData.first_name}
        onChange={changeHandler}
        required
      />
      <label htmlFor="last_name">Last name</label>
      <input
        className="form-control"
        type="text"
        id="last_name"
        name="last_name"
        value={formData.last_name}
        onChange={changeHandler}
        required
      />
      <label htmlFor="mobile_number">Mobile number</label>
      <input
        className="form-control"
        type="text"
        id="mobile_number"
        name="mobile_number"
        value={formData.mobile_number}
        onChange={changeHandler}
        required
      />
      <label htmlFor="people">Party size</label>
      <input
        className="form-control"
        type="number"
        id="people"
        name="people"
        value={formData.people}
        onChange={changeHandler}
        required
      />
      <label htmlFor="reservation_date">Reservation date</label>
      <input
        className="form-control"
        type="date"
        id="reservation_date"
        name="reservation_date"
        value={formData.reservation_date}
        onChange={changeHandler}
        required
      />
      <label htmlFor="reservation_time">Reservation time</label>
      <input
        className="form-control"
        type="time"
        id="reservation_time"
        name="reservation_time"
        value={formData.reservation_time}
        onChange={changeHandler}
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
  return renderView;
}

export default ReservationForm;
