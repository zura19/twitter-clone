import {
  HiOutlineEmojiHappy,
  HiOutlinePhotograph,
  HiQuestionMarkCircle,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import UserProfilePicture from "../../components/UserProfilePicture";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addPost, updatePost } from "./homeApi";

function AddPost({ updateSession, postText, postImage, postID }) {
  const user = useSelector((store) => store?.user?.user?.data?.user || null);
  const token = useSelector((store) => store?.user?.user?.token);
  const [showInput, setShowInput] = useState(
    updateSession && postImage ? true : false,
  );
  const [text, setText] = useState(updateSession ? postText : "");
  const [image, setImage] = useState(updateSession ? postImage : "");
  const queryClient = useQueryClient();

  const { mutate: create, isLoading } = useMutation({
    mutationFn: () => addPost(token, { text, image }),
    onSuccess: () => {
      toast.success("Post created successfully");
      queryClient.invalidateQueries();
      setText("");
      setImage("");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: update, isLoading: isUpdating } = useMutation({
    mutationFn: () => updatePost(token, postID, { text, image }),
    onSuccess: () => {
      toast.success("Post updated successfully");
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // console.log(text);

  return (
    <div className="grid grid-cols-[auto_1fr] gap-2 border-b border-gray-700 px-6 py-4">
      <UserProfilePicture src={user?.profileImg} alt={user?.userName} />

      {/* <div className="h-8 w-8 rounded-full bg-white"></div> */}
      <div>
        <textarea
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What is happening?!"
          className="w-full border-b border-gray-700 bg-black pb-12 outline-none placeholder:text-sm focus:outline-none"
        />
        <input
          className={` ${showInput ? "h-12" : "m-0 inline h-0 border-none border-black p-0 text-xs leading-none"} btnappear input input-md input-primary mt-2 w-full rounded-full outline-none transition-all duration-300`}
          placeholder="Image Url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <div
          className={`${showInput ? "mt-4" : "mt-0"} flex items-center gap-1 transition-all duration-300`}
        >
          <button
            onClick={() => {
              setShowInput((value) => !value);
            }}
          >
            <HiOutlinePhotograph size={25} color="rgb(29,155,240)" />
          </button>
          <button>
            <HiOutlineEmojiHappy size={25} color="rgb(29,155,240)" />
          </button>
          {updateSession ? (
            <button
              disabled={isUpdating}
              onClick={() => {
                update();
              }}
              className="btn btn-primary btn-sm ml-auto rounded-full px-5 text-white"
            >
              {isUpdating ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Update"
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                create();
                setShowInput(false);
              }}
              disabled={isLoading}
              className="btn btn-primary btn-sm ml-auto rounded-full px-5 text-white"
            >
              {!isLoading ? (
                "Post"
              ) : (
                <span className="loading loading-spinner loading-xs"></span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddPost;
