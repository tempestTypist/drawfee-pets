import { useState, useEffect } from 'react';
import Auth from '../../utils/auth'
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap' 
import { HeaderLogo } from './headerLogo'
import { GuestNav } from './headerGuestNav'
import { UserNav } from './headerUserNav'

const Header = () => {
  const NavBar = Auth.loggedIn() ? UserNav : GuestNav;
  
  useEffect(() => {

  }, [Auth]);

  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" variant="dark" className="py-0">
      <Container fluid>
        <HeaderLogo/>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Offcanvas id="responsive-navbar-nav" placement="end">
          <Offcanvas.Header closeVariant="white" closeButton>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="justify-content-end align-items-lg-center flex-grow-1 pe-3">
              <NavBar/>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
