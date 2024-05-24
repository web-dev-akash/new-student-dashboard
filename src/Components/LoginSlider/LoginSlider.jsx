import { Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";

export const LoginSlider = () => {
  const carouselItems = [
    {
      image:
        "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNoaWxkcmVuJTIwcmVhZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      image:
        "https://images.unsplash.com/photo-1549737221-bef65e2604a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNoaWxkcmVuJTIwcmVhZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      image:
        "https://images.unsplash.com/flagged/photo-1551887373-6edba6dacbb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGNoaWxkcmVuJTIwcmVhZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      image:
        "https://images.unsplash.com/photo-1577835724923-f591f5f98c89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNoaWxkcmVuJTIwcmVhZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  const CarouselItem = ({ image }) => {
    return (
      <Box sx={{ height: "100%", width: "100%" }}>
        <img
          src={image}
          alt="carousel"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
    );
  };
  return (
    <Carousel
      navButtonsAlwaysInvisible
      fullHeightHover
      autoPlay
      animation="slide"
      indicators={true}
      indicatorContainerProps={{
        style: {
          position: "absolute",
          left: 0,
          bottom: 10,
          zIndex: 9,
        },
      }}
      indicatorIconButtonProps={{ style: { color: "white" } }}
      activeIndicatorIconButtonProps={{
        style: {
          color: "#5838fc",
        },
      }}
      interval={3000}
      duration={1000}
      sx={{ height: "100%" }}
      className="slider-main-div"
    >
      {carouselItems.map(({ image }, index) => (
        <CarouselItem key={index} image={image} />
      ))}
    </Carousel>
  );
};
