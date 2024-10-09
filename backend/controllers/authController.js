import validator from "validator";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
// import { genereteTokenAndSetCookie } from "../utils/genereteTokenAndSetCookie.js";
import jwt from "jsonwebtoken";

const signToken = function (_id) {
  const token = jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "3d",
  });

  return token;
};

export const signup = async (req, res) => {
  try {
    const { userName, email, password, fullName } = req.body;

    if (!userName || !email || !password || !fullName) {
      return res.status(401).json({
        status: "fail",
        message: "All fields must be filled",
      });
    }

    const isValidEmail = validator.isEmail(email);
    if (!isValidEmail) {
      return res.status(401).json({
        status: "fail",
        message: "Please enter valid email",
      });
    }

    const exsistingUser = await User.findOne({ userName });
    if (exsistingUser) {
      return res.status(401).json({
        status: "fail",
        message: "Username is alerdy taken",
      });
    }

    const exsistingEmail = await User.findOne({ email });
    if (exsistingUser) {
      return res.status(401).json({
        status: "fail",
        message: "email is alerdy taken",
      });
    }

    const user = await User.create({
      fullName,
      userName,
      email,
      password,
    });

    if (user) {
      const token = signToken(user._id);
      // genereteTokenAndSetCookie(user._id, res);
      await user.save();
      res.status(201).json({
        status: "Success",
        token,
        data: {
          user,
        },
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect username or password",
      });
    }

    const token = signToken(user._id);

    // genereteTokenAndSetCookie(user._id, res);
    res.status(201).json({
      status: "Success",
      token,
      data: { user },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const protectRoute = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];

    if (!authorization || !authorization.startsWith("Bearer") || !token) {
      return res.status(400).json({
        message: "Authorization faild!",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded) {
      return res.status(400).json({
        message: "Authorization faild!",
      });
    }

    const user = await User.findById(decoded._id).select("-password");
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(201).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};
