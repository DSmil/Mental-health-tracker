const express = require("express");
const validateForm = require("../controllers/validateForm");
const router = express.Router();

const {handleLogin, attemptLogin, attemptRegister, attemptLogout,attemptExtractPsychologists, attemptToRetriveReservedDates,attemptToAddReservation} = require("../controllers/authController")

router
  .route("/login")
  .get(handleLogin)
  .post(validateForm, attemptLogin);

router.post("/signup", validateForm, attemptRegister);
router.get("/logout", attemptLogout);
router.get("/psyhologist", attemptExtractPsychologists)
router.get("/scheduler", attemptToRetriveReservedDates)
router.post("/add-reservation", attemptToAddReservation)
module.exports = router;
