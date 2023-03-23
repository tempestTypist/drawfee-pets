import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_ME } from '../utils/queries'
import { TOGGLE_READ, DELETE_MESSAGE } from '../utils/mutations'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight, faTrashCan, faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'

import { Container, Row, Col, Button, Card, Form, Tab, Tabs, Pagination  } from 'react-bootstrap'
import JankyTable from '../components/JankyTable'
import Loading from '../components/Loading'
import Auth from '../utils/auth'
const dateFormat = require('../utils/dateFormat');

const MessageCenter = ({ setErrors }) => {
	const { loading, data } = useQuery(QUERY_ME);

	const checkbox =
	(<div key={`default-checkbox`}>
		<Form.Check 
			type={`checkbox`}
		/>
	</div>);

	const toolbar = 
	(<div className="inbox-toolbar d-flex flex-row align-items-center">
		<FontAwesomeIcon icon={faRotateRight} size={"lg"} className="me-3" />
		<FontAwesomeIcon icon={faTrashCan} size={"lg"} className="me-3" />
		<Link
			to="/new-message"
			>
			New Message
		</Link>
	</div>);

	const user = data?.me || {};
	const inbox = user?.inbox;

  const [key, setKey] = useState('inbox');

	const getTimestamp = (date) => {
		const newDate = new Date()
		const today = dateFormat(newDate)
		console.log(today)
		const mmdd = today.split(",", 1)[0]
		const year = newDate.getFullYear()
		console.log(year)

		if ( date.split(",", 1)[0] === mmdd) {
			return date.split("at ")[1]
		}

		if ( date.split(" ")[2] === year.toString()) {
			return date.split(",", 1)
		}

		return date
	};

  const [deleteMessage, { error }] = useMutation(DELETE_MESSAGE, {
    update(cache, { data: { deleteMessage } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: deleteMessage },
        });

			} catch (err) {
				const { name, message } = err;
    
        setErrors({
          [name]: message,
        });
      }
    },
  });

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

  const handleDeleteMessage = async (messageId) => {
		try {
			const { data } = await deleteMessage({
				variables: { messageId },
			});
		} catch (err) {
			const { name, message } = err;
    
			setErrors({
				[name]: message,
			});
		}
  };

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

	const theadData = [ checkbox, "", toolbar, "", "", "" ];
  const tbodyData = inbox?.map((message, index) => (
		{
			id: index,
			items: [
				<Form.Check key={`${message._id}-checkbox`} type={`checkbox`}/>,
				<div className="janky-table__icon message-icon" />,
				<Link className={`message__${message.read ? "read" : "unread"}`} onClick={message.read ? null : () => readToggle(message._id)} to={`/messages/${message._id}`}>{message.messageTitle}</Link>,
				<Link to={`/profile/${message.messageAuthor}`}>{message.messageAuthor}</Link>,
				getTimestamp(message.createdAt),
				<div className="message-toolbar">
				<FontAwesomeIcon 
					icon={message.read ? faEnvelopeOpen : faEnvelope} 
					size={"lg"} 
					onClick={() => readToggle(message._id)}
					className="me-3" 
					/>
				<FontAwesomeIcon 
					icon={faTrashCan} 
					size={"lg"} 
					onClick={() => handleDeleteMessage(message._id)}
					className="me-3" 
					/>
				</div>
			]
		}
	));

  if (!user?.inbox) {
    return ( 
			<>
			<h2>Message Center</h2>
			<div className="btn-janky-wrapper">
				<Link className="btn-janky btn btn-theme" to="/new-message">New Message</Link>
			</div>
			</>
		)
  }

  return (
		<>
			<h2>Message Center</h2>

			{Auth.loggedIn() ? (
				<>
					{loading ? 
						<Loading />
					:
					<Tabs
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="my-3"
						>
						<Tab eventKey="inbox" title="Inbox">

							<JankyTable theadData={theadData} tbodyData={tbodyData} customClass="inbox" />
							{/* <JankyTable
								tableHeaders={[checkbox, "", toolbar ]}
								tableData={inbox.map((message) => (
									<tr key={message._id} className={`message message__${message.read ? "read" : "unread"} align-middle`}>
										<td>
											<div key={`default-checkbox`}>
												<Form.Check 
													type={`checkbox`}
												/>
											</div>
										</td>
										<td className="d-flex align-content-center">
											<div className="janky-table__icon message-icon__unread" />
										</td>
										<td 
											className="post-title w-100"
											onClick={message.read ? null : () => readToggle(message._id)}>
											<Link 
												to={`/messages/${message._id}`}>
												{message.messageTitle}
											</Link>
										</td>
										<td>
											<Link
												to={`/profile/${message.messageAuthor}`}
												>
												{message.messageAuthor}
											</Link>
										</td>
										<td className="text-center">{getTimestamp(message.createdAt)}</td>
										<td>
											<div className="message-toolbar">
												<FontAwesomeIcon 
													icon={message.read ? faEnvelopeOpen : faEnvelope} 
													size={"lg"} 
													onClick={() => readToggle(message._id)}
													className="me-3" 
													/>
												<FontAwesomeIcon 
													icon={faTrashCan} 
													size={"lg"} 
													onClick={() => handleDeleteMessage(message._id)}
													className="me-3" 
													/>
											</div>
										</td>
									</tr>
								))}
							/> */}
						</Tab>
						<Tab eventKey="notifications" title="Notifications">

						</Tab>
					</Tabs>
					}
				</>
				) : (
					<p>You have to be logged in to see this!</p>
				)}
			{/* <Pagination /> */}
		</>
  );
};

export default MessageCenter;