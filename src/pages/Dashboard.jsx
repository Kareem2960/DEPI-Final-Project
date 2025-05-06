import React from "react";
import styles from "./Dashboard.module.css";
import {
  FaTasks,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
  FaChartPie,
} from "react-icons/fa";

export default function Dashboard() {
  // Example data (replace with real data if you want)
  const totalTasks = 12;
  const inProgress = 4;
  const completed = 5;
  const overdue = 1;
  const recentActivity = [
    { id: 1, text: "Omar completed 'Design login page'", time: "2 min ago" },
    {
      id: 2,
      text: "Alice added a comment to 'Set up database'",
      time: "10 min ago",
    },
    {
      id: 3,
      text: "Bob attached 'spec.pdf' to 'Deploy to production'",
      time: "1 hour ago",
    },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.heading}>Dashboard</h1>
      <div className={styles.widgets}>
        <div className={styles.widget}>
          <FaTasks className={styles.widgetIcon} />
          <div className={styles.widgetNumber}>{totalTasks}</div>
          <div className={styles.widgetLabel}>Total Tasks</div>
        </div>
        <div className={styles.widget}>
          <FaSpinner className={styles.widgetIcon} />
          <div className={styles.widgetNumber}>{inProgress}</div>
          <div className={styles.widgetLabel}>In Progress</div>
        </div>
        <div className={styles.widget}>
          <FaCheckCircle className={styles.widgetIcon} />
          <div className={styles.widgetNumber}>{completed}</div>
          <div className={styles.widgetLabel}>Completed</div>
        </div>
        <div className={styles.widget}>
          <FaExclamationCircle className={styles.widgetIcon} />
          <div className={styles.widgetNumber}>{overdue}</div>
          <div className={styles.widgetLabel}>Overdue</div>
        </div>
      </div>
      <div className={styles.charts}>
        <div className={styles.chartPlaceholder}>
          <FaChartPie className={styles.chartIcon} />
          <div>Tasks by Status (Chart Placeholder)</div>
        </div>
        <div className={styles.chartPlaceholder}>
          <FaChartPie className={styles.chartIcon} />
          <div>Tasks by Priority (Chart Placeholder)</div>
        </div>
      </div>
      <div className={styles.activitySection}>
        <h2 className={styles.activityHeading}>Recent Activity</h2>
        <ul className={styles.activityList}>
          {recentActivity.map((a) => (
            <li key={a.id} className={styles.activityItem}>
              <span>{a.text}</span>
              <span className={styles.activityTime}>{a.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
