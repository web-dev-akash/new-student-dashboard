import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import { ThemeProvider, createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: "#5838fc",
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    h4: {
      fontWeight: "bold",
    },
    body2: {
      fontSize: "0.9rem",
    },
  },
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistration("/firebase-messaging-sw.js")
    .then((registration) => {
      if (!registration) {
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js")
          .then((reg) => {
            console.log("Service Worker Registered", reg);
          })
          .catch((error) => {
            console.log("Error Registering the service worker ", error);
          });
      } else {
        console.log("Service Worker Already Registered", registration);
      }
    });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
