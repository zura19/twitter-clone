export const getAuhtors = async (token, user) => {
  try {
    const res = await fetch(`/api/user/${user}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data?.data?.user;
  } catch (err) {
    throw err;
  }
};

export const addPost = async (token, info) => {
  try {
    const res = await fetch(`/api/post/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(info),
    });
    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const deletePost = async (token, id) => {
  const res = await fetch(`/api/post/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const updatePost = async (token, id, updatedInfo) => {
  const res = await fetch(`/api/post/update/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedInfo),
  });
  const data = await res.json();
  return data;
};

export const likeOrUnlike = async (token, id) => {
  const res = await fetch(`/api/post/like/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const data = await res.json();
  return data;
};

export const bookmarkUnbookmark = async function (token, id) {
  try {
    const res = await fetch(`/api/post/bookmark/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data || "Something went wrong");
    }

    return data;
  } catch (err) {
    throw err;
  }
};
