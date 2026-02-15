import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../../utils/queries'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faGear } from '@fortawesome/free-solid-svg-icons'
import { NavDropdown } from 'react-bootstrap' 

export const Notifications = () => {
	const { error, loading, data } = useQuery(QUERY_ME);

	const user = data?.me || {};
	const inbox = user?.inbox
	const read = inbox?.map((message) => message.read).filter(Boolean)
	const unread = inbox?.length - read?.length

	const markAllRead = async () => {

	}

	const notificationTitle = 
				<>
					<FontAwesomeIcon className="lg-me-2 d-none d-lg-block dropdown-icon" icon={faBell} />
					<span className="d-lg-none">Notifications</span>
				</>
	
	return (
		<NavDropdown 
			title={notificationTitle} 
			align="end" 
			id="notifications-dropdown">
				
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
	);
}