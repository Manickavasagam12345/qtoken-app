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
<<<<<<< HEAD
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  useTheme,
  Divider,
  InputAdornment,
} from "@mui/material";
import {
  AccessTime,
  Done,
  Cancel,
  CalendarToday,
  Person,
  MedicalInformation,
  Schedule,
  EventNote,
  Search,
} from "@mui/icons-material";
=======
} from "@mui/material";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';

>>>>>>> parent of f7a6c9d (Merge pull request #1 from Manickavasagam12345/manick-local)
import axios from "axios";

const Appointments = () => {
  const theme = useTheme();
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
  const [searchTerm, setSearchTerm] = useState("");

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
    const statusConfig = {
      pending: {
        color: "#f59e0b",
        bgColor: "rgba(245, 158, 11, 0.1)",
        icon: <AccessTime sx={{ fontSize: 16 }} />,
        label: "Pending",
      },
      completed: {
        color: "#22c55e",
        bgColor: "rgba(34, 197, 94, 0.1)",
        icon: <Done sx={{ fontSize: 16 }} />,
        label: "Completed",
      },
      missed: {
        color: "#ef4444",
        bgColor: "rgba(239, 68, 68, 0.1)",
        icon: <Cancel sx={{ fontSize: 16 }} />,
        label: "Missed",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <Chip
        icon={config.icon}
        label={config.label}
        size="small"
        sx={{
          color: config.color,
          bgcolor: config.bgColor,
          fontWeight: 600,
          border: `1px solid ${config.color}30`,
        }}
      />
    );
  };

  // Filter appointments
  const filteredAppointments = appointments.filter(
    (appt) =>
      appt.patient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.reason?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
<<<<<<< HEAD
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
=======
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
>>>>>>> parent of f7a6c9d (Merge pull request #1 from Manickavasagam12345/manick-local)
          >
            <EventNote sx={{ color: "#fff", fontSize: 28 }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            Doctor Appointments
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, ml: 8 }}>
          Manage patient appointments and schedules
        </Typography>
      </Box>

      {/* Appointment Booking Form */}
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
          <CalendarToday sx={{ mr: 1, color: "#667eea" }} />
          Book New Appointment
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Patient Name"
                name="patient"
                value={form.patient}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: "#667eea" }} />
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

            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
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
              >
                <InputLabel>Doctor</InputLabel>
                <Select
                  name="doctor"
                  value={form.doctor}
                  onChange={handleChange}
                  label="Doctor"
                  required
                  startAdornment={
                    <InputAdornment position="start">
                      <MedicalInformation sx={{ color: "#667eea" }} />
                    </InputAdornment>
                  }
                >
                  {doctors.map((doc) => (
                    <MenuItem key={doc._id} value={doc._id}>
                      Dr. {doc.name} - {doc.specialization}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarToday sx={{ color: "#667eea" }} />
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

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Time"
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Schedule sx={{ color: "#667eea" }} />
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

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Reason"
                name="reason"
                value={form.reason}
                onChange={handleChange}
                required
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
                Book Appointment
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by patient, doctor, or reason..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#667eea" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 500,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
              "&:hover fieldset": {
                borderColor: "#667eea",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#667eea",
              },
            },
          }}
        />
      </Box>

<<<<<<< HEAD
      {/* Appointments Table */}
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
=======
      <TableContainer component={Paper}>
>>>>>>> parent of f7a6c9d (Merge pull request #1 from Manickavasagam12345/manick-local)
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
              <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Patient</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Doctor</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Time</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Reason</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#667eea" }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
<<<<<<< HEAD
            {filteredAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <Typography color="textSecondary">
                    No appointments found
                  </Typography>
=======
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
>>>>>>> parent of f7a6c9d (Merge pull request #1 from Manickavasagam12345/manick-local)
                </TableCell>
              </TableRow>
            ) : (
              filteredAppointments.map((appt) => (
                <TableRow
                  key={appt._id}
                  sx={{
                    "&:hover": {
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.02)"
                          : "rgba(102, 126, 234, 0.02)",
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 600 }}>{appt.patient}</TableCell>
                  <TableCell>Dr. {appt.doctor?.name || "-"}</TableCell>
                  <TableCell>{appt.date}</TableCell>
                  <TableCell>{appt.time}</TableCell>
                  <TableCell>{appt.reason}</TableCell>
                  <TableCell>{getStatusChip(appt.status)}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} justifyContent="center">
                      {appt.status !== "completed" && (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Done />}
                          onClick={() => handleStatusUpdate(appt._id, "completed")}
                          disabled={loadingUpdateId === appt._id}
                          sx={{
                            borderColor: "#22c55e",
                            color: "#22c55e",
                            textTransform: "none",
                            borderRadius: 1.5,
                            "&:hover": {
                              borderColor: "#16a34a",
                              bgcolor: "rgba(34, 197, 94, 0.1)",
                            },
                          }}
                        >
                          Complete
                        </Button>
                      )}
                      {appt.status !== "missed" && (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Cancel />}
                          onClick={() => handleStatusUpdate(appt._id, "missed")}
                          disabled={loadingUpdateId === appt._id}
                          sx={{
                            borderColor: "#ef4444",
                            color: "#ef4444",
                            textTransform: "none",
                            borderRadius: 1.5,
                            "&:hover": {
                              borderColor: "#dc2626",
                              bgcolor: "rgba(239, 68, 68, 0.1)",
                            },
                          }}
                        >
                          Missed
                        </Button>
                      )}
                      {appt.status !== "pending" && (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<AccessTime />}
                          onClick={() => handleStatusUpdate(appt._id, "pending")}
                          disabled={loadingUpdateId === appt._id}
                          sx={{
                            borderColor: "#f59e0b",
                            color: "#f59e0b",
                            textTransform: "none",
                            borderRadius: 1.5,
                            "&:hover": {
                              borderColor: "#d97706",
                              bgcolor: "rgba(245, 158, 11, 0.1)",
                            },
                          }}
                        >
                          Pending
                        </Button>
                      )}
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleOpenDialog(appt)}
                        sx={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          textTransform: "none",
                          borderRadius: 1.5,
                          "&:hover": {
                            background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                          },
                        }}
                      >
                        Reschedule
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
<<<<<<< HEAD

      {/* Reschedule Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background:
              theme.palette.mode === "dark"
                ? "rgba(26, 26, 46, 0.98)"
                : "#fff",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          Reschedule Appointment
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Date"
                type="date"
                value={rescheduleData.date}
                onChange={(e) =>
                  setRescheduleData({ ...rescheduleData, date: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarToday sx={{ color: "#667eea" }} />
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Time"
                type="time"
                value={rescheduleData.time}
                onChange={(e) =>
                  setRescheduleData({ ...rescheduleData, time: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Schedule sx={{ color: "#667eea" }} />
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
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{
              textTransform: "none",
              color: theme.palette.text.secondary,
              borderRadius: 2,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRescheduleSave}
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
              },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
=======
>>>>>>> parent of f7a6c9d (Merge pull request #1 from Manickavasagam12345/manick-local)
    </Box>
  );
};

export default Appointments;
