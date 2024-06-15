import {
  Box,
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

export const Schedule = () => {
  const session = useSelector((state) => state.user.session);

  const getDateAndTime = (dateTime) => {
    const date = new Date(dateTime);

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    console.log("Session", session);

    const months = [
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
      "Nov",
      "Dec",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedDate = `${dayOfWeek}, ${month} ${day}, ${hours}${ampm}`;
    return formattedDate;
  };

  return (
    <Box background="white" border={"1px solid #4E46E4"} borderRadius={"10px"}>
      <Text
        m={"1rem 0 0 1rem"}
        fontWeight={700}
        fontSize={["15px", "15px", "18px", "18px"]}
      >
        Quiz Schedule
      </Text>
      <TableContainer
        width={"100%"}
        maxWidth={"100%"}
        borderRadius={"0 0 10px 10px"}
        whiteSpace={"none"}
        mt={4}
      >
        <Table variant="striped" colorScheme="purple" className="scheduleTable">
          <Thead
            borderTop={"1px solid #cccffc"}
            fontSize={["11px", "11px", "13px", "15px"]}
          >
            <Tr>
              <Th>
                <Text fontSize={["10px", "10px", "13px", "13px"]}>Topic</Text>
              </Th>
              <Th>
                <Text fontSize={["10px", "10px", "13px", "13px"]}>Subject</Text>
              </Th>
              <Th
                minWidth={[
                  "150px !important",
                  "150px !important",
                  "180px !important",
                  "200px !important",
                  "200px !important",
                ]}
              >
                <Text fontSize={["10px", "10px", "13px", "13px"]}>
                  Date & Time
                </Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody fontSize={["11px", "11px", "13px", "15px"]}>
            {session?.map((item) => (
              <Tr key={item.id}>
                <Td width={"100%"}>{item.Session_Name}</Td>
                <Td>{item.Subject}</Td>
                <Td>{`${getDateAndTime(item.Session_Date_Time)}`}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
