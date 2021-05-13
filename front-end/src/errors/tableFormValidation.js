function tableFormValidation({ table_name, capacity }) {
  const errors = [];

  if (!table_name || table_name.length < 2) {
    errors.push({
      message: "Table name of at least 2 characters is required.",
    });
  }

  if (
    !capacity ||
    Number(capacity) <= 0 ||
    !Number.isInteger(Number(capacity))
  ) {
    errors.push({
      message:
        "Capacity is required and should be a whole number greater than 0.",
    });
  }
  return errors;
}

export default tableFormValidation;
