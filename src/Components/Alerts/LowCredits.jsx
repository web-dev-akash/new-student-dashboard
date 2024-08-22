/* eslint-disable react/prop-types */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

export const LowCredits = ({ setTab }) => {
  const user = useSelector((state) => state.user);
  return (
    <Box display={"flex"} justifyContent={"center"} textAlign={"left"}>
      <Alert
        padding={"15px 20px"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        variant="subtle"
        status={"warning"}
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
          <AlertTitle>Low Quiz Balance</AlertTitle>
        </Box>
        <AlertDescription width={"100%"}>
          <Text
            fontSize={["13px", "13px", "15px", "15px"]}
            m={"5px 0"}
            width={"100%"}
            fontWeight={500}
          >
            You have {user.credits} quiz balance left. Add more to enjoy
            uninterrupted quiz.
          </Text>
          <Button
            fontSize={"13px"}
            margin={"10px 0 5px 0"}
            width={["100%", "100%", "max-content", "max-content"]}
            bg={"white"}
            border={"none"}
            onClick={() => setTab(4)}
          >
            Add Quiz Balance
          </Button>
        </AlertDescription>
      </Alert>
    </Box>
  );
};
