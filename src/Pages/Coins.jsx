import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { GiTwoCoins } from "react-icons/gi";
import { CgArrowTopRightR } from "react-icons/cg";
import { BsArrowDownLeftCircle } from "react-icons/bs";
import { useEffect } from "react";

export const Coins = () => {
  const coinsHistory = useSelector((state) => state.user.coinsHistory);
  const coins = useSelector((state) => state.user.coins);

  useEffect(() => {
    localStorage.setItem("wisechamps_current_path", window.location.pathname);
  }, []);

  return (
    <Box padding={"2.5rem 0px 0 0px"} bg={"#e7e6ff"}>
      <Box className="animate__animated animate__fadeInUp">
        <Box padding={"12px"}>
          <Text fontSize={["13px", "13px", "15px", "15px"]}>Coin Balance</Text>
          <Text
            fontWeight={700}
            display={"flex"}
            alignItems={"center"}
            gap={"5px"}
            fontSize={["30px", "30px", "35px", "40px"]}
            m={"0px 0 8px 0"}
          >
            {coins}{" "}
            <GiTwoCoins
              color={"gold"}
              style={{
                filter: "drop-shadow(0 0 0.8px rgba(0, 0, 0, 0.8))",
              }}
            />
          </Text>
          <Accordion allowToggle>
            <AccordionItem border={"1px solid #4e46e4"} borderRadius={"10px"}>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontSize={["13px", "13px", "14px", "15px"]}
                    padding={"3px 0"}
                  >
                    How does the coin system work
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel p={0}>
                <TableContainer whiteSpace={"none"} maxWidth={"100%"}>
                  <Table
                    variant="striped"
                    bg={"white"}
                    colorScheme="purple"
                    fontSize={["11px", "11px", "13px", "14px"]}
                  >
                    <TableCaption padding={"10px 0"} m={0}>
                      <Text fontSize={["13px", "13px", "14px", "15px"]}>
                        Note : 10 Coins = ₹1
                      </Text>
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th>
                          <Text>Criteria</Text>
                        </Th>
                        <Th>
                          <Text>Coins</Text>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>Lucky draw winner every day</Td>
                        <Td>
                          <Text
                            display={"flex"}
                            alignItems={"center"}
                            gap={"5px"}
                          >
                            200{" "}
                            <GiTwoCoins
                              color={"gold"}
                              style={{
                                filter:
                                  "drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.9))",
                              }}
                            />
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Complete 10 or more quizzes in a month</Td>
                        <Td>
                          <Text
                            display={"flex"}
                            alignItems={"center"}
                            gap={"5px"}
                          >
                            300{" "}
                            <GiTwoCoins
                              color={"gold"}
                              style={{
                                filter:
                                  "drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.9))",
                              }}
                            />
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Top 5 highest scorers every week</Td>
                        <Td>
                          <Text
                            display={"flex"}
                            alignItems={"center"}
                            gap={"5px"}
                          >
                            300{" "}
                            <GiTwoCoins
                              color={"gold"}
                              style={{
                                filter:
                                  "drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.9))",
                              }}
                            />
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Complete first 50 quizzes</Td>
                        <Td>
                          <Text
                            display={"flex"}
                            alignItems={"center"}
                            gap={"5px"}
                          >
                            1000{" "}
                            <GiTwoCoins
                              color={"gold"}
                              style={{
                                filter:
                                  "drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.9))",
                              }}
                            />
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Complete first 100 quizzes</Td>
                        <Td>
                          <Text
                            display={"flex"}
                            alignItems={"center"}
                            gap={"5px"}
                          >
                            1500{" "}
                            <GiTwoCoins
                              color={"gold"}
                              style={{
                                filter:
                                  "drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.9))",
                              }}
                            />
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Complete first 200 quizzes</Td>
                        <Td>
                          <Text
                            display={"flex"}
                            alignItems={"center"}
                            gap={"5px"}
                          >
                            2000{" "}
                            <GiTwoCoins
                              color={"gold"}
                              style={{
                                filter:
                                  "drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.9))",
                              }}
                            />
                          </Text>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
        <Text
          padding={"10px 15px 5px 15px"}
          fontSize={["14px", "14px", "15px", "16px"]}
          fontWeight={600}
          color={"#504c52"}
        >
          Transactions
        </Text>
        <Box
          bg={"white"}
          padding={"15px 10px"}
          borderRadius={"10px 10px 0 0"}
          id="transactions"
        >
          {coinsHistory.length === 0 && (
            <Box
              minHeight={"400px"}
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
                No Transactions Found
              </Text>
            </Box>
          )}
          {coinsHistory.map(
            ({ Coins, Updated_Date, id, Action_Type, Description }) => (
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
                      {Action_Type === "Credit" ? (
                        <CgArrowTopRightR />
                      ) : (
                        <BsArrowDownLeftCircle />
                      )}
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
                        fontSize={["13px", "13px", "14px", "15px"]}
                        maxWidth={["215px", "400px", "600px", "900px"]}
                      >
                        {Description}
                      </Text>
                      <Text fontSize={["11px", "11px", "12px", "13px"]}>
                        {Action_Type === "Credit"
                          ? `Coins Added`
                          : `Coins Deducted`}
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
                      gap={"5px"}
                      alignItems={"center"}
                      fontSize={"15px"}
                    >
                      <Text
                        color={Action_Type === "Credit" ? "#12ca21" : "#da1f2f"}
                      >
                        {Action_Type === "Credit" ? `+${Coins}` : `-${Coins}`}
                      </Text>
                      <GiTwoCoins
                        color={Action_Type === "Credit" ? "#12ca21" : "#da1f2f"}
                      />
                    </Text>
                    <Text fontSize={"10px"}>
                      {new Date(Updated_Date).toLocaleDateString("en", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </Text>
                  </Box>
                </Box>
              </Box>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};
