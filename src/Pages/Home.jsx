import { Box } from "@mui/material";
import { Header } from "../Components/Header/Header";
import { NavigationTabs } from "../Components/NavBar/NavigationTabs";
import "../styles/NavigationTabs.modal.css";
import "../styles/ProfileAvatar.modal.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDailyQuestion, getTestSeriesByGrade } from "../Redux/action";

export const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const oqad = useSelector((state) => state.oqad);
  const testSeries = useSelector((state) => state.testSeries);

  const maths = useSelector((state) => state.user.testSeries.Maths);
  const science = useSelector((state) => state.user.testSeries.Science);
  const english = useSelector((state) => state.user.testSeries.English);

  const mathsTestSeries = useSelector((state) => state.testSeries.Maths);
  const scienceTestSeries = useSelector((state) => state.testSeries.Science);
  const englishTestSeries = useSelector((state) => state.testSeries.English);

  console.log("Data 1 is :", maths, science, english);
  console.log("Data 2 is :", testSeries);

  useEffect(() => {
    if (!oqad || !oqad.status) {
      dispatch(getDailyQuestion(user.grade, user.id));
    }
    if (maths && mathsTestSeries.status === 0) {
      dispatch(getTestSeriesByGrade(testSeries, user.grade, "Maths"));
    }
    if (english && englishTestSeries.status === 0) {
      dispatch(getTestSeriesByGrade(testSeries, user.grade, "English"));
    }
    if (science && scienceTestSeries.status === 0) {
      dispatch(getTestSeriesByGrade(testSeries, user.grade, "Science"));
    }
  }, []);

  return (
    <Box>
      <Header />
      <NavigationTabs />
    </Box>
  );
};
