import express from "express";
import { protectRoute } from "../controllers/authController.js";
import {
  addComnent,
  bookmarkUnbookmark,
  createPost,
  deleteComment,
  deletePost,
  getPostByID,
  getPosts,
  getPostsLikedByUser,
  getUserBookmarks,
  getUserPosts,
  likeUnlike,
  updateComment,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

router.route("/create").post(protectRoute, createPost);
router.route("/delete/:id").delete(protectRoute, deletePost);
router.route("/update/:id").patch(protectRoute, updatePost);

router.route("/one/:id").get(protectRoute, getPostByID);
router.route("/all").get(protectRoute, getPosts);
router.route("/:id").get(protectRoute, getUserPosts);

router.route("/like/:id").post(protectRoute, likeUnlike);
router.route("/likedByUser/:id").get(protectRoute, getPostsLikedByUser);

router.route("/bookmark/:id").post(protectRoute, bookmarkUnbookmark);
router.route("/bookmarks/:id").get(protectRoute, getUserBookmarks);

router.route("/addComment/:id").post(protectRoute, addComnent);
router.route("/:postID/comment/:commentID").patch(protectRoute, updateComment);
router.route("/:postID/comment/:commentID").delete(protectRoute, deleteComment);

export default router;
