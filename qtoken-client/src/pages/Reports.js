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
  useTheme,
  Card,
  Grid,
  InputAdornment,
  Chip,
  Stack,
} from "@mui/material";
import {
  Assessment,
  CalendarToday,
  Download,
  Search,
} from "@mui/icons-material";
import axios from "axios";
import { format } from "date-fns";

const Reports = () => {
  const theme = useTheme();
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
    a.download = `token_reports_${format(new Date(), "ddMMyyyy")}.csv`;
    a.click();
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      pending: { color: "#f59e0b", label: "Pending" },
      completed: { color: "#22c55e", label: "Completed" },
      missed: { color: "#ef4444", label: "Missed" },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Chip
        label={config.label}
        size="small"
        sx={{
          color: config.color,
          bgcolor: `${config.color}20`,
          fontWeight: 600,
          border: `1px solid ${config.color}40`,
        }}
      />
    );
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
            <Assessment sx={{ color: "#fff", fontSize: 28 }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            Reports & Analytics
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, ml: 8 }}>
          Generate and export token reports by date range
        </Typography>
      </Box>

      {/* Filters */}
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
          Select Date Range
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="From Date"
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
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
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="To Date"
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
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
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                startIcon={<Search />}
                onClick={fetchReports}
                sx={{
                  flex: 1,
                  borderRadius: 2,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                  },
                }}
              >
                Generate
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={handleExport}
                disabled={reports.length === 0}
                sx={{
                  flex: 1,
                  borderRadius: 2,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 600,
                  borderColor: "#667eea",
                  color: "#667eea",
                  "&:hover": {
                    borderColor: "#5568d3",
                    bgcolor: "rgba(102, 126, 234, 0.08)",
                  },
                }}
              >
                Export CSV
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Card>

      {/* Reports Table */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress sx={{ color: "#667eea" }} />
        </Box>
      ) : (
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
                <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Token</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Patient</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Doctor</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Reason</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Date & Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    <Typography color="textSecondary">
                      No reports found. Please select a date range and generate reports.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                reports.map((r) => (
                  <TableRow
                    key={r._id}
                    sx={{
                      "&:hover": {
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.02)"
                            : "rgba(102, 126, 234, 0.02)",
                      },
                    }}
                  >
                    <TableCell>
                      <Chip
                        label={`#${r.token_number}`}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          color: "#fff",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{r.name}</TableCell>
                    <TableCell>Dr. {r.doctor?.name || "-"}</TableCell>
                    <TableCell>{r.reason}</TableCell>
                    <TableCell>{getStatusChip(r.status)}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.secondary }}>
                      {new Date(r.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Reports;
