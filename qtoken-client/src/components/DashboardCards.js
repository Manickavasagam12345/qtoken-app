import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, useTheme } from "@mui/material";
import { getTokenList } from "../services/api";

const DashboardCards = () => {
  const theme = useTheme(); // To adapt colors to dark/light mode
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getTokenList();
      setTokens(res.data.data || []);
    };
    fetch();
  }, []);

  const totalTokens = tokens.length;
  const uniqueNames = [...new Set(tokens.map((t) => t.name))].length;

  const reasonCounts = {};
  tokens.forEach((t) => {
    reasonCounts[t.reason] = (reasonCounts[t.reason] || 0) + 1;
  });

  const topReason =
    Object.entries(reasonCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  const lastTokenTime = tokens.length
    ? new Date(tokens[0].createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "-";

  // Standard card style
  const cardStyle = {
    p: 3,
    borderRadius: 3,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    height: "100%", // important for equal height
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0px 2px 10px rgba(255, 255, 255, 0.05)"
        : "0px 2px 10px rgba(0, 0, 0, 0.1)",
  };

  return (
    <Grid container spacing={3} mb={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={cardStyle}>
          <Typography variant="subtitle2" color="text.secondary" mb={1}>
            Total Tokens
          </Typography>
          <Typography variant="h4" color="primary">
            {totalTokens}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={cardStyle}>
          <Typography variant="subtitle2" color="text.secondary" mb={1}>
            Unique Visitors
          </Typography>
          <Typography variant="h4" color="primary">
            {uniqueNames}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={cardStyle}>
          <Typography variant="subtitle2" color="text.secondary" mb={1}>
            Most Common Reason
          </Typography>
          <Typography variant="h6" color="primary">
            {topReason}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={cardStyle}>
          <Typography variant="subtitle2" color="text.secondary" mb={1}>
            Last Token Time
          </Typography>
          <Typography variant="h6" color="primary">
            {lastTokenTime}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardCards;
