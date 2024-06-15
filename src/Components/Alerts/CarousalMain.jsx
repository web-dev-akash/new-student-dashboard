import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { CreditsExhausted } from "./CreditsExhausted";
import { AboutToStart } from "./AboutToStart";
import { MeetingInProgress } from "./MeetingInProgress";
import { LowCredits } from "./LowCredits";
import { CoinsUpdated } from "./CoinsUpdated";
import { AddressUpdate } from "./AddressUpdate";
import { DoubtSession } from "./DoubtSession";
import { JoinCommunity } from "./JoinCommunity";

export const CarousalMain = () => {
  const alert = useSelector((state) => state.alert);
  return (
    <Box
      gridColumn={["unset", "unset", "1 / span 2", "1 / span 2"]}
      overflow={"hidden"}
      width={"100%"}
      borderRadius={"10px"}
      display={alert.length > 0 ? "block" : "none"}
    >
      <Carousel
        dynamicHeight={true}
        autoPlay={true}
        centerMode={true}
        infiniteLoop={true}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        centerSlidePercentage={100}
        interval={3000}
        stopOnHover={false}
      >
        {alert.length > 0
          ? alert.map((alert, index) => {
              if (alert === "credits") {
                return <CreditsExhausted key={index} />;
              }
              if (alert === "aboutToStart") {
                return <AboutToStart key={index} />;
              }
              if (alert === "inProgress") {
                return <MeetingInProgress key={index} />;
              }
              if (alert === "community") {
                return <JoinCommunity key={index} />;
              }
              if (alert === "lowCredits") {
                return <LowCredits key={index} />;
              }
              if (alert === "coins") {
                return <CoinsUpdated key={index} />;
              }
              if (alert === "address") {
                return <AddressUpdate key={index} />;
              }
              if (alert === "doubt") {
                return <DoubtSession key={index} />;
              }
              return null;
            })
          : null}
      </Carousel>
    </Box>
  );
};
