import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useThemeMode } from "../themes/ThemeProvider";
import { useAuth } from "../context/AuthContext";

const Topbar = ({ toggleSidebar }) => {
  const { logout } = useAuth();
  const { toggleMode, mode } = useThemeMode();

  return (
    <AppBar position="static" sx={{ bgcolor: "#343456" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={toggleSidebar} color="inherit" edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">QToken Admin</Typography>
        </Box>
        <Box>
          <Button onClick={toggleMode} sx={{ color: "#fff", mr: 2 }}>
            {mode === "dark" ? "☀️ Light" : "🌙 Dark"}
          </Button>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
