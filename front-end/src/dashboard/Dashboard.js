import React, { useEffect, useState } from "react";
import {
  deleteReservationId,
  listReservations,
  listTables,
} from "../utils/api";
import ErrorAlert from "../errors/ErrorAlert";
import TablesDisplay from "../utils/components/TablesDisplay";
import ReservationsList from "../utils/components/ReservationsList";

/**
 * Defines the dashboard page.
 * @returns {JSX.Element}
 */
function Dashboard({ loading, setLoading, date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date, loading, setLoading]);

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

  const dateChangeHandler = ({ target }) => {
    const newDate = target.value;
    if (newDate) setDate(newDate);
  };

  const finishTable = async (table_id) => {
    const abortController = new AbortController();
    setTablesError(null);
    try {
      if (window.confirm("Is this table ready to seat new guests?")) {
        await deleteReservationId(table_id, abortController.signal);
        setLoading(true);
      }
    } catch (error) {
      setTablesError(error);
    }
    return () => abortController.abort();
  };
  // form input to change the date to show ReservationsList
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
          onChange={dateChangeHandler}
          required
        />
      </form>
    );
  };

  return (
    <main>
      <div className="d-md-flex mb-3">
        <h2>
          <em>Reservations for {dateInput(date)}</em>
        </h2>
      </div>
      {reservationsError && <ErrorAlert error={reservationsError} />}
      <ReservationsList reservations={reservations} setLoading={setLoading} />
      <div className="mt-4">
        <h2>
          <em>Tables</em>
        </h2>
      </div>
      {tablesError && <ErrorAlert error={tablesError} />}
      <TablesDisplay tables={tables} finishTable={finishTable} />
    </main>
  );
}

export default Dashboard;
