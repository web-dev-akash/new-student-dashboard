import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

export const Pricing = () => {
  const user = useSelector((state) => state.user);
  return (
    <Box
      background="white"
      border={"1px solid #4E46E4"}
      borderRadius={"10px"}
      // overflowX={"auto"}
    >
      <Text
        m={"1rem 0 0 1rem"}
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
              <Th id="plansPackage">
                <Text fontSize={["10px", "10px", "13px", "13px"]}>Package</Text>
              </Th>
              <Th>
                <Text fontSize={["10px", "10px", "13px", "13px"]}>Amount</Text>
              </Th>
              <Th>
                <Text fontSize={["10px", "10px", "13px", "13px"]}>Quizzes</Text>
              </Th>
              <Th>
                <Text fontSize={["10px", "10px", "13px", "13px"]}>
                  Validity
                </Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody fontSize={["11px", "11px", "13px", "13px"]}>
            <Tr>
              <Td fontWeight={600} id="plansPackage">
                Trial Package
              </Td>
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
        margin={"1rem auto"}
        display={"flex"}
        justifyContent={"center"}
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
          width={"90%"}
        >
          Add Quiz Balance
        </Button>
      </Box>
    </Box>
  );
};
