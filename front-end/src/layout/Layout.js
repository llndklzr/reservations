import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="">
      <Menu />
      <div className="col container-fluid">
        <Routes />
      </div>
    </div>
  );
}

export default Layout;
