import React, { useEffect, useState } from "react";
import { Paper, Typography, Box, useTheme } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { BarChart as BarChartIcon } from "@mui/icons-material";
import { getTokenList } from "../services/api";

const ChartPanel = () => {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getTokenList();
      const allData = res.data.data || [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todayTokens = allData.filter((token) => {
        const date = new Date(token.createdAt);
        return date >= today;
      });

      const hourMap = {};
      todayTokens.forEach((token) => {
        const hour = new Date(token.createdAt).getHours();
        const label = `${hour}:00`;
        hourMap[label] = (hourMap[label] || 0) + 1;
      });

      const chart = Object.entries(hourMap).map(([hour, count]) => ({
        hour,
        count,
      }));
      setChartData(chart);
    };
    fetch();
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
            bgcolor: "rgba(102, 126, 234, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#667eea",
            mr: 2,
          }}
        >
          <BarChartIcon />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Tokens Issued Per Hour (Today)
        </Typography>
      </Box>

      {chartData.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            color: theme.palette.text.secondary,
          }}
        >
          <Typography>No tokens generated today.</Typography>
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis
              dataKey="hour"
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
            <Bar dataKey="count" fill="#667eea" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default ChartPanel;
