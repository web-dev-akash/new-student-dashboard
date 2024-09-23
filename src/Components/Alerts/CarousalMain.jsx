/* eslint-disable no-unused-vars */
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
import { TestSeriesDoubtSession } from "./TestSeriesDoubtSession";
import { ViewStories } from "./ViewStories";

export const CarousalMain = ({ setTab, setShowStory }) => {
  const alert = useSelector((state) => state.alert);
  return (
    <Box
      overflow={"hidden"}
      width={"100%"}
      margin={"0 auto"}
      borderRadius={"10px"}
      display={alert.length > 0 ? "block" : "none"}
      id="alerts"
      position={"relative"}
      zIndex={10}
      // sx={{
      //   "& ul > li > div > div": {
      //     color: "black",
      //     backdropFilter: "blur(5px) saturate(200%)",
      //     "-webkit-backdrop-filter": "blur(5px) saturate(200%)",
      //     backgroundColor: "rgba(255, 255, 255, 0.5)",
      //   },
      // }}
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
        interval={4500}
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
              if (alert === "testDoubt") {
                return <TestSeriesDoubtSession key={index} />;
              }
              return null;
            })
          : null}
      </Carousel>
    </Box>
  );
};
