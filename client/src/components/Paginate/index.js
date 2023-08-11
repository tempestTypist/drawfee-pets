import React from 'react';
import JankyButton from '../../components/JankyButton'
import { ButtonGroup, Pagination } from 'react-bootstrap'

const Paginate = ({ postsPerPage, totalPosts, currentPage, paginate, previousPage, nextPage }) => {
	const pageNumbers = [];
 
	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		 pageNumbers.push(i);
	}

	return (
		<Pagination aria-label="Pagination" className="m-0">
			<ButtonGroup className="me-2">
				<JankyButton label="«" />
				{/* <JankyButton label="‹" /> */}
				<li onClick={previousPage} className="page-number">
					‹
				</li>
				{pageNumbers.map((number) => (
					<li 
						key={number}
						onClick={() => paginate(number)}
						className={
							'page-number ' + (number === currentPage ? 'active' : '')
						}
					>
						{number}
					</li>
				))}
				<li onClick={nextPage} className="page-number">
					›
				</li>
				{/* <JankyButton label="›" /> */}
				<JankyButton label="»" />
			</ButtonGroup>
		</Pagination>
	);
};
 
export default Paginate;