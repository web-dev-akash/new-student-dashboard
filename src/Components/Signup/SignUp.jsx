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
import Carousel from "react-material-ui-carousel";
import "/src/styles/Login.modal.css";
import { useEffect, useState } from "react";
import { OTP } from "../OTP/OTP";
import { ring2 } from "ldrs";
import axios from "axios";
import { LoginSlider } from "../LoginSlider/LoginSlider";
ring2.register();

export const SignUp = ({ setSignup }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const [userData, setUserData] = useState({
    email: "",
    phone: "",
    student_name: "",
    student_grade: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);

  const newtheme = useTheme();
  const isMobile = useMediaQuery(newtheme.breakpoints.down("sm"));
  const authKey = import.meta.env.VITE_SMS_AUTH_KEY;

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

  return (
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
            Register Now
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            autoComplete="phone"
            type="number"
            onChange={""}
            value={userData.phone}
            disabled={showOTPInput}
            className="no-spinner"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            onChange={""}
            value={userData.email}
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
            onChange={""}
            value={userData.password}
          />
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
          >
            {loading && !showOTPInput ? (
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
            ) : showOTPInput && loading ? (
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
            ) : showOTPInput ? (
              "Sign in"
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
              "Submit"
            )}
          </Button>
          <Grid container sx={{ mt: 3 }}>
            <Grid item fontWeight={600} fontSize={"15px"}>
              Already a member ?{" "}
              <Box
                component={"span"}
                sx={{
                  color: "#5838fc",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => setSignup(false)}
              >
                Sign In
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
  );
};
