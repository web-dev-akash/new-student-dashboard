import { ProfileAvatar } from "./ProfileAvatar";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { DifficultyLevelToggler } from "../DifficultyLevelToggler/DifficultyLevelToggler";

export const Header = () => {
  const mode = useSelector((state) => state.mode);
  const grade = useSelector((state) => state.user.grade);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: { xs: "absolute", md: "fixed" },
        zIndex: 1000,
        width: "100%",
        minHeight: { xs: "60px", md: "75px" },
        bgcolor: { md: "white" },
        boxShadow: { md: "0 0 2px 1px #00000050" },
      }}
    >
      <Box></Box>
      {Number(grade) === 5 && <DifficultyLevelToggler />}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "7px", md: "12px" },
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
