import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  useTheme,
  Card,
  InputAdornment,
  TableContainer,
  Chip,
} from "@mui/material";
import {
  MedicalServices,
  Person,
  Business,
  Phone,
  Email,
  LocalHospital,
} from "@mui/icons-material";

const Doctors = () => {
  const theme = useTheme();
  const [form, setForm] = useState({
    name: "",
    department: "",
    phone: "",
    email: "",
    specialization: "",
  });
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors/list");
      setDoctors(res.data.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/doctors/create", form);
      setForm({
        name: "",
        department: "",
        phone: "",
        email: "",
        specialization: "",
      });
      fetchDoctors();
    } catch (err) {
      console.error("Error creating doctor:", err);
    }
  };

  const fieldConfig = [
    { name: "name", label: "Doctor Name", icon: <Person /> },
    { name: "department", label: "Department", icon: <Business /> },
    { name: "phone", label: "Phone Number", icon: <Phone /> },
    { name: "email", label: "Email Address", icon: <Email />, type: "email" },
    { name: "specialization", label: "Specialization", icon: <MedicalServices /> },
  ];

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
            <LocalHospital sx={{ color: "#fff", fontSize: 28 }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            Doctor Management
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, ml: 8 }}>
          Register and manage hospital doctors
        </Typography>
      </Box>

      {/* Registration Form */}
      <Card
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
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
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
          }}
        >
          <MedicalServices sx={{ mr: 1, color: "#667eea" }} />
          Register New Doctor
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {fieldConfig.map((field) => (
              <Grid item xs={12} md={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  type={field.type || "text"}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {React.cloneElement(field.icon, { sx: { color: "#667eea" } })}
                      </InputAdornment>
                    ),
                  }}
                  sx={{
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
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  boxShadow: "0 4px 14px rgba(102, 126, 234, 0.4)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.5)",
                  },
                }}
              >
                Add Doctor
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>

      {/* Doctors List */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
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
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background:
                  theme.palette.mode === "dark"
                    ? "rgba(102, 126, 234, 0.1)"
                    : "rgba(102, 126, 234, 0.05)",
              }}
            >
              <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Department</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Specialization</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Typography color="textSecondary">No doctors registered</Typography>
                </TableCell>
              </TableRow>
            ) : (
              doctors.map((doc) => (
                <TableRow
                  key={doc._id}
                  sx={{
                    "&:hover": {
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.02)"
                          : "rgba(102, 126, 234, 0.02)",
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 600 }}>Dr. {doc.name}</TableCell>
                  <TableCell>{doc.department}</TableCell>
                  <TableCell>{doc.phone}</TableCell>
                  <TableCell>{doc.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={doc.specialization}
                      size="small"
                      sx={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Doctors;
