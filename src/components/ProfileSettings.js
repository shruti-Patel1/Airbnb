import React, { useEffect, useState, useContext } from "react";
import { Button, Link, Stack, Box, Typography } from "@mui/material";

// import {} from "firebase/auth"
import { BsGlobe } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { flexCenter } from "themes/commonStyles";
import Modal from "@mui/material/Modal";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { AiFillFacebook } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { auth, provider } from "./googleSignIn/config";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";

import { GlobalContext } from "store/store";

const style = {
  position: "relative",
  top: "10%",
  left: "90%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5%",
  p: 2,
  display: "flex",
  flexDirection: "column",
};
const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5%",
  p: 2,
};

const ProfileSettings = () => {
  const { addUser } = useContext(GlobalContext);
  // const [value, setValue] = useState("");
  // const [name, setName] = useState("");
  const [authen, setAuthen] = useState();
  const [image, setImage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [logInModal, setLogInModal] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLogInOpen = () => (handleClose(), setLogInModal(true));
  const handleLogInClose = () => setLogInModal(false);

  const handleLogOut = () => {
    auth.signOut();
    localStorage.clear();
    window.location.reload();
  };

  const handleSignIn = () => {
    signInWithPopup(auth, provider).then((data) => {
      // setName(data.user.displayName);
      // setValue(data.user.email);
      setImage(data.user.photoURL);
      localStorage.setItem("email", data.user.email);
      // addUser(data.user.email);
      handleLogInClose();
    });
  };
  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((req) => {
        console.log(req);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    setAuthen(auth);
  }, []);

  const data1 = auth;
  const img =
    "https://media.geeksforgeeks.org/wp-content/uploads/geeksforgeeks-13.png";
  return (
    <Box sx={flexCenter}>
      <Link href="#">
        <Typography
          sx={{
            fontWeight: "bold",
            color: (theme) => theme.palette.text.primary,
          }}
        >
          Airbnb your home
        </Typography>
      </Link>
      <Stack>
        <Button>
          <BsGlobe size={24} />
        </Button>
        <Button
          sx={{ borderRadius: 10, border: "1px solid #ddd" }}
          onClick={handleOpen}
        >
          <Stack sx={{ display: "flex", m: 0.5 }}>
            <AiOutlineMenu size={24} />
            {/* {console.log("auth", auth?.currentUser?.photoURL)} */}
            {data1 ? (
              <img
                style={{ borderRadius: "50%" }}
                src={img}
                alt="Girl in a jacket"
                width="30"
                height="30"
              />
            ) : (
              <FaRegUserCircle size={24} />
            )}
          </Stack>
        </Button>
      </Stack>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {auth?.currentUser?.displayName && (
            <Typography
              sx={{
                fontWeight: "bold",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {auth.currentUser.displayName}
            </Typography>
          )}
          {auth?.currentUser?.displayName ? (
            <Button onClick={handleLogOut} sx={{ mt: 2 }}>
              Log Out
            </Button>
          ) : (
            <>
              <Button
                onClick={handleLogInOpen}
                sx={{
                  fontWeight: "bold",
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                Log In
              </Button>
            </>
          )}
          <Box sx={{ border: "0.5px solid black" }} />
        </Box>
      </Modal>
      <Modal
        open={logInModal}
        onClose={handleLogInClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <>
            <Button
              variant="outlined"
              startIcon={<AiFillFacebook />}
              fullWidth
              sx={{ my: 2 }}
              onClick={signInWithFacebook}
            >
              Continue with Facebook
            </Button>
            <Button
              variant="outlined"
              startIcon={<FcGoogle />}
              fullWidth
              onClick={handleSignIn}
            >
              Continue with Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<BsApple />}
              fullWidth
              sx={{ my: 2 }}
            >
              Continue with Apple
            </Button>
            <Button variant="outlined" startIcon={<HiOutlineMail />} fullWidth>
              Continue with email
            </Button>
          </>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfileSettings;
