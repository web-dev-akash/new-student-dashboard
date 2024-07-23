import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

export const CoinsUpdated = () => {
  const user = useSelector((state) => state.user);
  return (
    <Box display={"flex"} justifyContent={"center"} textAlign={"left"}>
      <Alert
        padding={"15px 20px"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        variant="subtle"
        status={"success"}
        borderRadius={"10px"}
        position={"relative"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          gap={"5px"}
        >
          <AlertIcon margin={0} />
          <AlertTitle>Congratulations!</AlertTitle>
        </Box>
        <AlertDescription>
          <Text
            fontSize={["13px", "13px", "15px", "15px"]}
            m={"5px 0"}
            width={"100%"}
            fontWeight={500}
          >
            Coins added successfully. Your coins have updated to {user.coins}.
          </Text>
        </AlertDescription>
      </Alert>
    </Box>
  );
};
