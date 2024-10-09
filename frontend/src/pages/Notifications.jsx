import { useQuery } from "@tanstack/react-query";
import Notification from "../features/notifications/Notification";
import NotificationsNav from "../features/notifications/NotificationsNav";
import { getUserNotifications } from "../features/notifications/notificationsApi";
import { useSelector } from "react-redux";
import { HiOutlineBell } from "react-icons/hi";

function Notifications() {
  const token = useSelector((store) => store?.user?.user?.token);
  const user = useSelector((store) => store?.user?.user?.data?.user);

  const { data: notifications, isLoading } = useQuery({
    queryFn: () => getUserNotifications(token),
    queryKey: ["notifications", user],
  });

  if (isLoading)
    return (
      <div className="mt-12 flex h-full items-center justify-center">
        <span className="h loading loading-spinner loading-lg"></span>
      </div>
    );

  if (notifications?.length === 0)
    return (
      <>
        <NotificationsNav notifications={notifications} />
        <div className="mt-24 flex flex-col items-center justify-center">
          <HiOutlineBell size={50} color="#ef4444" />
          <h2 className="text-xl font-bold">You have no notifications</h2>
        </div>
      </>
    );

  return (
    <div className="relative">
      <NotificationsNav notifications={notifications} />

      <ul>
        {notifications?.map((notification) => (
          <Notification key={notification?._id} notification={notification} />
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
