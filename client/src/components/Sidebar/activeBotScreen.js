import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../../utils/queries'
import { Image } from 'react-bootstrap'
import ImageImport from '../../utils/imageimport'
import Loading from '../Loading'

export const ActiveBotScreen = () => {
	const { loading, data } = useQuery(QUERY_ME);
	const user = data?.me || {};
	const activeBot = user?.activeBot;
	const { model, chassis, colour, botName } = activeBot || {};
	const images = ImageImport.importAll(require.context('../../assets/images/bots', true, /\.(png|jpe?g|svg)$/));
console.log(activeBot)
	return (
		loading ? 
			<Loading /> : 
			(!activeBot) ? <p>No bots active</p> :
				<>
				<div className="position-relative h-100 w-100">
					<Image 
						fluid
						className="" 
						src={images[`MODEL-${model}/${chassis}/head-${colour}.png`]}
						alt="Bot Head"
					/>
					<Image 
						fluid
						className="" 
						src={images[`MODEL-${model}/arms.png`]}
						alt="Bot Arms"
					/>
					<Image 
						fluid
						className="" 
						src={images[`MODEL-${model}/body.png`]}
						alt="Bot Body"
					/>
					<Image 
						fluid
						className="" 
						src={images[`MODEL-${model}/legs.png`]}
						alt="Bot Legs"
					/>
				</div>
				<p className="font-supersonic text-center fw-bold my-2">{botName}</p>
				</>
	);
}