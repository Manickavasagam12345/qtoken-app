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
import {
  Dashboard,
  ListAlt,
  AddBox,
  Person,
  MedicalInformation,
  CalendarMonth,
  Assessment,
  People,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 220;

const Sidebar = ({ open }) => {
  const location = useLocation();
  const currentDrawerWidth = open ? drawerWidth : 70;

  const items = [
    {
      text: "Dashboard",
      icon: <Dashboard sx={{ color: "#64b5f6" }} />,
      to: "/",
    },
    {
      text: "Token List",
      icon: <ListAlt sx={{ color: "#81c784" }} />,
      to: "/tokens",
    },
    {
      text: "Generate Token",
      icon: <AddBox sx={{ color: "#ba68c8" }} />,
      to: "/generate",
    },
    {
      text: "Patients",
      icon: <People sx={{ color: "#ffb74d" }} />,
      to: "/patients",
    },
    {
      text: "Doctors",
      icon: <Person sx={{ color: "white" }} />,
      to: "/doctors",
    },
    // {
    //   text: "Appointments",
    //   icon: <MedicalInformation sx={{ color: "orange" }} />,
    //   to: "/appointments",
    // },
    // {
    //   text: "Doctor Calendar",
    //   icon: <CalendarMonth sx={{ color: "blue" }} />,
    //   to: "/doctor-calendar",
    // },
    {
      text: "Reports",
      icon: <Assessment sx={{ color: "teal" }} />,
      to: "/reports",
    },
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
    </Drawer>
  );
};

export default Sidebar;
