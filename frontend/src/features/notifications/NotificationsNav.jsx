import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import NotoficationDropDown from "./NotoficationDropDown";

function NotificationsNav({ notifications }) {
  return (
    <div className="sticky top-0 flex h-[60px] items-center gap-8 border-b border-gray-700 bg-black px-6">
      <Link
        to={-1}
        className="rounded-full p-2 transition-all duration-300 hover:bg-gray-900"
      >
        <HiOutlineArrowLeft size={20} />
      </Link>
      <div>
        <h2 className="text-base font-bold">Notifications</h2>
      </div>
      <NotoficationDropDown notifications={notifications} />
    </div>
  );
}

export default NotificationsNav;
