import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap' 
import { ThemeToggler } from '../ThemeToggler'

export const GuestNav = () => {
	
	return (
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

			<ThemeToggler/>
		</>
	);
}