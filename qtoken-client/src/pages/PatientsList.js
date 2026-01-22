import React, { useEffect, useState } from "react";
import { getPatients } from "../services/api";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Pagination,
} from "@mui/material";
import axios from "axios";


const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const rowsPerPage = 10; // default 10 rows

const fetchPatients = async () => {
  setLoading(true);
  try {
    const res = await axios.get("http://localhost:5000/api/patient/list", {
      params: { page, limit: rowsPerPage, search },
    });
    setPatients(res.data.data);
    setTotal(res.data.total);
  } catch (err) {
    console.error("Failed to fetch patients", err);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchPatients();
  }, [page, search]);

  return (
    <Box sx={{ maxWidth: 1000, margin: "40px auto" }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Patients List
        </Typography>

        <TextField
        fullWidth
        placeholder="Search by name, phone or patient ID"
        value={search}
        onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
        }}
        sx={{ mb: 3 }}
        />


        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell>Patient ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Gender</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.length > 0 ? (
                    patients.map((p) => (
                      <TableRow key={p._id}>
                        <TableCell>{p.patient_id}</TableCell>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.phone}</TableCell>
                        <TableCell>{p.age}</TableCell>
                        <TableCell>{p.gender}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No patients found
                      </TableCell>
                    </TableRow>
                  )}
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
      </Paper>
    </Box>
  );
};

export default PatientsList;
