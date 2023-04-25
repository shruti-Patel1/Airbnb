import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
// mui icons
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// 3rd party
import SwipeableViews from "react-swipeable-views";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

// react icons
import { AiFillStar } from "react-icons/ai";

import {
  flexBetween,
  dFlex,
  carouselDot,
  fixedIcon,
  carouselImage,
  fixedBottom,
} from "themes/commonStyles";
import "./CarouselCard.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { auth, db } from "./googleSignIn/config";
import { Modal } from "@mui/material";

const CarouselCard = ({ location, snapData }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [like, setLike] = React.useState();
  const [data, setData] = React.useState();

  const [oldData, setOldData] = React.useState([]);
  const [joinData, setJoinData] = React.useState();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "1%",
    p: 2,
  };
  useEffect(() => {
    setData(
      auth.currentUser?.email
        ? auth.currentUser?.email
        : auth.currentUser?.phoneNumber
    );
  }, []);

  useEffect(() => {
    snapData && snapData.find((val) => val == location.id && setLike(true));
  }, [snapData]);

  const maxSteps = location.locationImages.length; // so that we know how many dots

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1); // jumps when we click the next arrow
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1); // when we click the back arrow
  };

  const handleStepChange = (step) => {
    setActiveStep(step); // handle swipe change
  };

  const citiesRef = collection(db, "test");

  const HandleLike = async () => {
    !auth.currentUser ? setOpen(true) : setLike(!like);
    const currentId = location.id;
    const docRef = doc(db, "Users", data);

    if (!like) {
      const citiesRef = collection(db, "Users");

      const citySnapshot = await getDocs(citiesRef);

      let citySnapshotData = citySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((value) => value.id == data);

      let storedOldData = citySnapshotData[0].favourite.concat(
        parseInt(currentId)
      );

      await updateDoc(doc(citiesRef, data), {
        favourite: storedOldData,
      });
    } else {
      const citiesRef = collection(db, "Users");
      const citySnapshot = await getDocs(citiesRef);

      let citySnapshotData = citySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((value) => value.id == data)[0]
        .favourite.filter((value) => value != currentId);

      await updateDoc(doc(citiesRef, data), {
        favourite: citySnapshotData,
      });
    }
  };

  return (
    <Box
      className="carouselCard"
      sx={{
        flexGrow: 1,
        position: "relative",
      }}
    >
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Alert severity="error">Please Log in</Alert>
          </Box>
        </Modal>
      </Box>
      <Button sx={fixedIcon} onClick={HandleLike}>
        {!!like ? (
          <FavoriteIcon
            size={24}
            color="red"
            style={{ color: "red", stroke: "#ffffff", strokeWidth: 2 }}
          />
        ) : (
          <FavoriteIcon
            size={24}
            color="red"
            style={{ color: "#5C6A79", stroke: "#ffffff", strokeWidth: 2 }}
          />
        )}
      </Button>

      {location.locationImages.length && (
        <SwipeableViews
          axis={"x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {location.locationImages.map((step, index) => {
            return (
              <div key={step.id}>
                <Box
                  component="img"
                  sx={{ ...carouselImage, height: "260px" }}
                  src={step.url}
                  alt={step.id}
                ></Box>
              </div>
            );
          })}
        </SwipeableViews>
      )}

      <Box sx={fixedBottom}>
        <MobileStepper
          sx={{ backgroundColor: "transparent" }}
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              sx={carouselDot}
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              sx={carouselDot}
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
            </Button>
          }
        />
      </Box>

      <Box sx={flexBetween}>
        <Box sx={{ mt: 2 }}>
          <Typography component="h3" sx={{ fontWeight: "bold" }}>
            {location.location}
          </Typography>
          <Typography component="h4"> {location.days}</Typography>
          <Typography component="h5" sx={{ fontWeight: "bold" }}>
            {location.price}
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Box sx={dFlex}>
            {location.isNew ? (
              <React.Fragment>
                <AiFillStar size={18} sx={{ alignItems: "center" }} />
                <Typography component="h5">New</Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <AiFillStar size={18} sx={{ alignItems: "center" }} />
                <Typography component="h5"> {location.rating}</Typography>
              </React.Fragment>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CarouselCard;
