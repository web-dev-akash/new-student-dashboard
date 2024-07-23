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
import { useSelector } from "react-redux";

export const QuizInProgress = () => {
  const user = useSelector((state) => state.user);

  return (
    <Box display={"flex"} justifyContent={"center"} textAlign={"left"}>
      <Alert
        padding={"15px 20px"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        variant="subtle"
        status={"info"}
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
          <AlertTitle>Join Meeting Now</AlertTitle>
        </Box>
        <AlertDescription width={"100%"}>
          <Text
            fontSize={["13px", "13px", "15px", "15px"]}
            m={"5px 0"}
            width={"100%"}
            fontWeight={500}
          >
            Meeting is about to start in some time. Click the below button to
            join today's quiz.
          </Text>
          <Button
            fontSize={"13px"}
            margin={"10px 0 5px 0"}
            width={["100%", "100%", "160px", "160px"]}
            bg={"white"}
            border={"none"}
            onClick={() =>
              window.open(`https://zoom.wisechamps.com?email=${user.email}`)
            }
          >
            Join Meeting Now
          </Button>
        </AlertDescription>
      </Alert>
    </Box>
  );
};
