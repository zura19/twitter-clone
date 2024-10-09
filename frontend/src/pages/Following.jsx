import { useSelector } from "react-redux";
import FollowingUser from "../components/FollowingUser";
import Nav from "../features/home/Nav";

function Following() {
  const followingIds = useSelector(
    (store) => store?.user?.user?.data?.user?.following,
  );

  if (followingIds?.length === 0)
    return (
      <>
        <Nav />
        <div className="flex items-center justify-center">
          <p className="pt-12 text-2xl font-bold">You follow no one</p>
        </div>
      </>
    );
  return (
    <>
      <Nav />
      <div className="px-6 py-5">
        <h1 className="mb-4 text-xl font-bold text-white">People you follow</h1>
        <ul className="flex h-[600px] flex-col gap-2 overflow-scroll rounded-md border border-gray-700 px-4 py-3">
          {followingIds?.map((following) => (
            <FollowingUser key={following} following={following} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default Following;
