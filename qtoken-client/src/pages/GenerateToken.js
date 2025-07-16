import React, { useState } from "react";
import { createToken } from "../services/api";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";

const GenerateToken = () => {
  const [form, setForm] = useState({ name: "", reason: "" });
  const [token, setToken] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createToken(form);
      setToken(res.data.data.token_number);
      setForm({ name: "", reason: "" });
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 450,
        margin: "80px auto",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", color: "#343456" }}
        >
          🎫 Generate Your Token
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Reason (optional)"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              backgroundColor: "#343456",
              "&:hover": {
                backgroundColor: "#2c2c4a",
              },
              paddingY: 1,
              fontWeight: "bold",
            }}
          >
            Submit
          </Button>
        </form>

        {token && (
          <Alert severity="success" sx={{ mt: 3 }}>
            Your Token Number: <strong>{token}</strong>
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default GenerateToken;
