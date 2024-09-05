/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import {
  Box,
  Button,
  ChakraProvider,
  Image,
  SimpleGrid,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/images/logo.png";

export const TestSeriesPlans = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const email = useSelector((state) => state.user.email);
  const [tempLoading, setTempLoading] = useState(null);

  const handlePayment = async (emailParam, amountParam, subjectParam) => {
    try {
      setTempLoading(subjectParam);
      const authToken = import.meta.env.VITE_APP_AUTH_TOKEN;
      const url = `https://backend.wisechamps.com/payment_links`;
      const res = await axios.post(
        url,
        {
          email: emailParam,
          amount: amountParam,
          subject: subjectParam,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (res?.data?.short_url) {
        const paymentLink = res.data.short_url;
        window.location.assign(paymentLink);
      } else {
        toast({
          title: "Something Went Wrong",
          description: "Please try after sometime",
          duration: 4000,
          isClosable: true,
          position: "top",
          status: "error",
        });
        setTempLoading(null);
      }
    } catch (error) {
      setTempLoading(null);
      toast({
        title: "Something Went Wrong",
        description: "Please try after sometime",
        duration: 4000,
        isClosable: true,
        position: "top",
        status: "error",
      });
      console.log("error is ------------", error);
    }
  };

  return (
    <ChakraProvider disableGlobalStyle>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        position={"absolute"}
        width={"100%"}
        padding={[
          "5px 11px 5px 11px",
          "5px 11px 5px 11px",
          "10px 1.4rem 10px 1.4rem",
          "10px 1.4rem 10px 1.4rem",
          "10px 1.4rem 10px 1.4rem",
        ]}
        top={0}
        left={0}
      >
        <header>
          <Image
            src={logo}
            alt="Wisechamps"
            width={["140px", "140px", "170px", "170px"]}
            onClick={() => navigate("/")}
          />
        </header>
        <Link to={"/"}>
          <Text
            fontSize={["11px", "11px", "13px", "14px"]}
            padding={"5px 15px"}
            fontWeight={600}
            background={"#4E46E4"}
            border={"1px solid #4E46E4"}
            borderRadius={"5px"}
            color={"white"}
          >
            Back
          </Text>
        </Link>
      </Box>
      <Box
        bg={"#E7E6FF"}
        padding={[
          "2.5rem 0.7rem 5rem",
          "2.5rem 0.7rem 5rem",
          "3.5rem 1.5rem 5rem",
          "3.5rem 1.5rem 5rem",
        ]}
        minHeight={"100vh"}
      >
        <Box mt={10}>
          <SimpleGrid columns={[1, 1, 2, 3]} spacing={10}>
            <Box
              bg={"white"}
              width={"100%"}
              padding={["1rem", "1rem", "1rem", "1rem", "1rem"]}
              borderRadius={"20px"}
              transition={"0.5s ease"}
              _hover={{
                transform: "scale(1.01)",
                zIndex: 99,
                boxShadow: "0 0 0 2px #FFA69E, 15px 15px 0 0 #FFA69E",
              }}
              position={"relative"}
              boxShadow={"0 0 0 2px #FFA69E, 12px 12px 0 0 #FFA69E"}
            >
              <Text
                fontSize={["15px", "15px", "18px", "18px"]}
                fontWeight={700}
                textTransform={"uppercase"}
                position={"absolute"}
                top={"-10px"}
                left={"-15px"}
                bg={"#FFA69E"}
                color={"white"}
                padding={"0px 40px"}
                zIndex={2}
                borderRadius={"50px"}
                textAlign={"center"}
                lineHeight={1.3}
              >
                Maths <br />
                Test Series
              </Text>
              <Tag
                bg={"#FFA69E"}
                color={"white"}
                position={"absolute"}
                top={"4px"}
                right={"7px"}
                borderRadius={"50px"}
              >
                50% OFF
              </Tag>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                m={"25px 0 10px 0"}
              >
                <Tag
                  fontWeight={700}
                  size={["lg"]}
                  bg={"#FFA69E"}
                  color={"white"}
                  fontSize={["15px", "15px", "17px", "16px", "17px"]}
                >
                  5 Mock Tests
                </Tag>

                <Box
                  fontSize={["30px", "30px", "35px", "35px", "45px"]}
                  fontWeight={"800"}
                  marginBottom={["0px", "0px", "5px", "5px"]}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={0}
                  justifyContent={"center"}
                  alignItems={"flex-end"}
                  lineHeight={1.3}
                >
                  <Text
                    fontSize={["14px", "14px", "15px", "16px", "19px"]}
                    opacity={0.7}
                    textDecoration={"line-through"}
                    lineHeight={0.4}
                  >
                    ₹1000
                  </Text>
                  <Text>₹500</Text>
                  <Text
                    whiteSpace={"nowrap"}
                    fontSize={["13px", "13px", "14px", "15px", "16px"]}
                  >
                    15 Doubt Session
                  </Text>
                </Box>
              </Box>
              <Text
                fontWeight={600}
                fontSize={["13px", "13px", "14px", "15px", "16px"]}
                mb={"15px"}
              >
                Validity : 9th Aug - 15th Oct
              </Text>
              <Button
                width={"100%"}
                background={"#FFA69E"}
                color={"white"}
                border={"2px solid transparent"}
                transition={"0.4s ease"}
                _hover={{
                  outline: "none",
                  background: "white",
                  color: "#000",
                  border: "2px solid #FFA69E",
                  boxShadow: "0 0 0 5px #FFA69E30",
                }}
                onClick={() => handlePayment(email, "500", "Maths")}
                isLoading={tempLoading === "Maths"}
                loadingText={""}
              >
                Buy Now
              </Button>
            </Box>
            <Box
              bg={"white"}
              width={"100%"}
              padding={["1rem", "1rem", "1rem", "1rem", "1rem"]}
              borderRadius={"20px"}
              transition={"0.5s ease"}
              _hover={{
                transform: "scale(1.01)",
                zIndex: 99,
                boxShadow: "0 0 0 2px #49B86A, 15px 15px 0 0 #49B86A",
              }}
              position={"relative"}
              boxShadow={"0 0 0 2px #49B86A, 12px 12px 0 0 #49B86A"}
            >
              <Text
                fontSize={["15px", "15px", "18px", "18px"]}
                fontWeight={700}
                textTransform={"uppercase"}
                position={"absolute"}
                top={"-10px"}
                left={"-15px"}
                bg={"#49B86A"}
                color={"white"}
                padding={"0px 40px"}
                zIndex={2}
                borderRadius={"50px"}
                textAlign={"center"}
                lineHeight={1.3}
              >
                English <br />
                Test Series
              </Text>
              <Tag
                bg={"#49B86A"}
                color={"white"}
                position={"absolute"}
                top={"4px"}
                right={"7px"}
                borderRadius={"50px"}
              >
                50% OFF
              </Tag>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                m={"25px 0 10px 0"}
              >
                <Tag
                  fontWeight={700}
                  size={["lg"]}
                  bg={"#49B86A"}
                  color={"white"}
                  fontSize={["15px", "15px", "17px", "16px", "17px"]}
                >
                  5 Mock Tests
                </Tag>

                <Box
                  fontSize={["30px", "30px", "35px", "35px", "45px"]}
                  fontWeight={"800"}
                  marginBottom={["0px", "0px", "5px", "5px"]}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={0}
                  justifyContent={"center"}
                  alignItems={"flex-end"}
                  lineHeight={1.3}
                >
                  <Text
                    fontSize={["14px", "14px", "15px", "16px", "19px"]}
                    opacity={0.7}
                    textDecoration={"line-through"}
                    lineHeight={0.4}
                  >
                    ₹1000
                  </Text>
                  <Text>₹500</Text>{" "}
                  <Text
                    whiteSpace={"nowrap"}
                    fontSize={["13px", "13px", "14px", "15px", "16px"]}
                  >
                    15 Doubt Session
                  </Text>
                </Box>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                mb={"15px"}
              >
                <Text
                  fontWeight={600}
                  fontSize={["13px", "13px", "14px", "15px", "16px"]}
                >
                  Validity : 9th Aug - 15th Oct
                </Text>
              </Box>
              <Button
                width={"100%"}
                background={"#49B86A"}
                color={"white"}
                border={"2px solid transparent"}
                transition={"0.4s ease"}
                _hover={{
                  outline: "none",
                  background: "white",
                  color: "#000",
                  border: "2px solid #49B86A",
                  boxShadow: "0 0 0 5px #49B86A30",
                }}
                onClick={() => handlePayment(email, "500", "English")}
                // mb={"5px"}
                isLoading={tempLoading === "English"}
                loadingText={""}
              >
                Buy Now
              </Button>
            </Box>
            <Box
              bg={"white"}
              width={"100%"}
              padding={["1rem", "1rem", "1rem", "1rem", "1rem"]}
              borderRadius={"20px"}
              transition={"0.5s ease"}
              _hover={{
                transform: "scale(1.01)",
                zIndex: 99,
                boxShadow: "0 0 0 2px #a480f2, 15px 15px 0 0 #a480f2",
              }}
              position={"relative"}
              boxShadow={"0 0 0 2px #a480f2, 12px 12px 0 0 #a480f2"}
            >
              <Text
                fontSize={["15px", "15px", "18px", "18px"]}
                fontWeight={700}
                textTransform={"uppercase"}
                position={"absolute"}
                top={"-10px"}
                left={"-15px"}
                bg={"#a480f2"}
                color={"white"}
                padding={"0px 40px"}
                zIndex={2}
                borderRadius={"50px"}
                textAlign={"center"}
                lineHeight={1.3}
              >
                Science <br />
                Test Series
              </Text>
              <Tag
                bg={"#a480f2"}
                color={"white"}
                position={"absolute"}
                top={"4px"}
                right={"7px"}
                borderRadius={"50px"}
              >
                50% OFF
              </Tag>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                m={"25px 0 10px 0"}
              >
                <Tag
                  fontWeight={700}
                  size={["lg"]}
                  bg={"#a480f2"}
                  color={"white"}
                  fontSize={["15px", "15px", "17px", "16px", "17px"]}
                >
                  5 Mock Tests
                </Tag>

                <Box
                  fontSize={["30px", "30px", "35px", "35px", "45px"]}
                  fontWeight={"800"}
                  marginBottom={["0px", "0px", "5px", "5px"]}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={0}
                  justifyContent={"center"}
                  alignItems={"flex-end"}
                  lineHeight={1.3}
                >
                  <Text
                    fontSize={["14px", "14px", "15px", "16px", "19px"]}
                    opacity={0.7}
                    textDecoration={"line-through"}
                    lineHeight={0.4}
                  >
                    ₹1000
                  </Text>
                  <Text>₹500</Text>{" "}
                  <Text
                    whiteSpace={"nowrap"}
                    fontSize={["13px", "13px", "14px", "15px", "16px"]}
                  >
                    15 Doubt Session
                  </Text>
                </Box>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                mb={"15px"}
              >
                <Text
                  fontWeight={600}
                  fontSize={["13px", "13px", "14px", "15px", "16px"]}
                >
                  Validity : 9th Aug - 15th Oct
                </Text>
              </Box>
              <Button
                width={"100%"}
                background={"#a480f2"}
                color={"white"}
                border={"2px solid transparent"}
                transition={"0.4s ease"}
                _hover={{
                  outline: "none",
                  background: "white",
                  color: "#000",
                  border: "2px solid #a480f2",
                  boxShadow: "0 0 0 5px #a480f230",
                }}
                onClick={() => handlePayment(email, "500", "Science")}
                isLoading={tempLoading === "Science"}
                loadingText={""}
              >
                Buy Now
              </Button>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </ChakraProvider>
  );
};
