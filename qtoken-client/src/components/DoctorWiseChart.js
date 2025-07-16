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
import axios from "axios";

const DoctorWiseChart = () => {
  const [data, setData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchDoctorCounts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/appointments/doctor-count");
        setData(res.data.data || []);
      } catch (err) {
        console.error("Error loading doctor chart:", err);
      }
    };
    fetchDoctorCounts();
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        mt: 3,
        height: 360,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="h6" fontWeight={600} gutterBottom>
        👨‍⚕️ Appointments Per Doctor
      </Typography>

      {data.length === 0 ? (
        <Typography color="text.secondary">No data to show.</Typography>
      ) : (
        <Box height="80%">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis dataKey="name" stroke={theme.palette.text.primary} />
              <YAxis stroke={theme.palette.text.primary} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  color: theme.palette.text.primary,
                }}
              />
              <Bar
                dataKey="count"
                name="Appointments"
                fill={theme.palette.success.main}
                barSize={40}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Paper>
  );
};

export default DoctorWiseChart;
