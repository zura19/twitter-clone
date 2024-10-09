import { useQuery } from "@tanstack/react-query";
import BookmarksNav from "../features/bookmarks/BookmarksNav";
import { getBookmarks } from "../features/bookmarks/getBookmarks";
import { useSelector } from "react-redux";
import Post from "../features/home/Post";

import { HiOutlineBookmark } from "react-icons/hi2";

function Bookmarks() {
  const token = useSelector((store) => store?.user?.user?.token);
  const user = useSelector((store) => store?.user?.user?.data?.user);

  const { data: bookmarks, isLoading } = useQuery({
    queryFn: () => getBookmarks(token, user._id),
    queryKey: ["bookmarks", user],
  });

  return (
    <div>
      <BookmarksNav />
      {isLoading && (
        // <div className="">
        <span className="loading loading-spinner loading-lg absolute left-1/2 top-1/2 -translate-x-full translate-y-1/2"></span>
        // </div>
      )}
      {bookmarks?.length === 0 && (
        <div className="mt-24 flex flex-col items-center justify-center">
          <HiOutlineBookmark size={50} color="#ef4444" />
          <h1 className="text-xl font-bold">No bookmarks yet</h1>
        </div>
      )}
      <ul>
        {bookmarks?.map((bookmark) => (
          <Post
            premisionToDelete={bookmark.user === user._id}
            post={bookmark}
          />
        ))}
      </ul>
    </div>
  );
}

export default Bookmarks;
