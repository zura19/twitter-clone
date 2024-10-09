import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useFollowUnfollow from "../../hooks/useFollowUnfollw";

function FollowUnfollowBtn({
  following,
  activeUserID,
  suggestedUsersBtn,
  followingBtn,
  fBtn,
}) {
  const queryClient = useQueryClient();
  const { followUnfollow } = useFollowUnfollow();

  const { mutate: followOrUnfollow, isLoading } = useMutation({
    mutationFn: () => followUnfollow(activeUserID),
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries();
    },
  });

  if (suggestedUsersBtn) {
    return (
      <>
        {!following?.includes(activeUserID) ? (
          <button
            ref={fBtn}
            onClick={followOrUnfollow}
            className={`ml-auto rounded-full border border-gray-900 bg-white ${isLoading ? "px-7" : ""} px-4 py-[5px] text-sm font-semibold text-gray-900 transition-all duration-300 hover:border-gray-700 hover:bg-secondary hover:text-white`}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xs text-white"></span>
            ) : (
              "Follow"
            )}
          </button>
        ) : (
          <button
            ref={fBtn}
            onClick={followOrUnfollow}
            className={`ml-auto rounded-full border border-gray-500 bg-secondary ${isLoading ? "px-7" : ""} px-4 py-[5px] text-sm font-semibold transition-all duration-300 hover:bg-white hover:text-gray-900`}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xs text-white"></span>
            ) : (
              "UnFollow"
            )}
          </button>
        )}
      </>
    );
  }

  if (followingBtn) {
    return (
      <>
        <button
          ref={fBtn}
          onClick={followOrUnfollow}
          className={`ml-auto rounded-full border border-gray-500 bg-secondary ${isLoading && "px-7"} px-4 py-[5px] text-sm font-semibold transition-all duration-300 hover:bg-white hover:text-gray-900`}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xs text-gray-950"></span>
          ) : (
            "Unfollow"
          )}
        </button>
      </>
    );
  }

  return (
    <>
      {!following?.includes(activeUserID) ? (
        <button
          onClick={followOrUnfollow}
          className={`btn btn-sm ml-auto mr-6 mt-4 rounded-full border bg-white ${isLoading && "px-7"} px-4 capitalize text-gray-900 transition-all duration-300 hover:border-white hover:bg-secondary hover:text-white`}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xs text-white"></span>
          ) : (
            "Follow"
          )}
        </button>
      ) : (
        <button
          onClick={followOrUnfollow}
          className={`btn btn-sm ml-auto mr-6 mt-4 rounded-full border border-gray-500 ${isLoading && "px-7"} bg-secondary px-4 capitalize transition-all duration-300 hover:bg-white hover:text-gray-900`}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xs text-gray-950"></span>
          ) : (
            "Unfollow"
          )}
        </button>
      )}
    </>
  );
}

export default FollowUnfollowBtn;
