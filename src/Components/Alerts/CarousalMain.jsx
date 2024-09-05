/* eslint-disable react/prop-types */
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
import { TestSeries } from "./TestSeries";

export const CarousalMain = ({ setTab }) => {
  const alert = useSelector((state) => state.alert);
  return (
    <Box
      overflow={"hidden"}
      width={"100%"}
      borderRadius={"10px"}
      display={alert.length > 0 ? "block" : "none"}
      id="alerts"
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
                return <CreditsExhausted setTab={setTab} key={index} />;
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
                return <LowCredits setTab={setTab} key={index} />;
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
              if (alert === "test") {
                return <TestSeries key={index} />;
              }
              return null;
            })
          : null}
      </Carousel>
    </Box>
  );
};
