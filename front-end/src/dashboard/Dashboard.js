import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../errors/ErrorAlert";
import DateReservations from "./DateReservations";
import { today } from "../utils/date-time";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [date, setDate] = useState(today());

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  // TODO: implement change handler for date
  // TODO: only show current date reservations
  const dateInput = (date) => {
    return (
      <form className="form-group">
        <label htmlFor="reservation_date" />
        <input
          className="form-control"
          type="date"
          id="reservation_date"
          name="reservation_date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </form>
    );
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {dateInput(date)}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <DateReservations reservations={reservations} />
    </main>
  );
}

export default Dashboard;
