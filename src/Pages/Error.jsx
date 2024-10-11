import {
  setAlert,
  setMode,
  setOqad,
  setOrders,
  setPaymentHistory,
  setReport,
  setTestSeriesData,
  setTestSeriesDoubtSession,
  setUrlQuery,
  setUser,
  setWinners,
} from "../Redux/action";
import { useDispatch } from "react-redux";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useDynamicStatusBarColor } from "../Components/DynamicStatusBarColor";

export const Error = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTryAgain = async () => {
    localStorage.removeItem("wise_email");
    localStorage.removeItem("wise_pass");
    dispatch(
      setUser({
        email: "",
        phone: "",
        name: "",
        credits: 0,
        coins: 0,
        grade: 0,
        id: "",
        studentName: "",
        address: null,
        referrals: [],
        quizzes: [],
        age: 0,
        category: "",
        coinsHistory: [],
        weeklyQuizzes: [],
        newUser: false,
        difficulty: false,
      })
    );
    dispatch(
      setOrders({
        status: 0,
        data: [],
      })
    );
    dispatch(setAlert([]));
    dispatch(setReport({}));
    dispatch(setWinners({}));
    dispatch(
      setPaymentHistory({
        status: 0,
        data: [],
      })
    );
    dispatch(setOqad({}));
    dispatch(setUrlQuery(""));
    dispatch(
      setTestSeriesData({
        status: 0,
        data: [],
      })
    );
    dispatch(
      setTestSeriesDoubtSession({
        status: 0,
        data: [],
      })
    );
    dispatch(setMode(""));
    navigate("/");
  };
  useDynamicStatusBarColor("#ffffff");
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
      <Button
        id="submit-btn"
        style={{
          padding: "0.7rem 2rem",
          maxWidth: "400px",
        }}
        fontSize={["15px", "16px", "17px", "18px"]}
        onClick={handleTryAgain}
      >
        Try Again
      </Button>
    </Box>
  );
};
