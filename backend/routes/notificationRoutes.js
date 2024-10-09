import express from "express";
import { protectRoute } from "../controllers/authController.js";
import {
  deleteUserNotifications,
  getUserNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

router.route("/userNotifications").get(protectRoute, getUserNotifications);
router.route("/delete/all").delete(protectRoute, deleteUserNotifications);

export default router;
