import express from "express";
import {
  login,
  // logout,
  signup,
  protectRoute,
  getMe,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/me").get(protectRoute, getMe);
router.route("/signup").post(signup);
router.route("/login").post(login);
// router.route("/logout").post(logout);

export default router;
