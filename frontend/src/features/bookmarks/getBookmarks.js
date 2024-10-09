export async function getBookmarks(token, id) {
  try {
    const res = await fetch(`/api/post/bookmarks/${id}`, {
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
    return data.bookmarks;
  } catch (err) {
    throw err;
  }
}
