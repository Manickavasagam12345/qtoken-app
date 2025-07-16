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
  Legend,
} from "recharts";
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
        const label = `${hour}:00 - ${hour + 1}:00`;
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
        📊 Tokens Issued Per Hour (Today)
      </Typography>

      {chartData.length === 0 ? (
        <Box textAlign="center" py={5}>
          <Typography variant="body1" color="text.secondary">
            No tokens generated today.
          </Typography>
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis dataKey="hour" stroke={theme.palette.text.primary} />
            <YAxis stroke={theme.palette.text.primary} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                color: theme.palette.text.primary,
              }}
            />
            <Legend />
            <Bar
              dataKey="count"
              name="Tokens"
              fill={theme.palette.primary.main}
              radius={[6, 6, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default ChartPanel;
