import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Card, ButtonGroup, Table, Pagination  } from 'react-bootstrap'

const JankyTable = (props) => {
	const { tableHeaders, tableData } = props

	return (
		<Table className="table table-hover table-users text-nowrap mb-4" cellSpacing="0" responsive>
			<thead>
				<tr>
					<th></th>
					{tableHeaders &&
						tableHeaders.map((header) => (
							<th>{header}</th>
					))}
				</tr>
			</thead>

			<tbody>
					{tableData}
			</tbody>
		</Table>
	);
};

export default JankyTable;