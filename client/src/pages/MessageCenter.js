import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_ME } from '../utils/queries'
import { DELETE_MESSAGE } from '../utils/mutations'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight, faTrashCan } from '@fortawesome/free-solid-svg-icons'

import { Container, Row, Col, Button, Card, Form, Tab, Tabs, Pagination  } from 'react-bootstrap'
import JankyTable from '../components/JankyTable'

const MessageCenter = ({ setErrors }) => {
	const { loading, data } = useQuery(QUERY_ME);

	const user = data?.me || {};
	const inbox = user.inbox;
  // const messages = data?.inbox || [];

  const [key, setKey] = useState('inbox');

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

  const handleDeleteMessage = async (messageId) => {
		try {
			const { data } = await deleteMessage({
				variables: { messageId },
			});
		} catch (err) {
			console.error(err);
		}
  };

	const checkbox =
		(<div key={`default-checkbox`}>
			<Form.Check 
				type={`checkbox`}
				id={`default-checkbox`}
			/>
		</div>);

	const toolbar = 
		(<div className="inbox-toolbar d-flex flex-row align-items-center">
			<FontAwesomeIcon icon={faRotateRight} size={"lg"} className="me-3" />
			<FontAwesomeIcon icon={faTrashCan} size={"lg"} className="me-3" />
			<Link
				className=""
				to="/new-message"
				>
				New Message
			</Link>
		</div>);

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

		<Tabs
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="my-3"
    >
      <Tab eventKey="inbox" title="Inbox">
				<JankyTable
					tableHeaders={[checkbox, "", toolbar ]}
					tableData={inbox.map((message) => (
						<tr key={message._id}>
							<td>
								<div key={`default-checkbox`}>
									<Form.Check 
										type={`checkbox`}
										id={`default-checkbox`}
									/>
								</div>
							</td>
							<td className="d-flex align-content-center">
								<div className="janky-table__icon message-icon__unread" />
							</td>
							<td className="post-title w-100">
								<Link to={`/messages/${message._id}`}>{message.messageTitle}</Link>
							</td>
							<td>
								<Link
									className=""
									to={`/profile/${message.messageAuthor}`}
									>
									{message.messageAuthor}
								</Link>
							</td>
							<td className="text-center">{message.createdAt}</td>
							<td className="message-toolbar">
								{/* mark read */}
								{/* delete */}
								<button
									className="btn"
									onClick={() => handleDeleteMessage(message._id)}>
									X
								</button>
							</td>
						</tr>
					))}
				/>
      </Tab>
      <Tab eventKey="notifications" title="Notifications">

      </Tab>
    </Tabs>

		{/* <Pagination /> */}
		</>
  );
};

export default MessageCenter;