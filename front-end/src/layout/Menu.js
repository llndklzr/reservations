import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };
  return (
    <nav className="sticky-top shadow-lg navbar navbar-dark mb-2 px-2 blur-behind">
      <Link to="/" className="navbar-brand">
        <span className="brand">seats for eats</span>
      </Link>
      <button
        className="navbar-toggler ml-auto"
        type="button"
        onClick={handleToggle}
      >
        <span className="navbar-toggler-icon my-toggler"></span>
      </button>
      <div className={`navbar-collapse ${navbarOpen ? "expand" : "collapse"}`}>
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard" onClick={handleToggle}>
              <span className="oi oi-spreadsheet" />
              &nbsp;Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/search" onClick={handleToggle}>
              <span className="oi oi-magnifying-glass" />
              &nbsp;Search
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/reservations/new"
              onClick={handleToggle}
            >
              <span className="oi oi-calendar" />
              &nbsp;New Reservation
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tables/new" onClick={handleToggle}>
              <span className="oi oi-vertical-align-top" />
              &nbsp;New Table
            </Link>
          </li>
        </ul>
      </div>
    </nav>

    // <nav className="navbar">
    //   <Link className="navbar-brand" to="/">
    //     Periodic Tables
    //   </Link>
    //   <Button onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</Button>
    //   {/* collapsibe content */}
    //   <ul className={`navbar-nav ${navbarOpen ? " showMenu" : ""}`}>
    //     <li className="nav-item">

    //     </li>
    //     <li className="nav-item">
    //       <Link className="nav-link" to="/search">
    //         <span className="oi oi-magnifying-glass" />
    //         &nbsp;Search
    //       </Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link className="nav-link" to="/reservations/new">
    //         <span className="oi oi-plus" />
    //         &nbsp;New Reservation
    //       </Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link className="nav-link" to="/tables/new">
    //         <span className="oi oi-layers" />
    //         &nbsp;New Table
    //       </Link>
    //     </li>
    //   </ul>
    // </nav>
  );
}

export default Menu;
