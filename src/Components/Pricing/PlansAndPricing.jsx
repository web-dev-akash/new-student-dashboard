/* eslint-disable react/no-unescaped-entities */

import axios from "axios";
import { Box, Button, SimpleGrid, Tag, Text, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useState } from "react";

export const PlansAndPricing = () => {
  const toast = useToast();
  const email = useSelector((state) => state.user.email);
  const [tempLoading, setTempLoading] = useState(false);

  const handlePayment = async (emailParam, amountParam) => {
    try {
      setTempLoading(true);
      const authToken = import.meta.env.VITE_APP_AUTH_TOKEN;
      const url = `https://backend.wisechamps.com/payment_links`;
      const res = await axios.post(
        url,
        {
          email: emailParam,
          amount: amountParam,
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
        setTempLoading(false);
      }
      setTempLoading(false);
    } catch (error) {
      setTempLoading(false);
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
    <>
      <Box>
        <SimpleGrid
          mt={"30px"}
          ml={"10px"}
          mr={"10px"}
          spacing={8}
          gridTemplateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(3, 1fr)",
            "repeat(3, 1fr)",
          ]}
        >
          <Box
            bg={"white"}
            width={"100%"}
            minHeight={"100%"}
            padding={["1rem", "1rem", "1rem", "1rem", "2rem"]}
            borderRadius={"20px"}
            transition={"0.5s ease"}
            _hover={
              {
                //   border: "2px solid #4F47E4",
              }
            }
            position={"relative"}
          >
            <Text
              fontSize={["15px", "15px", "18px", "18px"]}
              fontWeight={700}
              textTransform={"uppercase"}
              position={"absolute"}
              top={"-10px"}
              left={"-15px"}
              bg={"pink"}
              padding={"0px 40px"}
              zIndex={2}
              borderRadius={"50px"}
              textAlign={"center"}
              lineHeight={1.3}
            >
              Beginner's <br />
              Package
            </Text>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              m={"20px 0 10px 0"}
            >
              <Tag
                fontWeight={700}
                size={["lg"]}
                colorScheme="purple"
                fontSize={["15px", "15px", "17px", "17px"]}
              >
                ₹20 per quiz
              </Tag>

              <Box
                fontSize={["30px", "30px", "35px", "35px", "45px"]}
                fontWeight={"700"}
                marginBottom={["0px", "0px", "5px", "5px"]}
                display={"flex"}
                flexDirection={"column"}
                gap={0}
                justifyContent={"center"}
                alignItems={"flex-end"}
                lineHeight={1.3}
              >
                <Text>₹499</Text>{" "}
                <Text fontSize={["14px", "14px", "15px", "16px", "18px"]}>
                  25 Sessions
                </Text>
              </Box>
            </Box>
            <Text
              fontWeight={600}
              fontSize={["13px", "13px", "14px", "15px", "16px"]}
              mb={"15px"}
            >
              Validity 3 months
            </Text>
            <Button
              width={"100%"}
              background={"#4E47E5"}
              color={"white"}
              border={"2px solid transparent"}
              transition={"0.4s ease"}
              _hover={{
                outline: "none",
                background: "white",
                color: "#000",
                border: "2px solid #4E47E5",
                boxShadow: "0 0 0 5px rgb(78 71 229 / 30%)",
              }}
              onClick={() => handlePayment(email, "499")}
              mb={"5px"}
            >
              Buy Now
            </Button>
          </Box>
          <Box
            bg={"white"}
            width={"100%"}
            minHeight={"100%"}
            padding={["1rem", "1rem", "1rem", "1rem", "2rem"]}
            borderRadius={"20px"}
            transition={"0.5s ease"}
            _hover={
              {
                //   border: "1px solid #4F47E4",
              }
            }
            position={"relative"}
          >
            <Text
              fontSize={["15px", "15px", "18px", "18px"]}
              fontWeight={700}
              textTransform={"uppercase"}
              position={"absolute"}
              top={"-10px"}
              left={"-15px"}
              bg={"pink"}
              padding={"0px 40px"}
              zIndex={2}
              borderRadius={"50px"}
              textAlign={"center"}
              lineHeight={1.3}
            >
              Academic <br /> Advancement
            </Text>
            <Box>
              <Text
                fontSize={["30px", "30px", "35px", "35px", "45px"]}
                fontWeight={"700"}
                marginBottom={["0px", "0px", "5px", "5px"]}
              >
                <Text
                  as={"span"}
                  opacity={0.6}
                  textDecoration={"line-through"}
                  fontSize={["20px", "20px", "25px", "25px", "30px"]}
                >
                  ₹1350{" "}
                </Text>
                ₹999{" "}
                <Text as={"span"} fontSize={"15px"}>
                  /67 Quiz
                </Text>
              </Text>
            </Box>
            <Text
              fontSize={["12px", "12px", "15px", "12px", "15px"]}
              marginBottom={["10px", "10px", "25px", "25px"]}
              color={"#59626F"}
              fontWeight={"bold"}
            >
              Click on the button below to Pay ₹999 for 67 quizzes{" "}
              <Tag size={"sm"} colorScheme="purple">
                <b>(Only ₹15 per quiz)</b>
              </Tag>
              {/* and stand a chance to participate in our Quaterly contests and
                win prizes */}
            </Text>

            <Button
              width={"100%"}
              background={"#4E47E5"}
              color={"white"}
              border={"2px solid transparent"}
              transition={"0.4s ease"}
              _hover={{
                outline: "none",
                background: "white",
                color: "#000",
                border: "2px solid #4E47E5",
                boxShadow: "0 0 0 5px rgb(78 71 229 / 30%)",
              }}
              onClick={() => handlePayment(email, "999")}
            >
              Buy Now
            </Button>
          </Box>
          <Box
            bg={"white"}
            width={"100%"}
            minHeight={"100%"}
            padding={["1rem", "1rem", "1rem", "1rem", "2rem"]}
            borderRadius={"20px"}
            transition={"0.5s ease"}
            _hover={
              {
                //   border: "1px solid #4F47E4",
              }
            }
            position={"relative"}
          >
            <Text
              fontSize={["15px", "15px", "18px", "18px"]}
              fontWeight={700}
              textTransform={"uppercase"}
              position={"absolute"}
              top={"-10px"}
              left={"-15px"}
              bg={"pink"}
              padding={"0px 40px"}
              zIndex={2}
              borderRadius={"50px"}
              textAlign={"center"}
              lineHeight={1.3}
            >
              Committed <br /> to Success
            </Text>

            <Text
              fontSize={["30px", "30px", "35px", "35px", "45px"]}
              fontWeight={"700"}
              marginBottom={["0px", "0px", "5px", "5px"]}
            >
              <Text
                as={"span"}
                opacity={0.6}
                textDecoration={"line-through"}
                fontSize={["20px", "20px", "25px", "25px", "30px"]}
              >
                ₹3999{" "}
              </Text>
              ₹1999{" "}
              <Text as={"span"} fontSize={"15px"}>
                /200 Quiz
              </Text>
            </Text>
            <Text
              fontSize={["12px", "12px", "15px", "12px", "15px"]}
              marginBottom={["10px", "10px", "25px", "25px"]}
              color={"#59626F"}
              fontWeight={"bold"}
            >
              Click on the button below to Pay ₹1999 for 200 quizzes{" "}
              <Tag size={"sm"} colorScheme="purple" fontWeight={700}>
                (Only ₹10 per quiz)
              </Tag>{" "}
              {/* and stand a chance to participate in our annual contests and win
                Mega Prizes */}
            </Text>

            <Button
              width={"100%"}
              background={"#4E47E5"}
              color={"white"}
              border={"2px solid transparent"}
              transition={"0.4s ease"}
              _hover={{
                outline: "none",
                background: "white",
                color: "#000",
                border: "2px solid #4E47E5",
                boxShadow: "0 0 0 5px rgb(78 71 229 / 30%)",
              }}
              onClick={() => handlePayment(email, "1999")}
            >
              Buy Now
            </Button>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
};
