import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  TextField,
  Pagination,
  Chip,
  useTheme,
  InputAdornment,
  Stack,
} from "@mui/material";
import {
  ConfirmationNumber,
  Search,
  CheckCircle,
  Cancel,
  AccessTime,
} from "@mui/icons-material";
import { getTokenList } from "../services/api";

const Tokens = () => {
  const theme = useTheme();
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchTokens();
  }, [page, search]);

  const fetchTokens = async () => {
    setLoading(true);
    try {
      const res = await getTokenList(page, rowsPerPage, search);
      setTokens(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error loading tokens:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/token/${id}/status`, { status });
      fetchTokens();
    } catch (err) {
      console.error("Error updating status:", err);
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
        icon: <CheckCircle sx={{ fontSize: 16 }} />,
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
            Token Management
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, ml: 8 }}>
          View and manage all patient tokens
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by token number, name, or reason..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
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

      {/* Tokens Table */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress sx={{ color: "#667eea" }} />
        </Box>
      ) : (
        <>
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
              mb: 3,
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
                  <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>
                    Token Number
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Reason</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#667eea" }} align="center">
                    Actions
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#667eea" }}>Date & Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tokens.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                      <Typography color="textSecondary">No tokens found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  tokens.map((token) => (
                    <TableRow
                      key={token._id}
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
                          label={`#${token.token_number}`}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "#fff",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{token.name}</TableCell>
                      <TableCell>{token.reason}</TableCell>
                      <TableCell>{getStatusChip(token.status)}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} justifyContent="center">
                          {token.status === "pending" ? (
                            <>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<CheckCircle />}
                                onClick={() => updateStatus(token._id, "completed")}
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
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<Cancel />}
                                onClick={() => updateStatus(token._id, "missed")}
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
                            </>
                          ) : (
                            <Typography
                              variant="body2"
                              sx={{
                                color: theme.palette.text.secondary,
                                fontStyle: "italic",
                              }}
                            >
                              {token.status === "completed" ? "✅ Completed" : "❌ Missed"}
                            </Typography>
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ color: theme.palette.text.secondary }}>
                        {new Date(token.createdAt).toLocaleString("en-IN", {
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

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(total / rowsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: 2,
                  fontWeight: 600,
                },
                "& .Mui-selected": {
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important",
                  color: "#fff",
                },
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Tokens;
