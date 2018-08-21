import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// ----------MATERIAL UI-----------
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

/*-------------FONT-AWESOME-------------*/
import "../node_modules/font-awesome/css/font-awesome.min.css";

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
