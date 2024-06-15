import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const CoinsComponent = () => {
  return (
    <Box
      background="white"
      border={"1px solid #4E46E4"}
      padding={"1rem"}
      borderRadius={"10px"}
      // gridColumn={["unset", "unset", "1 / span 2", "1 / span 2"]}
    >
      <Text fontWeight={700} fontSize={["15px", "15px", "18px", "18px"]}>
        Coins
      </Text>
      <Text fontSize={["12px", "12px", "15px", "15px"]} fontWeight={500}>
        Check your coins transactions history by clicking on the below button.
      </Text>
      <Button
        mt={3}
        bg={"#4E46E4"}
        color={"white"}
        fontSize={"13px"}
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
          to={"/dashboard/coins"}
        >
          View Coins History
        </Link>
      </Button>
    </Box>
  );
};
