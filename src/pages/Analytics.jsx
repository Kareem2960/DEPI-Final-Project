import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

const Analytics = () => {
  // Mock data
  const completionData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Tasks Completed',
      data: [2, 4, 3, 5, 1, 0, 2],
      borderColor: '#4a90e2',
      backgroundColor: 'rgba(74,144,226,0.2)',
      tension: 0.4,
    }]
  };
  const productivityData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Tasks Done',
      data: [10, 15, 8, 12],
      backgroundColor: '#64b5f6',
    }]
  };
  const overdueData = {
    labels: ['On Time', 'Overdue'],
    datasets: [{
      data: [18, 4],
      backgroundColor: ['#43a047', '#e57373'],
    }]
  };
  const priorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      data: [5, 10, 7],
      backgroundColor: ['#e57373', '#ffd54f', '#64b5f6'],
    }]
  };

  return (
    <div style={{ padding: 32, borderRadius: 24, background: 'var(--bs-body-bg, #fff)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', maxWidth: 1200, margin: '2rem auto' }}>
      <h2 style={{ marginBottom: 32 }}>Analytics Dashboard</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
        <div style={{ flex: 1, minWidth: 320 }}>
          <h5>Task Completion (This Week)</h5>
          <Line data={completionData} />
        </div>
        <div style={{ flex: 1, minWidth: 320 }}>
          <h5>Productivity Trends</h5>
          <Bar data={productivityData} />
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginTop: 32 }}>
        <div style={{ flex: 1, minWidth: 320 }}>
          <h5>Overdue Tasks</h5>
          <Pie data={overdueData} />
        </div>
        <div style={{ flex: 1, minWidth: 320 }}>
          <h5>Task Distribution by Priority</h5>
          <Pie data={priorityData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics; 