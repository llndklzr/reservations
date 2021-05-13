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
