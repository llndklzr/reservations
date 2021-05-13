import { Button } from "./buttons";
import { useHistory } from "react-router-dom";

function TableForm({ handleChange, handleSubmit, formData }) {
  console.log(formData);
  const history = useHistory();

  const renderView = (
    <form onSubmit={handleSubmit} className="form-group">
      <label className="form-label" htmlFor="table_name">
        Table name
      </label>
      <input
        className="form-control"
        type="text"
        id="table_name"
        name="table_name"
        //minLength={2}
        value={formData.table_name}
        onChange={handleChange}
        required
      />
      <label className="form-label" htmlFor="capacity">
        Capacity
      </label>
      <input
        className="form-control"
        type="number"
        id="capacity"
        name="capacity"
        //min={1}
        value={formData.capacity}
        onChange={handleChange}
        required
      />
      <Button type="submit">Submit</Button>
      <Button onClick={() => history.goBack()}>Cancel</Button>
    </form>
  );
  return renderView;
}

export default TableForm;
