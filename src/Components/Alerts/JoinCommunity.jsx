import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { RiWhatsappFill } from "react-icons/ri";

export const JoinCommunity = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} textAlign={"left"}>
      <Alert
        padding={"15px 20px"}
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
          <AlertTitle>Join Whatsapp Community</AlertTitle>
        </Box>
        <AlertDescription width={"100%"}>
          <Text
            fontSize={["13px", "13px", "15px", "15px"]}
            m={"5px 0"}
            width={"100%"}
            fontWeight={500}
          >
            Connect with expert teachers. Get reminders of quizzes and important
            events.
          </Text>
          <Button
            fontSize={"13px"}
            margin={"10px 0 5px 0"}
            width={["100%", "100%", "160px", "160px"]}
            bg={"white"}
            border={"none"}
            padding={0}
            onClick={() => {
              window.open(`https://chat.whatsapp.com/B8mYqAucdqW2EJverDWbrS`);
            }}
          >
            <RiWhatsappFill
              fontSize={"25px"}
              style={{
                marginRight: "5px",
                color: "#40c050",
              }}
            />
            Join Community
          </Button>
        </AlertDescription>
      </Alert>
    </Box>
  );
};
