import { useRef, useState } from "react";
import UserProfilePicture from "../components/UserProfilePicture";
import ProfileNav from "../features/profile/profileNav";
import UserCoverPicture from "../features/profile/UserCoverPicture";
import EditProfileModal from "../features/profile/EditProfileModal";
import UserInfo from "../features/profile/UserInfo";
import { useSelector } from "react-redux";
import PostsAndLikes from "../features/profile/PostsAndLikes";
import Post from "../features/home/Post";
import { HiOutlinePencil } from "react-icons/hi";
import PictureButton from "../features/profile/PictureButton";
import { useLocation, useParams } from "react-router-dom";
import UserLikes from "../features/profile/UserLikes";
import ProfileSkeleton from "../features/profile/ProfileSkeleton";
import { useQuery } from "@tanstack/react-query";
import useGetProfile from "../hooks/useGetProfile";
import { getUserPosts } from "../features/profile/getUserPosts";
import ProfileError from "../features/profile/ProfileError";
import FollowUnfollowBtn from "../features/profile/FollowUnfollowBtn";

function Profile() {
  const modal = useRef(null);
  const user = useSelector((store) => store?.user?.user?.data?.user);
  const token = useSelector((store) => store?.user?.user?.token);
  const activeUser = useSelector((store) => store?.user?.activeUser || null);
  const [editUser, setEditUser] = useState(false);
  const [editProfilePic, setEditProfilePic] = useState(false);
  const [editCoverPic, setEditCoverPic] = useState(false);
  const { username } = useParams();
  const location = useLocation();
  const { getUser } = useGetProfile();

  const { isLoading, error } = useQuery({
    queryFn: () => getUser(username),
    queryKey: ["getProfile", user, location, username, activeUser],
  });

  const { data: activeUserPosts, isLoading: isLoadingPosts } = useQuery({
    queryFn: () => getUserPosts(token, activeUser?._id),
    queryKey: ["userPosts", activeUser],
    enabled: Boolean(activeUser?._id) === true,
  });

  const reset = function () {
    setEditUser(false);
    setEditProfilePic(false);
    setEditCoverPic(false);
  };

  if (isLoading) return <ProfileSkeleton />;
  if (error) return <ProfileError>{error.message}</ProfileError>;

  return (
    <div className="relative">
      <ProfileNav
        postsLength={activeUserPosts?.length}
        userName={activeUser?.userName}
      />
      <UserCoverPicture src={activeUser?.coverImg || ""}>
        {user?.userName === username ? (
          <PictureButton
            onClick={() => {
              setEditCoverPic((user) => !user);
              modal.current.showModal();
            }}
          >
            <HiOutlinePencil size={17} color="white" />
          </PictureButton>
        ) : null}
      </UserCoverPicture>
      <div className="flex">
        <UserProfilePicture src={activeUser?.profileImg} profilePage={true}>
          {user?.userName === username ? (
            <PictureButton
              onClick={() => {
                setEditProfilePic((user) => !user);
                modal.current.showModal();
              }}
              profilePic={true}
            >
              <HiOutlinePencil size={14} color="white" />
            </PictureButton>
          ) : null}
        </UserProfilePicture>
        {user?.userName === username ? (
          <button
            onClick={() => {
              setEditUser((user) => !user);
              modal.current.showModal();
            }}
            className="btn btn-sm ml-auto mr-6 mt-4 rounded-full border bg-white px-3 capitalize text-gray-900 hover:border-white hover:bg-secondary hover:text-white"
          >
            edit profile
          </button>
        ) : (
          <FollowUnfollowBtn
            following={user?.following}
            activeUserID={activeUser?._id}
          />
        )}

        <EditProfileModal
          reset={reset}
          editUser={editUser}
          editProfilePic={editProfilePic}
          editCoverPic={editCoverPic}
          modal={modal}
        />
      </div>
      <UserInfo activeUser={activeUser} />
      <PostsAndLikes user={user} username={username} activeUser={activeUser} />
      {isLoadingPosts && (
        <div className="mt-10 flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {location.pathname.endsWith("posts") ? (
        <>
          {activeUserPosts?.map((actPost) => (
            <Post
              key={actPost._id}
              post={actPost}
              premisionToDelete={user?.userName === username ? true : false}
            />
          ))}
        </>
      ) : (
        <UserLikes user={user} username={username} activeUser={activeUser} />
      )}
    </div>
  );
}

export default Profile;
