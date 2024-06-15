import { useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import {
  ListItemDecorator,
  TabPanel,
  ThemeProvider,
  Typography,
  extendTheme,
} from "@mui/joy";
import { TiHome } from "react-icons/ti";
import { TbReport } from "react-icons/tb";
import { FaGift } from "react-icons/fa";
import { GoPersonFill } from "react-icons/go";
import { BsFillChatDotsFill } from "react-icons/bs";
import { Dashboard } from "../../Pages/Dashboard";
import { ChakraProvider } from "@chakra-ui/react";

const theme = extendTheme({
  fontFamily: {
    body: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
});

export const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loadedTabs, setLoadedTabs] = useState([
    true,
    false,
    false,
    false,
    false,
  ]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setLoadedTabs((prevState) => {
      const newLoadedTabs = [...prevState];
      newLoadedTabs[newValue] = true;
      return newLoadedTabs;
    });
  };

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
            width: "93%",
            maxWidth: "600px",
            position: "fixed",
            bottom: 20,
            top: "auto",
            left: "50%",
            transform: "translateX(-50%)",
            p: 0.7,
            gap: 0.5,
            borderRadius: "xl",
            bgcolor: "background.level1",
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
            Referral
          </Tab>
          <Tab className="tabs-mobile" disableIndicator>
            <ListItemDecorator className="icon-div">
              <BsFillChatDotsFill className="icon" />
            </ListItemDecorator>
            Chat Now
          </Tab>
        </TabList>
        <ChakraProvider disableGlobalStyle>
          {loadedTabs[0] && (
            <TabPanel value={0} sx={{ padding: 0 }}>
              <Dashboard />
            </TabPanel>
          )}
          {loadedTabs[1] && (
            <TabPanel value={1} sx={{ padding: 0 }}>
              <Typography level="inherit">
                Best for professional developers building enterprise or
                data-rich applications.
              </Typography>
              <Typography
                textColor="primary.400"
                fontSize="xl3"
                fontWeight="xl"
                mt={1}
              >
                $15{" "}
                <Typography
                  fontSize="sm"
                  textColor="text.secondary"
                  fontWeight="md"
                >
                  / dev / month
                </Typography>
              </Typography>
            </TabPanel>
          )}
          {loadedTabs[2] && (
            <TabPanel value={2} sx={{ padding: 0 }}>
              <Typography level="inherit">
                The most advanced features for data-rich applications, as well
                as the highest priority for support.
              </Typography>
              <Typography
                textColor="primary.400"
                fontSize="xl3"
                fontWeight="xl"
                mt={1}
              >
                <Typography
                  fontSize="xl"
                  borderRadius="sm"
                  px={0.7}
                  mr={0.7}
                  sx={(theme) => ({
                    ...theme.variants.soft.danger,
                    color: "danger.400",
                    verticalAlign: "text-top",
                    textDecoration: "line-through",
                  })}
                >
                  $49
                </Typography>
                $37*{" "}
                <Typography
                  fontSize="sm"
                  textColor="text.secondary"
                  fontWeight="md"
                >
                  / dev / month
                </Typography>
              </Typography>
            </TabPanel>
          )}
          {loadedTabs[3] && (
            <TabPanel value={3} sx={{ padding: 0 }}>
              <Typography level="inherit">Referral Program.</Typography>
            </TabPanel>
          )}
          {loadedTabs[4] && (
            <TabPanel value={4} sx={{ padding: 0 }}>
              <Typography level="inherit">
                Chat with our support team.
              </Typography>
            </TabPanel>
          )}
        </ChakraProvider>
      </Tabs>
    </ThemeProvider>
  );
};
