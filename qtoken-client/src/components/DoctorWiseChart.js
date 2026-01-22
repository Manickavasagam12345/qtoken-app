import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Box, Typography, Paper, useTheme } from "@mui/material";
import { MedicalServices } from "@mui/icons-material";
import axios from "axios";

const DoctorWiseChart = () => {
  const [data, setData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchDoctorCounts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/appointments/doctor-count"
        );
        setData(res.data.data || []);
      } catch (err) {
        console.error("Error loading doctor chart:", err);
      }
    };
    fetchDoctorCounts();
  }, []);

  return (
    <Paper
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
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            mr: 2,
          }}
        >
          <MedicalServices />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Appointments Per Doctor
        </Typography>
      </Box>

      {data.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            color: theme.palette.text.secondary,
          }}
        >
          <Typography>No data to show.</Typography>
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <defs>
              <linearGradient id="colorDoctor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={1} />
                <stop offset="100%" stopColor="#16a34a" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis
              dataKey="name"
              stroke={theme.palette.text.secondary}
              style={{ fontSize: 12 }}
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              style={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor:
                  theme.palette.mode === "dark" ? "#1a1a2e" : "#fff",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 8,
              }}
            />
            <Bar dataKey="count" fill="url(#colorDoctor)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default DoctorWiseChart;
