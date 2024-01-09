import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "@atelier/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.Fragment>
    <div>
      <App />
    </div>
  </React.Fragment>
);
