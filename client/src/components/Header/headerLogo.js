import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap' 
import Logo from '../../assets/images/drawfee-logos/drawfee-light.png'

export const HeaderLogo = () => {

	return (
		<Navbar.Brand>
			<Link to="/">
				<img src={Logo} />
			</Link>
		</Navbar.Brand>
	);
}