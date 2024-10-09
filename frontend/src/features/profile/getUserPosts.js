export const getUserPosts = async (token, id) => {
  try {
    const res = await fetch(`/api/post/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data?.posts;
  } catch (err) {
    throw err;
  }
};

export const getUserLikedPosts = async (token, id) => {
  try {
    const res = await fetch(`/api/post/likedByUser/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    return data?.likedPosts;
  } catch (err) {
    throw err;
  }
};

// /api/post/likedByUser/
