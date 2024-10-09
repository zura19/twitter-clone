import { useQuery } from "@tanstack/react-query";
import SuggestedUser from "./SuggestedUser";
import useSuggestedUsers from "../hooks/useSuggestedUsers";
import { useSelector } from "react-redux";
import SuggestedSkeleton from "./SuggestedSkeleton";

function Suggested() {
  const { suggestedUsers } = useSuggestedUsers();
  const { filteredUsers } = useSelector((store) => store?.user?.suggestedUsers);

  console.log(filteredUsers);

  const { isLoading } = useQuery({
    queryFn: suggestedUsers,
    queryKey: ["suggestedUsers"],
  });

  if (isLoading)
    return (
      <>
        <div className="ml-2 mt-5">
          <div className="rounded-md border border-gray-700 px-3 py-4">
            <h1 className="mb-2 font-bold text-white">Who to follow</h1>
            <SuggestedSkeleton />
            <SuggestedSkeleton />
            <SuggestedSkeleton />
            <SuggestedSkeleton />
          </div>
        </div>
      </>
    );

  if (!isLoading)
    return (
      <div className="ml-2 mt-5">
        <div className="rounded-md border border-gray-700 bg-black px-4 py-4">
          <h1 className="mb-2 font-bold text-white">Who to follow</h1>
          <ul className="flex flex-col gap-1">
            {filteredUsers?.map((user) => (
              <SuggestedUser key={user._id} user={user} isLoading={isLoading} />
            ))}
          </ul>
        </div>
      </div>
    );
}

export default Suggested;
