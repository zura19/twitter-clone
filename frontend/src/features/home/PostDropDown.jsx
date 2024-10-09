import { HiOutlineTrash } from "react-icons/hi";
import {
  HiOutlineEllipsisVertical,
  HiOutlinePencilSquare,
} from "react-icons/hi2";

function PostDropDown({ showDeleteModal, showUpdateModal }) {
  return (
    <div className="dropdown ml-auto">
      <div
        tabIndex={0}
        role="button"
        className="rounded-full border border-gray-900 p-1 transition-all duration-300 hover:bg-gray-900"
      >
        <HiOutlineEllipsisVertical color="#fff" size={24} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu-xs z-[1] divide-y divide-gray-700 rounded-md bg-gray-800 shadow"
      >
        <li
          onClick={showUpdateModal}
          className="flex items-center justify-center rounded-md p-1 transition-all duration-300 hover:bg-gray-600"
        >
          <button>
            <HiOutlinePencilSquare size={20} />
          </button>
        </li>
        <li
          onClick={showDeleteModal}
          className="flex items-center rounded-md p-1 transition-all duration-300 hover:bg-gray-600"
        >
          <button>
            <HiOutlineTrash size={20} />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default PostDropDown;
