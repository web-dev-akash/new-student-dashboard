import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMode } from "../Redux/action";
import { Box, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const SessionNotFound = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMode(""));
  }, []);
  return (
    <Box
      textAlign={"center"}
      fontSize={["12px", "12px", "18px", "18px"]}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="90vh"
      margin={"0 auto"}
      width={"90%"}
    >
      <Heading>No Class Available</Heading>
      <p style={{ marginBottom: "20px" }}>
        There is not active Class / Session at this moment.
      </p>
      <Link
        to={"/"}
        id="submit-btn"
        style={{
          padding: "0.7rem 2rem",
          maxWidth: "400px",
        }}
      >
        Try Again
      </Link>
    </Box>
  );
};
