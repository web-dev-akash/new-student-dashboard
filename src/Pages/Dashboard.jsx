import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAlert } from "../Redux/action";

import { CarousalMain } from "../Components/Alerts/CarousalMain";
import { Pricing } from "../Components/Pricing/Pricing";
import { WeeklyQuiz } from "../Components/WeeklyQuiz/WeeklyQuiz";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const weeklyQuizzes = useSelector((state) => state.user.weeklyQuizzes);
  const alert = useSelector((state) => state.alert);
  const newUser = useSelector((state) => state.user.newUser);
  const timersRef = useRef([]);

  useEffect(() => {
    const now = new Date();
    const initialIndex = weeklyQuizzes.findIndex((quiz) => {
      const quizDate = new Date(quiz.Session_Date_Time);
      return quizDate.toDateString() === now.toDateString();
    });
    const sessionDateTimeStr =
      initialIndex === -1 ? 0 : weeklyQuizzes[initialIndex].Session_Date_Time;
    const sessionDate = new Date(sessionDateTimeStr);
    const sessionTime = sessionDate.getTime();

    const twentyMinutesBefore = new Date(sessionTime - 35 * 60 * 1000);
    const zeroMinutesAfter = new Date(sessionTime - 5 * 60 * 1000);

    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];

    if (now >= twentyMinutesBefore && now <= zeroMinutesAfter) {
      if (newUser && !alert.includes("newToWisechamps")) {
        const newAlerts = ["newToWisechamps", ...alert];
        dispatch(setAlert(newAlerts));
      }
    } else {
      if (alert.includes("newToWisechamps")) {
        const newAlerts = alert.filter((item) => item !== "newToWisechamps");
        dispatch(setAlert(newAlerts));
      }
    }

    if (now < twentyMinutesBefore) {
      timersRef.current.push(
        setTimeout(() => {
          if (!alert.includes("newToWisechamps")) {
            const newAlerts = ["newToWisechamps", ...alert];
            dispatch(setAlert(newAlerts));
          }
        }, twentyMinutesBefore - now)
      );
    }

    if (now < zeroMinutesAfter) {
      timersRef.current.push(
        setTimeout(() => {
          if (alert.includes("newToWisechamps")) {
            const newAlerts = alert.filter(
              (item) => item !== "newToWisechamps"
            );
            dispatch(setAlert(newAlerts));
          }
        }, zeroMinutesAfter - now)
      );
    }

    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, [alert]);

  return (
    <Box
      className="dashboard"
      bg={"#fefefe"}
      padding={[
        "3.8rem 0.7rem 6rem",
        "3.8rem 0.7rem 6rem",
        "4rem 1.5rem 6rem",
        "4rem 1.5rem 6rem",
      ]}
    >
      <Box display={"grid"} gridTemplateColumns={"repeat(1, 1fr)"}>
        <CarousalMain />
        <WeeklyQuiz />
        <Pricing />
      </Box>
    </Box>
  );
};
