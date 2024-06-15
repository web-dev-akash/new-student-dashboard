import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  ThemeProvider,
  createTheme,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import "/src/styles/Login.modal.css";
import { useEffect, useState } from "react";
import { OTP } from "../Components/OTP/OTP";
import { ring2 } from "ldrs";
import { fetchUser } from "../Redux/action";
import axios from "axios";
import { SignUp } from "../Components/Signup/SignUp";
import { LoginSlider } from "../Components/LoginSlider/LoginSlider";
ring2.register();

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

export const Login = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    phone: "",
  });
  const [loginWithPhone, setLoginWithPhone] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [signup, setSignup] = useState(false);

  const newtheme = useTheme();
  const isMobile = useMediaQuery(newtheme.breakpoints.down("sm"));
  const authKey = import.meta.env.VITE_SMS_AUTH_KEY;

  const handleLoginDataChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginWithOTP = () => {
    setLoginWithPhone(!loginWithPhone);
  };

  const handleUserLoginWithPhone = async (phone) => {
    dispatch(fetchUser(phone));
    setShowOTPInput(true);
  };

  const handleUserLoginWithEmail = async (loginData) => {
    dispatch(fetchUser(loginData));
  };

  const verifyUserLoginOTP = async (phone, otp) => {
    var options = {
      method: "GET",
      url: "https://control.msg91.com/api/v5/otp/verify",
      params: { otp: otp, mobile: phone },
      headers: { authkey: authKey },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobile]);

  if (error || mode.includes("error")) {
    return <Navigate to={"/error"} />;
  }

  if (mode === "user") {
    return <Navigate to={"/"} />;
  }

  return (
    <ThemeProvider theme={theme}>
      {!signup ? (
        <Grid
          container
          sx={{
            paddingTop: { xs: "45px", sm: "0" },
            background: "white",
            minHeight: { xs: "100vh" },
            overflow: "hidden",
          }}
        >
          <Box position={"absolute"} top={"1rem"} left={"1rem"}>
            <img src="/images/logo.png" alt="Wisechamps" width={"120px"} />
          </Box>
          <Grid
            item
            xs={12}
            md={6}
            display={"flex"}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent={"center"}
            pt={"10px"}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "1.4rem",
                minWidth: { xs: "350px", sm: "400px" },
              }}
            >
              <Typography variant="h4" mb={1}>
                Login
              </Typography>
              {loginWithPhone ? (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    autoComplete="phone"
                    type="number"
                    onChange={handleLoginDataChange}
                    value={loginData.phone}
                    disabled={showOTPInput}
                    className="no-spinner"
                  />
                  {showOTPInput && (
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      flexDirection={"column"}
                      padding={"10px 0"}
                    >
                      <h4 style={{ marginBottom: "10px" }}>
                        Enter 6 digit OTP
                      </h4>
                      <OTP value={otp} onChange={setOtp} length={6} />
                    </Box>
                  )}
                </>
              ) : (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleLoginDataChange}
                    value={loginData.email}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleLoginDataChange}
                    value={loginData.password}
                  />
                </>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  mb: 2,
                  p: 1.2,
                  fontWeight: 600,
                }}
                onClick={
                  loginWithPhone
                    ? showOTPInput
                      ? () => verifyUserLoginOTP(loginData.phone, otp)
                      : () =>
                          handleUserLoginWithPhone({ phone: loginData.phone })
                    : () =>
                        handleUserLoginWithEmail({
                          email: loginData.email,
                          password: loginData.password,
                        })
                }
                disabled={
                  (loginWithPhone &&
                    (!showOTPInput
                      ? loginData.phone.length < 10
                      : otp.length < 6)) ||
                  (!loginWithPhone &&
                    (!loginData.email || !loginData.password)) ||
                  loading
                }
              >
                {loginWithPhone && loading && !showOTPInput ? (
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={1}
                  >
                    <l-ring-2
                      size="20"
                      stroke="3"
                      stroke-length="0.40"
                      bg-opacity="0.5"
                      speed="0.8"
                      color="#fff"
                    ></l-ring-2>
                    <Box component={"p"}>Sending OTP</Box>
                  </Box>
                ) : loginWithPhone && showOTPInput && loading ? (
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={1}
                  >
                    <l-ring-2
                      size="20"
                      stroke="3"
                      stroke-length="0.40"
                      bg-opacity="0.1"
                      speed="0.8"
                      color="#fff"
                    ></l-ring-2>
                    <Box component={"p"}>Sign In</Box>
                  </Box>
                ) : loginWithPhone && showOTPInput ? (
                  "Sign in"
                ) : loginWithPhone ? (
                  "Send OTP"
                ) : loading ? (
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={1}
                  >
                    <l-ring-2
                      size="20"
                      stroke="3"
                      stroke-length="0.40"
                      bg-opacity="0.1"
                      speed="0.8"
                      color="#fff"
                    ></l-ring-2>
                    <Box component={"p"}>Sign In</Box>
                  </Box>
                ) : (
                  "Sign in"
                )}
              </Button>
              <Grid container sx={{ mt: 1, justifyContent: "space-between" }}>
                <Grid
                  item
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#212121",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={handleLoginWithOTP}
                >
                  {loginWithPhone ? "Login with Email" : "Login with OTP"}
                </Grid>
                <Grid item sx={{ fontSize: "13px", fontWeight: 600 }}>
                  <Link to="/forgot-password" style={{ color: "#212121" }}>
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Divider
                textAlign="center"
                sx={{
                  margin: "20px 0",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#696969",
                }}
              >
                Sign in with
              </Divider>
              <Grid container>
                <Grid item xs>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FcGoogle />}
                    sx={{ fontWeight: 700, padding: 1 }}
                  >
                    Google
                  </Button>
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 3 }}>
                <Grid item fontWeight={600} fontSize={"15px"}>
                  No account ?{" "}
                  <Box
                    component={"span"}
                    sx={{
                      color: "#5838fc",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => setSignup(true)}
                  >
                    Register Now
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              height: { xs: "300px", md: "100%", lg: "100%", xl: "100%" },
              overflow: "hidden",
              display: { xs: "none", md: "block" },
            }}
          >
            <LoginSlider />
          </Grid>
        </Grid>
      ) : (
        <SignUp setSignup={setSignup} />
      )}
    </ThemeProvider>
  );
};

export default Login;
