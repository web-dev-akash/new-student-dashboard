/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

export const Pricing = ({ setTab }) => {
  const goToPricingPage = () => {
    try {
      setTab(4);
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <Box
      background="#fff"
      borderRadius={"10px"}
      padding={"1.2rem 0 1.5rem 0"}
      boxShadow={"rgba(0, 0, 0, 0.1) 0px 0px 20px 0px"}
    >
      <Box
        m={"0 0 0 1rem"}
        fontWeight={700}
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
          <RiMoneyRupeeCircleFill />
        </Text>
        <Text>Plans & Pricing</Text>
      </Box>
      <TableContainer
        width={"100%"}
        maxWidth={"100%"}
        borderTop={"1px solid #cccffc"}
        borderBottom={"1px solid #cccffc"}
        whiteSpace={"none"}
        mt={4}
      >
        <Table
          variant="striped"
          colorScheme="blue"
          borderTop={"1.3px solid #5838fc !important"}
          className="plansTable"
        >
          <Thead>
            <Tr>
              <Td>
                <Text
                  textTransform={"uppercase"}
                  color={"#000"}
                  fontWeight={700}
                  fontSize={["11px", "12px", "13px", "14px"]}
                >
                  Package
                </Text>
              </Td>
              <Td>
                <Text
                  textTransform={"uppercase"}
                  color={"#000"}
                  fontWeight={700}
                  fontSize={["11px", "12px", "13px", "14px"]}
                >
                  Amount
                </Text>
              </Td>
              <Td>
                <Text
                  textTransform={"uppercase"}
                  color={"#000"}
                  fontWeight={700}
                  fontSize={["11px", "12px", "13px", "14px"]}
                >
                  Quizzes
                </Text>
              </Td>
              <Td>
                <Text
                  textTransform={"uppercase"}
                  color={"#000"}
                  fontWeight={700}
                  fontSize={["11px", "12px", "13px", "14px"]}
                >
                  Validity
                </Text>
              </Td>
            </Tr>
          </Thead>
          <Tbody
            fontSize={["11px", "11px", "13px", "13px"]}
            fontWeight={500}
            color={"#323232"}
          >
            {/* <Tr>
              <Td id="plansPackage">Trial Package</Td>
              <Td>₹199</Td>
              <Td>
                5 Quizzes <br />
                (₹40 per quiz)
              </Td>
              <Td>1 Month</Td>
            </Tr> */}
            <Tr>
              <Td fontWeight={600} id="plansPackage">
                Beginner's <br /> Package
              </Td>
              <Td>₹499</Td>
              <Td>
                25 Quizzes <br />
                (₹20 per quiz)
              </Td>
              <Td>6 Months</Td>
            </Tr>
            <Tr>
              <Td id="plansPackage">
                Academic
                <br /> Advancement
              </Td>
              <Td>₹999</Td>
              <Td>
                67 Quizzes <br />
                (₹15 per quiz)
              </Td>
              <Td>1 year</Td>
            </Tr>
            <Tr>
              <Td fontWeight={600} id="plansPackage">
                Committed <br />
                to Success
              </Td>
              <Td>₹1999</Td>
              <Td>
                200 Quizzes
                <br /> (₹10 per quiz)
              </Td>
              <Td>3 Years</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Box
        width={"100%"}
        margin={"1rem auto 0 auto"}
        display={"flex"}
        justifyContent={"center"}
        padding={"0 1rem"}
      >
        <Button
          onClick={goToPricingPage}
          bg={"#4E46E4"}
          color={"white"}
          fontSize={["13px", "13px", "15px", "15px"]}
          fontWeight={400}
          width={"100%"}
        >
          Add Quiz Balance
        </Button>
      </Box>
    </Box>
  );
};
