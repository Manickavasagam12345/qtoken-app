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
} from "@mui/material";
import { getTokenList } from "../services/api";

const Tokens = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const rowsPerPage = 5;

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

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Token List
      </Typography>

      <Box mb={2} display="flex" justifyContent="space-between">
       <TextField
      label="Search by Token "
      variant="outlined"
      size="small"
      value={search}
      onChange={(e) => {
        setPage(1);
        setSearch(e.target.value);  // ← already correct
      }}
    />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>Token Number</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tokens.map((token) => (
                  <TableRow key={token._id}>
                    <TableCell>{token.token_number}</TableCell>
                    <TableCell>{token.name}</TableCell>
                    <TableCell>{token.reason}</TableCell>
                    <TableCell align="center">
                      <Typography
                        sx={{
                          color:
                            token.status === "completed"
                              ? "green"
                              : token.status === "missed"
                              ? "red"
                              : "orange",
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      >
                        {token.status}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {token.status === "pending" ? (
                        <>
                          <Button
                            variant="outlined"
                            size="small"
                            color="success"
                            onClick={() => updateStatus(token._id, "completed")}
                            sx={{ mr: 1 }}
                          >
                            Complete
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            onClick={() => updateStatus(token._id, "missed")}
                          >
                            Missed
                          </Button>
                        </>
                      ) : (
                        <Typography fontSize="1.2rem">
                          {token.status === "completed" ? "✅" : "❌"}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(token.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(total / rowsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Tokens;
