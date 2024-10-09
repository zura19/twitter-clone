import Notification from "../models/notificationModel.js";

export const getUserNotifications = async (req, res) => {
  try {
    const { _id: id } = req.user;

    const notifications = await Notification.find({ to: id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      notifications,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};

export const deleteUserNotifications = async (req, res) => {
  try {
    const { _id: id } = req.user;
    const notifications = await Notification.find({ to: id }).deleteMany();

    res.status(202).json({
      message: "Notifications deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};
