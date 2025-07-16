// File: src/pages/DoctorCalendar.js

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
} from "@mui/material";

const localizer = momentLocalizer(moment);

const DoctorCalendar = () => {
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
        title: appt.patient,
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
    <Box p={3} >
      <Typography variant="h5" gutterBottom>
        Doctor Appointment Calendar
      </Typography>

      <FormControl sx={{ minWidth: 300, mb: 3 }}>
        <InputLabel>Select Doctor</InputLabel>
        <Select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          label="Select Doctor"
        >
          {doctors.map((doc) => (
            <MenuItem key={doc._id} value={doc._id}>
              {doc.name} ({doc.specialization})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box style={{ height: "75vh" }}>
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
        />
      </Box>
    </Box>
  );
};

export default DoctorCalendar;
