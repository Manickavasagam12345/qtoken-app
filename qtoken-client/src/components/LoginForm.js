import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const LoginForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Box sx={{ width: 350, p: 4, bgcolor: "#fff", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" mb={2} textAlign="center">
        QToken Admin Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="username" label="Username" fullWidth margin="normal" value={form.username} onChange={handleChange} required />
        <TextField name="password" label="Password" type="password" fullWidth margin="normal" value={form.password} onChange={handleChange} required />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
