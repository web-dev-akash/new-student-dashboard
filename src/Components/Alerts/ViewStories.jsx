import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
export const ViewStories = ({ setShowStory }) => {
  return (
    <Box display={"flex"} justifyContent={"center"} textAlign={"left"}>
      <Alert
        padding={"15px 20px"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        variant="subtle"
        status="success"
        colorScheme="green"
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
          <AlertTitle>Check Out Stories</AlertTitle>
        </Box>
        <AlertDescription width={"100%"}>
          <Text
            fontSize={["13px", "13px", "15px", "15px"]}
            m={"5px 0"}
            width={"100%"}
            fontWeight={500}
          >
            Checkout the solution of yesterday&apos;s question and Quote for the
            day.
          </Text>
          <Button
            fontSize={"13px"}
            margin={"10px 0 5px 0"}
            width={["100%", "100%", "max-content", "max-content"]}
            bg={"white"}
            border={"none"}
            paddingInline={5}
            onClick={() => setShowStory(true)}
          >
            View Stories
          </Button>
        </AlertDescription>
      </Alert>
    </Box>
  );
};
