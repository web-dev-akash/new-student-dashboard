import { ProfileAvatar } from "./ProfileAvatar";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

export const Header = () => {
  const mode = useSelector((state) => state.mode);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        zIndex: 9,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: { xs: "7px", md: "5px" },
          left: { xs: "10px", md: "1.5rem" },
          width: { xs: "140px", md: "170px" },
        }}
      >
        <img
          src="/images/logo.png"
          alt="Wisechamps"
          style={{ width: "inherit" }}
          width={"120px"}
          onClick={() => navigate("/")}
        />
      </Box>
      {mode === "user" ? <ProfileAvatar /> : <Box></Box>}
    </Box>
  );
};
