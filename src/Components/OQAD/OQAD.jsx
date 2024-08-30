/* eslint-disable react/no-unescaped-entities */
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
import { useEffect, useRef, useState } from "react";
import { BsPatchQuestionFill } from "react-icons/bs";
import { RiArrowRightSFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import tick from "/src/Lottie/correct.json";
import cross from "/src/Lottie/incorrect.json";
import { ConfettiComponent } from "../ConfettiComponent/ConfettiComponent";
import Lottie from "lottie-react";
import {
  captureDailyQuestionAttempt,
  getDailyQuestion,
} from "../../Redux/action";

export const OQAD = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const oqad = useSelector((state) => state.oqad);
  const query = useSelector((state) => state.query);
  const user = useSelector((state) => state.user);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [tempLoading, setTempLoading] = useState(false);
  const oqadRef = useRef(null);

  const options =
    oqad?.status === 200 || oqad?.status === 409
      ? {
          [oqad.options[0]]: "Option 1",
          [oqad.options[1]]: "Option 2",
          [oqad.options[2]]: "Option 3",
          [oqad.options[3]]: "Option 4",
        }
      : null;

  const handleSubmit = async (selectedOption, contactId, questionId) => {
    try {
      setCorrect(false);
      setTempLoading(true);

      await dispatch(
        captureDailyQuestionAttempt({
          contactId,
          questionId,
          optionSelected: options[selectedOption],
          correctAnswer: options[selectedOption] === oqad.answer,
          oqad,
        })
      );

      if (options[selectedOption] === oqad.answer) {
        setCorrect(true);
        toast({
          title: "Bravo! Your answer is correct",
          duration: 3000,
          status: "success",
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Oops! Your answer is incorrect",
          duration: 3000,
          status: "error",
          isClosable: true,
          position: "top",
        });
      }
      await dispatch(getDailyQuestion(user.grade, user.id));
      setTempLoading(false);
    } catch (error) {
      setTempLoading(false);
      toast({
        title: "Something Went Wrong",
        duration: 1000,
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    if (query === "#oqad") {
      oqadRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [oqad.status]);

  return (
    <Box
      ref={oqadRef}
      scrollMargin={"-100px !important"}
      id="oqad"
      mt={"15px"}
      bg={"white"}
      borderRadius={"10px"}
      shadow={"rgba(0, 0, 0, 0.1) 0px 0px 20px 0px"}
      minHeight={"400px"}
      display={oqad.status !== 200 && oqad.status !== 409 ? "none" : "block"}
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
            fontSize={["14px", "15px", "17px", "18px"]}
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
              <Box key={option}>
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
              </Box>
            ))}
          </SimpleGrid>
          <Flex justify={"space-between"} mt={6} padding={"0 15px"} gap={4}>
            <Button
              flex={"50%"}
              type="reset"
              onClick={() => setSelectedOption(null)}
              isDisabled={!selectedOption || tempLoading}
              colorScheme="purple"
              variant="outline"
            >
              Clear
            </Button>
            <Button
              flex={"50%"}
              type="submit"
              isDisabled={!selectedOption}
              onClick={() => handleSubmit(selectedOption, user.id, oqad.id)}
              isLoading={tempLoading}
              loadingText={""}
              colorScheme="purple"
              variant="solid"
            >
              Submit
            </Button>
          </Flex>
        </Box>
      ) : oqad.status === 409 ? (
        <Box p={"0 10px 30px"}>
          <Box
            fontWeight={400}
            mb={4}
            fontSize={["14px", "15px", "17px", "18px"]}
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
              <Box key={option}>
                <Box
                  onClick={() => setSelectedOption(option)}
                  bg={
                    oqad.selected === options[option]
                      ? oqad.answer
                        ? "#B9F5D0"
                        : "#FED7D7"
                      : "white"
                  }
                  border={"1px solid #cccccc99"}
                  padding={"10px"}
                  borderRadius={"10px"}
                  fontSize={["13px", "13px", "15px", "16px"]}
                  transition={"0.2s ease-in-out"}
                  textTransform={"capitalize"}
                  textAlign={"center"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  position={"relative"}
                >
                  <Text as={"span"}>{option.toLowerCase()}</Text>
                  {oqad.selected === options[option] && oqad.answer ? (
                    <Lottie
                      animationData={tick}
                      style={{
                        width: "30px",
                        position: "absolute",
                        right: "2%",
                      }}
                    />
                  ) : oqad.selected === options[option] && !oqad.answer ? (
                    <Lottie
                      animationData={cross}
                      alt={console.log(options[option])}
                      style={{
                        width: "35px",
                        position: "absolute",
                        right: "2%",
                      }}
                    />
                  ) : (
                    !oqad.answer &&
                    options[option] === oqad.correctOption && (
                      <Lottie
                        animationData={tick}
                        style={{
                          width: "30px",
                          position: "absolute",
                          right: "2%",
                        }}
                      />
                    )
                  )}
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      ) : (
        <Box p={"0 10px 30px"} textAlign={"center"}>
          <Text fontSize={["15px", "16px", "20px", "20px"]} fontWeight={600}>
            No Question Available
          </Text>
        </Box>
      )}
    </Box>
  );
};
