"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
} from "@mui/material";

export function TeamPerformanceChart() {
  const agentPerformance = [
    { name: "Sarah Johnson", calls: 45, quality: 94, satisfaction: 4.8 },
    { name: "Mike Chen", calls: 38, quality: 91, satisfaction: 4.6 },
    { name: "Emily Davis", calls: 42, quality: 89, satisfaction: 4.7 },
    { name: "David Wilson", calls: 35, quality: 87, satisfaction: 4.5 },
    { name: "Lisa Brown", calls: 41, quality: 92, satisfaction: 4.9 },
  ];

  const quickStats = [
    { label: "Total Calls Today", value: "201" },
    { label: "Avg Call Duration", value: "12:34" },
    { label: "First Call Resolution", value: "78%" },
    { label: "Customer Satisfaction", value: "4.7/5" },
  ];

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Agent Performance Overview
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Agent Name</TableCell>
                    <TableCell align="right">Calls</TableCell>
                    <TableCell align="right">Quality Score</TableCell>
                    <TableCell align="right">Satisfaction</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {agentPerformance.map((agent, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {agent.name}
                      </TableCell>
                      <TableCell align="right">{agent.calls}</TableCell>
                      <TableCell align="right">{agent.quality}%</TableCell>
                      <TableCell align="right">{agent.satisfaction}/5</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>
            {quickStats.map((stat, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}