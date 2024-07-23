import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";

export const QuizBalance = () => {
  const paymentHistory = useSelector((state) => state.paymentHistory);
  const credits = useSelector((state) => state.user.credits);
  const user = useSelector((state) => state.user);

  return (
    <Box
      bg={"#E7E6FF"}
      padding={[
        "2.5rem 0.7rem 6rem",
        "2.5rem 0.7rem 6rem",
        "3.5rem 1.5rem 6rem",
        "3.5rem 1.5rem 6rem",
      ]}
      minHeight={"100vh"}
    >
      <Box mt={"15px"}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Text fontWeight={600} fontSize={["15px", "16px", "17px", "18px"]}>
              Quiz Balance
            </Text>
            <Text
              fontWeight={700}
              gap={"5px"}
              fontSize={["30px", "30px", "35px", "40px"]}
              m={"0px 0 8px 0"}
            >
              {credits}{" "}
              <Text
                as={"span"}
                fontSize={["15px", "16px", "17px", "18px"]}
                opacity={"0.9"}
                position={"relative"}
                bottom={"3px"}
              >
                {!credits || credits === 1 ? "Quiz" : "Quizzes"} left
              </Text>
            </Text>
          </Box>
          <Button
            onClick={() =>
              window.open(
                `https://quizbalance.wisechamps.com?email=${user.email}`,
                "_blank"
              )
            }
            bg={"#4E46E4"}
            color={"white"}
            fontSize={["12px", "13px", "14px", "15px"]}
            fontWeight={500}
            paddingInline={"20px"}
            border={"2px solid transparent"}
            _focus={{
              bg: "#fff",
              color: "#4E46E4",
              outline: "none",
              borderColor: "#4E46E4",
              boxShadow: "0 0 0px 4px #4E46E450",
            }}
            _hover={{
              bg: "#fff",
              color: "#4E46E4",
              outline: "none",
              borderColor: "#4E46E4",
              boxShadow: "0 0 0px 4px #4E46E450",
            }}
          >
            Buy Quizzes
          </Button>
        </Box>
        {paymentHistory.length === 0 && (
          <Box
            gridColumn={["unset", "unset", "1 / span 2", "1 / span 2"]}
            minHeight={["300px", "300px", "300px", "200px", "300px"]}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text
              fontWeight={700}
              fontSize={["30px"]}
              textAlign={"center"}
              opacity={0.3}
            >
              No Purchases <br /> Made Yet
            </Text>
          </Box>
        )}
        <Box
          className="animate__animated animate__fadeInUp"
          display={"grid"}
          gridTemplateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gap={"15px"}
        >
          {paymentHistory.map(({ Payment_Date, id, Amount, Credits }) => (
            <Box
              key={id}
              bg={"white"}
              minHeight={"100px"}
              borderRadius={"15px"}
              padding={"1rem"}
            >
              <Flex align={"center"} justify={"space-between"}>
                <Flex align={"center"} gap={1} fontWeight={600}>
                  <Text>Amount : </Text>
                  <Flex align={"center"}>
                    <FaRupeeSign />
                    <Text fontSize={"20px"}>{Amount}</Text>
                  </Flex>
                </Flex>
                <Text>{new Date(Payment_Date).getDate()}</Text>
              </Flex>
              <Text>{Credits} quizzes</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
