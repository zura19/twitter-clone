import Comment from "./Comment";

function Comments({ comments, postID }) {
  if (comments.length === 0) {
    return null;
  }

  return (
    <ul className="min-h[300px] m-2 divide-y divide-gray-700 rounded-xl border border-gray-700">
      {comments?.map((comment) => (
        <Comment
          key={comment._id}
          postID={postID}
          // permisionToModify={user?._id === comment?.user}
          comment={comment}
        />
      ))}
    </ul>
  );
}

export default Comments;
