import { Route, Routes } from "react-router";
import "./App.css";
import { Home } from "./Pages/Home";
import { BrowserRouter } from "react-router-dom";
import { PrivateRouter } from "./Components/PrivateRouter/PrivateRouter";
import { Login } from "./Pages/Login";
import { Address } from "./Pages/Address";
import { Box } from "@mui/material";
import { Orders } from "./Pages/Orders";
import { SessionNotFound } from "./Pages/SessionNotFound";
import { NoUserFound } from "./Pages/NoUserFound";
import { Error } from "./Pages/Error";
import { Heading, Text } from "@chakra-ui/react";
import { Missed } from "./Pages/Missed";
import { WeeklyWinners } from "./Pages/WeeklyWinners";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUrlQuery } from "./Redux/action";
import { TestSeriesPlans } from "./Pages/TestSeriesPlans";

function App() {
  const dispatch = useDispatch();
  const hash = new URL(window.location.href).hash;
  const path = new URL(window.location.href).pathname;
  const query = new URLSearchParams(window.location.search).get("link");
  const queryEmail = new URLSearchParams(window.location.search).get("email");

  useEffect(() => {
    if (hash) {
      dispatch(setUrlQuery(hash));
    } else if (path && query) {
      dispatch(setUrlQuery(`${path}?link=${encodeURIComponent(query)}`));
    } else if (path) {
      dispatch(setUrlQuery(path));
    }
    if (queryEmail) {
      localStorage.setItem("wise_email", queryEmail);
    }
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/"
            element={
              <PrivateRouter>
                <Box id={"preset"}>
                  <Home />
                </Box>
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/test-series"
            element={
              <PrivateRouter>
                <Box id={"preset"}>
                  <TestSeriesPlans />
                </Box>
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              <PrivateRouter>
                <Box id={"preset"}>
                  <Home />
                </Box>
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/address"
            element={
              <PrivateRouter>
                <Box id={"preset"}>
                  <Address />
                </Box>
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/orders"
            element={
              <PrivateRouter>
                <Box id={"preset"}>
                  <Orders />
                </Box>
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/dashboard/missed"
            element={
              <PrivateRouter>
                <Box>
                  <Missed />
                </Box>
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/winners"
            element={
              <PrivateRouter>
                <Box>
                  <WeeklyWinners />
                </Box>
              </PrivateRouter>
            }
          ></Route>
          <Route path="/nosession" element={<SessionNotFound />}></Route>
          <Route path="/nouser" element={<NoUserFound />}></Route>
          <Route path="/error" element={<Error />}></Route>
          <Route
            path="*"
            element={
              <Box
                height={["80vh", "80vh", "90vh", "95vh"]}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
              >
                <Heading>OOPS!</Heading>
                <Text fontSize={["15px", "15px", "18px", "18px"]}>
                  Page not Found...
                </Text>
              </Box>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
