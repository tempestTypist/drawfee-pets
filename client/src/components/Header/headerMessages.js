import { useContext, useState } from 'react'
import { ErrorContext } from '../../contexts/ErrorContext'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_ME } from '../../utils/queries'
import { TOGGLE_READ } from '../../utils/mutations'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'
import { NavDropdown } from 'react-bootstrap' 

const dateFormat = require('../../utils/dateFormat');

export const Messages = () => {
	const { setErrors } = useContext(ErrorContext);
	const { error, loading, data } = useQuery(QUERY_ME);
	const user = data?.me || {};
	const inbox = user?.inbox
	const read = inbox?.map((message) => message.read).filter(Boolean)
	const unread = inbox?.length - read?.length

	const [isHovered, setHovered] = useState(false)

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
	
	return (
		<NavDropdown 
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			title={
				<>
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

			{/* add loading logic */}
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
	);
}