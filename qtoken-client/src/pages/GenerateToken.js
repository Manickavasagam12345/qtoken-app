import React, { useState } from "react";
import { createToken } from "../services/api";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  useTheme,
  InputAdornment,
  Card,
  Divider,
} from "@mui/material";
import {
  ConfirmationNumber,
  Person,
  Description,
  CheckCircle,
} from "@mui/icons-material";

const GenerateToken = () => {
  const theme = useTheme();
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
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <ConfirmationNumber sx={{ color: "#fff", fontSize: 28 }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            Generate Token
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, ml: 8 }}>
          Create a new token for patient queue management
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 600, mx: "auto" }}>
        {/* Form Card */}
        <Card
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            background:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "#fff",
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "#e5e7eb"
            }`,
            mb: 3,
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Patient Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: "#667eea",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: "#667eea" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Reason for Visit"
              name="reason"
              value={form.reason}
              onChange={handleChange}
              required
              multiline
              rows={3}
              sx={{
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: "#667eea",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Description sx={{ color: "#667eea" }} />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              startIcon={<ConfirmationNumber />}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontSize: 16,
                fontWeight: 600,
                textTransform: "none",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
                "&:hover": {
                  background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                  boxShadow: "0 6px 28px rgba(102, 126, 234, 0.5)",
                },
              }}
            >
              Generate Token
            </Button>
          </form>
        </Card>

        {/* Token Display */}
        {token && (
          <Card
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              border: "none",
              textAlign: "center",
              animation: "slideIn 0.5s ease-out",
              "@keyframes slideIn": {
                from: {
                  opacity: 0,
                  transform: "translateY(-20px)",
                },
                to: {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            <CheckCircle sx={{ fontSize: 60, color: "#fff", mb: 2 }} />
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                fontWeight: 600,
                mb: 2,
                opacity: 0.9,
              }}
            >
              Token Generated Successfully!
            </Typography>
            <Divider sx={{ bgcolor: "rgba(255,255,255,0.3)", mb: 2 }} />
            <Typography
              variant="body2"
              sx={{
                color: "#fff",
                mb: 1,
                opacity: 0.9,
              }}
            >
              Your Token Number
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: "#fff",
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              #{token}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#fff",
                mt: 2,
                opacity: 0.8,
              }}
            >
              Please wait for your token to be called
            </Typography>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default GenerateToken;
