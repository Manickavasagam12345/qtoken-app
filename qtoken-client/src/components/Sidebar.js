import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  Typography,
  Toolbar,
} from "@mui/material";
<<<<<<< HEAD
<<<<<<< HEAD
import {
  Dashboard,
  ListAlt,
  AddBox,
  Person,
  MedicalInformation,
  CalendarMonth,
  Assessment,
  LocalHospital,
} from "@mui/icons-material";
=======
import { Dashboard, ListAlt, AddBox,Person ,MedicalInformation,CalendarMonth ,Assessment} from "@mui/icons-material";
>>>>>>> parent of f7a6c9d (Merge pull request #1 from Manickavasagam12345/manick-local)
=======
import { Dashboard, ListAlt, AddBox,Person ,MedicalInformation,CalendarMonth ,Assessment} from "@mui/icons-material";
>>>>>>> parent of f7a6c9d (Merge pull request #1 from Manickavasagam12345/manick-local)
import { Link, useLocation } from "react-router-dom";

<<<<<<< HEAD
const Sidebar = ({ open, drawerWidth = 260 }) => {
=======


const drawerWidth = 220;

const Sidebar = ({ open }) => {
>>>>>>> parent of f7a6c9d (Merge pull request #1 from Manickavasagam12345/manick-local)
  const location = useLocation();
  const currentDrawerWidth = open ? drawerWidth : 70;

  const items = [
<<<<<<< HEAD
<<<<<<< HEAD
    { text: "Dashboard", icon: <Dashboard />, to: "/" },
    { text: "Token List", icon: <ListAlt />, to: "/tokens" },
    { text: "Generate Token", icon: <AddBox />, to: "/generate" },
    { text: "Doctors", icon: <Person />, to: "/doctors" },
    { text: "Appointments", icon: <MedicalInformation />, to: "/appointments" },
    { text: "Doctor Calendar", icon: <CalendarMonth />, to: "/doctor-calendar" },
    { text: "Reports", icon: <Assessment />, to: "/reports" },
=======
=======
>>>>>>> parent of f7a6c9d (Merge pull request #1 from Manickavasagam12345/manick-local)
    {
      text: "Dashboard",
      icon: <Dashboard sx={{ color: "#64b5f6" }} />, // light blue
      to: "/",
    },
    {
      text: "Token List",
      icon: <ListAlt sx={{ color: "#81c784" }} />, // green
      to: "/tokens",
    },
    {
      text: "Generate Token",
      icon: <AddBox sx={{ color: "#ba68c8" }} />, // purple
      to: "/generate",
    },
    { text: "Doctors", icon: <Person sx={{ color: "white" }}/>, to: "/doctors" },
    { text: "Appointments", icon: <MedicalInformation sx={{ color: "orange" }} />, to: "/appointments" },
  { text: "Doctor Calendar", icon: <CalendarMonth sx={{ color: "blue" }} />, to: "/doctor-calendar" },
  { text: "Reports", icon: <Assessment sx={{ color: "teal" }} />, to: "/reports" }


<<<<<<< HEAD
>>>>>>> parent of f7a6c9d (Merge pull request #1 from Manickavasagam12345/manick-local)
=======
>>>>>>> parent of f7a6c9d (Merge pull request #1 from Manickavasagam12345/manick-local)
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: currentDrawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: currentDrawerWidth,
          boxSizing: "border-box",
<<<<<<< HEAD
<<<<<<< HEAD
          transition: "width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
          overflowX: "hidden",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)"
              : "#ffffff",
          borderRight: (theme) =>
            `1px solid ${
              theme.palette.mode === "dark" ? "#2a2a3e" : "#e0e0e0"
            }`,
          boxShadow: "4px 0 20px rgba(0,0,0,0.05)",
        },
      }}
    >
      {/* Toolbar Spacer - This pushes content below the AppBar */}
      <Toolbar />

      {/* Sidebar Header */}
      <Box
        sx={{
          p: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "flex-start" : "center",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          mb: 2,
        }}
      >
        <LocalHospital sx={{ color: "#fff", fontSize: 32 }} />
        {open && (
          <Typography
            variant="h6"
            sx={{
              ml: 1.5,
              color: "#fff",
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            QToken
          </Typography>
        )}
      </Box>

      {/* Navigation Items */}
      <List sx={{ px: 1 }}>
        {items.map((item, index) => {
          const isActive = location.pathname === item.to;
          return (
            <Tooltip key={index} title={!open ? item.text : ""} placement="right">
              <ListItem
                button
                component={Link}
                to={item.to}
                sx={{
                  mb: 0.5,
                  borderRadius: 2,
                  transition: "all 0.3s",
                  background: isActive
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "transparent",
                  color: (theme) =>
                    isActive
                      ? "#fff"
                      : theme.palette.mode === "dark"
                      ? "#a0a0a0"
                      : "#666",
                  "&:hover": {
                    background: isActive
                      ? "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)"
                      : (theme) =>
                          theme.palette.mode === "dark"
                            ? "rgba(102, 126, 234, 0.1)"
                            : "rgba(102, 126, 234, 0.08)",
                    transform: "translateX(4px)",
                  },
                  justifyContent: open ? "flex-start" : "center",
                  px: open ? 2 : 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: open ? 40 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 500,
                      fontSize: 14,
                    }}
                  />
                )}
              </ListItem>
            </Tooltip>
          );
        })}
      </List>
=======
=======
>>>>>>> parent of f7a6c9d (Merge pull request #1 from Manickavasagam12345/manick-local)
          backgroundColor: "#343456", // dark violet
          color: "#fff",
          borderRight: "none",
          boxShadow: "2px 0 6px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Top Logo */}
        <Box
          sx={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: open ? "center" : "center",
            px: 2,
            py: 1,
            backgroundColor: "#2e2e50",
          }}
        >
          <img
            src={qtlogo}
            alt="QToken Logo"
            style={{
              height: 32,
              width: open ? 32 : 30,
              marginRight: open ? 10 : 0,
              transition: "0.3s ease",
            }}
          />
         
        </Box>

        <List>
          {items.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Tooltip
                title={!open ? item.text : ""}
                placement="right"
                key={item.text}
              >
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
                    "&.Mui-selected": {
                      backgroundColor: "#505079",
                    },
                    "&:hover": {
                      backgroundColor: "#41416b",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#fff",
                      }}
                    />
                  )}
                </ListItem>
              </Tooltip>
            );
          })}
        </List>

        <Divider sx={{ backgroundColor: "#555", mt: "auto" }} />
      </Box>
>>>>>>> parent of f7a6c9d (Merge pull request #1 from Manickavasagam12345/manick-local)
    </Drawer>
  );
};

export default Sidebar;
