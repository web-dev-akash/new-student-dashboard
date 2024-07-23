import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";

export const DoubtSession = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} textAlign={"left"}>
      <Alert
        padding={"15px 20px"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        variant="subtle"
        colorScheme={"purple"}
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
          <AlertTitle>Free Doubt Session</AlertTitle>
        </Box>
        <AlertDescription width={"100%"}>
          <Text
            fontSize={["13px", "13px", "15px", "15px"]}
            m={"5px 0"}
            width={"100%"}
            fontWeight={500}
          >
            Got questions? Join our special session to clear your doubts!
          </Text>
          <Button
            fontSize={"13px"}
            margin={"10px 0 5px 0"}
            width={["100%", "100%", "160px", "160px"]}
            bg={"white"}
            border={"none"}
            onClick={() => {
              window.location.assign(
                `https://us06web.zoom.us/meeting/register/tZEscu6gpjwtGNA4s2yUdlJ6n3436Jw1jDp8`
              );
            }}
          >
            Join Session Now
          </Button>
        </AlertDescription>
      </Alert>
    </Box>
  );
};
