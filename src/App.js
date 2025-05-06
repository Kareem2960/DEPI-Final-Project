import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import styles from "./App.module.css";
import ToDoBoard from "./pages/ToDoBoard";
import Messenger from "./pages/Messenger";
import OneTask from "./pages/OneTask";
import CalendarTasksDay from "./pages/CalendarTasksDay";
import Mails from "./pages/Mails";
import Dashboard from "./pages/Dashboard";
import TaskList from "./pages/TaskList";
import UserGridView from "./pages/UserGridView";
import Main from "./pages/Main";
import EmployeesGrid from "./pages/EmployeesGrid";
import Employee from "./pages/Employee";
import Contacts from "./pages/Contacts";
import ChatChannels from "./pages/ChatChannels";
import ChatChannels1601 from "./pages/ChatChannels1601";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={styles.appContainer}>
        <nav className={styles.sidebar}>
          <ul>
            <li>
              <NavLink exact to="/" activeClassName={styles.active}>
                To Do Board
              </NavLink>
            </li>
            <li>
              <Link to="/messenger">Messenger 1 - 1600</Link>
            </li>
            <li>
              <Link to="/one-task">One Task - 1600</Link>
            </li>
            <li>
              <Link to="/calendar-tasks-day">Calendar Tasks Day - 1600</Link>
            </li>
            <li>
              <Link to="/mails">Mails - 1600</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard - 1600</Link>
            </li>
            <li>
              <Link to="/task-list">Task List - 1600</Link>
            </li>
            <li>
              <Link to="/user-grid-view">User Grid View - 1600</Link>
            </li>
            <li>
              <Link to="/main">Main - 1600</Link>
            </li>
            <li>
              <Link to="/employees-grid">Employees Grid - 1600</Link>
            </li>
            <li>
              <Link to="/employee">Employee - 1600</Link>
            </li>
            <li>
              <Link to="/contacts">Contacts - 1601</Link>
            </li>
            <li>
              <Link to="/chat-channels">Chat Channels - 1600</Link>
            </li>
            <li>
              <Link to="/chat-channels-1601">Chat Channels 1601</Link>
            </li>
          </ul>
        </nav>
        <main className={styles.mainContent}>
          <Switch>
            <Route exact path="/" component={ToDoBoard} />
            <Route path="/messenger" component={Messenger} />
            <Route path="/one-task" component={OneTask} />
            <Route path="/calendar-tasks-day" component={CalendarTasksDay} />
            <Route path="/mails" component={Mails} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/task-list" component={TaskList} />
            <Route path="/user-grid-view" component={UserGridView} />
            <Route path="/main" component={Main} />
            <Route path="/employees-grid" component={EmployeesGrid} />
            <Route path="/employee" component={Employee} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/chat-channels" component={ChatChannels} />
            <Route path="/chat-channels-1601" component={ChatChannels1601} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
