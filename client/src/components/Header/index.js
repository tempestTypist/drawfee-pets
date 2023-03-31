import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_ME } from '../../utils/queries'
import { TOGGLE_READ } from '../../utils/mutations'
import Auth from '../../utils/auth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEnvelope, faEnvelopeOpen, faGear } from '@fortawesome/free-solid-svg-icons'

import { Container, Row, Navbar, Nav, NavDropdown, Button, Offcanvas } from 'react-bootstrap' 
import Logo from '../../assets/images/drawfee-logos/drawfee-light.png'
import Loading from '../Loading'
const dateFormat = require('../../utils/dateFormat');

const Header = ({ theme, setTheme, setErrors }) => {
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

  const [toggleRead, { err }] = useMutation(TOGGLE_READ, {
    update(cache, { data: { toggleRead } }) {
      try {
				const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: toggleRead },
        });

			} catch (err) {
				const { name, message } = err;
    
        setErrors({
          [name]: message,
        });
      }
    },
  });

	const readToggle = async (messageId) => {
		try {
			const { data } = await toggleRead({
				variables: { messageId },
			});
		} catch (err) {
			const { name, message } = err;
    
			setErrors({
				[name]: message,
			});
		}
  };

  const markAllRead = async () => {

  }

	const getTimestamp = (date) => {
		const newDate = new Date()
		const today = dateFormat(newDate)
		// console.log(today)
		const mmdd = today.split(",", 1)[0]
		const year = newDate.getFullYear()
		// console.log(year)

		if ( date.split(",", 1)[0] === mmdd) {
			return date.split("at ")[1]
		}

		if ( date.split(" ")[2] === year.toString()) {
			return date.split(",", 1)
		}

		return date
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
  }, [theme, inbox]);
  
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
                    <Link to="/community-forums" className="nav-link">
                      Community
                    </Link>
                    
                    <Link to="/create-pet" className="nav-link">
                      Create a Pet
                    </Link>

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
                          <a onClick={() => markAllRead()}>Mark All Read</a>
                        </div>
                      </NavDropdown.Header>

                      <NavDropdown.Divider />

                      {inbox && inbox.map((message) => (
                          [message.read ? 
                            null
                          :
                            <Link 
                              key={message._id}
                              to={`/messages/${message._id}`} 
                              onClick={message.read ? null : () => readToggle(message._id)}
                              className="d-flex justify-content-between dropdown-item"
                              >
                              <span className="media-body text-truncate">
                                <span className="user-name mb-1">{message.messageAuthor}: </span>
                                <span className="message text-light-gray text-truncate">{message.messageTitle}</span>
                              </span>

                              <span className="action-area h-100 min-w-80">
                                <span className="meta-date ms-2 mb-1">{getTimestamp(message.createdAt)}</span>
                              </span>
                            </Link>
                          ]
                      ))}

                      <NavDropdown.Divider />

                      <Link to="/message-center/inbox" className="dropdown-item dropdown-menu-footer card-link">
                        See All 
                      </Link>
                    </NavDropdown>

                    <NavDropdown 
                      title={<>
                        <FontAwesomeIcon className="lg-me-2 d-none d-lg-block dropdown-icon" icon={faBell} />
                        <span className="d-lg-none">Notifications</span>
                      </>} 
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

                      <NavDropdown.Item className="d-flex justify-content-between">
                        <span className="media-body text-truncate">
                          <img className="dt-avatar me-2" src="https://via.placeholder.com/36x36" alt="User"></img>
                          <span className="message">
                            <span className="user-name">Stella Johnson</span> and <span className="user-name">Chris Harris </span>
                            have birthdays today. Help them celebrate!
                          </span>
                        </span>
                        <span className="meta-date ms-2">8 hours ago</span>
                      </NavDropdown.Item>

                      <NavDropdown.Divider />
                      
                      <Link to="/message-center/notifications" className="dropdown-item dropdown-menu-footer card-link">
                        See All 
                      </Link>
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
                    <Nav.Item>
                    <Link className="nav-link m-2" to="/login">
                      Login
                    </Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Link className="nav-link m-2" to="/signup">
                      Signup
                    </Link>
                    </Nav.Item>
                    <div className="theme-toggler ms-2">
                      <div className="toggle">
                        <input className="toggle-input" type="checkbox" checked={checked} onChange={toggleTheme} />
                        <div className="toggle-bg"></div>
                        <div className="toggle-switch">
                          <div className="toggle-switch-figure"></div>
                          <div className="toggle-switch-figureAlt"></div>
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
