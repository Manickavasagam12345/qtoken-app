import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useThemeMode } from "../themes/ThemeProvider";
import { useAuth } from "../context/AuthContext";

const Topbar = ({ toggleSidebar }) => {
  const { logout } = useAuth();
  const { toggleMode, mode } = useThemeMode();

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#00796b",
        color: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        minHeight: 50, // reduce AppBar height
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: 50, // compact Toolbar
          py: 0, // remove vertical padding
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={toggleSidebar}
            color="inherit"
            edge="start"
            sx={{ mr: 1 }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
            QToken Admin
          </Typography>
        </Box>
        <Box>
          <Button
            onClick={toggleMode}
            sx={{ color: "#fff", mr: 1, fontWeight: 500, fontSize: "0.875rem" }}
          >
            {mode === "dark" ? "☀️ Light" : "🌙 Dark"}
          </Button>
          <Button color="inherit" onClick={logout} sx={{ fontWeight: 500, fontSize: "0.875rem" }}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
