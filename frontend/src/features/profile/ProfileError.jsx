import { HiOutlineFaceFrown } from "react-icons/hi2";

function ProfileError({ children }) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <HiOutlineFaceFrown color="#ef4444" size={50} />
      <h1 className="text-2xl font-bold capitalize">{children}</h1>
    </div>
  );
}

export default ProfileError;
