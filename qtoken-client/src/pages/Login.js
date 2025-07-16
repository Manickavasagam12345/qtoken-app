import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (form) => {
    const success = login(form);
    if (success) navigate("/");
    else alert("Invalid credentials");
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "#f0f2f5" }}>
      <LoginForm onSubmit={handleLogin} />
    </Box>
  );
};

export default Login;
