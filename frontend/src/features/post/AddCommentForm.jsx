import { useSelector } from "react-redux";
import UserProfilePicture from "../../components/UserProfilePicture";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addComment, updateComment } from "./postApi";
import toast from "react-hot-toast";

function AddCommentForm({ postID, editingSession, comment, commentID }) {
  const user = useSelector((store) => store?.user?.user?.data?.user);
  const token = useSelector((store) => store?.user?.user?.token);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [text, setText] = useState(editingSession ? comment?.text : "");

  const { mutate: add, isLoading } = useMutation({
    mutationFn: () => addComment(token, postID, { text }),
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries();
      setText("");
    },
    onError: (err) => toast.error(err.message),
  });

  console.log(postID);
  const { mutate: update } = useMutation({
    mutationFn: () => updateComment(token, { text }, postID, commentID),
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries();
    },
    onError: (err) => toast.error(err?.message),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        editingSession ? update() : add();
      }}
      className={`sticky bottom-0 flex h-full items-center gap-2 border-gray-700 ${editingSession ? "" : "border-t bg-black"} px-4 py-3`}
    >
      <span
        onClick={() => navigate(`/profile/${user?.userName}/posts`)}
        className="cursor-pointer self-start rounded-full"
      >
        <UserProfilePicture src={user?.profileImg} />
      </span>
      <div className="flex w-full flex-col gap-1">
        {/* <p className="text-sm">userName</p> */}
        {/* <p className="">Lorem ipsum dolor sit amet consectetur adipisicing</p> */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Type here"
          className={`input input-md ${editingSession ? "bg-black" : ""} input-bordered w-full max-w-xs rounded-md border-gray-700 px-2 outline-none ring-0 transition-all duration-300 focus:border-primary`}
        />
      </div>
      {editingSession ? (
        <button className="btn btn-outline rounded-lg border border-primary hover:border-gray-700">
          Update
        </button>
      ) : (
        <button
          disabled={isLoading}
          className="btn btn-outline btn-sm rounded-full border-gray-500 px-8 py-0"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm text-white"></span>
          ) : (
            "Add"
          )}
        </button>
      )}
    </form>
  );
}

export default AddCommentForm;
