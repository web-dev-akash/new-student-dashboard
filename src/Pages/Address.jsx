import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  Container,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getError, getLoading, setLoading } from "../Redux/action";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as changeCase from "change-case";
import { Loading } from "../Components/Loading/Loading";

export const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const [tempMode, setTempMode] = useState("");
  const [address, setAddess] = useState({
    pincode: "",
    flat: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
  });
  const [pincode, setPincode] = useState("");
  const [invalidPincode, setInvalidPincode] = useState(false);

  const handleAddressFormChange = async (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value.trim();
    if (name === "pincode" && value.length === 6) {
      const url = `${import.meta.env.VITE_APP_PINCODE_API}=${value}`;
      setPincode(value);
      axios.get(url).then((res) => {
        if (res.data.total !== 0) {
          setInvalidPincode(false);
          const state = changeCase.capitalCase(res.data.records[0]._statename);
          const city = changeCase.capitalCase(res.data.records[0].districtname);
          setAddess({ ...address, city: city, state: state });
        } else {
          setInvalidPincode(true);
        }
      });
    } else if (name === "pincode" && value.length < 6) {
      setInvalidPincode(true);
    }
    setAddess({ ...address, [name]: value });
  };

  const handleAddressSubmit = async (email, addressData, pincode) => {
    try {
      if (pincode.length !== 6) {
        alert("Please Enter a valid Pincode");
        return;
      }
      if (
        !addressData.flat ||
        !addressData.street ||
        !addressData.city ||
        !addressData.state
      ) {
        alert("Please Fill all the required details");
        return;
      }
      if (addressData.street.length <= 3) {
        alert("Please enter the valid Street, Area or City");
        return;
      }
      dispatch(getLoading());
      const address = `${addressData.flat}, ${addressData.street}, ${
        addressData.landmark ? addressData.landmark + ", " : ""
      }${addressData.city}, ${addressData.state}`;
      const body = {
        email: email,
        address: address,
        pincode: Number(pincode),
      };
      const url = `https://backend.wisechamps.com/quiz/address`;
      const res = await axios.post(url, body);
      if (res.data?.data[0]?.status === "success") {
        dispatch(setLoading());
        setTempMode("thankyou");
      } else {
        dispatch(getError());
      }
    } catch (error) {
      dispatch(getError());
    }
  };

  useEffect(() => {
    localStorage.setItem("wisechamps_current_path", window.location.pathname);
  }, [address.city, address.state, invalidPincode]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Navigate to={"/error"} />;
  }

  if (tempMode === "thankyou") {
    setTimeout(() => {
      navigate("/");
    }, 2000);
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            width: "100%",
            padding: { xs: "5px 11px 5px 11px", md: "10px 1.4rem 10px 1.4rem" },
            top: 0,
            left: 0,
          }}
        >
          <Box sx={{ width: { xs: "140px", md: "170px" } }}>
            <img
              src="/src/assets/logo.png"
              alt="Wisechamps"
              style={{
                width: "inherit",
              }}
            />
          </Box>
          <Link to={"/"}>
            <Typography
              sx={{
                fontSize: { xs: "11px", md: "13px", lg: "14px" },
                padding: "5px 15px",
                fontWeight: 600,
                background: "#4346e4",
                border: "1px solid #4e46e4",
                borderRadius: "5px",
                color: "white",
              }}
            >
              Back
            </Typography>
          </Link>
        </Box>
        <Container
          sx={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight={600}>
            Thank You
          </Typography>
          <Typography
            sx={{
              maxWidth: 400,
              width: "90%",
              margin: "0 auto",
              fontSize: { xs: "13px", md: "14px", lg: "15px" },
            }}
          >
            Your address has been successfully updated. Thank you for providing
            your updated information.
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <Box sx={{ border: "1px solid transparent" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          width: "100%",
          padding: { xs: "5px 11px 5px 11px", md: "10px 1.4rem 10px 1.4rem" },
          top: 0,
          left: 0,
        }}
      >
        <Box sx={{ width: { xs: "140px", md: "170px" } }}>
          <img
            src="/src/assets/logo.png"
            alt="Wisechamps"
            style={{
              width: "inherit",
            }}
          />
        </Box>
        <Link to={"/"}>
          <Typography
            sx={{
              fontSize: { xs: "11px", md: "13px", lg: "14px" },
              padding: "5px 15px",
              fontWeight: 600,
              background: "#4346e4",
              border: "1px solid #4e46e4",
              borderRadius: "5px",
              color: "white",
            }}
          >
            Back
          </Typography>
        </Link>
      </Box>
      <Container
        className="animate__animated animate__fadeInRight address"
        sx={{
          border: { xs: "none", sm: "1px solid #ccc" },
          p: { xs: "2rem 1rem 1rem", sm: "1rem", md: "1rem 2rem 2rem" },
          borderRadius: "10px",
          marginTop: { xs: "1rem", sm: "5rem" },
          maxWidth: "600px !important",
        }}
      >
        <FormControl fullWidth>
          <Typography
            component="div"
            sx={{
              textAlign: "left",
              fontWeight: "700",
              fontSize: { xs: "25px", md: "30px" },
              color: "#6666ff",
              margin: "10px 0 20px 0",
            }}
          >
            During the quizzes we announce winners regularly who are awarded
            gifts <br />
            <Box height={5} />
            <Typography fontSize={"15px"} color={"#000"}>
              To receive gifts from Wisechamps please fill in your complete
              mailing address.
            </Typography>
          </Typography>
          <TextField
            error={invalidPincode}
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
            type="number"
            name="pincode"
            placeholder="Eg. 123456"
            required
            onChange={handleAddressFormChange}
            fullWidth
            label={"Pincode"}
          />
          <Divider
            sx={{
              padding: "0.5rem",
              opacity: "0",
            }}
          ></Divider>

          <TextField
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
            name="flat"
            placeholder="Eg. House no. 10"
            required
            onChange={handleAddressFormChange}
            fullWidth
            label={"Flat, House no., Building"}
          />
          <Divider
            sx={{
              padding: "0.5rem",
              opacity: "0",
            }}
          ></Divider>
          <TextField
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
            name="street"
            placeholder="Eg. ABC Street"
            required
            onChange={handleAddressFormChange}
            fullWidth
            label={"Area, Street, Village, City"}
          />
          <Divider
            sx={{
              padding: "0.5rem",
              opacity: "0",
            }}
          ></Divider>
          <TextField
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
            name="landmark"
            placeholder="Eg. Near SBI bank"
            onChange={handleAddressFormChange}
            fullWidth
            label={"Landmark"}
          />
          <Divider
            sx={{
              padding: "0.5rem",
              opacity: "0",
            }}
          ></Divider>
          <TextField
            id={"city"}
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
            value={address.city}
            name="city"
            placeholder="Eg. New Delhi"
            required
            onChange={handleAddressFormChange}
            fullWidth
            label={"District"}
          />
          <Divider
            sx={{
              padding: "0.5rem",
              opacity: "0",
            }}
          ></Divider>
          <TextField
            id={"state"}
            sx={{ fontSize: { xs: "12px", md: "15px" } }}
            value={address.state}
            name="state"
            placeholder="Eg. Delhi"
            required
            onChange={handleAddressFormChange}
            fullWidth
            label={"State"}
          />
          <Box height={8} />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 1,
              p: 1.2,
              fontWeight: 600,
            }}
            onClick={() => handleAddressSubmit(user.email, address, pincode)}
          >
            Submit
          </Button>
        </FormControl>
      </Container>
    </Box>
  );
};
