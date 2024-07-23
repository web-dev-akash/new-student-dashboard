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
import { useSelector } from "react-redux";

export const Pricing = () => {
  const user = useSelector((state) => state.user);
  return (
    <Box
      background="#fff"
      borderRadius={"10px"}
      padding={"1.2rem 0 1.5rem 0"}
      boxShadow={"rgba(0, 0, 0, 0.1) 0px 0px 20px 0px"}
    >
      <Text
        m={"0 0 0 1rem"}
        fontWeight={700}
        fontSize={["15px", "15px", "18px", "18px"]}
      >
        Plans & Pricing
      </Text>
      <TableContainer
        width={"100%"}
        maxWidth={"100%"}
        borderTop={"1px solid #cccffc"}
        borderBottom={"1px solid #cccffc"}
        whiteSpace={"none"}
        mt={4}
      >
        <Table variant="striped" colorScheme="blue" className="plansTable">
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
            <Tr>
              <Td id="plansPackage">Trial Package</Td>
              <Td>₹199</Td>
              <Td>
                5 Quizzes <br />
                (₹40 per quiz)
              </Td>
              <Td>1 Month</Td>
            </Tr>
            <Tr>
              <Td fontWeight={600} id="plansPackage">
                Academic <br />
                Advancement
              </Td>
              <Td>₹499</Td>
              <Td>
                25 Quizzes <br />
                (₹20 per quiz)
              </Td>
              <Td>6 Months</Td>
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
          onClick={() =>
            window.open(
              `https://quizbalance.wisechamps.com/?email=${user.email}`
            )
          }
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
