export const Button = ({ children, onClick, type }) => (
  <button
    type={type ? { type } : "button"}
    className="btn btn-secondary mb-3 mx-1 mt-2"
    onClick={onClick}
  >
    {children}
  </button>
);

export const TableButton = ({ children, onClick, type }) => (
  <button
    type={type ? { type } : "button"}
    className="btn btn-secondary my-0 mx-0 px-2 py-1"
    onClick={onClick}
  >
    {children}
  </button>
);

export const DeleteButton = ({ children, onClick, type, id = null }) => (
  <button
    type={type ? { type } : "button"}
    className="btn btn-danger mb-3 mr-2 mt-2"
    id={id}
    onClick={onClick}
  >
    {children}
  </button>
);
