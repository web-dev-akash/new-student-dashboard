import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export const InviteButton = ({ ...props }) => {
  const phone = useSelector((state) => state.user.phone);
  return (
    <Button
      onClick={() =>
        (window.location.href = `https://wa.me?text=%2AHi%21+I+am+learning+a+lot+through+Wisechamps+olympiad+practice+sessions.+These+quizzes+are+FUN+%26+INTERESTING+way+of+LEARNING+regularly.%2A%0D%0A%0D%0AI+am+sure+this+time+I+will+Ace+my+Qlympiad+Math+and+Science+Exams.%0D%0A%0D%0A%2AWinners+also+get+gifts%21+So+Don%27t+Miss+out...%2A%0D%0A%0D%0AClick+here+to+register+your+name+and+participate+in+free+sessions+%F0%9F%91%87%0D%0Ahttps%3A%2F%2Fwisechamps.com%3FrefereeId%3D${phone}+%0D%0A%0D%0ASee%C2%A0you%C2%A0there%C2%A0%F0%9F%92%A1`)
      }
      bg={"#4E46E4"}
      color={"white"}
      fontSize={["11px", "12px", "13px", "13px"]}
      fontWeight={500}
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
      {...props}
    >
      Invite a Cousin / Friend
    </Button>
  );
};
