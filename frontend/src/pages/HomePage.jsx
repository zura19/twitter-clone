import { useQuery } from "@tanstack/react-query";
import AddPost from "../features/home/AddPost";
import Nav from "../features/home/Nav";
import Post from "../features/home/Post";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

function HomePage() {
  const token = useSelector((store) => store?.user?.user?.token);
  const { _id } = useSelector((store) => store?.user?.user?.data?.user);

  const { data: posts, isLoading } = useQuery({
    queryFn: async () => {
      const res = await fetch(`/api/post/all`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      return data?.post;
    },
    queryKey: ["post", _id],
  });

  return (
    <>
      <Nav />
      <AddPost />
      <div className="relative">
        {isLoading && <Loader />}
        {posts?.map((post) => (
          <Post
            key={post._id}
            premisionToDelete={post.user === _id ? true : false}
            post={post}
          />
        ))}
      </div>
    </>
  );
}

export default HomePage;
