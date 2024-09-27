import { Box } from "@mui/material";
import { Header } from "../Components/Header/Header";
import { NavigationTabs } from "../Components/NavBar/NavigationTabs";
import "../styles/NavigationTabs.modal.css";
import "../styles/ProfileAvatar.modal.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getDailyQuestion,
  getStoriesData,
  getTestSeriesByGrade,
  getTestSeriesDoubtSessions,
} from "../Redux/action";
import { requestForToken } from "../firebase";

export const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const oqad = useSelector((state) => state.oqad);
  const testSeries = useSelector((state) => state.testSeries);
  const currentStories = useSelector((state) => state.story);

  const testSeriesDoubtSession = useSelector((state) => state.doubtSession);

  const getToken = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await requestForToken();
      if (token) {
        // localStorage.setItem("FCM_TOKEN", token);
        // sendTokenForUser(token)
      }
    }
  };

  useEffect(() => {
    if (!oqad || !oqad.status) {
      dispatch(getDailyQuestion(user.grade, user.id));
    }

    if (testSeries.status === 0) {
      dispatch(getTestSeriesByGrade(user.grade));
    }

    if (testSeriesDoubtSession.status === 0) {
      dispatch(getTestSeriesDoubtSessions(user.grade));
    }

    if (currentStories.status === 0) {
      dispatch(getStoriesData(user.grade));
    }

    getToken();
  }, []);

  return (
    <Box>
      <Header />
      <NavigationTabs />
    </Box>
  );
};
