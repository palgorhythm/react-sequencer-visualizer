import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./app.jsx";

/**
* Root of react site 
*
* Imports App which defines the content and navigation
*/

// Render the site https://reactjs.org/docs/react-dom.html#render
const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
)

