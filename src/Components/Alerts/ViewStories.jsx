import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";

export const ViewStories = ({ setShowStory }) => {
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box>
        <Image src="" alt="story-image" />
      </Box>
      <Box>
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
          onClick={() => setShowStory(true)}
        >
          Start Your Journey
        </Button>
      </Box>
    </Box>
  );
};
