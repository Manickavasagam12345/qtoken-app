import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
  Box,
} from "@mui/material";
import {
  Dashboard,
  ListAlt,
  AddBox,
  Person,
  MedicalInformation,
  CalendarMonth,
  Assessment,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import qtlogo from "../images/qtlogo.jpg";

const drawerWidth = 220;

const Sidebar = ({ open }) => {
  const location = useLocation();

  const items = [
    { text: "Dashboard", icon: <Dashboard sx={{ color: "#fff" }} />, to: "/" },
    { text: "Token List", icon: <ListAlt sx={{ color: "#fff" }} />, to: "/tokens" },
    { text: "Generate Token", icon: <AddBox sx={{ color: "#fff" }} />, to: "/generate" },
    { text: "Doctors", icon: <Person sx={{ color: "#fff" }} />, to: "/doctors" },
    { text: "Appointments", icon: <MedicalInformation sx={{ color: "#fff" }} />, to: "/appointments" },
    { text: "Doctor Calendar", icon: <CalendarMonth sx={{ color: "#fff" }} />, to: "/doctor-calendar" },
    { text: "Reports", icon: <Assessment sx={{ color: "#fff" }} />, to: "/reports" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 64,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 64,
          transition: "width 0.3s ease",
          boxSizing: "border-box",
          backgroundColor: "#00796b", // light green background
          color: "#fff",
          borderRight: "none",
          boxShadow: "2px 0 12px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Top Logo */}
        <Box sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 1,
          backgroundColor: "#00796b", // same theme as Topbar
        }}>
          <img
            src={qtlogo}
            alt="QToken Logo"
            style={{
              height: 32,
              width: open ? 32 : 30,
              marginRight: open ? 10 : 0,
              transition: "0.3s ease"
            }}
          />
        </Box>

        <List>
          {items.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Tooltip title={!open ? item.text : ""} placement="right" key={item.text}>
                <ListItem
                  button
                  component={Link}
                  to={item.to}
                  selected={isActive}
                  sx={{
                    borderRadius: "8px",
                    mx: open ? 1 : 0.5,
                    my: 0.5,
                    px: open ? 2 : 1,
                    "&.Mui-selected": { backgroundColor: "#004d40" }, // dark highlight
                    "&:hover": { backgroundColor: "#66bb6a" },       // hover lighter
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "#fff" }}>{item.icon}</ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 500, color: "#fff" }}
                    />
                  )}
                </ListItem>
              </Tooltip>
            );
          })}
        </List>
        <Divider sx={{ backgroundColor: "#004d40", mt: "auto" }} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
