import axios from "axios";
import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
// import { ChatState } from "../../context/ChatProvider";

const InternDashoard = () => {
  return (
    <>
      {" "}
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>SOPIFY INTERN DASHBOARD</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/clientdetails">
                <Nav.Link>All Clients</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/chat">
                <Nav.Link>My Chats</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/particularClient">
                <Nav.Link>Particular Client Info</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default InternDashoard;
