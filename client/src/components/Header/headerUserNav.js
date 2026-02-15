import { Link } from 'react-router-dom'
import { Messages } from './headerMessages'
import { Notifications } from './headerNotifications'
import { UserDropdown } from './headerUserDropdown'

export const UserNav = () => {
	
	return (
		<>
			<Link to="/community-forums" className="nav-link">
				Community
			</Link>
			
			<Link to="/bot-builder" className="nav-link">
				Build a Bot
			</Link>

			<Messages/>

			<Notifications/>

			<UserDropdown/>
		</>
	);
}