/**
 * Defines the alert message(s) to render for one or more errors.
 * @param errors
 *  an array of objects with `.message` property as a string.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */
function FormErrors({ errors }) {
  let index = 0;
  return (
    <div className="alert alert-danger" role="alert">
      {errors.map((error) => {
        index++;
        return <p key={index}>{error.message}</p>;
      })}
    </div>
  );
}

export default FormErrors;
