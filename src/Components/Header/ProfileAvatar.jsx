import { Heading, Image } from "@chakra-ui/react";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import hi from "/src/assets/hi.gif";
import { UserSystemStatics } from "../MoreActions/UserSystemStatics";
export const ProfileAvatar = () => {
  const studentName = useSelector((state) => state.user.studentName);
  const [open, setOpen] = useState(false);
  const profilePic = localStorage.getItem("wise_profile_pic");

  const toggleDrawer = (inOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(inOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Avatar
        sx={!profilePic && { bgcolor: "#5838fc", color: "white" }}
        alt={studentName}
        src={profilePic}
        onClick={toggleDrawer(true)}
      />
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
        size="sm"
        className="profile-drawer-cointainer"
      >
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          className="profile-drawer"
          sx={{
            maxWidth: { xs: "280px", sm: "350px", md: "auto" },
          }}
        >
          <Box display={"flex"} gap={"5px"}>
            <Heading
              fontSize={["20px", "20px", "25px", "25px", "25px"]}
              fontWeight={400}
              textTransform={"capitalize"}
            >
              Hi,{" "}
              {studentName ? studentName.toString().split(" ")[0] : "Student"}
            </Heading>
            <Image
              position={"relative"}
              bottom={["4px", "4px", "0", "0"]}
              src={hi}
              alt="👋"
              width={"30px"}
            />
          </Box>
          <UserSystemStatics />
          <List>
            {["Profile", "Starred", "Send email", "Drafts"].map((text) => (
              <ListItem
                key={text}
                sx={{ padding: 0 }}
                className="profile-options"
              >
                <ListItemButton>{text}</ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text) => (
              <ListItem
                key={text}
                sx={{ padding: 0 }}
                className="profile-options"
              >
                <ListItemButton>{text}</ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};
