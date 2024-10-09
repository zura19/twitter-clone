export const getPost = async (token, id) => {
  try {
    const res = await fetch(`/api/post/one/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data?.post[0];
  } catch (err) {
    throw err;
  }
};

export const addComment = async (token, id, text) => {
  try {
    const res = await fetch(`/api/post/addComment/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(text),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateComment = async (token, text, postID, commentID) => {
  try {
    const res = await fetch(`/api/post/${postID}/comment/${commentID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(text),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const deleteComment = async (token, postID, commentID) => {
  try {
    const res = await fetch(`/api/post/${postID}/comment/${commentID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    return data;
  } catch (err) {
    throw err;
  }
};
