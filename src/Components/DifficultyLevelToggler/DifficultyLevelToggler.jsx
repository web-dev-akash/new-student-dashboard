import {
  Box,
  Button,
  CircularProgress,
  FormGroup,
  Grow,
  Modal,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDifficultyLevel } from "../../Redux/action";
import { useToast } from "@chakra-ui/react";

const style = {
  position: "absolute",
  top: "50% !important",
  left: "50% !important",
  transform: "translate(-50%, -50%) !important",
  width: "92%",
  maxWidth: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  pt: 3.2,
  borderRadius: "10px",
};

export const DifficultyLevelToggler = () => {
  const [tempLoading, setTempLoading] = useState(false);
  const checked = useSelector((state) => state.user.difficulty);
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const switchRef = useRef(null);
  const rippleContainerRef = useRef(null);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModeChange = async (switchRef) => {
    try {
      setOpen(false);
      setTempLoading(true);
      const difficulty = !switchRef?.current.checked;
      const data = await dispatch(
        updateDifficultyLevel(user.id, difficulty, user)
      );

      if (data.status !== 200) {
        toast({
          title: "Something Went Wrong",
          description: "Please try again later",
          duration: 3000,
          status: "error",
          isClosable: true,
          position: "top",
        });
      }

      setTempLoading(false);
      if (rippleContainerRef.current) {
        createRipple(rippleContainerRef.current);
      }
    } catch (error) {
      console.log("Error is ------ ", error);
    }
  };

  const createRipple = (container) => {
    const ripple = document.createElement("span");
    const diameter = Math.max(container.clientWidth, container.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${container.clientWidth / 2 - radius}px`;
    ripple.style.top = `${container.clientHeight / 2 - radius}px`;
    ripple.classList.add("ripple");

    const oldRipple = container.getElementsByClassName("ripple")[0];
    if (oldRipple) {
      oldRipple.remove();
    }

    container.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 4500);
  };

  return (
    <Box
      position={"absolute"}
      right={{ xs: "4rem", md: "5rem", lg: "5.5rem" }}
      mt={"5px"}
      ref={rippleContainerRef}
    >
      <FormGroup>
        <Box className="btn-container">
          <label className="switch btn-color-mode-switch">
            <input
              value="1"
              id="color_mode"
              name="color_mode"
              type="checkbox"
              checked={checked}
              ref={switchRef}
              onChange={handleOpen}
            />
            <label
              className={
                tempLoading
                  ? "disabled btn-color-mode-switch-inner"
                  : "btn-color-mode-switch-inner"
              }
              data-off={tempLoading && !checked ? "" : "Basic"}
              data-on={tempLoading && checked ? "" : "Olympiad"}
              htmlFor="color_mode"
            >
              {tempLoading &&
                (!checked ? (
                  <CircularProgress
                    size={"21px"}
                    sx={{
                      position: "absolute",
                      zIndex: 1,
                      top: "5px",
                      left: { xs: "21px", md: "25px" },
                      transform: "traslate(-5px, -21px)",
                      width: "8px",
                    }}
                  />
                ) : (
                  <CircularProgress
                    size={"21px"}
                    sx={{
                      position: "absolute",
                      zIndex: 1,
                      top: "5px",
                      right: { xs: "21px", md: "25px" },
                      transform: "traslate(-5px, -21px)",
                      color: "white",
                      width: "8px",
                    }}
                  />
                ))}
            </label>
          </label>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grow in={open} {...{ timeout: 500 }}>
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ fontSize: { xs: 20, md: 23 }, fontWeight: 600 }}
              >
                {checked
                  ? "Lower Difficulty Level"
                  : "Increase Difficulty Level"}
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 1, fontSize: { xs: 15, md: 18 } }}
              >
                Are you sure you want to shift to{" "}
                {checked ? "School " : "Olympiad "} level questions quizzes ?
              </Typography>
              <Box mt={2}>
                <Button
                  sx={{ padding: "6px 30px" }}
                  variant="contained"
                  onClick={() => handleModeChange(switchRef)}
                >
                  Yes
                </Button>
                <Button
                  sx={{ padding: "6px 30px", ml: "10px" }}
                  variant="outlined"
                  onClick={handleClose}
                >
                  No
                </Button>
              </Box>
            </Box>
          </Grow>
        </Modal>
      </FormGroup>
    </Box>
  );
};
