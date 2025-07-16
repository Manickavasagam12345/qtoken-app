import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Tokens from "./Tokens";
import GenerateToken from "./GenerateToken";
import DashboardCards from "../components/DashboardCards";
import ChartPanel from "../components/ChartPanel";
import Doctors from "../pages/Doctors";
import Appointments from "../pages/Appointments";
import DoctorCalendar from "../pages/DoctorCalendar"; 
import DoctorWiseChart from "../components/DoctorWiseChart";
// import MissedTokenAlert from "../components/MissedTokenAlert";
import Reports from "../pages/Reports";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar open={sidebarOpen} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <div style={{ flex: 1, padding: 20, overflowY: "auto" }}>
          <Routes>
            <Route
  path="/"
  element={
    <>
      <DashboardCards />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
        <div style={{ flex: 1, minWidth: "400px" }}>
          <ChartPanel />
        </div>
        <div style={{ flex: 1, minWidth: "400px" }}>
          <DoctorWiseChart />
        </div>
      </div>
    </>
  }
/>
            <Route path="/tokens" element={<Tokens />} />
            <Route path="/generate" element={<GenerateToken />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/doctor-calendar" element={<DoctorCalendar />} />
            <Route path="/reports" element={<Reports />} />
            {/* <Route path="/Missed-TokenAlert" element={<MissedTokenAlert />} /> */}
            
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
