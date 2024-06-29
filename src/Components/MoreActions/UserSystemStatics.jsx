import { Box, Image, Text } from "@chakra-ui/react";
import { Chip } from "@mui/material";
import { useSelector } from "react-redux";
import active from "/src/assets/active_badge.png";
import regular from "/src/assets/regular_badge.png";

export const UserSystemStatics = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        alignItems={"center"}
        gap={"10px"}
        mt={"8px"}
      >
        <Chip
          label={`Quiz Balance : ${user.credits}`}
          sx={{
            fontSize: { xs: "11px", md: "13px", lg: "15px" },
            fontWeight: 600,
            bgcolor: "#E9D8FD",
          }}
        />
        <Chip
          label={`Quiz Taken : ${user.quizzes}`}
          sx={{
            fontSize: { xs: "11px", md: "13px", lg: "15px" },
            fontWeight: 600,
            bgcolor: "#E9D8FD",
          }}
        />
        <Chip
          label={`Coins : ${user.coins}`}
          sx={{
            fontSize: { xs: "11px", md: "13px", lg: "15px" },
            fontWeight: 600,
            bgcolor: "#E9D8FD",
          }}
        />

        <Chip
          label={`Age in system : 
          ${
            user.age >= 365
              ? Math.floor(user.age / 365) > 1
                ? `${Math.floor(user.age / 365)} years`
                : `${Math.floor(user.age / 365)} year`
              : user.age >= 30
              ? Math.floor(user.age / 30) > 1
                ? `${Math.floor(user.age / 30)} months`
                : `${Math.floor(user.age / 30)} month`
              : `${user.age} days`
          }`}
          sx={{
            fontSize: { xs: "11px", md: "13px", lg: "15px" },
            fontWeight: 600,
            bgcolor: "#E9D8FD",
          }}
        />

        <Chip
          label={`Grade : 
          ${user.grade}`}
          sx={{
            fontSize: { xs: "11px", md: "13px", lg: "15px" },
            fontWeight: 600,
            bgcolor: "#E9D8FD",
          }}
        />

        {user.category && user.category !== "" && (
          <Chip
            label={
              user.category === "Active" ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text mr={1}>Consistent</Text>
                  <Image src={active} alt="" width={"25px"} />
                </Box>
              ) : user.category === "Regular" ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text ml={1}>Rockstar</Text>
                  <Image
                    src={regular}
                    alt=""
                    width={"20px"}
                    transform={"rotate(-45deg)"}
                  />
                </Box>
              ) : user.category === "Inactive" ? (
                "Explorer"
              ) : user.category === "AtRisk" ? (
                "Never give up!"
              ) : user.category === "Dropouts" ? (
                "We miss you!"
              ) : (
                "We missed you!"
              )
            }
            sx={{
              fontSize: { xs: "11px", md: "13px", lg: "15px" },
              fontWeight: 600,
              bgcolor:
                user.category === "Active"
                  ? "#C6F6D5"
                  : user.category === "Regular"
                  ? "#C6F6D5"
                  : user.category === "Inactive" ||
                    user.category === "AtRisk" ||
                    user.category === "Dropouts"
                  ? "#FED7D7"
                  : "linkedin",
            }}
          />
        )}
      </Box>
    </>
  );
};
