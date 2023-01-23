import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import HandleUsers from "../components/AdminPanelTabs/HandleUsers";

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("users");
  const tabs = ["users", "decisions", "statistics"];
  return (
    <main className="flex h-screen bg-gray-200 relative">
      <aside className="w-64 h-full bg-blue-dianne shadow-2xl static">
        <h1 className="px-4 py-4 bg-blue-dianne font-bold text-2xl tracking-widest uppercase text-white border-b-2 border-gray-300">
          Admin Panel
        </h1>
        {tabs.map((tab) => (
          <button
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`block text-left w-full capitalize px-4 py-3 text-base font-semibold text-white hover:bg-cerise-dark focus:outline-none  ${
              activeTab === tab ? "bg-cerise-dark" : ""
            }`}
          >
            {tab}
          </button>
        ))}
        <NavLink
          to="/"
          className="block py-3 px-4 text-base font-semibold text-indigo-800 hover:bg-indigo-100 focus:outline-none focus:bg-indigo-100"
        >
          Dashboard
        </NavLink>
      </aside>
      <section className="flex-1 h-full p-4">
        {activeTab === "users" && <HandleUsers />}
      </section>
    </main>
  );
}

export default AdminPanel;
