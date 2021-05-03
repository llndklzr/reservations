function ReservationForm() {
  // TODO: implement submit functionality
  const renderView = (
    <form className="form-group">
      <label htmlFor="first_name">First name</label>
      <input
        className="form-control"
        type="text"
        id="first_name"
        name="first_name"
        required
      />
      <label htmlFor="last_name">Last name</label>
      <input
        className="form-control"
        type="text"
        id="last_name"
        name="last_name"
        required
      />
      <label htmlFor="mobile_number">Mobile number</label>
      <input
        className="form-control"
        type="text"
        id="mobile_number"
        name="mobile_number"
        required
      />
      <label htmlFor="reservation_date">Reservation date</label>
      <input
        className="form-control"
        type="text"
        id="reservation_date"
        name="reservation_date"
        required
      />
      <label htmlFor="reservation_time">Reservation time</label>
      <input
        className="form-control"
        type="text"
        id="reservation_time"
        name="reservation_time"
        required
      />
    </form>
  );
  return renderView;
}

export default ReservationForm;
