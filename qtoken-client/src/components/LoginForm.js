import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import qtlogo from "../images/qtlogo.jpg";

const Login = ({ onSubmit }) => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0f7fa", // light hospital-blue theme
        position: "relative",
        px: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          position: "relative",
          p: 6,
          borderRadius: 3,
          width: { xs: "100%", sm: 400, md: 450 },
          textAlign: "center",
          maxWidth: "100%",
          backgroundColor: "#ffffffcc", // semi-transparent white
        }}
      >
        <Box sx={{ mb: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src={qtlogo}
            alt="QToken Logo"
            style={{ width: 60, marginBottom: 12 }}
          />
          <Typography variant="h5" fontWeight={600} color="#00796b">
            QToken Admin Login
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              bgcolor: "#00796b", // hospital green-blue
              "&:hover": { bgcolor: "#004d40" },
              py: 1.5,
              fontWeight: 600,
            }}
          >
            Login
          </Button>
        </form>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 3 }}
        >
          &copy; 2025 QToken. All rights reserved.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
