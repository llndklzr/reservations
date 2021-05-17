import React, { useEffect, useState } from "react";
import {
  deleteReservationId,
  listReservations,
  listTables,
} from "../utils/api";
import ErrorAlert from "../errors/ErrorAlert";
import TablesDisplay from "./TablesDisplay";
import { today } from "../utils/date-time";
import ReservationsList from "../utils/components/ReservationsList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [date, setDate] = useState(today());
  const [loading, setLoading] = useState(false);

  useEffect(loadDashboard, [date, loading]);

  function loadDashboard() {
    const abortController = new AbortController();
    setLoading(true);
    setReservationsError(null);
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    setLoading(false);
    return () => abortController.abort();
  }

  const finishTable = async (table_id) => {
    const abortController = new AbortController();
    setTablesError(null);
    try {
      const data = await deleteReservationId(table_id, abortController.signal);
      setLoading(true);
    } catch (error) {
      setTablesError(error);
    }
    return () => abortController.abort();
  };

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
      <ReservationsList reservations={reservations} />
      <ErrorAlert error={tablesError} />
      <TablesDisplay tables={tables} finishTable={finishTable} />
    </main>
  );
}

export default Dashboard;
