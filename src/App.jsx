import { Route, Routes } from "react-router";
import "./App.css";
import { Home } from "./Pages/Home";
import { BrowserRouter } from "react-router-dom";
import { PrivateRouter } from "./Components/PrivateRouter/PrivateRouter";
import { Login } from "./Pages/Login";
import { Address } from "./Pages/Address";
import { Box } from "@mui/material";
import { Referrals } from "./Pages/Referrals";
import { Store } from "./Pages/Store";
import { Coins } from "./Pages/Coins";
import { Orders } from "./Pages/Orders";
import { SessionNotFound } from "./Pages/SessionNotFound";
import { NoUserFound } from "./Pages/NoUserFound";
import { Error } from "./Pages/Error";
import { Heading, Text } from "@chakra-ui/react";

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
            path="/dashboard/referrals"
            element={
              <PrivateRouter>
                <Box id={"preset"}>
                  <Referrals />
                </Box>
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/dashboard/store"
            element={
              <PrivateRouter>
                <Box id={"preset"}>
                  <Store />
                </Box>
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/dashboard/coins"
            element={
              <PrivateRouter>
                <Box id={"preset"}>
                  <Coins />
                </Box>
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/dashboard/orders"
            element={
              <PrivateRouter>
                <Box id={"preset"}>
                  <Orders />
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
