/* eslint-disable react/prop-types */
import { Box, Button, Tag, Text } from "@chakra-ui/react";
import "react-circular-progressbar/dist/styles.css";
import incorrect from "/src/assets/incorrect.png";
import { Table, TableContainer, Thead, Tr, Td, Tbody } from "@chakra-ui/react";
import { AnimatedProgressProvider } from "./AnimatedProgressProvider";
import { useSelector } from "react-redux";
import { Loading } from "../Loading/Loading";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ClickBtn } from "../ClickBtn/ClickBtn";

// eslint-disable-next-line no-unused-vars
export const Report = () => {
  const percentage = useSelector((state) => state.report.percentage);
  const sessions = useSelector((state) => state.report.sessions);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (loading || !sessions || sessions?.length === 0) {
    return <Loading />;
  }

  return (
    <Box
      padding={[
        "3.5rem 0.7rem 6rem",
        "3.5rem 0.7rem 6rem",
        "5rem 1.5rem 1.5rem",
        "5rem 1.5rem 1.5rem",
      ]}
    >
      <Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={"10px"}
          mb={"15px"}
          position={"relative"}
        >
          <Text
            fontSize={["13px", "14px", "15px", "16px", "17px"]}
            border={"1px solid #4e46e4"}
            padding={"9px 15px"}
            fontWeight={600}
            color={"#4e46e4"}
          >
            Week :{" "}
            {new Date(sessions[0].Session_Date_Time).toLocaleDateString(
              "en-US",
              {
                day: "numeric",
                month: "long",
              }
            )}{" "}
            -{" "}
            {new Date(
              sessions[sessions.length - 1].Session_Date_Time
            ).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
            })}
          </Text>
          <Button
            bg={"#4E46E4"}
            color={"white"}
            fontSize={["11px", "12px", "13px", "14px", "15px"]}
            fontWeight={400}
            padding={0}
            transition={"0.2s ease-in-out"}
            border={"2px solid transparent"}
            _hover={{
              bg: "white",
              color: "black",
              border: "2px solid #5838fc",
            }}
          >
            <Link
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0px 15px",
              }}
              to={"/winners"}
            >
              Weekly Winners
            </Link>
          </Button>
          <ClickBtn style={{ top: 8 }} />
        </Box>
        <Text
          textAlign={"left"}
          fontSize={["15px", "15px", "18px", "20px"]}
          fontWeight={600}
        >
          IQ Meter
        </Text>
        <Box
          style={{
            width: "50%",
            maxWidth: "200px",
            margin: "0 auto",
          }}
        >
          <AnimatedProgressProvider value={percentage} />
        </Box>
      </Box>
      {sessions?.length > 0 ? (
        <Box>
          <Text
            textAlign={"left"}
            fontSize={["15px", "15px", "18px", "20px"]}
            m={"15px 0 5px 0"}
            fontWeight={600}
          >
            Performance
          </Text>
          <TableContainer
            borderRadius={"10px"}
            whiteSpace={"unset"}
            maxWidth={"100%"}
            margin={"0 auto"}
            id={"tableContainer"}
          >
            <Table size={"sm"} border={"1px solid #646cff"}>
              <Thead>
                <Tr height={"50px"}>
                  <Td>
                    <Text fontSize={["11px", "11px", "13px", "14px"]}>
                      Topic
                    </Text>
                  </Td>
                  <Td
                    borderRight={"1px solid #fff !important"}
                    borderLeft={"1px solid #fff !important"}
                  >
                    <Text fontSize={["11px", "11px", "13px", "14px"]}>
                      Score
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize={["11px", "11px", "13px", "14px"]}>
                      Date
                    </Text>
                  </Td>
                </Tr>
              </Thead>
              <Tbody>
                {sessions.map(
                  (
                    {
                      Session_Name,
                      Session_Date_Time,
                      Quiz_Score,
                      Subject,
                      Total_Questions,
                      attempted,
                    },
                    i
                  ) => (
                    <Tr key={i}>
                      <Td>
                        {!Session_Name ? `${Subject} Live Quiz` : Session_Name}
                      </Td>
                      <Td isNumeric>
                        {attempted ? (
                          <Tag
                            size={"sm"}
                            colorScheme={Quiz_Score >= 6 ? "green" : "red"}
                          >
                            {Quiz_Score}/{Total_Questions}
                          </Tag>
                        ) : (
                          <Box display={"flex"} justifyContent={"center"}>
                            <img src={incorrect} alt="NA" width={"30px"} />
                          </Box>
                        )}
                      </Td>
                      <Td>
                        {" "}
                        <Tag
                          minWidth={"60px"}
                          size={"sm"}
                          colorScheme={Quiz_Score >= 6 ? "green" : "red"}
                        >
                          {new Date(Session_Date_Time)
                            .toLocaleDateString(undefined, {
                              day: "numeric",
                            })
                            .toString()
                            .padStart(2, "0")}{" "}
                          {new Date(Session_Date_Time).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                            }
                          )}
                        </Tag>
                      </Td>
                    </Tr>
                  )
                )}
              </Tbody>
            </Table>
            <Text
              mt={"20px"}
              textAlign={"center"}
              fontSize={["12px", "13px", "14px", "15px"]}
              fontWeight={600}
            >
              Weekly Report updates every{" "}
              <Tag size={["sm", "sm", "md", "md"]} colorScheme={"purple"}>
                Sunday
              </Tag>{" "}
              evening.
            </Text>
          </TableContainer>
        </Box>
      ) : null}
    </Box>
  );
};
