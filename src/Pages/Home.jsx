import { Box } from "@mui/material";
import { Header } from "../Components/Header/Header";
import { NavigationTabs } from "../Components/NavBar/NavigationTabs";
import "../styles/NavigationTabs.modal.css";
import "../styles/ProfileAvatar.modal.css";

export const Home = () => {
  return (
    <Box id={"home"}>
      <Header />
      <NavigationTabs />
    </Box>
  );
};
