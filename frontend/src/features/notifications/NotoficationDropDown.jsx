import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { deleteNotifications } from "./notificationsApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function NotoficationDropDown({ notifications }) {
  const queryClient = useQueryClient();
  const token = useSelector((store) => store?.user?.user?.token);

  const { mutate: deleteAll } = useMutation({
    mutationFn: () => deleteNotifications(token),
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries();
    },
    onError: (err) => toast.error(err?.message),
  });

  return (
    <div className="dropdown dropdown-left dropdown-hover ml-auto self-center">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-circle btn-ghost btn-md p-0 hover:bg-gray-900"
      >
        <HiOutlineCog8Tooth size={20} color="white" />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] w-52 space-y-1 rounded-box bg-base-100 p-1 shadow"
      >
        {notifications?.length === 0 ? null : (
          <li onClick={() => deleteAll()}>
            <button className="rounded-md bg-red-600 hover:bg-red-500 active:bg-red-500">
              Delete all notifications
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default NotoficationDropDown;
