import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('Service worker registered:', registration);
    })
    .catch(error => {
      console.error('Error registering service worker:', error);
    });
}


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



