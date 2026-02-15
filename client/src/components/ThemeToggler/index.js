import { useContext, useState, useEffect } from 'react'
import { ThemeContext, useTheme } from '../../contexts/ThemeContext'

export const ThemeToggler = () => {
	const [checked, setChecked] = useState(false)
	const { setTheme } = useContext(ThemeContext);
  const { theme } = useTheme();

	const toggleTheme = () => {
		setChecked((prev) => (!prev));

		if (checked === false) {
			setTheme("dark");
			localStorage.setItem('theme', 'dark');
		} else {
			setTheme("light");
			localStorage.setItem('theme', 'light');
		}
	};

	useEffect(() => {
		if (theme === 'dark') {
			setChecked(true)
		} else {
			setChecked(false)
		}
	}, [theme]);

	return (
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
	);
}