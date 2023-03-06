import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Card, Tab, Tabs, Pagination  } from 'react-bootstrap'

import JankyTable from '../components/JankyTable'

const MessageCenter = () => {
  const [key, setKey] = useState('inbox');

	

  return (
		<>
		<Tabs
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="inbox" title="Inbox">
				{/* <JankyTable
					tableHeaders={["Message", "From", "Received"]}
					tableData={messages.map((post) => (
						<tr>
							<td>
								<div className="post-icon" />
							</td>
							<td className="post-title w-100">
								<Link to={`/posts/${post._id}`}>{post.postTitle}</Link>
							</td>
							<td>
								<Link
									className=""
									to={`/profile/${post.postAuthor}`}
									>
									{post.postAuthor}
								</Link>
							</td>
							<td className="text-center">{post.comments.length}</td>
							<td>
								{post.comments.length > 0 ? (
									<>{post.comments[0].createdAt}<br/>by {post.comments[0].commentAuthor}</>
								) : (
									<>{post.createdAt}<br/>by {post.postAuthor}</>
								)}
							</td>
						</tr>
					))}
				/> */}
      </Tab>
      <Tab eventKey="notifications" title="Notifications">
				{/* <JankyTable	
					tableData={notifications.map((notification) => (
						<tr>
							<td>
								<div className="post-icon" />
							</td>
							<td className="post-title w-100">
								<Link to={`/posts/${post._id}`}>{post.postTitle}</Link>
							</td>
							<td>
								<Link
									className=""
									to={`/profile/${post.postAuthor}`}
									>
									{post.postAuthor}
								</Link>
							</td>
							<td className="text-center">{post.comments.length}</td>
							<td>
								{post.comments.length > 0 ? (
									<>{post.comments[0].createdAt}<br/>by {post.comments[0].commentAuthor}</>
								) : (
									<>{post.createdAt}<br/>by {post.postAuthor}</>
								)}
							</td>
						</tr>
					))}
				/> */}
      </Tab>
    </Tabs>

		{/* <Pagination /> */}
		</>
  );
};

export default MessageCenter;