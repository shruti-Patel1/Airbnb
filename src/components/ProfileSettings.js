import React, { useEffect, useState, useContext } from "react";
import { Button, Link, Stack, Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import { BsGlobe } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { flexCenter } from "themes/commonStyles";
import Modal from "@mui/material/Modal";
import { FcGoogle } from "react-icons/fc";
import { BsPhone } from "react-icons/bs";
import { AiFillFacebook } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { auth, db, provider } from "./googleSignIn/config";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { GlobalContext, initialState } from "store/store";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CgSpinner } from "react-icons/cg";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const citiesRef = collection(db, "Users");

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
  borderRadius: "1%",
  p: 2,
};

const ProfileSettings = () => {
  const { addUser, users } = useContext(GlobalContext);

  const [authen, setAuthen] = useState();

  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const [otpFail, setOtpFail] = useState(false);
  const [logInModal, setLogInModal] = useState(false);
  const [logInPhone, setLogInPhone] = useState(false);
  const [phone, setPhone] = useState();

  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOtpFail = () => setOtpFail(false);
  const handleLogInOpen = () => (handleClose(), setLogInModal(true));
  const handleLogInClose = () => setLogInModal(false);
  const handleLogInPhone = () => (handleLogInClose(), setLogInPhone(true));
  const handleLogInPhoneClose = () => setLogInPhone(false);

  const handleLogOut = () => {
    auth.signOut();
    localStorage.clear();
    window.location.reload();
  };
  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider).then(async (data) => {
      setImage(data.user.photoURL);
      localStorage.setItem("email", data.user.email);
      handleLogInClose();
      addUser({
        name: data.user.email,
      });

      window.location.reload();
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
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }
  useEffect(() => {
    setAuthen(auth);
  }, []);

  const signInWithPhone = () => {
    handleLogInPhone();
  };
  const data1 = auth;
  const img =
    "https://media.geeksforgeeks.org/wp-content/uploads/geeksforgeeks-13.png";

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user.phoneNumber);

        setLoading(false);

        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setOtpFail(true);
        setLoading(false);
      });
  }
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
      <Box>
        <Modal
          open={otpFail}
          onClose={handleOtpFail}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <Alert severity="error">Wrong Otp , Please check</Alert>
          </Box>
        </Modal>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {auth?.currentUser?.displayName ||
            (auth?.currentUser?.phoneNumber && (
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                {auth.currentUser.displayName}
                {auth.currentUser.phoneNumber}
                {}
              </Typography>
            ))}
          {auth?.currentUser?.displayName || auth?.currentUser?.phoneNumber ? (
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
            <h3 style={{ justifyContent: "center", display: "flex" }}>
              Log in
            </h3>
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
              onClick={signInWithGoogle}
            >
              Continue with Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<BsPhone />}
              fullWidth
              sx={{ my: 2 }}
              onClick={signInWithPhone}
            >
              Continue with Phone
            </Button>
            {/* <Button variant="outlined" startIcon={<HiOutlineMail />} fullWidth>
              Continue with email
            </Button> */}
          </>
        </Box>
      </Modal>
      <Modal
        open={logInPhone}
        onClose={handleLogInPhoneClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box sx={style2}>
            <Toaster toastOptions={{ duration: 4000 }} />
            <div id="recaptcha-container"></div>
            {user ? (
              <h2 className="text-center text-white font-medium text-2xl">
                👍Login Success
              </h2>
            ) : (
              <>
                {showOTP ? (
                  <>
                    <label htmlFor="otp" style={{ marginBottom: "20px" }}>
                      Enter your OTP
                    </label>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      OTPLength={6}
                      otpType="number"
                      disabled={false}
                      autoFocus
                      className="opt-container "
                      style={{ marginTop: "10px" }}
                    ></OtpInput>
                    <Button
                      onClick={onOTPVerify}
                      style={{
                        marginTop: "15px",
                        backgroundColor: "#0063cc",
                        color: "#fff  ",
                      }}
                    >
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                      <span>Verify OTP</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Box style={{ marginBottom: "10px" }}>
                      <label>Verify your phone number</label>
                    </Box>
                    <PhoneInput country={"in"} value={ph} onChange={setPh} />
                    <Button
                      onClick={onSignup}
                      style={{
                        marginTop: "15px",
                        backgroundColor: "#0063cc",
                        color: "#fff  ",
                      }}
                      // variant="contained"
                    >
                      {loading && (
                        <CircularProgress
                          size={20}
                          style={{ color: "white", marginRight: "10px" }}
                        />
                      )}
                      Send code via SMS
                    </Button>
                  </>
                )}
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfileSettings;
