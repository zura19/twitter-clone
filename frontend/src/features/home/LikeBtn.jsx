import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { likeOrUnlike } from "./homeApi";
import { HiOutlineHeart } from "react-icons/hi";

function LikeBtn({ token, postID, likesArr, userID }) {
  const queryClient = useQueryClient();

  const {
    mutate: likeUnlikeMutation,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: () => likeOrUnlike(token, postID),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return (
    <div
      onClick={() => likeUnlikeMutation()}
      className="flex items-center gap-1"
    >
      <button
        disabled={isLoading}
        className="rounded-md p-1 transition-all duration-300 hover:bg-gray-900 hover:text-white"
      >
        <HiOutlineHeart
          className={`${isLoading && "btn-animation"}`}
          fill={likesArr?.includes?.(userID) ? "#ef4444" : ""}
          color={likesArr.includes?.(userID) ? "#ef4444" : "white"}
          size={20}
        />
      </button>
      <span className="text-sm text-gray-300">{likesArr?.length}</span>
    </div>
  );
}

export default LikeBtn;
