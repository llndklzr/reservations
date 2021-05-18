/** A series of tests to match a new or updated reservation with specified criteria.
 * 
 * @param {Object} reservation
 * Form data regarding a reservation to be validated.
 * @returns {Array}
 * errors as an array. Empty array if no errors.
 */
function reservationFormValidation({
  first_name,
  last_name,
  people,
  mobile_number,
  reservation_date,
  reservation_time,
}) {
  const errors = [];
  // numbers and dashes only in the form XXX-XXX-XXXX
  const phoneRegex = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;

  if (!first_name) {
    errors.push({ message: "First name is required." });
  }

  if (!last_name) {
    errors.push({ message: "Last name is required." });
  }

  if (!mobile_number || !phoneRegex.test(mobile_number)) {
    errors.push({
      message: "Mobile number formatted 'XXX-XXX-XXXX' is required.",
    });
  }

  if (!people || Number(people) <= 0 || !Number.isInteger(Number(people))) {
    errors.push({
      message: "Party size must be a whole number greater than 0.",
    });
  }

  if (!reservation_date || !reservation_time) {
    errors.push({
      message: "Reservation date and time are required.",
    });
  } else {
    const presentDate = Date.now();
    const newReservationDate = new Date(
      `${reservation_date} ${reservation_time}`
    );
    if (presentDate > newReservationDate.valueOf()) {
      errors.push({
        message: "Reservation date and time must be in the future.",
      });
    }
    // Sunday-Saturday: 0-6
    const weekday = new Date(reservation_date).getUTCDay();
    if (weekday === 2) {
      errors.push({
        message: "The restaurant is closed on Tuesdays.",
      });
    }
    const hours = newReservationDate.getHours();
    const minutes = newReservationDate.getMinutes();
    const clockTime = hours * 100 + minutes;

    if (clockTime < 1030 || clockTime > 2130) {
      errors.push({
        message: "Reservations must be between 10:30 AM and 9:30 PM.",
      });
    }
  }
  return errors;
}

export default reservationFormValidation;
