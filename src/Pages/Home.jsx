import { Box } from "@mui/material";
import { Header } from "../Components/Header/Header";
import { NavigationTabs } from "../Components/NavBar/NavigationTabs";
import "../styles/NavigationTabs.modal.css";
import "../styles/ProfileAvatar.modal.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  // getDailyQuestion,
  getOrders,
  getProducts,
  getReportDataNew,
  getUserPaymentHistory,
  getWinnersData,
} from "../Redux/action";

export const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const orders = useSelector((state) => state.orders);
  const report = useSelector((state) => state.report);
  const winners = useSelector((state) => state.winners);
  const paymentHistory = useSelector((state) => state.paymentHistory);
  // const oqad = useSelector((state) => state.oqad);

  useEffect(() => {
    if (orders?.length === 0) {
      dispatch(getOrders(user.id));
    }
    if (products?.length === 0) {
      dispatch(getProducts());
    }
    if (!report || !report.percentage || report.sessions?.length === 0) {
      dispatch(getReportDataNew(user.email));
    }
    if (!winners || !winners.status || winners.status !== 200) {
      dispatch(getWinnersData(user.grade));
    }
    if (paymentHistory?.length === 0) {
      dispatch(getUserPaymentHistory(user.id));
    }
    // if (!oqad || !oqad.status) {
    //   dispatch(getDailyQuestion(user.grade, user.id));
    // }
  }, []);

  return (
    <Box>
      <Header />
      <NavigationTabs />
    </Box>
  );
};
