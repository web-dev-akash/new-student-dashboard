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
        >
          <h2>Hi {studentName || "Students"}</h2>
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
