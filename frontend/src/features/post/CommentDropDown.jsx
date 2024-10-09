import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  HiOutlineEllipsisVertical,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { deleteComment } from "./postApi";
import toast from "react-hot-toast";

function CommentDropDown({ modelOpen, token, postID, commentID }) {
  const queryClient = useQueryClient();
  const { mutate: deleteCommentMutation, isLoading } = useMutation({
    mutationFn: () => deleteComment(token, postID, commentID),
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries();
    },
    onError: (err) => toast.error(err?.message),
  });

  return (
    <div className="dropdown dropdown-left ml-auto">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-circle btn-sm bg-black hover:bg-gray-900"
      >
        <HiOutlineEllipsisVertical color="#fff" className="" size={24} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu-xs z-[1] cursor-pointer divide-y divide-gray-700 rounded-md bg-gray-900 shadow"
      >
        <li
          onClick={() => {
            modelOpen.current.showModal();
          }}
          className="flex items-center justify-center rounded-md p-1 transition-all duration-300 hover:bg-gray-800"
        >
          <button>
            <HiOutlinePencilSquare size={17} />
          </button>
        </li>
        <li
          onClick={deleteCommentMutation}
          className="flex items-center justify-center rounded-md p-1 transition-all duration-300 hover:bg-gray-800"
        >
          <button>
            <HiOutlineTrash size={17} />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default CommentDropDown;
