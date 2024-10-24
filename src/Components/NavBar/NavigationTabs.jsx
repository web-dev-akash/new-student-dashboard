import { useEffect, useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import {
  ListItemDecorator,
  TabPanel,
  ThemeProvider,
  extendTheme,
} from "@mui/joy";
import { TiHome } from "react-icons/ti";
import { TbReport } from "react-icons/tb";
import { FaGift, FaPhoneAlt } from "react-icons/fa";
import { GoPersonFill } from "react-icons/go";
import { Dashboard } from "../../Pages/Dashboard";
import { ChakraProvider } from "@chakra-ui/react";
import { Store } from "../../Pages/Store";
import { Referrals } from "../../Pages/Referrals";
import { Report } from "../Report/Report";
import { ContactUs } from "../ContactUs/ContactUs";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { QuizBalance } from "../QuizBalance/QuizBalance";
import { useSelector } from "react-redux";

const theme = extendTheme({
  fontFamily: {
    body: "Poppins, Inter, sans-serif",
  },
});

export const NavigationTabs = () => {
  const query = useSelector((state) => state.query);
  const savedActiveTab = localStorage.getItem("wise_active_tab");
  const [activeTab, setActiveTab] = useState(
    savedActiveTab ? Number(savedActiveTab) : 0
  );

  const handleTabChange = (event, newValue) => {
    localStorage.setItem("wise_active_tab", newValue);
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (query === "#reports") {
      setActiveTab(1);
    } else if (query === "#gifts") {
      setActiveTab(2);
    } else if (query === "#refer") {
      setActiveTab(3);
    } else if (query === "#buy_quiz") {
      setActiveTab(4);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Tabs
        aria-label="tabs"
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          bgcolor: "transparent",
        }}
      >
        <TabList
          className="tab-div"
          disableUnderline
          tabFlex={1}
          sx={{
            width: "100%",
            maxWidth: { md: "500px", lg: "600px" },
            position: "fixed",
            bottom: { xs: 0, md: "auto" },
            top: { xs: "auto", md: "7px" },
            left: "50%",
            transform: "translateX(-50%)",
            p: 0.7,
            gap: { xs: 0.5, md: 1.5 },
            borderRadius: { xs: "15px 15px 0 0", md: "15px" },
            border: { md: "1px solid #5838fc" },
            bgcolor: "white",
            boxShadow: {
              xs: "0 0 25px 5px rgba(0,0,0, 0.7)",
              md: "none",
            },
            zIndex: 1001,
            minHeight: { xs: "60px", md: "60px" },
            maxHeight: { md: "60px" },
          }}
        >
          <Tab className="tabs-mobile" disableIndicator>
            <ListItemDecorator className="icon-div">
              <TiHome className="icon" />
            </ListItemDecorator>
            Home
          </Tab>
          <Tab className="tabs-mobile" disableIndicator>
            <ListItemDecorator className="icon-div">
              <TbReport className="icon" />
            </ListItemDecorator>
            Report
          </Tab>
          <Tab className="tabs-mobile" disableIndicator>
            <ListItemDecorator className="icon-div">
              <FaGift className="icon" />
            </ListItemDecorator>
            Gift Store
          </Tab>
          <Tab className="tabs-mobile" disableIndicator>
            <ListItemDecorator className="icon-div">
              <GoPersonFill className="icon" />
            </ListItemDecorator>
            Referrals
          </Tab>
          <Tab className="tabs-mobile" disableIndicator>
            <ListItemDecorator className="icon-div">
              <RiMoneyRupeeCircleFill className="icon" />
            </ListItemDecorator>
            Quiz Balance
          </Tab>
          <Tab className="tabs-mobile" disableIndicator>
            <ListItemDecorator className="icon-div">
              <FaPhoneAlt className="icon" />
            </ListItemDecorator>
            Contact Us
          </Tab>
        </TabList>
        <ChakraProvider disableGlobalStyle>
          <TabPanel value={0} sx={{ padding: 0 }}>
            <Dashboard setTab={setActiveTab} />
          </TabPanel>

          <TabPanel value={1} sx={{ padding: 0 }}>
            <Report />
          </TabPanel>

          <TabPanel value={2} sx={{ padding: 0 }}>
            <Store />
          </TabPanel>

          <TabPanel value={3} sx={{ padding: 0 }}>
            <Referrals />
          </TabPanel>

          <TabPanel value={4} sx={{ padding: 0 }}>
            <QuizBalance />
          </TabPanel>

          <TabPanel value={5} sx={{ padding: 0 }}>
            <ContactUs />
          </TabPanel>
        </ChakraProvider>
      </Tabs>
    </ThemeProvider>
  );
};
