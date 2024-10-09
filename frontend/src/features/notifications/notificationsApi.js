export const getUserNotifications = async (token) => {
  try {
    const res = await fetch("/api/notifications/userNotifications", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    console.log(data.notifications);
    return data?.notifications;
  } catch (err) {
    throw err;
  }
};

export const deleteNotifications = async (token) => {
  try {
    const res = await fetch("/api/notifications/delete/all", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    console.log(data);

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    // console.log(data.notifications);
    return data;
  } catch (err) {
    throw err;
  }
};
