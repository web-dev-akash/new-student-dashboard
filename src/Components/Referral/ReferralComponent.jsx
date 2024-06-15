import { Box, Button, Tag, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { InviteButton } from "../InviteButton/InviteButton";

export const ReferralComponent = () => {
  const user = useSelector((state) => state.user);
  return (
    <Box
      background="white"
      border={"1px solid #4E46E4"}
      padding={"1rem"}
      borderRadius={"10px"}
      // gridColumn={["unset", "unset", "1 / span 2", "1 / span 2"]}
    >
      <Text fontWeight={700} fontSize={["15px", "15px", "18px", "18px"]}>
        Referral
      </Text>
      <Text fontSize={["12px", "12px", "15px", "15px"]} fontWeight={500}>
        You have successfully referred{" "}
        <Tag
          fontSize={["13px", "13px", "15px", "15px"]}
          position={"relative"}
          bottom={"2px"}
          colorScheme="purple"
        >
          {user.referrals.length}
        </Tag>{" "}
        friends or cousins.
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
          to={"/dashboard/referrals"}
        >
          View Referral Coins
        </Link>
      </Button>
      <InviteButton />
    </Box>
  );
};
