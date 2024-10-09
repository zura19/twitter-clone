import { HiOutlineUser } from "react-icons/hi";
import EditProfileModal from "../features/profile/EditProfileModal";

function UserProfilePicture({
  children,
  src,
  alt,
  profilePage,
  followingPage,
}) {
  if (src) {
    return (
      <div
        className={`${profilePage ? "absolute mx-6 h-32 w-32 -translate-y-1/2" : followingPage ? "h-16 w-16" : "h-8 w-8"} overflow-hidden rounded-full`}
      >
        {children}
        <img
          src={src}
          alt={alt}
          className="border border-gray-700 bg-gray-800"
        />
        <EditProfileModal />
      </div>
    );
  }

  if (!src) {
    return (
      <div
        className={`flex ${profilePage && !followingPage ? "absolute mx-6 h-32 w-32 -translate-y-1/2" : followingPage ? "h-16 w-16" : "h-8 w-8"} items-center justify-center rounded-full bg-white`}
      >
        {children}
        <HiOutlineUser
          color="black"
          size={profilePage ? 60 : followingPage ? 30 : 15}
        />
      </div>
    );
  }
}

//   return (
//     <div className="h-8 w-8 overflow-hidden rounded-full">
//       {src ? (
//         <img
//           src={src}
//           alt={alt}
//           className="border border-gray-700 bg-secondary"
//         />
//       ) : (
//         <div className="h-8 w-8 bg-white"></div>
//       )}
//     </div>
//   );
// }

export default UserProfilePicture;
