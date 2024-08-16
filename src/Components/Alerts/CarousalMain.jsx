import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { CreditsExhausted } from "./CreditsExhausted";
import { LowCredits } from "./LowCredits";
import { CoinsUpdated } from "./CoinsUpdated";
import { AddressUpdate } from "./AddressUpdate";
import { DoubtSession } from "./DoubtSession";
import { JoinCommunity } from "./JoinCommunity";
import { IntroLuckyDrawMeeting } from "./IntroLuckyDrawMeeting";
import { QuizInProgress } from "./QuizInProgress";

export const CarousalMain = () => {
  const alert = useSelector((state) => state.alert);
  return (
    <Box
      overflow={"hidden"}
      width={"100%"}
      borderRadius={"10px"}
      display={alert.length > 0 ? "block" : "none"}
    >
      <Carousel
        transitionTime={500}
        dynamicHeight={true}
        autoPlay={true}
        centerMode={true}
        infiniteLoop={true}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        centerSlidePercentage={100}
        interval={3000}
        stopOnHover={true}
      >
        {alert.length > 0
          ? alert.map((alert, index) => {
              if (alert === "credits") {
                return <CreditsExhausted key={index} />;
              }
              if (alert === "newToWisechamps") {
                return <IntroLuckyDrawMeeting key={index} />;
              }
              if (alert === "meeting") {
                return <QuizInProgress key={index} />;
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
