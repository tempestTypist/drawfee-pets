import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TableRow from "../TableRow";
import TableHead from "../TableHead";

import { Container, Row, Col, Button, Card, ButtonGroup, Table, Pagination  } from 'react-bootstrap'

const JankyTable = ({ theadData, tbodyData, customClass }) => {
console.log(tbodyData)

	return (
		<Table className={"text-nowrap janky-table " + customClass} responsive>
			<thead>
					<tr>
							{theadData.map((h) => {
									return <TableHead key={h} item={h} />;
							})}
					</tr>
			</thead>
			<tbody>
					{tbodyData.map((item) => {
							return <TableRow key={item.id} data={item.items} />;
					})}
			</tbody>
	</Table>



		// <Table className="table table-hover janky-table text-nowrap mb-4" cellSpacing="0" responsive>
		// 	{tableHeaders ? 
		// 		<thead>
		// 			<tr>
		// 				{tableHeaders.map((header) => (
		// 						<th>{header}</th>
		// 				))}
		// 			</tr>
		// 		</thead>
		// 	: 
		// 	<></>}

		// 	<tbody>
		// 			{tableData}


		// 	</tbody>
		// </Table>
	);
};

export default JankyTable;