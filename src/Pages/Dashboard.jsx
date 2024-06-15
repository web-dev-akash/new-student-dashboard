import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getOrders, getProducts } from "../Redux/action";

import { CarousalMain } from "../Components/Alerts/CarousalMain";
import { ReferralComponent } from "../Components/Referral/ReferralComponent";
import { CoinsComponent } from "../Components/CoinsComponent/CoinsComponent";
import { Schedule } from "../Components/Schedule/Schedule";
import { Pricing } from "../Components/Pricing/Pricing";
import { MoreActions } from "../Components/MoreActions/MoreActions";
import { Footer } from "../Components/Footer/Footer";

export const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders(user.id));
    localStorage.setItem("wisechamps_current_path", window.location.pathname);
    if (products?.length === 0) {
      dispatch(getProducts());
    }
  }, []);
  return (
    <Box className="dashboard" mt={"20px"}>
      <Box
        display={"grid"}
        gridTemplateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
        ]}
        gap={["10px", "10px", "20px", "20px"]}
      >
        <CarousalMain />
        <ReferralComponent />
        <CoinsComponent />
        <Schedule />
        <Pricing />
        <MoreActions />
        <Footer />
      </Box>
    </Box>
  );
};
