import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Container, Row, Col, Button, Card, ButtonGroup, Table, Pagination  } from 'react-bootstrap'

const JankyTable = (props) => {
	const { tableHeaders, tableData } = props

	return (
		<Table className="table table-hover janky-table text-nowrap mb-4" cellSpacing="0" responsive>
			{tableHeaders ? 
				<thead>
					<tr>
						{tableHeaders.map((header) => (
								<th>{header}</th>
						))}
					</tr>
				</thead>
			: 
			<></>}

			<tbody>
					{tableData}
					{/* {tableData.map((td, index) => {
              return (
                <tr key={td._id}>
                  {Object.keys(tableHeaders).map((header, index) => {
                      <td key={index}>
                          <span>{td[header]}</span>                      
                      </td>

                  })}
                </tr>
              );
            })} */}

					{/* {tableData &&
						tableData.map((td, index) => {
							return (
								<tr key={td._id}>
									{Object.keys(tableHeaders).map((header, index) => {
										<td key={index}>
											<span>{td[header]}</span>
										</td>
									})}
								</tr>
							)
						}
						
						
						// (
						// 	<tr key={td._id}>
						// 		<td>
						// 			<div className="janky-table__icon message-icon__unread" />
						// 		</td>
						// 		<td className="post-title w-100">
						// 			<Link to={`/messages/${message._id}`}>{message.messageTitle}</Link>
						// 		</td>
						// 		<td>
						// 			<Link
						// 				className=""
						// 				to={`/profile/${message.messageAuthor}`}
						// 				>
						// 				{message.messageAuthor}
						// 			</Link>
						// 		</td>
						// 		<td className="text-center">{message.createdAt}</td>
						// 		<td className="message-toolbar">
						// 			<button
						// 				className="btn"
						// 				onClick={() => handleDeleteMessage(message._id)}>
						// 				X
						// 			</button>
						// 		</td>
						// 	</tr>
						// )
						)
						} */}

			</tbody>
		</Table>
	);
};

export default JankyTable;