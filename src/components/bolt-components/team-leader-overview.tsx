"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  LinearProgress,
  IconButton,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Search,
  FilterList,
  Download,
  Refresh,
  Visibility,
  TrendingUp,
  TrendingDown,
  Minimize,
  Maximize,
  MoreVert,
  ExpandMore,
  ExpandLess,
  People,
  Phone,
  Star,
  Message,
} from '@mui/icons-material';
import { BoltAgent } from '../../types/bolt-types';

// Mock data for agents
const agents: BoltAgent[] = [
  { id: 1, name: 'Priya Sharma', score: 94.5, calls: 52, satisfaction: 4.8, talkRatio: 58, interruptions: 1, monologues: 2.3 },
  { id: 2, name: 'Arjun Patel', score: 92.1, calls: 48, satisfaction: 4.7, talkRatio: 62, interruptions: 2, monologues: 3.1 },
  { id: 3, name: 'Kavya Reddy', score: 89.8, calls: 45, satisfaction: 4.6, talkRatio: 55, interruptions: 0, monologues: 1.8 },
  { id: 4, name: 'Sneha Gupta', score: 87.2, calls: 41, satisfaction: 4.5, talkRatio: 65, interruptions: 3, monologues: 4.2 },
  { id: 5, name: 'Vikram Singh', score: 85.6, calls: 39, satisfaction: 4.3, talkRatio: 68, interruptions: 4, monologues: 5.1 }
];

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeType, icon }) => (
  <Card elevation={2}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {icon}
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {changeType === 'positive' ? (
            <TrendingUp color="success" fontSize="small" />
          ) : changeType === 'negative' ? (
            <TrendingDown color="error" fontSize="small" />
          ) : null}
          <Typography 
            variant="body2" 
            color={changeType === 'positive' ? 'success.main' : changeType === 'negative' ? 'error.main' : 'text.secondary'}
          >
            {change > 0 ? '+' : ''}{change}%
          </Typography>
        </Box>
      </Box>
      <Typography variant="h4" component="div" fontWeight={600}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const AgentRow: React.FC<{ agent: BoltAgent; onViewDetails: (agent: BoltAgent) => void }> = ({ agent, onViewDetails }) => (
  <TableRow hover>
    <TableCell>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          {agent.name.split(' ').map(n => n[0]).join('')}
        </Avatar>
        <Box>
          <Typography variant="body2" fontWeight={600}>
            {agent.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Agent #{agent.id}
          </Typography>
        </Box>
      </Box>
    </TableCell>
    <TableCell>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" fontWeight={600}>
          {agent.score}%
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={agent.score} 
          sx={{ width: 60, height: 6, borderRadius: 3 }}
          color={agent.score >= 90 ? 'success' : agent.score >= 80 ? 'warning' : 'error'}
        />
      </Box>
    </TableCell>
    <TableCell>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Phone fontSize="small" color="action" />
        <Typography variant="body2">{agent.calls}</Typography>
      </Box>
    </TableCell>
    <TableCell>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Star fontSize="small" color="warning" />
        <Typography variant="body2">{agent.satisfaction}</Typography>
      </Box>
    </TableCell>
    <TableCell>
      <Typography variant="body2">{agent.talkRatio}%</Typography>
    </TableCell>
    <TableCell>
      <Chip 
        label={agent.interruptions} 
        size="small" 
        color={agent.interruptions <= 2 ? 'success' : agent.interruptions <= 4 ? 'warning' : 'error'}
        variant="outlined"
      />
    </TableCell>
    <TableCell>
      <Button 
        size="small" 
        startIcon={<Visibility />}
        onClick={() => onViewDetails(agent)}
      >
        View Details
      </Button>
    </TableCell>
  </TableRow>
);

export const BoltTeamLeaderOverview: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<BoltAgent | null>(null);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    performanceScore: true,
    callVolume: true,
    leaderboard: true
  });

  const handleToggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleViewAgentDetails = (agent: BoltAgent) => {
    setSelectedAgent(agent);
    // TODO: Open agent details modal or navigate to details page
  };

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'background.paper', px: 6, py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
              Team Analytics Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Comprehensive conversation quality and performance metrics
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Quick Filters */}
      <Box sx={{ px: 6, py: 4 }}>
        <Card elevation={1}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <TextField
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ flexGrow: 1, maxWidth: 400 }}
                size="small"
              />
              <Button
                variant={showFilters ? "contained" : "outlined"}
                startIcon={<FilterList />}
                onClick={() => setShowFilters(!showFilters)}
                size="small"
              >
                Filters
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download />}
                size="small"
              >
                Export
              </Button>
              <IconButton size="small">
                <Refresh />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Key Metrics */}
      <Box sx={{ px: 6, pb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Total Agents"
              value={agents.length}
              change={5.2}
              changeType="positive"
              icon={<People color="primary" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Avg Quality Score"
              value="89.8%"
              change={2.1}
              changeType="positive"
              icon={<Star color="warning" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Total Calls"
              value="225"
              change={-1.3}
              changeType="negative"
              icon={<Phone color="info" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Satisfaction"
              value="4.6/5"
              change={0.8}
              changeType="positive"
              icon={<Message color="success" />}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Agent Leaderboard */}
      <Box sx={{ px: 6, pb: 4 }}>
        <Card elevation={1}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" fontWeight={600}>
                  Agent Performance Leaderboard
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleToggleSection('leaderboard')}
                >
                  {expandedSections.leaderboard ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Maximize">
                  <IconButton size="small">
                    <Maximize />
                  </IconButton>
                </Tooltip>
                <Tooltip title="More options">
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Collapse in={expandedSections.leaderboard}>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Agent</TableCell>
                      <TableCell>Quality Score</TableCell>
                      <TableCell>Calls</TableCell>
                      <TableCell>Satisfaction</TableCell>
                      <TableCell>Talk Ratio</TableCell>
                      <TableCell>Interruptions</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredAgents.map((agent) => (
                      <AgentRow
                        key={agent.id}
                        agent={agent}
                        onViewDetails={handleViewAgentDetails}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Collapse>
          </CardContent>
        </Card>
      </Box>

      {/* Additional sections can be added here */}
    </Box>
  );
};