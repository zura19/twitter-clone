import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AppLayout from "./components/AppLayout";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Following from "./pages/Following";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Bookmarks from "./pages/Bookmarks";
import PostPage from "./pages/PostPage";

function App() {
  const user = useSelector((store) => store.user.user || null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              path="/"
              element={user ? <HomePage /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/notifications"
              element={user ? <Notifications /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/bookmarks"
              element={user ? <Bookmarks /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/profile/:username/posts"
              element={user ? <Profile /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/profile/:username/likes"
              element={user ? <Profile /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/following"
              element={user ? <Following /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/post/:id"
              element={user ? <PostPage /> : <Navigate to={"/login"} />}
            />
          </Route>
          <Route
            path="/login"
            element={user ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to={"/login"} /> : <Signup />}
          />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },

          error: {
            duration: 5000,
          },

          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#111827 ",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

export default App;
