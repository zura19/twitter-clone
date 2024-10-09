import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HiOutlineBookmark } from "react-icons/hi";
import { bookmarkUnbookmark } from "./homeApi";
import toast from "react-hot-toast";

function BookmarkBtn({ token, postID, bookmarksArr, userID }) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookmarkUnbookmark(token, postID),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <div onClick={mutate} className="flex items-center gap-1">
      <button
        disabled={isLoading}
        className="rounded-md p-1 transition-all duration-300 hover:bg-gray-900 hover:text-white"
      >
        <HiOutlineBookmark
          color="#d1d5db"
          fill={bookmarksArr.includes(userID) ? "white" : ""}
          size={20}
        />
      </button>
    </div>
  );
}

export default BookmarkBtn;
