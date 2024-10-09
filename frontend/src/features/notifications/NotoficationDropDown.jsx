import { HiOutlineCog8Tooth } from "react-icons/hi2";

function NotoficationDropDown() {
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
        <li>
          <button className="rounded-md bg-red-600 hover:bg-red-500 active:bg-red-500">
            Delete all notifications
          </button>
        </li>
        <li>
          <button className="rounded-md bg-red-600 hover:bg-red-500 active:bg-red-500">
            Delete all notifications
          </button>
        </li>
        <li>
          <button className="rounded-md bg-red-600 hover:bg-red-500 active:bg-red-500">
            Delete all notifications
          </button>
        </li>
        <li>
          <button className="rounded-md bg-red-600 hover:bg-red-500 active:bg-red-500">
            Delete all notifications
          </button>
        </li>
      </ul>
    </div>
  );
}

export default NotoficationDropDown;
