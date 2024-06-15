import React, { useEffect } from "react";
import { setMode } from "../Redux/action";
import { useDispatch } from "react-redux";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Error = () => {
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
      <Heading>Something Went Wrong..</Heading>
      <Text style={{ marginBottom: "20px" }}>Please refresh and try again</Text>
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
