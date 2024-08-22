/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";

export const CreditsExhausted = ({ setTab }) => {
  return (
    <Box display={"flex"} justifyContent={"center"} textAlign={"left"}>
      <Alert
        padding={"15px 20px"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        variant="subtle"
        status={"error"}
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
          <AlertTitle>Quiz Balance Exhausted</AlertTitle>
        </Box>
        <AlertDescription width={"100%"}>
          <Text
            fontSize={["13px", "13px", "15px", "15px"]}
            m={"5px 0"}
            width={"100%"}
            fontWeight={500}
          >
            You have 0 quiz balance left. Add more to join today's quiz.
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
