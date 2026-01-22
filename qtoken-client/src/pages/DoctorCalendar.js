import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
  Card,
  InputAdornment,
} from "@mui/material";
import { CalendarMonth, MedicalServices } from "@mui/icons-material";

const localizer = momentLocalizer(moment);

const DoctorCalendar = () => {
  const theme = useTheme();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      fetchAppointments();
    }
  }, [selectedDoctor]);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors/list");
      setDoctors(res.data.data || []);
    } catch (err) {
      console.error("Error loading doctors:", err);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/appointments/by-doctor/${selectedDoctor}`
      );
      const events = res.data.data.map((appt) => ({
        title: `${appt.patient} - ${appt.reason}`,
        start: new Date(`${appt.date}T${appt.time}`),
        end: new Date(moment(`${appt.date}T${appt.time}`).add(30, "minutes")),
        allDay: false,
      }));
      setAppointments(events);
    } catch (err) {
      console.error("Error loading appointments:", err);
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
            <CalendarMonth sx={{ color: "#fff", fontSize: 28 }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            Doctor Calendar
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, ml: 8 }}>
          View doctor appointments in calendar format
        </Typography>
      </Box>

      {/* Doctor Selector */}
      <Card
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
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
        <FormControl
          fullWidth
          sx={{
            maxWidth: 400,
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
          <InputLabel>Select Doctor</InputLabel>
          <Select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            label="Select Doctor"
            startAdornment={
              <InputAdornment position="start">
                <MedicalServices sx={{ color: "#667eea" }} />
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
      </Card>

      {/* Calendar */}
      <Card
        elevation={0}
        sx={{
          p: 3,
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
          "& .rbc-calendar": {
            minHeight: 600,
          },
          "& .rbc-toolbar button": {
            borderRadius: 2,
            border: "none",
            background:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(102, 126, 234, 0.1)",
            color: theme.palette.text.primary,
            fontWeight: 600,
            "&:hover": {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
            },
            "&.rbc-active": {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
            },
          },
          "& .rbc-event": {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: 1,
            border: "none",
          },
          "& .rbc-today": {
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(102, 126, 234, 0.15)"
                : "rgba(102, 126, 234, 0.08)",
          },
        }}
      >
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
        />
      </Card>
    </Box>
  );
};

export default DoctorCalendar;
