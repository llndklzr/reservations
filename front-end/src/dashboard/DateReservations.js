function DateReservations({ reservations }) {
  const rows = reservations.map((reservation) => {
    return (
      <tr key={reservation.reservation_id}>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.people}</td>
      </tr>
    );
  });

  return (
    <table className="table table-success table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Time</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Guests</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default DateReservations;
