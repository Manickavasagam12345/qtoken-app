import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box, useTheme } from "@mui/material";
import {
  People,
  Person,
  TrendingUp,
  AccessTime,
} from "@mui/icons-material";
import { getTokenList } from "../services/api";

const DashboardCards = () => {
  const theme = useTheme();
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

  const cards = [
    {
      title: "Total Tokens",
      value: totalTokens,
      icon: <People />,
      color: "#667eea",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      title: "Unique Visitors",
      value: uniqueNames,
      icon: <Person />,
      color: "#4ade80",
      gradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
    },
    {
      title: "Most Common Reason",
      value: topReason,
      icon: <TrendingUp />,
      color: "#f59e0b",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    },
    {
      title: "Last Token Time",
      value: lastTokenTime,
      icon: <AccessTime />,
      color: "#ec4899",
      gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              height: "100%",
              background:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#fff",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "#e5e7eb"
              }`,
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 8px 30px rgba(0,0,0,0.3)"
                    : "0 8px 30px rgba(0,0,0,0.08)",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: card.gradient,
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 2,
                  background: card.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  boxShadow: `0 4px 14px ${card.color}40`,
                }}
              >
                {card.icon}
              </Box>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
                mb: 1,
              }}
            >
              {card.title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
              }}
            >
              {card.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards;
