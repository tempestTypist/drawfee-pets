import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../../utils/queries'
import Auth from '../../utils/auth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEnvelope, faEnvelopeOpen, faGear } from '@fortawesome/free-solid-svg-icons'

import { Container, Row, Navbar, Nav, NavDropdown, Button, Offcanvas } from 'react-bootstrap' 
import Logo from '../../assets/images/drawfee-logos/drawfee-light.png'
import Loading from '../Loading'

const Header = ({ theme, setTheme }) => {
  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me || {};
  const inbox = user?.inbox
  const read = inbox?.map((message) => message.read).filter(Boolean)
  const unread = inbox?.length - read?.length

  const [isHovered, setHovered] = useState(false)
  const [checked, setChecked] = useState(false)

  const toggleTheme = () => {
    setChecked((prev) => (!prev));

    if (checked === false) {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  useEffect(() => {
    if (theme === 'dark') {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [theme]);
  
  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" variant="dark" className="py-0">
      {loading ? (
        <Loading />
      ) : (
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">
              <img src={Logo} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Offcanvas id="responsive-navbar-nav" placement="end">
            <Offcanvas.Header closeVariant="white" closeButton>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="justify-content-end align-items-lg-center flex-grow-1 pe-3">
                {Auth.loggedIn() ? (
                  <>
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
                      title={<>
                        <FontAwesomeIcon 
                          className="lg-me-2 d-none d-lg-block dropdown-icon" 
                          icon={isHovered ? faEnvelopeOpen : faEnvelope} 
                        />
                        <span className="d-lg-none">Messages</span>
                      </>}
                      align="end" 
                      id="messages-dropdown"
                      >

                      <NavDropdown.Header>
                        <h4 className="title">Messages ({`${unread}`})</h4>
                        <div className="ms-auto action-area">
                          <a href="javascript:void(0)">Mark All Read</a>
                        </div>
                      </NavDropdown.Header>

                      <NavDropdown.Divider />
                      {inbox && inbox.map((message) => (
                        <>
                          {message.read ? 
                            <>
                            </> 
                          :
                            <Link to={`/messages/${message._id}`} className="d-flex justify-content-between dropdown-item">
                              <span className="media-body text-truncate">
                                <span className="user-name mb-1">{message.messageAuthor}: </span>
                                <span className="message text-light-gray text-truncate">{message.messageTitle}</span>
                              </span>

                              <span className="action-area h-100 min-w-80">
                                <span className="meta-date ms-2 mb-1">{message.createdAt.split(",", 1)}</span>
                              </span>
                            </Link>
                          }
                        </>
                      ))}
                      <NavDropdown.Divider />

                      <Link to="/message-center" className="dropdown-item dropdown-menu-footer card-link">
                        See All 
                      </Link>
                    </NavDropdown>

                    <NavDropdown 
                      title={<>
                        <FontAwesomeIcon className="lg-me-2 d-none d-lg-block dropdown-icon" icon={faBell} />
                        <span className="d-lg-none">Notifications</span>
                      </>} 
                      className="" 
                      align="end" 
                      id="notifications-dropdown"
                      >
                      <NavDropdown.Header>
                        <h4 className="title">Notifications (9)</h4>
                        <div className="ms-auto action-area">
                          <a>Mark All Read</a> <a className="ms-2"><FontAwesomeIcon icon={faGear} /></a>
                        </div>
                      </NavDropdown.Header>

                      <NavDropdown.Divider />

                      <NavDropdown.Item className="d-flex justify-content-between" href="#action/3.1">
                        <span className="media-body text-truncate">
                          <img className="dt-avatar me-2" src="https://via.placeholder.com/36x36" alt="User"></img>
                          <span className="message">
                            <span className="user-name">Stella Johnson</span> and <span className="user-name">Chris Harris </span>
                            have birthdays today. Help them celebrate!
                          </span>
                        </span>
                        <span className="meta-date ms-2">8 hours ago</span>
                      </NavDropdown.Item>

                      <NavDropdown.Item className="d-flex justify-content-between" href="#action/3.2">
                        <span className="media-body text-truncate">
                          <img className="dt-avatar me-2" src="https://via.placeholder.com/36x36" alt="User" />
                          <span className="message">
                            <span className="user-name">Jonathan Madano</span> commented on your post.
                          </span>
                        </span>
                        <span className="meta-date ms-2">9 hours ago</span>
                      </NavDropdown.Item>

                      <NavDropdown.Item className="d-flex justify-content-between" href="#action/3.3">
                        <span className="media-body text-truncate">
                          <img className="dt-avatar me-2" src="https://via.placeholder.com/36x36" alt="User" />
                          <span className="message">
                            <span className="user-name">Chelsea Brown</span> sent a video recomendation.
                          </span>
                        </span>
                        <span className="meta-date ms-2">
                          13 hours ago
                        </span>
                      </NavDropdown.Item>

                      <NavDropdown.Divider />
                      
                      <NavDropdown.Item href="#action/3.4">
                        <div className="dropdown-menu-footer">
                          <Link to="/message-center" className="card-link"> 
                            See All 
                            <i className="icon icon-arrow-right icon-fw"></i>
                          </Link>
                        </div>
                      </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown 
                      title={ <><img className="lm-avatar size-30 me-2 d-none d-lg-block" src="https://via.placeholder.com/150x150" alt="Profile Picture" />
                                <span className="lm-avatar-info d-sm-block">
                                  <span className="lm-avatar-name">
                                    {/* {Auth.getProfile().data.username} */}
                                    {user.username}
                                  </span>
                                </span> 
                              </> } 
                      id="account-dropdown"
                      align="end"
                      >
                      <Link className="dropdown-item" to="/me">Profile</Link>
                      <Link className="dropdown-item" to="/pets">Pets</Link>
                      <div className="theme-toggler">
                        <div className="toggle">
                          <input 
                            className="toggle-input" 
                            type="checkbox" 
                            checked={checked} 
                            onChange={toggleTheme} 
                          />
                          <div className="toggle-bg"></div>
                          <div className="toggle-switch">
                            <div className="toggle-switch-figure"></div>
                            <div className="toggle-switch-figureAlt"></div>
                          </div>  
                        </div>
                      </div>

                      <NavDropdown.Divider />

                      <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Link className="nav-link m-2" to="/login">
                      Login
                    </Link>
                    <Link className="nav-link m-2" to="/signup">
                      Signup
                    </Link>
                    <div className="theme-toggler ms-2">
                      <div class="toggle">
                        <input class="toggle-input" type="checkbox" checked={checked} onChange={toggleTheme} />
                        <div class="toggle-bg"></div>
                        <div class="toggle-switch">
                          <div class="toggle-switch-figure"></div>
                          <div class="toggle-switch-figureAlt"></div>
                        </div>  
                      </div>
                    </div>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      )}
    </Navbar>
  );
};

export default Header;
