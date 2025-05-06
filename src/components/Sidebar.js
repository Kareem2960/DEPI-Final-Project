import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendar, faChartBar, faCog } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const users = [
    { id: 1, name: 'Clayton Santos', avatar: 'CS' },
    { id: 2, name: 'John Doe', avatar: 'JD' },
    { id: 3, name: 'Jane Smith', avatar: 'JS' },
  ];

  return (
    <div className="bg-light p-3 vh-100 d-flex flex-column align-items-center" style={{ width: '80px' }}>
      <div className="mb-4">
        <img src="/logo192.png" alt="Logo" style={{ width: '40px', height: '40px' }} />
      </div>
      
      <div className="d-flex flex-column align-items-center mb-4">
        <FontAwesomeIcon icon={faHome} className="mb-3" />
        <FontAwesomeIcon icon={faCalendar} className="mb-3" />
        <FontAwesomeIcon icon={faChartBar} className="mb-3" />
        <FontAwesomeIcon icon={faCog} className="mb-3" />
      </div>

      <div className="mt-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mb-2"
            style={{ width: '40px', height: '40px', cursor: 'pointer' }}
            title={user.name}
          >
            {user.avatar}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar; 