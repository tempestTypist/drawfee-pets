import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_USER, QUERY_ME } from '../../utils/queries'
import Auth from '../../utils/auth';
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBellOn, faEnvelope, faEnvelopeOpen, faGear } from '@fortawesome/free-solid-svg-icons';

import { Container, Row, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import Logo from '../../assets/images/drawfee-logos/drawfee-light.png'

const Header = () => {
  const control = useAnimation()
	const [ref, inView] = useInView()

  const [isHovered, setHovered] = useState(false)

  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me || {};

  useEffect(() => {
    if (inView) {
      control.start("onscreen");
    } 
  }, [control, inView]);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" variant="dark" className="lm-header">
      <Container fluid>
          <Navbar.Brand>
            <Link to="/">
              <img src={Logo} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav>
              {Auth.loggedIn() ? (
                <div className="d-flex flex-row align-items-center">
                  <Nav.Item>
                    <Link to="/assets" className="nav-link">
                      (Temp) Assets
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/community-forums" className="nav-link">
                      Community
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/create-pet" className="nav-link">
                      Create a Pet
                    </Link>
                  </Nav.Item>

                  <NavDropdown 
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    title={isHovered ? (
                      <FontAwesomeIcon icon={faEnvelopeOpen} />
                    ) : (
                      <FontAwesomeIcon icon={faEnvelope} />
                    )}
                    className="dropdown-toggle-icon" 
                    align="end" 
                    id="messages-dropdown">
                    <NavDropdown.Header>
                      <h4 className="title">Messages (6)</h4>
                      <div className="ms-auto action-area">
                        <a href="javascript:void(0)">Mark All Read</a> <a className="ms-2"><FontAwesomeIcon icon={faGear} /></a>
                      </div>
                    </NavDropdown.Header>

                    <NavDropdown.Divider />

                    <NavDropdown.Item href="#action/3.1">
                      <img className="dt-avatar me-3" src="https://via.placeholder.com/150x150" alt="User" />

                      <span className="media-body text-truncate">
                      <span className="user-name mb-1">Chris Mathew: </span>
                      <span className="message text-light-gray text-truncate">Okay.. I will be waiting for your...</span>
                      </span>

                      <span className="action-area h-100 min-w-80 text-right">
                        <span className="meta-date ms-2 mb-1">8 hours ago</span>
                        <span className="toggle-button" data-toggle="tooltip" data-placement="left" title="Mark as read">
                          <span className="show"><i className="icon icon-dot-o icon-fw f-10 text-light-gray"></i></span>
                          <span className="hide"><i className="icon icon-dot icon-fw f-10 text-light-gray"></i></span>
                        </span>
                      </span>
                    </NavDropdown.Item>

                    <NavDropdown.Item href="#action/3.2">
                      <img className="dt-avatar me-3" src="https://via.placeholder.com/150x150" alt="User" />

                      <span className="media-body text-truncate">
                        <span className="user-name mb-1">Alia Joseph: </span>
                        <span className="message text-light-gray text-truncate">
                          Alia Joseph just joined Messenger! Be the first to send a welcome message or sticker.
                        </span>
                      </span>

                      <span className="action-area h-100 min-w-80 text-right">
                        <span className="meta-date ms-2 mb-1">9 hours ago</span>
                        <span className="toggle-button" data-toggle="tooltip" data-placement="left" title="Mark as read">
                          <span className="show"><i className="icon icon-dot-o icon-fw f-10 text-light-gray"></i></span>
                          <span className="hide"><i className="icon icon-dot icon-fw f-10 text-light-gray"></i></span>
                        </span>
                      </span>
                    </NavDropdown.Item>

                    <NavDropdown.Item href="#action/3.3">
                      <img className="dt-avatar me-3" src="https://via.placeholder.com/150x150" alt="User" />

                      <span className="media-body text-truncate">
                        <span className="user-name mb-1">Joshua Brian: </span>
                        <span className="message text-light-gray text-truncate">
                          Alex will explain you how to keep the HTML structure and all that.
                        </span>
                      </span>

                      <span className="action-area h-100 min-w-80 text-right">
                        <span className="meta-date ms-2 mb-1">12 hours ago</span>
                        <span className="toggle-button" data-toggle="tooltip" data-placement="left" title="Mark as read">
                          <span className="show"><i className="icon icon-dot-o icon-fw f-10 text-light-gray"></i></span>
                          <span className="hide"><i className="icon icon-dot icon-fw f-10 text-light-gray"></i></span>
                        </span>
                      </span>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item href="#action/3.4">
                      <div className="dropdown-menu-footer">
                        <a href="javascript:void(0)" className="card-link"> See All <i className="icon icon-arrow-right icon-fw"></i>
                        </a>
                      </div>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown 
                    title={<FontAwesomeIcon icon={faBell} />} 
                    className="dropdown-toggle-icon" 
                    align="end" 
                    id="notifications-dropdown">
                    <NavDropdown.Header>
                      <h4 className="title">Notifications (9)</h4>
                      <div className="ms-auto action-area">
                        <a>Mark All Read</a> <a className="ms-2"><FontAwesomeIcon icon={faGear} /></a>
                      </div>
                    </NavDropdown.Header>

                    <NavDropdown.Divider />

                    <NavDropdown.Item href="#action/3.1">
                      <img className="dt-avatar me-3" src="https://via.placeholder.com/150x150" alt="User"></img>

                      <span className="media-body">
                        <span className="message">
                          <span className="user-name">Stella Johnson</span> and <span className="user-name">Chris Harris </span>
                          have birthdays today. Help them celebrate!
                        </span>
                        <span className="meta-date ms-2">8 hours ago</span>
                      </span>
                    </NavDropdown.Item>

                    <NavDropdown.Item href="#action/3.2">
                      <img className="dt-avatar me-3" src="https://via.placeholder.com/150x150" alt="User" />

                      <span className="media-body">
                        <span className="message">
                          <span className="user-name">Jonathan Madano</span> commented on your post.
                        </span>
                        <span className="meta-date ms-2">9 hours ago</span>
                      </span>
                    </NavDropdown.Item>

                    <NavDropdown.Item href="#action/3.3">
                      <img className="dt-avatar me-3" src="https://via.placeholder.com/150x150" alt="User" />

                      <span className="media-body">
                        <span className="message">
                          <span className="user-name">Chelsea Brown</span> sent a video recomendation.
                        </span>
                        <span className="meta-date ms-2">
                          13 hours ago
                        </span>
                      </span>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    
                    <NavDropdown.Item href="#action/3.4">
                      <div className="dropdown-menu-footer">
                        <a href="javascript:void(0)" className="card-link"> See All <i className="icon icon-arrow-right icon-fw"></i>
                        </a>
                      </div>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown 
                    title={ <><img className="lm-avatar size-30" src="https://via.placeholder.com/150x150" alt="Profile Picture" />
                              <span className="lm-avatar-info d-none d-sm-block">
                                <span className="lm-avatar-name ms-2">
                                  {/* {Auth.getProfile().data.username} */}
                                  {user.username}
                                </span>
                              </span> 
                            </> } 
                    id="account-dropdown"
                    align="end">
                    <Link className="dropdown-item" to="/me">Profile</Link>
                    <Link className="dropdown-item" to="/pets">Pets</Link>
                    {/* <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item> */}
                    <NavDropdown.Item href="#action/3.3">Theme</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </div>
              ) : (
                <>
                  <Link className="nav-link m-2" to="/login">
                    Login
                  </Link>
                  <Link className="nav-link m-2" to="/signup">
                    Signup
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
