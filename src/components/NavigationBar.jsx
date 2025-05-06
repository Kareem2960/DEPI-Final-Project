import React from 'react';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';

function NavigationBar() {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Navbar.Brand href="#">Constructor</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#">Dashboard</Nav.Link>
        <Nav.Link href="#">About Us</Nav.Link>
        <Nav.Link href="#">News</Nav.Link>
        <Nav.Link href="#">User Policy</Nav.Link>
        <Nav.Link href="#">Contacts</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search Tasks" className="mr-sm-2" />
      </Form>
      <span className="ml-3">Clayton Santos</span>
      {/* Add profile icon */}
    </Navbar>
  );
}

export default NavigationBar;