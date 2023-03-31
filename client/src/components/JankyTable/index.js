import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TableRow from "../TableRow";
import TableHead from "../TableHead";

import { Container, Row, Col, Button, Card, ButtonGroup, Table, Pagination  } from 'react-bootstrap'

const JankyTable = ({ theadData, tbodyData, customClass }) => {

	return (
		<Table className={"text-nowrap janky-table " + customClass} responsive>
			<thead>
					<tr>
							{theadData.map((h, index) => {
									return <TableHead key={`header-${index}`} item={h} />;
							})}
					</tr>
			</thead>
			<tbody>
					{tbodyData.map((item) => {
							return <TableRow key={`post-${item.id}`} data={item.items} />;
					})}
			</tbody>
	</Table>
	);
};

export default JankyTable;