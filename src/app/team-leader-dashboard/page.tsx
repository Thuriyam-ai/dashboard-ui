"use client";

import React from 'react';

export default function TeamLeaderDashboard() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Team Leader Dashboard</h1>
      <p>Welcome to the Team Leader Dashboard!</p>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Key Features:</h2>
        <ul>
          <li>Overview & Analytics</li>
          <li>Call Quality Analytics</li>
          <li>Conversations View</li>
          <li>Support Call Analysis</li>
          <li>Customer Success Analysis</li>
          <li>Configuration Management</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Box Plot Analysis</h2>
        <p>Statistical distribution analysis with outlier detection for:</p>
        <ul>
          <li>Talk Ratio</li>
          <li>Monologue Frequency</li>
          <li>Interruption Rate</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Conversation Details</h2>
        <p>Interactive transcript player with:</p>
        <ul>
          <li>Speaker Timeline</li>
          <li>Key Metrics Panel</li>
          <li>Performance Analytics</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Configuration Management</h2>
        <ul>
          <li>Goal Management</li>
          <li>Campaign Management</li>
          <li>Alert Management</li>
        </ul>
      </div>
    </div>
  );
}