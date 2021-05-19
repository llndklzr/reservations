import { useEffect, useState } from "react";

import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import NewReservation from "../newReservation/NewReservation";
import NewTable from "../newTable/NewTable";
import SeatReservation from "../seatReservation/SeatReservation";
import SearchByPhone from "../searchByPhone/SearchByPhone";
import EditReservation from "../editReservation/EditReservation";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
/**
 * Defines all the routes for the application.
 *
 *
 * @returns {JSX.Element}
 */

function Routes() {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(today());

  const url = useRouteMatch();
  const query = useQuery();

  useEffect(loadDate, [url, query]);

  function loadDate() {
    const newDate = query.get("date");
    if (newDate) setDate(newDate);
  }

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          loading={loading}
          setLoading={setLoading}
          date={date}
          setDate={setDate}
        />
      </Route>
      <Route path="/reservations/new">
        <NewReservation date={date} />
      </Route>
      <Route path="/reservations/:reservationId/edit">
        <EditReservation />
      </Route>
      <Route path="/reservations/:reservationId/seat">
        <SeatReservation />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route path="/search">
        <SearchByPhone loading={loading} setLoading={setLoading} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
