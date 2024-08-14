import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsPatchQuestionFill } from "react-icons/bs";
import { RiArrowRightSFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import tick from "/src/assets/order_placed.gif";
import { ConfettiComponent } from "../ConfettiComponent/ConfettiComponent";

export const OQAD = () => {
  const oqad = useSelector((state) => state.oqad);
  const user = useSelector((state) => state.user);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [tempLoading, setTempLoading] = useState(false);
  const toast = useToast();

  const options = {
    [oqad.options[0]]: "Option 1",
    [oqad.options[1]]: "Option 2",
    [oqad.options[2]]: "Option 3",
    [oqad.options[3]]: "Option 4",
  };

  useEffect(() => {}, [correct]);

  const handleSubmit = (selectedOption, contactId, questionId) => {
    try {
      setCorrect(false);
      setTempLoading(true);
      if (options[selectedOption] === oqad.answer) {
        setCorrect(true);
        toast({
          title: "Correct Answer",
          duration: 3000,
          status: "success",
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Wrong Answer",
          duration: 3000,
          status: "error",
          isClosable: true,
          position: "top",
        });
      }

      setTempLoading(false);
    } catch (error) {
      console.log("Error is -----------", error);
      toast({
        title: "Something Went Wrong",
        duration: 1000,
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
  };

  console.log("OQAD is :", oqad);

  useEffect(() => {}, [oqad.status]);

  return (
    <Box
      id="oqad"
      mt={"15px"}
      bg={"white"}
      borderRadius={"10px"}
      shadow={"rgba(0, 0, 0, 0.1) 0px 0px 20px 0px"}
    >
      {correct && <ConfettiComponent />}
      <Box
        fontWeight={700}
        padding={"1.2rem 0 0 1.2rem"}
        fontSize={["15px", "15px", "18px", "18px"]}
        display={"flex"}
        alignItems={"center"}
        gap={"10px"}
      >
        <Text
          fontSize={["25px", "25px", "30px", "32px", "35px"]}
          style={{
            background: "black",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <BsPatchQuestionFill />
        </Text>
        <Text>Question of the Day</Text>
      </Box>
      <Divider border={"1.1px solid #5838fc"} marginBlock={"12px 20px"} />
      {oqad.status === 200 ? (
        <Box p={"0 10px 30px"}>
          <Box
            fontWeight={400}
            mb={4}
            fontSize={["15px", "16px", "17px", "18px"]}
            display={"flex"}
            alignItems={"start"}
          >
            <Text as={"span"}>
              <RiArrowRightSFill style={{ fontSize: "25px" }} />
            </Text>
            <Text>{oqad.question}</Text>
          </Box>
          <Box
            padding={"0px 15px 25px"}
            display={"flex"}
            justifyContent={"center"}
            maxWidth={"400px"}
            margin={"0 auto"}
          >
            <Image
              border={"1px solid #cccccc80"}
              borderRadius={"10px"}
              src={oqad.image}
              alt="Question Image"
            />
          </Box>
          <SimpleGrid
            gridTemplateColumns={"repeat(2, 1fr)"}
            gap={4}
            padding={"0 15px"}
          >
            {oqad.options.map((option) => (
              <>
                <Text
                  onClick={() => setSelectedOption(option)}
                  bg={selectedOption === option ? "#5838fc40" : "white"}
                  border={"1px solid #cccccc99"}
                  padding={"10px"}
                  borderRadius={"10px"}
                  fontSize={["13px", "13px", "15px", "16px"]}
                  transition={"0.2s ease-in-out"}
                  cursor={"pointer"}
                  textTransform={"capitalize"}
                  textAlign={"center"}
                >
                  {option.toLowerCase()}
                </Text>
              </>
            ))}
          </SimpleGrid>
          <Flex justify={"space-between"} mt={6} padding={"0 15px"} gap={4}>
            <Button
              flex={"50%"}
              type="reset"
              onClick={() => setSelectedOption(null)}
              isDisabled={!selectedOption}
              bg={"#5838fc"}
              color={"white"}
            >
              Clear
            </Button>
            <Button
              flex={"50%"}
              bg={"#5838fc"}
              color={"white"}
              type="submit"
              isDisabled={!selectedOption}
              onClick={() => handleSubmit(selectedOption, user.id, oqad.id)}
            >
              Submit
            </Button>
          </Flex>
        </Box>
      ) : oqad.status === 409 ? (
        <Box
          p={"0 10px 30px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"10px"}
        >
          <Text fontSize={"18px"} fontWeight={600}>
            You have answered today's question. Please come back tomorrow.
          </Text>
          <Image src={tick} alt="✅" width={"60px"} />
        </Box>
      ) : (
        <Box p={"0 10px 30px"} textAlign={"center"}>
          <Text fontSize={"20px"} fontWeight={600}>
            No Question Available
          </Text>
        </Box>
      )}
    </Box>
  );
};
