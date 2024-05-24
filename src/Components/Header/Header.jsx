import { Box } from "@mui/material";
import { ProfileAvatar } from "./ProfileAvatar";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export const Header = () => {
  const mode = useSelector((state) => state.mode);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <header>
        <img
          src="/images/logo.png"
          alt="Wisechamps"
          width={"120px"}
          onClick={() => navigate("/")}
        />
      </header>
      {mode === "user" ? <ProfileAvatar /> : <Box></Box>}
    </Box>
  );
};
