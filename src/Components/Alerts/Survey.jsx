import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { SiGoogleforms } from "react-icons/si";

export const Survey = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} textAlign={"left"}>
      <Alert
        padding={"15px 20px"}
        minHeight={"170px"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        variant="subtle"
        colorScheme={"whatsapp"}
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
          <AlertTitle>Share Your Feedback</AlertTitle>
        </Box>
        <AlertDescription width={"100%"}>
          <Text
            fontSize={["13px", "13px", "15px", "15px"]}
            m={"5px 0"}
            width={["100%", "100%", "100%", "70%"]}
          >
            Here's Your chance to Win another 500 coins into your child's
            Wisechamps account. We request parents to please take out a few
            minutes to fill this survey.
          </Text>
          <Button
            fontSize={"13px"}
            margin={"10px 0 5px 0"}
            width={"100%"}
            bg={"white"}
            border={"none"}
            padding={0}
            onClick={() => {
              window.open(`https://forms.gle/yA3o2WKZ1jVHoJbm9`);
            }}
          >
            <SiGoogleforms
              fontSize={"22px"}
              style={{
                marginRight: "5px",
                color: "#40c050",
              }}
            />
            Give Feedback
          </Button>
        </AlertDescription>
      </Alert>
    </Box>
  );
};
