import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell } from '@fortawesome/free-solid-svg-icons';

function NavigationBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm px-4">
      <Navbar.Brand href="#" className="fw-bold">Constructor</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#" className="text-dark">Dashboard</Nav.Link>
        <Nav.Link href="#" className="text-dark">About Us</Nav.Link>
        <Nav.Link href="#" className="text-dark">News</Nav.Link>
        <Nav.Link href="#" className="text-dark">User Policy</Nav.Link>
        <Nav.Link href="#" className="text-dark">Contacts</Nav.Link>
      </Nav>
      <Form inline className="d-flex align-items-center">
        <div className="position-relative">
          <FontAwesomeIcon icon={faSearch} className="position-absolute" style={{ top: '10px', left: '10px', color: '#6c757d' }} />
          <FormControl
            type="text"
            placeholder="Search Tasks"
            className="pl-4"
            style={{ borderRadius: '20px', paddingLeft: '35px' }}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <FontAwesomeIcon icon={faBell} className="mx-3" />
        <div className="d-flex align-items-center">
          <span className="mr-2">Clayton Santos</span>
          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }}>
            CS
          </div>
        </div>
      </Form>
    </Navbar>
  );
}

export default NavigationBar; 