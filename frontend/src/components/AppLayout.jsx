import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Suggested from "./Suggested";

function AppLayout() {
  return (
    <div className="mx-auto grid h-dvh w-[1200px] grid-cols-[auto_1fr]">
      <Sidebar />
      <main className="grid h-dvh grid-cols-[2.3fr_1fr]">
        <div className="h col-[1/2] overflow-scroll border-r border-gray-700">
          <Outlet />
        </div>
        <Suggested />
      </main>
    </div>
  );
}

export default AppLayout;
