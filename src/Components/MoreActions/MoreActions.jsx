import { Box, Button, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const MoreActions = () => {
  const user = useSelector((state) => state.user);
  return (
    <Box
      background="white"
      border={"1px solid #4E46E4"}
      padding={"1rem"}
      borderRadius={"10px"}
    >
      <Text fontWeight={700} fontSize={["15px", "15px", "18px", "18px"]}>
        More Actions
      </Text>
      <Box>
        <Button
          mt={3}
          bg={"#4E46E4"}
          color={"white"}
          fontSize={["13px", "13px", "15px", "15px"]}
          fontWeight={400}
          width={"100%"}
          padding={0}
        >
          <Link
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            to={"/dashboard/store"}
          >
            Gift Store (Redeem Coins)
          </Link>
        </Button>

        <Button
          onClick={() =>
            window.open(`https://report.wisechamps.com/?email=${user.email}`)
          }
          mt={3}
          bg={"#4E46E4"}
          color={"white"}
          fontSize={["13px", "13px", "15px", "15px"]}
          fontWeight={400}
          width={"100%"}
        >
          View Report
        </Button>
      </Box>
    </Box>
  );
};
