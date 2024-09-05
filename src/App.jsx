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
  const query = new URL(window.location.href).hash;
  useEffect(() => {
    if (query) {
      dispatch(setUrlQuery(query));
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
              <PrivateRouter>
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
              </PrivateRouter>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
