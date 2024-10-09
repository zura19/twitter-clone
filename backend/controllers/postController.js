import Post from "./../models/postModel.js";

export const getPosts = async (req, res) => {
  console.log(req.user.following);

  try {
    const post = await Post.find({
      $or: [{ user: { $in: req.user.following } }, { user: req.user._id }],
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      post,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getUserPosts = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid id",
    });
  }

  try {
    const posts = await Post.find({ user: id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      posts,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getPostByID = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const post = await Post.find({ _id: id });
    res.status(200).json({
      post,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const { _id: user } = req.user;
    const { text, image } = req.body;

    if (!text && !image) {
      return res.status(400).json({
        message: "Please enter text or upload image!",
      });
    }

    const post = await Post.create({ text, image, user });
    res.status(200).json({
      post,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: err.message,
      });
    }
    const post = await Post.findByIdAndDelete(id);

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req?.body?.text && !req?.body?.image) {
      return res.status(400).json({
        message: "Please enter text or upload image!",
      });
    }

    console.log(req.body);
    if (!id) {
      return res.status(400).json({
        message: err.message,
      });
    }
    const post = await Post.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      message: "Post updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const likeUnlike = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { id } = req.params;

    const post = await Post.findById(id);
    const isLiked = post.likes.includes(userId);

    if (!isLiked) {
      await Post.findByIdAndUpdate(
        id,
        { $push: { likes: userId } },
        { new: true }
      );

      res.status(201).json({
        message: "Post Liked Successfully",
      });
    } else {
      await Post.findByIdAndUpdate(
        id,
        { $pull: { likes: userId } },
        { new: true }
      );
      res.status(201).json({
        message: "Post Unliked Successfully",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getPostsLikedByUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    console.log(userId);
    const likedPosts = await Post.find({ likes: userId });
    res.status(200).json({
      results: likedPosts.length,
      likedPosts,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const bookmarkUnbookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: userID } = req.user;
    const post = await Post.find({ _id: id });

    const isBookmarked = post[0].bookmarks.includes(userID);

    if (!isBookmarked) {
      await Post.findByIdAndUpdate(
        id,
        { $push: { bookmarks: userID } },
        { new: true }
      );

      res.status(201).json({
        message: "Post Bookmarked Successfully",
      });
    } else {
      await Post.findByIdAndUpdate(
        id,
        { $pull: { bookmarks: userID } },
        { new: true }
      );

      res.status(201).json({
        message: "Post Unbookmarked Successfully",
      });
    }
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getUserBookmarks = async (req, res) => {
  try {
    console.log(req.user);
    const { id } = req.params;

    const bookmarks = await Post.find({ bookmarks: id });

    res.status(200).json({
      bookmarks,
    });
  } catch (err) {
    res.status(400).json({
      status: "faila",
      message: err.message,
    });
  }
};

export const addComnent = async (req, res) => {
  try {
    const { _id: user } = req.user;
    const { text } = req.body;
    const { id: postID } = req.params;

    if (!text) {
      return res.status(400).json({
        message: "Type something to add comment!",
      });
    }

    const post = await Post.findByIdAndUpdate(postID, {
      $push: { comments: { text, user } },
    });

    res.status(201).json({
      message: "Comment added Successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { postID } = req.params;
    const { commentID } = req.params;
    const { text } = req.body;

    const post = await Post.findById(postID);

    const commentIndex = post.comments.findIndex(
      (comment) => comment._id.toString() === commentID
    );

    post.comments[commentIndex].text = text;

    await post.save();

    res.status(200).json({
      message: "Comment updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { postID } = req.params;
    const { commentID } = req.params;

    const post = await Post.findByIdAndUpdate(
      postID,
      { $pull: { comments: { _id: commentID } } }, // Remove the comment with the specific ID
      { new: true }
    );

    if (!post) {
      return res.status(400).json({
        message: "Post not found",
      });
    }

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
