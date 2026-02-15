import Auth from '../../utils/auth'
import * as motion from "motion/react-client"
import { LoginScreen } from './loginScreen'
import { ActiveBotScreen } from './activeBotScreen'

export const SidebarScreen = () => {
	const ScreenContent = Auth.loggedIn() ? ActiveBotScreen : LoginScreen;
	const sidebar = {
    offscreen: {
      y: -400
    },
    onscreen: {
      y: -75,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1
      }
    }
  }

  return (
		<motion.div
			initial={sidebar.offscreen}
			animate={sidebar.onscreen}
			className="w-100"
			>
			<div className="hanger-wrapper">
				<div className="hanger"></div>
			</div>

			<div className="sidebar-screen">
				<div className="sidebar-screen__inner">
					<ScreenContent/>
					<div className="sidebar-scanlines"></div>
				</div>
			</div>
		</motion.div>
  );
}