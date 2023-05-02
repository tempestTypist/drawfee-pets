import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { Link, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_ME, QUERY_INBOX, QUERY_SINGLE_MESSAGE } from '../utils/queries'
import { TOGGLE_READ, DELETE_MESSAGE, DELETE_MANY_MESSAGES } from '../utils/mutations'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight, faTrashCan, faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'

import { Container, Row, Col, Button, Card, Form, Tab, Tabs, Spinner, Pagination  } from 'react-bootstrap'
import JankyTable from '../components/JankyTable'
import Checkbox from '../components/Checkbox'
import Loading from '../components/Loading'
import Auth from '../utils/auth'
const dateFormat = require('../utils/dateFormat');

const MessageCenter = ({ setErrors }) => {
	const { tab: tabParam } = useParams();

	const username = Auth.getProfile().data.username 

	const { loading, data, refetch } = useQuery(QUERY_INBOX, { 
		variables: { username: username }
	});

	const inbox = data?.inbox || [];


	// const { loading, data, refetch } = 
	// 	tabParam ? 
	// 		useQuery(`QUERY_${tabParam.toUpperCase()}`, { variables: { username: Auth.getProfile().data.username }})
	// 	: 
	// 		useQuery(QUERY_INBOX, { variables: { username: Auth.getProfile().data.username }})

  const [key, setKey] = useState(tabParam ? tabParam : 'inbox');
	const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

	const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(inbox?.map(message => message._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

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

  const [deleteMessage, { error }] = useMutation(DELETE_MESSAGE, {
    update(cache, { data: { deleteMessage } }) {
      try {
        cache.writeQuery({
          query: QUERY_INBOX,
          data: { inbox: deleteMessage },
        });
				refetch()
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

	// const [deleteManyMessages, { errror }] = useMutation(DELETE_MANY_MESSAGES, {
  //   update(cache, { data: { deleteManyMessages } }) {
  //     try {
  //       cache.writeQuery({
  //         query: QUERY_INBOX,
  //         data: { me: deleteManyMessages },
  //       });

	// 		} catch (err) {
	// 			const { name, message } = err;
    
  //       setErrors({
  //         [name]: message,
  //       });
  //     }
  //   },
  // });

	// const handleDeleteMany = async (messageId) => {
	// 	try {
	// 		const { data } = await deleteManyMessages({
	// 			variables: { messageId },
	// 		});
	// 	} catch (err) {
	// 		const { name, message } = err;
    
	// 		setErrors({
	// 			[name]: message,
	// 		});
	// 	}
  // };

  const [toggleRead, { err }] = useMutation(TOGGLE_READ, {
    update(cache, { data: { toggleRead } }) {
      try {
				cache.writeQuery({
          query: QUERY_SINGLE_MESSAGE,
          data: { message: {...toggleRead, read: !toggleRead.read} },
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

	const toolbar = 
	(<div className="inbox-toolbar d-flex flex-row align-items-center">
		{loading ? 
			(<Spinner
				as="span"
				className="me-3" 
				animation="border"
				size="sm"
				role="status"
				aria-hidden="true" />) 
		:
			(<FontAwesomeIcon 
				icon={faRotateRight} 
				size={"lg"} 
				className="me-3" 
				onClick={() => refetch()} />) 
		}
		<FontAwesomeIcon icon={faTrashCan} size={"lg"} className="me-3" />
		{/* onClick={() => handleDeleteMany(isCheck)} */}
		<Link to="/new-message" >
			New Message
		</Link>
	</div>);

	const theadData = [ <Checkbox type="checkbox" name="selectAll" id="selectAll" handleClick={handleSelectAll} isChecked={isCheckAll}/>, "", toolbar, "", "", "" ];
  const tbodyData = inbox?.map((message, index) => (
		{
			id: index,
			items: [
				<Checkbox type="checkbox" id={`${message._id}`} handleClick={handleClick} isChecked={isCheck.includes(`${message._id}`)}/>,
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

  if (!inbox) {
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
							</Tab>
							<Tab eventKey="notifications" title="Notifications">
								{/* <JankyTable theadData={notiHead} tbodyData={notiBody} customClass="notifications" /> */}
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