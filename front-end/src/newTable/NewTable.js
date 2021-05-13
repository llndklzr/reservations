import { useState } from "react";
import { useHistory } from "react-router";
import FormErrors from "../errors/FormErrors";
import tableFormValidation from "../errors/tableFormValidation";
import { createTable } from "../utils/api";
import TableForm from "../utils/components/TableForm";

function NewTable() {
  const initialFormData = {
    table_name: "",
    capacity: "1",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [tableErrors, setTableErrors] = useState([]);
  const history = useHistory();
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    const errors = tableFormValidation(formData);
    if (errors.length) {
      setTableErrors(errors);
    } else {
      try {
        await createTable(formData, abortController.signal);
        history.push("/dashboard");
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("NewReservation Aborted");
        } else {
          setTableErrors([error]);
        }
      }
    }
    return () => abortController.abort();
  };

  return (
    <div>
      {tableErrors.length > 0 && <FormErrors errors={tableErrors} />}
      <TableForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
      />
    </div>
  );
}

export default NewTable;
