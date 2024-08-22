/* eslint-disable react/no-unescaped-entities */

import axios from "axios";
import {
  Box,
  Button,
  Image,
  SimpleGrid,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useState } from "react";
import popular from "/src/assets/popular1.png";
import bestprice from "/src/assets/bestprice1.png";

export const PlansAndPricing = () => {
  const toast = useToast();
  const email = useSelector((state) => state.user.email);
  const [tempLoading, setTempLoading] = useState(null);

  const handlePayment = async (emailParam, amountParam) => {
    try {
      setTempLoading(amountParam);
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
    <Box>
      <SimpleGrid
        mt={"30px"}
        ml={"10px"}
        mr={"10px"}
        spacing={10}
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
          padding={["1rem", "1rem", "1rem", "1rem", "1rem"]}
          borderRadius={"20px"}
          transition={"0.5s ease"}
          _hover={{
            transform: "scale(1.01)",
            zIndex: 99,
            boxShadow: "0 0 0 2px #E5714D, 15px 15px 20px 2px #E5714D",
          }}
          position={"relative"}
          boxShadow={"0 0 0 2px #E5714D, 12px 12px 0 0 #E5714D"}
        >
          <Text
            fontSize={["15px", "15px", "18px", "18px"]}
            fontWeight={700}
            textTransform={"uppercase"}
            position={"absolute"}
            top={"-10px"}
            left={"-15px"}
            bg={"#E5714D"}
            color={"white"}
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
              bg={"#E5714D"}
              color={"white"}
              fontSize={["15px", "15px", "17px", "17px"]}
            >
              ₹ 20 per quiz
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
            Validity 3 Months
          </Text>
          <Button
            width={"100%"}
            background={"#E5714D"}
            color={"white"}
            border={"2px solid transparent"}
            transition={"0.4s ease"}
            _hover={{
              outline: "none",
              background: "white",
              color: "#000",
              border: "2px solid #E5714D",
              boxShadow: "0 0 0 5px #E5714D30",
            }}
            onClick={() => handlePayment(email, "499")}
            // mb={"5px"}
            isLoading={tempLoading === "499"}
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
            boxShadow: "0 0 0 2px #49B86A, 15px 15px 20px 2px #49B86A",
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
            Academic <br /> Advancement
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
              bg={"#49B86A"}
              color={"white"}
              fontSize={["15px", "15px", "17px", "17px"]}
            >
              ₹ 15 per quiz
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
              <Text
                fontSize={["14px", "14px", "15px", "16px", "19px"]}
                opacity={0.7}
                textDecoration={"line-through"}
                lineHeight={0.4}
              >
                ₹1350
              </Text>
              <Text>₹999</Text>{" "}
              <Text fontSize={["14px", "14px", "15px", "16px", "18px"]}>
                67 Sessions
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
              Validity 6 Months
            </Text>
            {/* <Tag
                colorScheme="purple"
                size={["md", "md", "md", "md", "lg"]}
                fontWeight={700}
              >
                POPULAR
              </Tag> */}
            <Image
              src={popular}
              alt="Popular"
              width={"70px"}
              position={"absolute"}
              right={"-15px"}
              bottom={"0px"}
              zIndex={99}
            />
          </Box>
          <Button
            width={"85%"}
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
            onClick={() => handlePayment(email, "999")}
            // mb={"5px"}
            isLoading={tempLoading === "999"}
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
            boxShadow: "0 0 0 2px #45439A, 15px 15px 20px 2px #45439A",
          }}
          position={"relative"}
          boxShadow={"0 0 0 2px #45439A, 12px 12px 0 0 #45439A"}
        >
          <Text
            fontSize={["15px", "15px", "18px", "18px"]}
            fontWeight={700}
            textTransform={"uppercase"}
            position={"absolute"}
            top={"-10px"}
            left={"-15px"}
            bg={"#45439A"}
            color={"white"}
            padding={"0px 40px"}
            zIndex={2}
            borderRadius={"50px"}
            textAlign={"center"}
            lineHeight={1.3}
          >
            Committed <br /> to Success
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
              bg={"#45439A"}
              color={"white"}
              fontSize={["15px", "15px", "17px", "17px"]}
            >
              ₹ 10 per quiz
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
              <Text
                fontSize={["14px", "14px", "15px", "16px", "19px"]}
                opacity={0.7}
                textDecoration={"line-through"}
                lineHeight={0.4}
              >
                ₹3999
              </Text>
              <Text>₹1999</Text>{" "}
              <Text fontSize={["14px", "14px", "15px", "16px", "18px"]}>
                200 Sessions
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
              Validity 2 Years
            </Text>
            {/* <Tag
                colorScheme="purple"
                size={["md", "md", "md", "md", "lg"]}
                fontWeight={700}
              >
                BEST PRICE
              </Tag> */}
            <Image
              src={bestprice}
              alt="Best Price"
              width={"70px"}
              position={"absolute"}
              right={"-15px"}
              bottom={"0px"}
              // transform={"scaleX(-1)"}
            />
          </Box>
          <Button
            width={"85%"}
            background={"#45439A"}
            color={"white"}
            border={"2px solid transparent"}
            transition={"0.4s ease"}
            _hover={{
              outline: "none",
              background: "white",
              color: "#000",
              border: "2px solid #45439A",
              boxShadow: "0 0 0 5px #45439A30",
            }}
            onClick={() => handlePayment(email, "1999")}
            // mb={"5px"}
            isLoading={tempLoading === "1999"}
            loadingText={""}
          >
            Buy Now
          </Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
