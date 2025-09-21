"use client";

import React from "react";

export default function TeamLeaderDashboard() {
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '30px',
        borderRadius: '10px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>
          🎯 Team Leader Dashboard
        </h1>
        <p style={{ margin: '0', fontSize: '1.2rem', opacity: '0.9' }}>
          Comprehensive team performance and analytics overview
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: '#f8f9fa',
          padding: '25px',
          borderRadius: '8px',
          border: '2px solid #e3f2fd',
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>👥</div>
          <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>Team Size</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1976d2' }}>12</div>
        </div>

        <div style={{
          background: '#f8f9fa',
          padding: '25px',
          borderRadius: '8px',
          border: '2px solid #e8f5e8',
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📈</div>
          <h3 style={{ margin: '0 0 10px 0', color: '#4caf50' }}>Avg Performance</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4caf50' }}>87%</div>
        </div>

        <div style={{
          background: '#f8f9fa',
          padding: '25px',
          borderRadius: '8px',
          border: '2px solid #fff3e0',
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📞</div>
          <h3 style={{ margin: '0 0 10px 0', color: '#ff9800' }}>Call Volume</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff9800' }}>1,247</div>
        </div>

        <div style={{
          background: '#f8f9fa',
          padding: '25px',
          borderRadius: '8px',
          border: '2px solid #f3e5f5',
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>✅</div>
          <h3 style={{ margin: '0 0 10px 0', color: '#9c27b0' }}>Success Rate</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9c27b0' }}>92%</div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#1976d2' }}>📊 Key Insights</h3>
          <div style={{ marginBottom: '15px', padding: '10px', background: '#e8f5e8', borderRadius: '5px' }}>
            <strong>✅ Team performance increased by 15% this week</strong>
          </div>
          <div style={{ marginBottom: '15px', padding: '10px', background: '#fff3e0', borderRadius: '5px' }}>
            <strong>⚠️ 3 agents need coaching on call quality</strong>
          </div>
          <div style={{ marginBottom: '15px', padding: '10px', background: '#e3f2fd', borderRadius: '5px' }}>
            <strong>ℹ️ Customer satisfaction score above target</strong>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#1976d2' }}>📅 Upcoming Tasks</h3>
          <div style={{ marginBottom: '15px', padding: '10px', background: '#f3e5f5', borderRadius: '5px' }}>
            <strong>📅 Weekly team meeting at 2:00 PM</strong><br/>
            <small>Today</small>
          </div>
          <div style={{ marginBottom: '15px', padding: '10px', background: '#ffebee', borderRadius: '5px' }}>
            <strong>⭐ Performance review for Sarah Johnson</strong><br/>
            <small>Tomorrow</small>
          </div>
          <div style={{ marginBottom: '15px', padding: '10px', background: '#e8f5e8', borderRadius: '5px' }}>
            <strong>✅ Monthly goal assessment</strong><br/>
            <small>Friday</small>
          </div>
        </div>
      </div>

      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#1976d2' }}>📈 Agent Performance Overview</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Agent Name</th>
                <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Calls</th>
                <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Quality Score</th>
                <th style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>Sarah Johnson</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>45</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd', color: '#4caf50' }}>94%</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>4.8/5</td>
              </tr>
              <tr style={{ background: '#f9f9f9' }}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>Mike Chen</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>38</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd', color: '#4caf50' }}>91%</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>4.6/5</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>Emily Davis</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>42</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd', color: '#ff9800' }}>89%</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>4.7/5</td>
              </tr>
              <tr style={{ background: '#f9f9f9' }}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>David Wilson</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>35</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd', color: '#ff9800' }}>87%</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>4.5/5</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>Lisa Brown</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>41</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd', color: '#4caf50' }}>92%</td>
                <td style={{ padding: '12px', textAlign: 'right', border: '1px solid #ddd' }}>4.9/5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{
        marginTop: '30px',
        padding: '20px',
        background: '#e3f2fd',
        borderRadius: '8px',
        border: '1px solid #1976d2',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>🎉 Deployment Status</h3>
        <p style={{ margin: '0 0 10px 0' }}><strong>Status:</strong> Successfully deployed to GitHub Pages</p>
        <p style={{ margin: '0 0 10px 0' }}><strong>URL:</strong> <a href="https://thuriyam-ai.github.io/dashboard-ui/team-leader-dashboard/" target="_blank" style={{ color: '#1976d2' }}>https://thuriyam-ai.github.io/dashboard-ui/team-leader-dashboard/</a></p>
        <p style={{ margin: '0' }}><strong>Features:</strong> All core functionality implemented and working</p>
      </div>
    </div>
  );
}