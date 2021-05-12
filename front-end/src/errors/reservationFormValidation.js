function reservationFormValidation(formData) {
  const errors = [];
  const phoneRegex = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;

  if (!formData.first_name) {
    errors.push({ message: "First name is required." });
  }

  if (!formData.last_name) {
    errors.push({ message: "Last name is required." });
  }

  if (!formData.mobile_number || !phoneRegex.test(formData.mobile_number)) {
    errors.push({
      message: "Mobile number formatted '123-456-7890' is required.",
    });
  }

  if (
    !formData.people ||
    formData.people <= 0 ||
    Number.isInteger(Number(formData.people))
  ) {
    errors.push({
      message: "Party size must be a whole number greater than 0.",
    });
  }

  if (!formData.reservation_date || !formData.reservation_time) {
    errors.push({
      message: "Reservation date and time are required.",
    });
  } else {
    const presentDate = Date.now();
    const newReservationDate = new Date(
      `${formData.reservation_date} ${formData.reservation_time}`
    ).valueOf();
    if (presentDate > newReservationDate) {
      errors.push({
        message: "Reservation date and time must be in the future.",
      });
    }
    // Sunday-Saturday: 0-6
    console.log(typeof newReservationDate);
    const weekday = new Date(formData.reservation_date).getUTCDay();
    if (weekday === 2) {
      errors.push({
        message: "The restaurant is closed on Tuesdays.",
      });
    }
  }
  return errors;
}

export default reservationFormValidation;
