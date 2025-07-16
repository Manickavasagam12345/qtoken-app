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
} from "@mui/material";

const Doctors = () => {
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

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Doctor Registration
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {["name", "department", "phone", "email", "specialization"].map((field) => (
              <Grid item xs={12} sm={6} md={4} key={field}>
                <TextField
                  label={field[0].toUpperCase() + field.slice(1)}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  fullWidth
                  required={field !== "specialization" ? true : false}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Doctor
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Doctors List
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Specialization</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors.map((doc) => (
            <TableRow key={doc._id}>
              <TableCell>{doc.name}</TableCell>
              <TableCell>{doc.department}</TableCell>
              <TableCell>{doc.phone}</TableCell>
              <TableCell>{doc.email}</TableCell>
              <TableCell>{doc.specialization}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Doctors;
