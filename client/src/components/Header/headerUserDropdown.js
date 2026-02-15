import Auth from '../../utils/auth'
import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../../utils/queries'
import { Link } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap' 
import { ThemeToggler } from '../ThemeToggler'

export const UserDropdown = () => {
	const { error, loading, data } = useQuery(QUERY_ME);
	const user = data?.me || {};

	const profilePic = 
					<>
						<img className="lm-avatar size-30 me-2 d-none d-lg-block" src="https://placehold.co/150x150/png" alt="Profile Picture" />
						<span className="lm-avatar-info d-sm-block">
							<span className="lm-avatar-name">
								{user.username}
							</span>
						</span> 
					</>

	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};

	return (
		<NavDropdown 
			title={ profilePic } 
			id="account-dropdown"
			align="end"
			>
			<Link className="dropdown-item" to="/me">Profile</Link>
			<Link className="dropdown-item" to="/bots">Bots</Link>
			<ThemeToggler/>

			<NavDropdown.Divider />

			<NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
		</NavDropdown>
	);
}