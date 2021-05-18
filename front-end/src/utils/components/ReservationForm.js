import { Button } from "./buttons";
import { useHistory } from "react-router-dom";
/** Form to create or update a reservation.
 * 
 * @param {Function} handleChange
 * change handler for formData 
 * @param {Function} handleSubmit
 * submit handler for form
 * @param {Object} formData
 * data for controlled input 
 * @param {String} legendTitle
 * the title for the page using the form 
 * @returns {JSX Element}
 */
function ReservationForm({ handleChange, handleSubmit, formData, legendTitle}) {
  const history = useHistory();

  const renderView = (
    <form onSubmit={handleSubmit} className="form-group">
      <legend><h2><em>{legendTitle}</em></h2></legend>
      <label className="form-label" htmlFor="first_name">First name</label>
      <input
        className="form-control"
        type="text"
        id="first_name"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        required
      />
      <label className="form-label" htmlFor="last_name">Last name</label>
      <input
        className="form-control"
        type="text"
        id="last_name"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        required
      />
      <label className="form-label" htmlFor="mobile_number">Mobile number</label>
      <input
        className="form-control"
        type="tel"
        id="mobile_number"
        name="mobile_number"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="123-456-7890"
        value={formData.mobile_number}
        onChange={handleChange}
        required
      />
      <label className="form-label" htmlFor="people">Party size</label>
      <input
        className="form-control"
        type="number"
        id="people"
        name="people"
        min={1}
        step={1}
        value={formData.people}
        onChange={handleChange}
        required
      />
      <label className="form-label" htmlFor="reservation_date">Reservation date</label>
      <input
        className="form-control"
        type="date"
        id="reservation_date"
        name="reservation_date"
        value={formData.reservation_date}
        onChange={handleChange}
        required
      />
      <label className="form-label" htmlFor="reservation_time">Reservation time</label>
      <input
        className="form-control"
        type="time"
        id="reservation_time"
        name="reservation_time"
        step={900}
        value={formData.reservation_time}
        onChange={handleChange}
        required
      />
      <Button type="submit">Submit</Button>
      <Button onClick={() => history.goBack()}>Cancel</Button>
    </form>
  );
  return renderView;
}

export default ReservationForm;
