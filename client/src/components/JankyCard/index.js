import React from 'react';
import { Card } from 'react-bootstrap';

const JankyCard = () => {

  return (
	<>
	<Card.Header className="janky-card-header">
	Blog Post Title
	</Card.Header>  
	<Card className="janky-card-wrapper mb-5">            
	<Card.Body className="janky-card-body">
	<div className="janky-card-inner-body">
		<Card.Title>Card Title</Card.Title>
		<Card.Text>
		Some quick example text to build on the card title and make up the bulk of
		the card's content.
		</Card.Text>
		<Button variant="primary">Go somewhere</Button>
	</div>
	</Card.Body>
	</Card>
	</>


	// <div className="df-card-wrapper mb-3">
	// 	<div className="df-card" style={{ width: '18rem' }}>
	// 		<Card>
	// 			<Card.Body>
	// 				<Card.Title>Card Title</Card.Title>
	// 				<Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
	// 				<Card.Text>
	// 					Some quick example text to build on the card title and make up the bulk of
	// 					the card's content.
	// 				</Card.Text>
	// 				<Card.Link href="#">Card Link</Card.Link>
	// 				<Card.Link href="#">Another Link</Card.Link>
	// 			</Card.Body>
	// 		</Card>
	// 	</div>
	// </div>
  );
};

export default JankyCard;
