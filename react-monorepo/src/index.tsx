import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.Fragment>
    <div className="rappi-demo">
      <App />
    </div>
  </React.Fragment>
);
