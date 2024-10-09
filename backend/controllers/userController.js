import User from "../models/userModel.js";

export const getSuggestedUsers = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const filteredUsers = await User.find(
      {
        _id: { $ne: user._id, $nin: user.following },
      },
      "userName fullName profileImg"
    )
      .select("-password")
      .limit(4);

    res.status(200).json({
      filteredUsers,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({
      status: "fail",
      message: "Invalide user id",
    });
  }

  try {
    const user = await User.findOne({ userName: username }).select("-password");

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getUserbyId = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: "fail",
      message: "Invalide user id",
    });
  }

  try {
    const user = await User.findOne({ _id: id }).select(
      "userName email profileImg "
    );

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = req.user;
    // console.log(user);
    const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {
      new: true,
    });

    res.status(201).json({
      status: "Success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;

    const anotherUser = await User.findById(id).select("-password");
    const currentUser = req.user;

    if (!anotherUser) {
      return res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    }

    const isFollowing = currentUser.following.includes(id);
    if (!isFollowing) {
      await User.findByIdAndUpdate(
        currentUser._id,
        {
          $push: { following: id },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(
        anotherUser._id,
        {
          $push: { followers: currentUser._id },
        },
        { new: true }
      );
      const user = await User.find({ _id: currentUser._id });

      res.status(201).json({
        message: "User followed Successfully",
        data: { user: user[0] },
      });
    } else {
      await User.findByIdAndUpdate(
        currentUser._id,
        {
          $pull: { following: id },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(
        anotherUser._id,
        {
          $pull: { followers: currentUser._id },
        },
        { new: true }
      );

      const user = await User.find({ _id: currentUser._id });
      res.status(201).json({
        message: "User unfollowed Successfully",
        data: { user: user[0] },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
