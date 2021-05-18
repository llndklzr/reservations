/** Button for use in react components
 * 
 * @param {Function} onClick
 * click handler for button
 * @param {String} type
 * type of button, default "button"
 * @returns {JSX Element} 
 */

export const Button = ({ children, onClick, type }) => (
  <button
    type={type ? { type } : "button"}
    className="btn btn-secondary mb-3 mx-1 mt-2"
    onClick={onClick}
  >
    {children}
  </button>
);

/** Button styled for use in tables
 * 
 * @param {Function} onClick
 * click handler for button
 * @param {String} type
 * type of button, default "button"
 * @returns {JSX Element}
 * 
 */
export const TableButton = ({ children, onClick, type }) => (
  <button
    type={type ? { type } : "button"}
    className="btn btn-secondary my-0 mx-0 px-2 py-1"
    onClick={onClick}
  >
    {children}
  </button>
);
