import { Route, Routes } from "react-router";
import "./App.css";
import { Home } from "./Pages/Home";
import { BrowserRouter } from "react-router-dom";
import { PrivateRouter } from "./Components/PrivateRouter/PrivateRouter";
import { Login } from "./Pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/"
            element={
              <PrivateRouter>
                <Home />
              </PrivateRouter>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
