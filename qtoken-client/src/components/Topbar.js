import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  LocalHospital,
  Logout,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { useThemeMode } from "../themes/ThemeProvider";
import { useAuth } from "../context/AuthContext";

const Topbar = ({ toggleSidebar }) => {
  const { logout } = useAuth();
  const { toggleMode, mode } = useThemeMode();

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1, // Above drawer (1200 + 1 = 1201)
        background:
          mode === "dark"
            ? "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <LocalHospital sx={{ mr: 1.5, fontSize: 28 }} />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          QToken Hospital Management
        </Typography>

        <Chip
          label="Live"
          size="small"
          sx={{
            mr: 2,
            bgcolor: "#4ade80",
            color: "#fff",
            fontWeight: 600,
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%, 100%": { opacity: 1 },
              "50%": { opacity: 0.7 },
            },
          }}
        />

        <Button
          startIcon={mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          onClick={toggleMode}
          sx={{
            color: "#fff",
            textTransform: "none",
            mr: 1,
            borderRadius: 2,
            display: { xs: "none", sm: "flex" },
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.15)",
            },
          }}
        >
          {mode === "dark" ? "Light" : "Dark"}
        </Button>

        <Button
          startIcon={<Logout />}
          onClick={logout}
          variant="outlined"
          sx={{
            color: "#fff",
            borderColor: "rgba(255,255,255,0.3)",
            textTransform: "none",
            borderRadius: 2,
            "&:hover": {
              borderColor: "#fff",
              bgcolor: "rgba(255,255,255,0.15)",
            },
          }}
        >
          Logout
        </Button>
=======
=======
>>>>>>> parent of f7a6c9d (Merge pull request #1 from Manickavasagam12345/manick-local)
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
>>>>>>> parent of f7a6c9d (Merge pull request #1 from Manickavasagam12345/manick-local)
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
