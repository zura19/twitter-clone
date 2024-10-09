import express from "express";
import { protectRoute } from "../controllers/authController.js";
import {
  getUserProfile,
  followUnfollowUser,
  updateUser,
  getSuggestedUsers,
  getUserbyId,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/suggestedUsers").get(protectRoute, getSuggestedUsers);
router.route("/profile/:username").get(protectRoute, getUserProfile);
router.route("/:id").get(protectRoute, getUserbyId);
router.route("/follow/:id").post(protectRoute, followUnfollowUser);
router.route("/update").patch(protectRoute, updateUser);

export default router;
