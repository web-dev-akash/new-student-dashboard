import { Box } from "@mui/material";
import { Header } from "../Components/Header/Header";
import { NavigationTabs } from "../Components/NavBar/NavigationTabs";
import "../styles/NavigationTabs.modal.css";
import "../styles/ProfileAvatar.modal.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getDailyQuestion,
  getTestSeriesByGrade,
  getTestSeriesDoubtSessions,
} from "../Redux/action";

export const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const oqad = useSelector((state) => state.oqad);
  const testSeries = useSelector((state) => state.testSeries);

  const maths = useSelector((state) => state.user.testSeries.Maths);
  const science = useSelector((state) => state.user.testSeries.Science);
  const english = useSelector((state) => state.user.testSeries.English);

  const testSeriesDoubtSession = useSelector((state) => state.doubtSession);

  useEffect(() => {
    if (!oqad || !oqad.status) {
      dispatch(getDailyQuestion(user.grade, user.id));
    }

    if (testSeries.status === 0) {
      dispatch(getTestSeriesByGrade(user.grade));
    }

    if ((maths || english || science) && testSeriesDoubtSession.status === 0) {
      dispatch(getTestSeriesDoubtSessions(testSeries));
    }
  }, [testSeries.Maths]);

  return (
    <Box>
      <Header />
      <NavigationTabs />
    </Box>
  );
};
