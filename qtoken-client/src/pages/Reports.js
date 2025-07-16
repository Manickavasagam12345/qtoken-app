import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { format } from "date-fns";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
  });

  const fetchReports = async () => {
    if (!filters.startDate || !filters.endDate) {
      alert("Please select both From and To dates");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/token/reports", {
        params: filters,
      });
      setReports(res.data.data || []);
    } catch (err) {
      console.error("Error fetching reports", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const csv = [
      ["Token Number", "Patient", "Doctor", "Reason", "Status", "Date"],
      ...reports.map((r) => [
        r.token_number,
        r.name,
        r.doctor?.name || "-",
        r.reason,
        r.status,
        format(new Date(r.createdAt), "dd-MM-yyyy HH:mm"),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "token_reports.csv";
    a.click();
  };

  useEffect(() => {
    // Optional: Auto-fetch on mount if needed
    // fetchReports();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        📑 Reports (Date-wise)
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
          <TextField
            type="date"
            label="From"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />
          <TextField
            type="date"
            label="To"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />

          <Button variant="contained" onClick={fetchReports}>
            Apply
          </Button>
          <Button variant="outlined" onClick={handleExport}>
            Export CSV
          </Button>
        </Box>
      </Paper>

      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
              <TableRow>
                <TableCell>Token</TableCell>
                <TableCell>Patient</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date & Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((r) => (
                <TableRow key={r._id}>
                  <TableCell>{r.token_number}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.doctor?.name || "-"}</TableCell>
                  <TableCell>{r.reason}</TableCell>
                  <TableCell>{r.status}</TableCell>
                  <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Reports;
