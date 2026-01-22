import React, { useState } from "react";
import {
  createToken,
  getPatientByPhone,
  createPatient,
} from "../services/api";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Grid,
} from "@mui/material";

const GenerateToken = () => {
  const [phone, setPhone] = useState("");
  const [patient, setPatient] = useState(null);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    reason: "",
  });
  const [token, setToken] = useState(null);
  const [showCreatePatient, setShowCreatePatient] = useState(false);
  const [infoMessage, setInfoMessage] = useState(""); // ← message state

  const handlePhoneSearch = async () => {
    setToken(null); // clear old token
    setInfoMessage(""); // clear old message
    if (!phone) {
      setInfoMessage("Please enter a phone number");
      return;
    }

    try {
      const res = await getPatientByPhone(phone);

      if (res.data.found) {
        setPatient(res.data.data);
        setForm({
          name: res.data.data.name || "",
          age: res.data.data.age || "",
          gender: res.data.data.gender || "",
          reason: "",
        });
        setShowCreatePatient(false);
        setInfoMessage("⚠️ Patient already exists. You can generate token."); // ← message
      } else {
        setPatient(null);
        setShowCreatePatient(true);
        setForm({ name: "", age: "", gender: "", reason: "" });
        setInfoMessage("✅ Patient not found. You can create a new patient."); // ← message
      }
    } catch (err) {
      setInfoMessage("❌ Server error while searching patient");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreatePatientAndToken = async () => {
    try {
      const patientRes = await createPatient({
        name: form.name,
        phone,
        age: form.age,
        gender: form.gender,
      });

      const newPatient = patientRes.data.data;
      setPatient(newPatient);

      const tokenRes = await createToken({
        patientId: newPatient._id,
        reason: form.reason,
      });

      setToken(tokenRes.data.data.token_number);

      setPhone("");
      setForm({ name: "", age: "", gender: "", reason: "" });
      setShowCreatePatient(false);
      setInfoMessage("✅ New patient created and token generated!");
    } catch (err) {
      setInfoMessage("❌ Error creating patient or token");
    }
  };

  const handleGenerateToken = async () => {
    try {
      const tokenRes = await createToken({
        patientId: patient._id,
        reason: form.reason,
      });

      setToken(tokenRes.data.data.token_number);
      setForm({ ...form, reason: "" });
      setInfoMessage("✅ Token generated for existing patient!");
    } catch (err) {
      setInfoMessage("❌ Error generating token");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "80px auto" }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Generate Token
        </Typography>

        <TextField
          fullWidth
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="outlined" fullWidth onClick={handlePhoneSearch}>
          Search Patient
        </Button>

        {infoMessage && (
          <Alert severity={infoMessage.startsWith("❌") ? "error" : "info"} sx={{ mt: 2 }}>
            {infoMessage}
          </Alert>
        )}

        {(patient || showCreatePatient) && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={!!patient}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                value={form.age}
                onChange={handleChange}
                disabled={!!patient}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                disabled={!!patient}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reason"
                name="reason"
                value={form.reason}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        )}

        {showCreatePatient && (
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleCreatePatientAndToken}
          >
            Create Patient & Generate Token
          </Button>
        )}

        {patient && !showCreatePatient && (
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleGenerateToken}
          >
            Generate Token
          </Button>
        )}

        {token && (
          <Alert severity="success" sx={{ mt: 3 }}>
            Token Number: <strong>{token}</strong>
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default GenerateToken;
