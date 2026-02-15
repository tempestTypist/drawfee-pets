import { Link } from 'react-router-dom'

export const LoginScreen = () => {

	return (
		<>
			<Link className="sidebar-screen-btn" to="/login" title="LOGIN">LOGIN</Link>
				or
			<Link className="sidebar-screen-btn" to="/signup" title="SIGNUP">SIGNUP</Link>
		</>
	);
};