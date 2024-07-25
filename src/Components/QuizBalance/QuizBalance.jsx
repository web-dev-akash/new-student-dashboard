import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Tag,
  Text,
} from "@chakra-ui/react";
import { CgArrowBottomLeftR, CgArrowTopRightR } from "react-icons/cg";
import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Loading } from "../Loading/Loading";

export const QuizBalance = () => {
  const paymentHistory = useSelector((state) => state.paymentHistory);
  const quizzes = useSelector((state) => state.user.quizzes);
  const credits = useSelector((state) => state.user.credits);
  const user = useSelector((state) => state.user);

  let wordsToRemove = [
    "Final",
    "&",
    "Math",
    "Science",
    "English",
    "GK",
    "Grade",
    "Live",
    "Quiz",
    "for",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "November",
    "December",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Group",
  ];

  const originalSessionName = (sessionName) => {
    if (!sessionName) {
      return "Maths Quiz";
    }
    let newString = sessionName.toString();
    let regexString = wordsToRemove.join("|");
    let regex = new RegExp("\\b(" + regexString + ")\\b|\\d+|&|[()]", "gi");
    newString = newString.replace(regex, "");
    if (newString.trim() === "") {
      return "Maths Quiz";
    }
    return newString.trim();
  };

  if (!quizzes || !quizzes.length) {
    return <Loading />;
  }

  return (
    <Box
      bg={"#E7E6FF"}
      padding={[
        "3rem 0.7rem 6rem",
        "3rem 0.7rem 6rem",
        "3.2rem 1.5rem 6rem",
        "3.2rem 1.5rem 6rem",
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
            <Text fontWeight={700} fontSize={["29px", "30px", "35px", "40px"]}>
              {credits}
              <Text
                as={"span"}
                position={"relative"}
                bottom={["1px", "1px", "2px", "3px"]}
                ml={"2px"}
                fontSize={["14px", "15px", "17px", "18px"]}
                opacity={"0.9"}
              >
                Quiz Balance Left
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
            paddingInline={["10px", "10px", "20px", "20px"]}
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
            Add Quiz Balance
          </Button>
        </Box>
        <Divider
          m={"10px 0 15px 0"}
          border={"1.3px solid #4e46e4"}
          borderRadius={"2px"}
        />
        <Accordion allowToggle defaultIndex={1}>
          <AccordionItem
            border={"none"}
            borderRadius={"10px"}
            overflow={"hidden"}
          >
            <h2
              style={{
                background: "white",
                borderRadius: "10px 10px 0 0",
              }}
            >
              <AccordionButton>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontSize={["13px", "13px", "14px", "15px"]}
                  padding={"3px 0"}
                  fontWeight={600}
                >
                  Quiz Payment History
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel p={0}>
              <Box bg={"white"} padding={"0px 10px"} id="transactions">
                {paymentHistory.length === 0 && (
                  <Box
                    minHeight={"80px"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Text
                      fontWeight={700}
                      fontSize={"30px"}
                      textAlign={"center"}
                      opacity={0.3}
                    >
                      No Purchases <br /> Made Yet
                    </Text>
                  </Box>
                )}
                {paymentHistory.map(({ Payment_Date, id, Amount, Credits }) => (
                  <Box
                    key={id}
                    bg={"white"}
                    padding={"10px 0"}
                    borderBottom={"1px solid #e0e0e0"}
                  >
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                        <Box
                          display={"flex"}
                          bg={"#e7e6ff"}
                          minWidth={"38px"}
                          minHeight={"38px"}
                          borderRadius={"10px"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          fontSize={["16px", "16px", "17px", "18px"]}
                        >
                          <CgArrowBottomLeftR />
                        </Box>
                        <Box
                          display={"flex"}
                          alignItems={"flex-start"}
                          justifyContent={"center"}
                          flexDirection={"column"}
                        >
                          <Text
                            isTruncated
                            fontWeight={600}
                            fontSize={["12px", "12px", "14px", "15px"]}
                            maxWidth={["210px", "400px", "600px", "900px"]}
                          >
                            Quiz Balance Added
                          </Text>
                          <Text fontSize={["11px", "11px", "12px", "13px"]}>
                            {!Credits || Credits === 1
                              ? `1 quiz`
                              : `${Credits} quizzes`}{" "}
                            added to your account
                          </Text>
                        </Box>
                      </Box>
                      <Box
                        display={"flex"}
                        alignItems={"flex-end"}
                        justifyContent={"center"}
                        flexDirection={"column"}
                      >
                        <Text
                          display={"flex"}
                          gap={"2px"}
                          alignItems={"center"}
                          fontSize={["13px", "12px", "15px", "15px"]}
                          fontWeight={600}
                        >
                          <FaRupeeSign />
                          <Text>{Amount}</Text>
                        </Text>
                        <Text
                          fontSize={["09px", "10px", "12px", "12px"]}
                          fontWeight={500}
                        >
                          {new Date(Payment_Date).toLocaleDateString("en", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          })}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem
            mt={"10px"}
            border={"none"}
            borderRadius={"10px"}
            overflow={"hidden"}
          >
            <h2
              style={{
                background: "white",
                borderRadius: "10px 10px 0 0",
              }}
            >
              <AccordionButton>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontSize={["13px", "13px", "14px", "15px"]}
                  padding={"3px 0"}
                  fontWeight={600}
                >
                  Quiz Balance Usage ({quizzes.length} Quiz Balance used)
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              p={0}
              // overflowX={"hidden"}
              // overflowY={"auto"}
              // maxHeight={"20vh"}
            >
              <Box bg={"white"} padding={"0px 10px"} id="transactions">
                {quizzes.length === 0 && (
                  <Box
                    minHeight={"80px"}
                    padding={"0 0 20px 0"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Text
                      fontWeight={700}
                      fontSize={"30px"}
                      textAlign={"center"}
                      opacity={0.3}
                    >
                      No Quiz <br /> Attempts Yet
                    </Text>
                  </Box>
                )}
                {quizzes.map(
                  ({
                    Session_Date_Time,
                    id,
                    Quiz_Score,
                    Session_Name,
                    Created_Time,
                  }) => (
                    <Box
                      key={id}
                      bg={"white"}
                      padding={"10px 0"}
                      borderBottom={"1px solid #e0e0e0"}
                    >
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                          <Box
                            display={"flex"}
                            bg={"#e7e6ff"}
                            minWidth={"38px"}
                            minHeight={"38px"}
                            borderRadius={"10px"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            fontSize={["16px", "16px", "17px", "18px"]}
                          >
                            <CgArrowTopRightR />
                          </Box>
                          <Box
                            display={"flex"}
                            alignItems={"flex-start"}
                            justifyContent={"center"}
                            flexDirection={"column"}
                            gap={"2px"}
                          >
                            <Text
                              isTruncated
                              fontWeight={600}
                              fontSize={["12px", "12px", "14px", "15px"]}
                              maxWidth={["170px", "400px", "600px", "900px"]}
                            >
                              {originalSessionName(Session_Name)}
                            </Text>
                            <Text fontSize={["11px", "11px", "12px", "13px"]}>
                              Quiz Score : {Quiz_Score}
                            </Text>
                          </Box>
                        </Box>
                        <Box
                          display={"flex"}
                          alignItems={"flex-end"}
                          justifyContent={"center"}
                          flexDirection={"column"}
                          gap={"2px"}
                          overflow={"hidden"}
                        >
                          <Tag
                            fontSize={["10px", "11px", "13px", "15px"]}
                            colorScheme="pink"
                            size={["sm", "sm", "md", "md"]}
                            whiteSpace={"nowrap"}
                          >
                            -1 Quiz Balance
                          </Tag>
                          <Text
                            fontSize={["10px", "11px", "13px", "13px"]}
                            fontWeight={500}
                          >
                            {Session_Date_Time
                              ? new Date(Session_Date_Time).toLocaleDateString(
                                  "en",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                  }
                                )
                              : new Date(Created_Time).toLocaleDateString(
                                  "en",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                  }
                                )}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  )
                )}
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};
