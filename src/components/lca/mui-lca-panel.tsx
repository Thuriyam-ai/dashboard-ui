"use client";

import { useState } from "react";
import { DistributionPlots } from "@/components/dashboard";
import { CoachingLeaderboards } from "@/components/dashboard";
import { RadarChart } from "@/components/dashboard";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Card,
  CardContent,
  LinearProgress,
  Chip,
} from "@mui/material";
import {
  Close,
  Psychology,
  Timeline,
  SentimentSatisfied,
  TrendingUp,
  Assessment,
} from "@mui/icons-material";

interface LCAMetrics {
  linguisticComplexity: number;
  conversationFlow: number;
  sentimentScore: number;
  topicCoherence: number;
  languageDiversity: number;
  responseTime: number;
}

interface LCAPanelProps {
  conversationId: string;
  onClose: () => void;
}

/**
 * MUI LCA (Linguistic & Conversation Flow Analysis) Panel component.
 * Displays detailed linguistic and conversation flow analysis for a conversation.
 * @param props - Component props
 * @param props.conversationId - ID of the conversation to analyze
 * @param props.onClose - Function to close the panel
 * @returns The MUI LCA Panel component
 */
export function MuiLCAPanel({ conversationId, onClose }: LCAPanelProps) {
  const [activeTab, setActiveTab] = useState<
    "linguistic" | "flow" | "sentiment"
  >("linguistic");

  // Mock LCA data
  const lcaMetrics: LCAMetrics = {
    linguisticComplexity: 78,
    conversationFlow: 85,
    sentimentScore: 72,
    topicCoherence: 90,
    languageDiversity: 65,
    responseTime: 2.3,
  };

  const linguisticAnalysis = {
    vocabularyRichness: 7.2,
    sentenceComplexity: 6.8,
    grammaticalAccuracy: 94,
    wordFrequency: {
      common: 45,
      uncommon: 30,
      rare: 25,
    },
  };

  const flowAnalysis = {
    turnTaking: 88,
    topicMaintenance: 92,
    interruptionHandling: 76,
    conversationDepth: 84,
    responseRelevance: 89,
  };

  const sentimentAnalysis = {
    overallSentiment: 0.72,
    emotionalRange: 0.65,
    positivityScore: 78,
    negativityScore: 22,
    neutralScore: 45,
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: "linguistic" | "flow" | "sentiment") => {
    setActiveTab(newValue);
  };

  const renderLinguisticTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Linguistic Complexity Analysis
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Vocabulary Richness
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" color="primary" sx={{ mr: 2 }}>
                    {linguisticAnalysis.vocabularyRichness}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    / 10.0
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(linguisticAnalysis.vocabularyRichness / 10) * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sentence Complexity
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" color="primary" sx={{ mr: 2 }}>
                    {linguisticAnalysis.sentenceComplexity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    / 10.0
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(linguisticAnalysis.sentenceComplexity / 10) * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Grammatical Accuracy
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" color="success.main" sx={{ mr: 2 }}>
                    {linguisticAnalysis.grammaticalAccuracy}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={linguisticAnalysis.grammaticalAccuracy}
                  color="success"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Word Frequency Distribution
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label={`Common: ${linguisticAnalysis.wordFrequency.common}%`} color="primary" />
                  <Chip label={`Uncommon: ${linguisticAnalysis.wordFrequency.uncommon}%`} color="secondary" />
                  <Chip label={`Rare: ${linguisticAnalysis.wordFrequency.rare}%`} color="default" />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const renderFlowTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Conversation Flow Analysis
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Turn Taking
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" color="primary" sx={{ mr: 2 }}>
                    {flowAnalysis.turnTaking}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={flowAnalysis.turnTaking}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Topic Maintenance
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" color="success.main" sx={{ mr: 2 }}>
                    {flowAnalysis.topicMaintenance}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={flowAnalysis.topicMaintenance}
                  color="success"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Response Relevance
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" color="primary" sx={{ mr: 2 }}>
                    {flowAnalysis.responseRelevance}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={flowAnalysis.responseRelevance}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Conversation Depth
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" color="warning.main" sx={{ mr: 2 }}>
                    {flowAnalysis.conversationDepth}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={flowAnalysis.conversationDepth}
                  color="warning"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const renderSentimentTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Sentiment Analysis
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Overall Sentiment
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" color="success.main" sx={{ mr: 2 }}>
                    {Math.round(sentimentAnalysis.overallSentiment * 100)}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Positive
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={sentimentAnalysis.overallSentiment * 100}
                  color="success"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Emotional Range
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" color="primary" sx={{ mr: 2 }}>
                    {Math.round(sentimentAnalysis.emotionalRange * 100)}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Diverse
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={sentimentAnalysis.emotionalRange * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sentiment Distribution
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-around', mt: 2 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" color="success.main">
                    {sentimentAnalysis.positivityScore}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Positive
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" color="error.main">
                    {sentimentAnalysis.negativityScore}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Negative
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" color="text.secondary">
                    {sentimentAnalysis.neutralScore}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Neutral
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: '90vh',
          margin: 2,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h5" component="div" fontWeight={700}>
              LCA Analysis
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Conversation ID: {conversationId}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: 'text.secondary' }}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                minHeight: 48,
              },
            }}
          >
            <Tab
              icon={<Psychology />}
              iconPosition="start"
              label="Linguistic Analysis"
              value="linguistic"
              sx={{ mr: 2 }}
            />
            <Tab
              icon={<Timeline />}
              iconPosition="start"
              label="Flow Analysis"
              value="flow"
              sx={{ mr: 2 }}
            />
            <Tab
              icon={<SentimentSatisfied />}
              iconPosition="start"
              label="Sentiment Analysis"
              value="sentiment"
            />
          </Tabs>
        </Box>

        {activeTab === "linguistic" && renderLinguisticTab()}
        {activeTab === "flow" && renderFlowTab()}
        {activeTab === "sentiment" && renderSentimentTab()}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
