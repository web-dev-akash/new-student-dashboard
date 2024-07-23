import { Box, ChakraProvider, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const Missed = () => {
  const link = new URLSearchParams(window.location.search).get("link");
  const navigate = useNavigate();

  return (
    <ChakraProvider disableGlobalStyle>
      <Box minHeight={"100vh"}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          position={"fixed"}
          width={"100%"}
          padding={[
            "15px 11px 35px 11px",
            "15px 11px 35px 11px",
            "15px 11px 30px 11px",
            "15px 11px 15px 11px",
            "15px 11px 20px 11px",
          ]}
          bg={"white"}
          top={0}
          left={0}
          zIndex={99999}
        >
          <header>
            <Image
              src="/images/logo.png"
              alt="Wisechamps"
              width={["120px", "120px", "180px", "180px"]}
              onClick={() => navigate("/")}
            />
          </header>
          <Link to={"/"}>
            <Text
              fontSize={["11px", "11px", "13px", "14px"]}
              padding={"3px 10px"}
              background={"#4E46E4"}
              border={"1px solid #4E46E4"}
              borderRadius={"5px"}
              color={"white"}
            >
              Back
            </Text>
          </Link>
        </Box>
        <Box minHeight={"110vh"} mt={"-40px"} height={"100%"}>
          <iframe
            id="vevox"
            name="vevox"
            style={{
              minHeight: "110vh",
              minWidth: "100vw",
              maxWidth: "100%",
            }}
            width={"100%"}
            height={"100%"}
            title={"Vevox Quiz"}
            src={link}
          />
        </Box>
      </Box>
    </ChakraProvider>
  );
};
