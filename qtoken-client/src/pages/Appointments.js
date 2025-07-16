import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  IconButton,
  Stack,
} from "@mui/material";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';

import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });
  const [loadingUpdateId, setLoadingUpdateId] = useState(null);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments/list");
      setAppointments(res.data.data || []);
    } catch (err) {
      console.error("Error loading appointments:", err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors/list");
      setDoctors(res.data.data || []);
    } catch (err) {
      console.error("Error loading doctors:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/appointments/create", form);
      fetchAppointments();
      setForm({
        patient: "",
        doctor: "",
        date: "",
        time: "",
        reason: "",
      });
    } catch (err) {
      alert("Error saving appointment");
    }
  };

  // Update status handler
  const handleStatusUpdate = async (id, status) => {
    try {
      setLoadingUpdateId(id);
      await axios.patch(`http://localhost:5000/api/appointments/${id}/status`, { status });
      fetchAppointments();
    } catch (err) {
      alert("Error updating status");
    } finally {
      setLoadingUpdateId(null);
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "pending":
        return (
          <Chip
            label="Pending"
            color="warning"
            icon={<AccessTimeIcon />}
            variant="outlined"
          />
        );
      case "completed":
        return (
          <Chip
            label="Completed"
            color="success"
            icon={<DoneIcon />}
            variant="outlined"
          />
        );
      case "missed":
        return (
          <Chip
            label="Missed"
            color="error"
            icon={<CancelIcon />}
            variant="outlined"
          />
        );
      default:
        return <Chip label="Unknown" variant="outlined" />;
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Doctor Appointments
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}
      >
        <TextField
          label="Patient Name"
          name="patient"
          value={form.patient}
          onChange={handleChange}
          required
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Doctor</InputLabel>
          <Select
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            required
            label="Doctor"
          >
            {doctors.map((doc) => (
              <MenuItem key={doc._id} value={doc._id}>
                {doc.name} ({doc.specialization})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <TextField
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />
        <TextField
          label="Reason"
          name="reason"
          value={form.reason}
          onChange={handleChange}
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary">
          Book
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt._id}>
                <TableCell>{appt.patient}</TableCell>
                <TableCell>{appt.doctor?.name || "-"}</TableCell>
                <TableCell>{appt.date}</TableCell>
                <TableCell>{appt.time}</TableCell>
                <TableCell>{appt.reason}</TableCell>
                <TableCell>{getStatusChip(appt.status)}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {appt.status !== "completed" && (
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        disabled={loadingUpdateId === appt._id}
                        onClick={() => handleStatusUpdate(appt._id, "completed")}
                      >
                        Complete
                      </Button>
                    )}
                    {appt.status !== "missed" && (
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        disabled={loadingUpdateId === appt._id}
                        onClick={() => handleStatusUpdate(appt._id, "missed")}
                      >
                        Missed
                      </Button>
                    )}
                    {appt.status !== "pending" && (
                      <Button
                        variant="outlined"
                        size="small"
                        color="warning"
                        disabled={loadingUpdateId === appt._id}
                        onClick={() => handleStatusUpdate(appt._id, "pending")}
                      >
                        Pending
                      </Button>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Appointments;
