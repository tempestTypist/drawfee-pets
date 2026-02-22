import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Table, Figure, Form, FormControl, InputGroup, FloatingLabel, Button, SplitButton } from 'react-bootstrap';
import { Accordion, Alert, Badge, Breadcrumb, ButtonGroup, ButtonToolbar, Card, CardGroup, Carousel, CloseButton, Dropdown, DropdownButton, ListGroup, ListGroupItem, Nav, NavDropdown, Navbar, Offcanvas, Pagination, ProgressBar, Spinner, Toast  } from 'react-bootstrap';
import JankyButton from '../components/JankyButton';

const Assets = () => {

	const [isLoading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

	const variants = [
		'Primary',
		'Secondary',
		'Success',
		'Danger',
		'Warning',
		'Info',
		'Light',
		'Dark',
	];

	function simulateNetworkRequest() {
		return new Promise((resolve) => setTimeout(resolve, 2000));
	}
	
	useEffect(() => {
		if (isLoading) {
			simulateNetworkRequest().then(() => {
				setLoading(false);
			});
		}
	}, [isLoading]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
	
	const handleClick = () => setLoading(true);

  return (
    <main>
			<div>
				<section id="content">
					<article className="my-3" id="typography">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Typography</h3>
						</div>

						<div>
							<div className="bd-example">
							<p className="display-1">Display 1</p>
							<p className="display-2">Display 2</p>
							<p className="display-3">Display 3</p>
							<p className="display-4">Display 4</p>
							<p className="display-5">Display 5</p>
							<p className="display-6">Display 6</p>
							</div>

							<div className="bd-example">
							<p className="h1">Heading 1</p>
							<p className="h2">Heading 2</p>
							<p className="h3">Heading 3</p>
							<p className="h4">Heading 4</p>
							<p className="h5">Heading 5</p>
							<p className="h6">Heading 6</p>
							</div>

							<div className="bd-example">
							<p className="lead">
								This is a lead paragraph. It stands out from regular paragraphs.
							</p>
							</div>

							<div className="bd-example">
							<p>You can use the mark tag to <mark>highlight</mark> text.</p>
							<p><del>This line of text is meant to be treated as deleted text.</del></p>
							<p><s>This line of text is meant to be treated as no longer accurate.</s></p>
							<p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
							<p><u>This line of text will render as underlined.</u></p>
							<p><small>This line of text is meant to be treated as fine print.</small></p>
							<p><strong>This line rendered as bold text.</strong></p>
							<p><em>This line rendered as italicized text.</em></p>
							</div>

							<div className="bd-example">
							<blockquote className="blockquote">
								<p>A well-known quote, contained in a blockquote element.</p>
								<footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
							</blockquote>
							</div>

							<div className="bd-example">
							<ul className="list-unstyled">
								<li>This is a list.</li>
								<li>It appears completely unstyled.</li>
								<li>Structurally, it's still a list.</li>
								<li>However, this style only applies to immediate child elements.</li>
								<li>Nested lists:
									<ul>
										<li>are unaffected by this style</li>
										<li>will still show a bullet</li>
										<li>and have appropriate left margin</li>
									</ul>
								</li>
								<li>This may still come in handy in some situations.</li>
							</ul>
							</div>

							<div className="bd-example">
							<ul className="list-inline">
								<li className="list-inline-item">This is a list item.</li>
								<li className="list-inline-item">And another one.</li>
								<li className="list-inline-item">But they're displayed inline.</li>
							</ul>
							</div>
						</div>
					</article>

					<article className="my-3" id="images">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Images</h3>
						</div>
						<div className="bd-example">
							<Image className="bd-placeholder-img" width="200" height="200" style={{background: "gray"}} rounded />
						</div>
						<div className="bd-example">
							<Image className="bd-placeholder-img" width="200" height="200" style={{background: "gray"}} roundedCircle />
						</div>
						<div className="bd-example">
							<Image className="bd-placeholder-img" width="200" height="200" style={{background: "gray"}} thumbnail />
						</div>
						{/* <div className="bd-example" height="250">
							<Image src={March} className="bd-placeholder-img" height="250" style={{background: "gray"}} fluid />
						</div> */}
					</article>

					<article className="my-3" id="tables">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Tables</h3>
						</div>

							<h3>Default striped table</h3>
							<div className="bd-example">
								<Table striped bordered hover>
									<thead>
										<tr>
											<th>#</th>
											<th>First Name</th>
											<th>Last Name</th>
											<th>Username</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>1</td>
											<td>Mark</td>
											<td>Otto</td>
											<td>@mdo</td>
										</tr>
										<tr>
											<td>2</td>
											<td>Jacob</td>
											<td>Thornton</td>
											<td>@fat</td>
										</tr>
										<tr>
											<td>3</td>
											<td colSpan={2}>Larry the Bird</td>
											<td>@twitter</td>
										</tr>
									</tbody>
								</Table>
							</div>

							<h3>Small table</h3>
							<div className="bd-example">
								<Table striped bordered hover size="sm">
									<thead>
										<tr>
											<th>#</th>
											<th>First Name</th>
											<th>Last Name</th>
											<th>Username</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>1</td>
											<td>Mark</td>
											<td>Otto</td>
											<td>@mdo</td>
										</tr>
										<tr>
											<td>2</td>
											<td>Jacob</td>
											<td>Thornton</td>
											<td>@fat</td>
										</tr>
										<tr>
											<td>3</td>
											<td colSpan={2}>Larry the Bird</td>
											<td>@twitter</td>
										</tr>
									</tbody>
								</Table>
							</div>

							<h3>Table dark</h3>
							<div className="bd-example">
								<Table striped bordered hover variant="dark">
									<thead>
										<tr>
											<th>#</th>
											<th>First Name</th>
											<th>Last Name</th>
											<th>Username</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>1</td>
											<td>Mark</td>
											<td>Otto</td>
											<td>@mdo</td>
										</tr>
										<tr>
											<td>2</td>
											<td>Jacob</td>
											<td>Thornton</td>
											<td>@fat</td>
										</tr>
										<tr>
											<td>3</td>
											<td colSpan={2}>Larry the Bird</td>
											<td>@twitter</td>
										</tr>
									</tbody>
								</Table>
							</div>

							<h3>Table responsive</h3>
							<div className="bd-example">
								<Table responsive>
									<thead>
										<tr>
											<th>#</th>
											{Array.from({ length: 12 }).map((_, index) => (
												<th key={index}>Table heading</th>
											))}
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>1</td>
											{Array.from({ length: 12 }).map((_, index) => (
												<td key={index}>Table cell {index}</td>
											))}
										</tr>
										<tr>
											<td>2</td>
											{Array.from({ length: 12 }).map((_, index) => (
												<td key={index}>Table cell {index}</td>
											))}
										</tr>
										<tr>
											<td>3</td>
											{Array.from({ length: 12 }).map((_, index) => (
												<td key={index}>Table cell {index}</td>
											))}
										</tr>
									</tbody>
								</Table>
							</div>

							<h3>Table hover</h3>
							<div className="bd-example">
								<Table hover>
									<thead>
										<tr>
											<th scope="col">Class</th>
											<th scope="col">Heading</th>
											<th scope="col">Heading</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th scope="row">Default</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr className="table-primary">
											<th scope="row">Primary</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr className="table-secondary">
											<th scope="row">Secondary</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr className="table-success">
											<th scope="row">Success</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr className="table-danger">
											<th scope="row">Danger</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr className="table-warning">
											<th scope="row">Warning</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr className="table-info">
											<th scope="row">Info</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr className="table-light">
											<th scope="row">Light</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										<tr className="table-dark">
											<th scope="row">Dark</th>
											<td>Cell</td>
											<td>Cell</td>
										</tr>
										</tbody>
								</Table>
							</div>
					</article>
					
					<article className="my-3" id="figures">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Figures</h3>
						</div>

						<div className="bd-example">
							<Figure>
								<Figure.Image
									width={171}
									height={180}
									alt="171x180"
									src="https://via.placeholder.com/171x180.png"
								/>
								<Figure.Caption>
									Nulla vitae elit libero, a pharetra augue mollis interdum.
								</Figure.Caption>
							</Figure>
						</div>
					</article>
				</section>

				<section id="forms">
					<h2 className="fw-bold pt-3 pt-xl-5 pb-2 pb-xl-3">Forms</h2>

					<article className="my-3" id="overview">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Overview</h3>
						</div>

						<div>
								<Form>
								<div id="Input-Overview-Section">
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
										<Form.Label>Example Input</Form.Label>
										<Form.Control type="email" placeholder="placeholder" />
									</Form.Group>
									<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
										<Form.Label>Example textarea</Form.Label>
										<Form.Control as="textarea" rows={3} />
									</Form.Group>
									<Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
										<Form.Select>
											<option>Example select</option>
										</Form.Select>
									</Form.Group>
									<Form.Control
										type="text"
										placeholder="Disabled input"
										aria-label="Disabled input example"
										disabled
										readOnly
									/>
									<br />
									<Form.Control
										type="text"
										placeholder="Disabled readonly input"
										aria-label="Disabled input example"
										readOnly
									/>
									<Form.Control plaintext readOnly defaultValue="Example Plaintext Input" />
								</div>

								<div id="Input-Sizing-Section">
									<h3>Sizing</h3>
									<h5>Inputs</h5>
									<Form.Control size="lg" type="text" placeholder="Large text" />
									<br />
									<Form.Control type="text" placeholder="Normal text" />
									<br />
									<Form.Control size="sm" type="text" placeholder="Small text" />
									<br />
									<h5>Selects</h5>
									<Form.Select size="lg">
										<option>Large select</option>
									</Form.Select>
									<br />
									<Form.Select>
										<option>Default select</option>
									</Form.Select>
									<br />
									<Form.Select size="sm">
										<option>Small select</option>
									</Form.Select>
									<br />
								</div>

								<div id="Check-Radio-Switch-Section">
									<h3>Checks, Radios, and Switches</h3>
									{['checkbox', 'radio', 'switch'].map((type) => (
										<div key={`default-${type}`} className="mb-3">
											<Form.Check 
												type={type}
												id={`default-${type}`}
												label={`default ${type}`}
											/>

											<Form.Check
												disabled
												type={type}
												label={`disabled ${type}`}
												id={`disabled-default-${type}`}
											/>
										</div>
									))}
									<br />
								</div>

								<div id="File-Upload-Section">
									<h3>File Upload Inputs</h3>
									<Form.Group controlId="formFile" className="mb-3">
										<Form.Label>Default file input example</Form.Label>
										<Form.Control type="file" />
									</Form.Group>
									<Form.Group controlId="formFileMultiple" className="mb-3">
										<Form.Label>Multiple files input example</Form.Label>
										<Form.Control type="file" multiple />
									</Form.Group>
									<Form.Group controlId="formFileDisabled" className="mb-3">
										<Form.Label>Disabled file input example</Form.Label>
										<Form.Control type="file" disabled />
									</Form.Group>
									<Form.Group controlId="formFileSm" className="mb-3">
										<Form.Label>Small file input example</Form.Label>
										<Form.Control type="file" size="sm" />
									</Form.Group>
									<Form.Group controlId="formFileLg" className="mb-3">
										<Form.Label>Large file input example</Form.Label>
										<Form.Control type="file" size="lg" />
									</Form.Group>
								</div>

								<div id="Colour-Picker-Section">
									<h3>Colour Picker</h3>
									<Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
									<Form.Control
										type="color"
										id="exampleColorInput"
										defaultValue="#563d7c"
										title="Choose your color"
									/>
									<br />
								</div>

								<div id="Range-Section">
									<h3>Range</h3>
									<Form.Group className="mb-3">
										<Form.Label>Example</Form.Label>
										<Form.Range />
									</Form.Group>
								</div>

								<div id="Input-Groups-Section">
									<h3>Input Groups</h3>
									<h5>Overview</h5>
									<InputGroup className="mb-3">
										<InputGroup.Text id="basic-addon1">@</InputGroup.Text>
										<FormControl
											placeholder="Username"
											aria-label="Username"
											aria-describedby="basic-addon1"
										/>
									</InputGroup>

									<InputGroup className="mb-3">
										<FormControl
											placeholder="Recipient's username"
											aria-label="Recipient's username"
											aria-describedby="basic-addon2"
										/>
										<InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
									</InputGroup>

									<Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
									<InputGroup className="mb-3">
										<InputGroup.Text id="basic-addon3">
											https://example.com/users/
										</InputGroup.Text>
										<FormControl id="basic-url" aria-describedby="basic-addon3" />
									</InputGroup>

									<InputGroup className="mb-3">
										<InputGroup.Text>$</InputGroup.Text>
										<FormControl aria-label="Amount (to the nearest dollar)" />
										<InputGroup.Text>.00</InputGroup.Text>
									</InputGroup>

									<InputGroup className="mb-3">
										<InputGroup.Text>With textarea</InputGroup.Text>
										<FormControl as="textarea" aria-label="With textarea" />
									</InputGroup>

									<InputGroup className="mb-3">
										<InputGroup.Checkbox aria-label="Checkbox for following text input" />
										<FormControl aria-label="Text input with checkbox" />
									</InputGroup>
									<InputGroup>
										<InputGroup.Radio aria-label="Radio button for following text input" />
										<FormControl aria-label="Text input with radio button" />
									</InputGroup>
									<br />
									<h5>Sizing</h5>
									<InputGroup size="sm" className="mb-3">
										<InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text>
										<FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
									</InputGroup>
									<InputGroup className="mb-3">
										<InputGroup.Text id="inputGroup-sizing-default">Default</InputGroup.Text>
										<FormControl
											aria-label="Default"
											aria-describedby="inputGroup-sizing-default"
										/>
									</InputGroup>
									<InputGroup size="lg" className="mb-3">
										<InputGroup.Text id="inputGroup-sizing-lg">Large</InputGroup.Text>
										<FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
									</InputGroup>

									<h5>Multiple Inputs/Addons</h5>
									<InputGroup className="mb-3">
										<InputGroup.Text>First and last name</InputGroup.Text>
										<FormControl aria-label="First name" />
										<FormControl aria-label="Last name" />
									</InputGroup>
									<InputGroup className="mb-3">
										<InputGroup.Text>$</InputGroup.Text>
										<InputGroup.Text>0.00</InputGroup.Text>
										<FormControl aria-label="Dollar amount (with dot and two decimal places)" />
									</InputGroup>
									<InputGroup>
										<FormControl aria-label="Dollar amount (with dot and two decimal places)" />
										<InputGroup.Text>$</InputGroup.Text>
										<InputGroup.Text>0.00</InputGroup.Text>
									</InputGroup>
									<br />
									<h5>Input Group Buttons</h5>
									<InputGroup className="mb-3">
										<Button id="button-addon1">
											Button
										</Button>
										<FormControl
											aria-label="Example text with button addon"
											aria-describedby="basic-addon1"
										/>
									</InputGroup>

									<InputGroup className="mb-3">
										<FormControl
											placeholder="Recipient's username"
											aria-label="Recipient's username"
											aria-describedby="basic-addon2"
										/>
										<Button id="button-addon2">
											Button
										</Button>
									</InputGroup>

									<InputGroup className="mb-3">
										<Button>Button</Button>
										<Button>Button</Button>
										<FormControl aria-label="Example text with two button addons" />
									</InputGroup>

									<InputGroup className="mb-3">
										<FormControl
											placeholder="Recipient's username"
											aria-label="Recipient's username with two button addons"
										/>
										<Button>Button</Button>
										<Button>Button</Button>
									</InputGroup>

									<InputGroup className="mb-3">
										<DropdownButton
											title="Dropdown"
											id="input-group-dropdown-1"
										>
											<Dropdown.Item href="#">Action</Dropdown.Item>
											<Dropdown.Item href="#">Another action</Dropdown.Item>
											<Dropdown.Item href="#">Something else here</Dropdown.Item>
											<Dropdown.Divider />
											<Dropdown.Item href="#">Separated link</Dropdown.Item>
										</DropdownButton>
										<FormControl aria-label="Text input with dropdown button" />
									</InputGroup>

									<InputGroup className="mb-3">
										<FormControl aria-label="Text input with dropdown button" />

										<DropdownButton
											title="Dropdown"
											id="input-group-dropdown-2"
											align="end"
										>
											<Dropdown.Item href="#">Action</Dropdown.Item>
											<Dropdown.Item href="#">Another action</Dropdown.Item>
											<Dropdown.Item href="#">Something else here</Dropdown.Item>
											<Dropdown.Divider />
											<Dropdown.Item href="#">Separated link</Dropdown.Item>
										</DropdownButton>
									</InputGroup>

									<InputGroup className="mb-3">
										<DropdownButton
											title="Dropdown"
											id="input-group-dropdown-3"
										>
											<Dropdown.Item href="#">Action</Dropdown.Item>
											<Dropdown.Item href="#">Another action</Dropdown.Item>
											<Dropdown.Item href="#">Something else here</Dropdown.Item>
											<Dropdown.Divider />
											<Dropdown.Item href="#">Separated link</Dropdown.Item>
										</DropdownButton>
										<FormControl aria-label="Text input with 2 dropdown buttons" />
										<DropdownButton
											title="Dropdown"
											id="input-group-dropdown-4"
											align="end"
										>
											<Dropdown.Item href="#">Action</Dropdown.Item>
											<Dropdown.Item href="#">Another action</Dropdown.Item>
											<Dropdown.Item href="#">Something else here</Dropdown.Item>
											<Dropdown.Divider />
											<Dropdown.Item href="#">Separated link</Dropdown.Item>
										</DropdownButton>
									</InputGroup>

									<InputGroup className="mb-3">
										<SplitButton
											title="Action"
											id="segmented-button-dropdown-1"
										>
											<Dropdown.Item href="#">Action</Dropdown.Item>
											<Dropdown.Item href="#">Another action</Dropdown.Item>
											<Dropdown.Item href="#">Something else here</Dropdown.Item>
											<Dropdown.Divider />
											<Dropdown.Item href="#">Separated link</Dropdown.Item>
										</SplitButton>
										<FormControl aria-label="Text input with dropdown button" />
									</InputGroup>

									<InputGroup className="mb-3">
										<FormControl aria-label="Text input with dropdown button" />
										<SplitButton
											title="Action"
											id="segmented-button-dropdown-2"
											alignRight
										>
											<Dropdown.Item href="#">Action</Dropdown.Item>
											<Dropdown.Item href="#">Another action</Dropdown.Item>
											<Dropdown.Item href="#">Something else here</Dropdown.Item>
											<Dropdown.Divider />
											<Dropdown.Item href="#">Separated link</Dropdown.Item>
										</SplitButton>
									</InputGroup>
								</div>

								<div id="Floating-Labels-Section">
									<FloatingLabel
										controlId="floatingInput"
										label="Email address"
										className="mb-3"
									>
										<Form.Control type="email" placeholder="name@example.com" />
									</FloatingLabel>
									<FloatingLabel 
										controlId="floatingTextarea2" 
										label="Comments" 
										className="mb-3"
									>
										<Form.Control
											as="textarea"
											placeholder="Leave a comment here"
											style={{ height: '100px' }}
										/>
									</FloatingLabel>
									<FloatingLabel 
										controlId="floatingSelect" 
										label="Works with selects" 
										className="mb-3"
									>
										<Form.Select aria-label="Floating label select example">
											<option>Open this select menu</option>
											<option value="1">One</option>
											<option value="2">Two</option>
											<option value="3">Three</option>
										</Form.Select>
									</FloatingLabel>

									<Row className="g-2">
										<Col md>
											<FloatingLabel controlId="floatingInputGrid" label="Email address">
												<Form.Control type="email" placeholder="name@example.com" />
											</FloatingLabel>
										</Col>
										<Col md>
											<FloatingLabel controlId="floatingSelectGrid" label="Works with selects">
												<Form.Select aria-label="Floating label select example">
													<option>Open this select menu</option>
													<option value="1">One</option>
													<option value="2">Two</option>
													<option value="3">Three</option>
												</Form.Select>
											</FloatingLabel>
										</Col>
									</Row>
								</div>
								<br />
								</Form>

								<div id="Validation-Section">
									<h3>Validation</h3>
									<Form noValidate validated={validated} onSubmit={handleSubmit}>
										<Row className="mb-3">
											<Form.Group as={Col} md="4" controlId="validationCustom01">
												<Form.Label>First name</Form.Label>
												<Form.Control
													required
													type="text"
													placeholder="First name"
													defaultValue="Mark"
												/>
												<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
											</Form.Group>
											<Form.Group as={Col} md="4" controlId="validationCustom02">
												<Form.Label>Last name</Form.Label>
												<Form.Control
													required
													type="text"
													placeholder="Last name"
													defaultValue="Otto"
												/>
												<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
											</Form.Group>
											<Form.Group as={Col} md="4" controlId="validationCustomUsername">
												<Form.Label>Username</Form.Label>
												<InputGroup hasValidation>
													<InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
													<Form.Control
														type="text"
														placeholder="Username"
														aria-describedby="inputGroupPrepend"
														required
													/>
													<Form.Control.Feedback type="invalid">
														Please choose a username.
													</Form.Control.Feedback>
												</InputGroup>
											</Form.Group>
										</Row>
										<Row className="mb-3">
											<Form.Group as={Col} md="6" controlId="validationCustom03">
												<Form.Label>City</Form.Label>
												<Form.Control type="text" placeholder="City" required />
												<Form.Control.Feedback type="invalid">
													Please provide a valid city.
												</Form.Control.Feedback>
											</Form.Group>
											<Form.Group as={Col} md="3" controlId="validationCustom04">
												<Form.Label>State</Form.Label>
												<Form.Control type="text" placeholder="State" required />
												<Form.Control.Feedback type="invalid">
													Please provide a valid state.
												</Form.Control.Feedback>
											</Form.Group>
											<Form.Group as={Col} md="3" controlId="validationCustom05">
												<Form.Label>Zip</Form.Label>
												<Form.Control type="text" placeholder="Zip" required />
												<Form.Control.Feedback type="invalid">
													Please provide a valid zip.
												</Form.Control.Feedback>
											</Form.Group>
										</Row>
										<Form.Group className="mb-3">
											<Form.Check
												required
												label="Agree to terms and conditions"
												feedback="You must agree before submitting."
												feedbackType="invalid"
											/>
										</Form.Group>
										<Button type="submit">Submit form</Button>
									</Form>
								</div>
						</div>
					</article>
				</section>

				<section id="components">
					<h2 className="fw-bold pt-3 pt-xl-5 pb-2 pb-xl-3">Components</h2>

					<article className="my-3" id="accordion">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Accordion</h3>
						</div>

						<Accordion defaultActiveKey="0">
							<Accordion.Item eventKey="0">
								<Accordion.Header>Accordion Item #1</Accordion.Header>
								<Accordion.Body>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
									tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
									veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
									commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
									velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
									cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
									est laborum.
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="1">
								<Accordion.Header>Accordion Item #2</Accordion.Header>
								<Accordion.Body>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
									tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
									veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
									commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
									velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
									cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
									est laborum.
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>
					</article>

					<article className="my-3" id="alerts">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Alerts</h3>
						</div>

						{variants.map((variant, idx) => (
							<Alert key={idx} variant={variant.toLowerCase()}>
								This is a {variant} alert with{' '}
								<Alert.Link href="#">an example link</Alert.Link>. Give it a click if you
								like.
							</Alert>
						))}
					</article>

					<article className="my-3" id="badge">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Badges</h3>
						</div>

						<div>
							<h1>
								Example heading <Badge bg="secondary">New</Badge>
							</h1>
							<h2>
								Example heading <Badge bg="secondary">New</Badge>
							</h2>
							<h3>
								Example heading <Badge bg="secondary">New</Badge>
							</h3>
							<h4>
								Example heading <Badge bg="secondary">New</Badge>
							</h4>
							<h5>
								Example heading <Badge bg="secondary">New</Badge>
							</h5>
							<h6>
								Example heading <Badge bg="secondary">New</Badge>
							</h6>
						</div>

						<div>
							{variants.map((variant, idx) => (
								<Badge 
									bg={variant.toLowerCase()}
									text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}>{variant}</Badge>
								))}
						</div>

						<div>
							{variants.map((variant, idx) => (
								<Badge pill
									bg={variant.toLowerCase()}
									text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}>{variant}</Badge>
								))}
						</div>
						<br />
						<Button variant="primary">
							Profile <Badge bg="secondary">9</Badge>
							<span className="visually-hidden">unread messages</span>
						</Button>
					</article>

					<article className="my-3" id="breadcrumb">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Breadcrumb</h3>
						</div>

						<Breadcrumb>
							<Breadcrumb.Item href="#">Home</Breadcrumb.Item>
							<Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
								Library
							</Breadcrumb.Item>
							<Breadcrumb.Item active>Data</Breadcrumb.Item>
						</Breadcrumb>
					</article>

					<article className="my-3" id="buttons">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Buttons</h3>
						</div>

						<div className="mb-2">
							{variants.map((variant, idx) => (
								<Button
									variant={variant.toLowerCase()}
									text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}>{variant}</Button>
								))}
						</div>

						<div className="mb-2">
							{variants.map((variant, idx) => (
								<Button
									variant={"outline-" + variant.toLowerCase()}>{variant}</Button>
								))}
						</div>

						<div className="mb-2">
							<Button variant="primary" size="lg">
								Large button
							</Button>{' '}
							<Button variant="secondary" size="lg">
								Large button
							</Button>
						</div>
						<div className="mb-2">
							<Button variant="primary">
								Default button
							</Button>{' '}
							<Button variant="secondary">
								Default button
							</Button>
						</div>
						<div className="mb-2">
							<Button variant="primary" size="sm">
								Small button
							</Button>{' '}
							<Button variant="secondary" size="sm">
								Small button
							</Button>
						</div>

						<Button
							variant="primary"
							disabled={isLoading}
							onClick={!isLoading ? handleClick : null}>
							{isLoading ? 'Loading…' : 'Click to load'}
						</Button>
					</article>

					<article className="my-3" id="button-group">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Button group</h3>
						</div>

						<ButtonGroup aria-label="Basic example" className="mb-2">
							<Button variant="secondary">Left</Button>
							<Button variant="secondary">Middle</Button>
							<Button variant="secondary">Right</Button>
						</ButtonGroup>

						<ButtonToolbar aria-label="Toolbar with button groups" className="mb-2">
							<ButtonGroup className="me-2" aria-label="First group">
								<Button>1</Button> <Button>2</Button> <Button>3</Button> <Button>4</Button>
							</ButtonGroup>
							<ButtonGroup className="me-2" aria-label="Second group">
								<Button>5</Button> <Button>6</Button> <Button>7</Button>
							</ButtonGroup>
							<ButtonGroup aria-label="Third group">
								<Button>8</Button>
							</ButtonGroup>
						</ButtonToolbar>

						<ButtonGroup size="lg" className="mb-2">
							<Button>Left</Button>
							<Button>Middle</Button>
							<Button>Right</Button>
						</ButtonGroup>
						<br />
						<ButtonGroup className="mb-2">
							<Button>Left</Button>
							<Button>Middle</Button>
							<Button>Right</Button>
						</ButtonGroup>
						<br />
						<ButtonGroup size="sm">
							<Button>Left</Button>
							<Button>Middle</Button>
							<Button>Right</Button>
						</ButtonGroup>
					</article>

					<article className="my-3" id="buttons">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Janky Buttons</h3>
						</div>

						<div className="mb-2">
							{variants.map((variant, idx) => (
								<JankyButton
									variant={variant.toLowerCase()}
									text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
									label={variant} />
								))}
						</div>

						<div className="mb-2">
							{variants.map((variant, idx) => (
								<Button
									variant={"outline-" + variant.toLowerCase()}>{variant}</Button>
								))}
						</div>

						<div className="mb-2">
							<JankyButton variant="primary" size="lg" label="Large button" />
							<JankyButton variant="secondary" size="lg" label="Large button" />
						</div>
						<div className="mb-2">
							<JankyButton variant="primary" label="Default button" />
							<JankyButton variant="secondary" label="Default button" />
						</div>
						<div className="mb-2">
							<JankyButton variant="primary" size="sm" label="Small button" />
							<JankyButton variant="secondary" size="sm" label="Small button" />
						</div>
					</article>

					<article className="my-3" id="janky-button-group">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Janky Button group</h3>
						</div>

						<ButtonGroup aria-label="Basic example" className="mb-2">
							<JankyButton variant="secondary" label="Left" />
							<JankyButton variant="secondary" label="Middle" />
							<JankyButton variant="secondary" label="Right" />
						</ButtonGroup>

						<ButtonToolbar aria-label="Toolbar with button groups" className="mb-2">
							<ButtonGroup className="me-2" aria-label="First group">
								<JankyButton label="1" /> <JankyButton label="2" /> <JankyButton label="3" /> <JankyButton label="4" />
							</ButtonGroup>
							<ButtonGroup className="me-2" aria-label="Second group">
								<JankyButton label="5" /> <JankyButton label="6" /> <JankyButton label="7" />
							</ButtonGroup>
							<ButtonGroup aria-label="Third group">
								<JankyButton label="8" />
							</ButtonGroup>
						</ButtonToolbar>

						<ButtonGroup size="lg" className="mb-2">
							<JankyButton label="Left" />
							<JankyButton label="Middle" />
							<JankyButton label="Right" />
						</ButtonGroup>
						<br />
						<ButtonGroup className="mb-2">
							<JankyButton label="Left" />
							<JankyButton label="Middle" />
							<JankyButton label="Right" />
						</ButtonGroup>
						<br />
						<ButtonGroup size="sm">
							<JankyButton label="Left" />
							<JankyButton label="Middle" />
							<JankyButton label="Right" />
						</ButtonGroup>
					</article>

					<article className="my-3" id="card">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Card</h3>
						</div>

						<Card className="mb-3" style={{ width: '18rem' }}>
							{/* <svg 
								className="bd-placeholder-img card-img-top" 
								width="100%" height="225" 
								xmlns="http://www.w3.org/2000/svg" 
								role="img" 
								aria-label="Placeholder: Thumbnail" 
								preserveAspectRatio="xMidYMid slice" 
								focusable="false"
							>
								<title>Placeholder</title>
								<rect width="100%" height="100%" fill="#55595c"/>
								<text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
							</svg> */}
							<Card.Img variant="top" src="https://via.placeholder.com/200x160.png" />
							<Card.Body>
								<Card.Title>Test Card</Card.Title>
								<Card.Text>
									Some quick example text to build on the card title and make up the bulk of
									the card's content.
								</Card.Text>
								<Button variant="primary">Go somewhere</Button>
							</Card.Body>
						</Card>

						<Card className="mb-3" style={{ width: '18rem' }}>
							<Card.Body>
								<Card.Title>Card Title</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
								<Card.Text>
									Some quick example text to build on the card title and make up the bulk of
									the card's content.
								</Card.Text>
								<Card.Link href="#">Card Link</Card.Link>
								<Card.Link href="#">Another Link</Card.Link>
							</Card.Body>
						</Card>

						<Card className="mb-3" style={{ width: '18rem' }}>
							<ListGroup variant="flush">
								<ListGroup.Item>Cras justo odio</ListGroup.Item>
								<ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
								<ListGroup.Item>Vestibulum at eros</ListGroup.Item>
							</ListGroup>
						</Card>

						<Card className="mb-3" style={{ width: '18rem' }}>
							<Card.Img variant="top" src="https://via.placeholder.com/200x160.png" />
							<Card.Body>
								<Card.Title>Card Title</Card.Title>
								<Card.Text>
									Some quick example text to build on the card title and make up the bulk of
									the card's content.
								</Card.Text>
							</Card.Body>
							<ListGroup className="list-group-flush">
								<ListGroupItem>Cras justo odio</ListGroupItem>
								<ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
								<ListGroupItem>Vestibulum at eros</ListGroupItem>
							</ListGroup>
							<Card.Body>
								<Card.Link href="#">Card Link</Card.Link>
								<Card.Link href="#">Another Link</Card.Link>
							</Card.Body>
						</Card>

						<Card className="mb-3">
							<Card.Header>Featured</Card.Header>
							<Card.Body>
								<Card.Title>Special title treatment</Card.Title>
								<Card.Text>
									With supporting text below as a natural lead-in to additional content.
								</Card.Text>
								<Button variant="primary">Go somewhere</Button>
							</Card.Body>
						</Card>

						<Card className="mb-3">
							<Card.Header>Quote</Card.Header>
							<Card.Body>
								<blockquote className="blockquote mb-0">
									<p>
										{' '}
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
										erat a ante.{' '}
									</p>
									<footer className="blockquote-footer">
										Someone famous in <cite title="Source Title">Source Title</cite>
									</footer>
								</blockquote>
							</Card.Body>
						</Card>

						<Card className="mb-3 text-center">
							<Card.Header>Featured</Card.Header>
							<Card.Body>
								<Card.Title>Special title treatment</Card.Title>
								<Card.Text>
									With supporting text below as a natural lead-in to additional content.
								</Card.Text>
								<Button variant="primary">Go somewhere</Button>
							</Card.Body>
							<Card.Footer className="text-muted">2 days ago</Card.Footer>
						</Card>

						<Card className="mb-3">
							<Card.Img variant="top" src="https://via.placeholder.com/200x160.png" />
							<Card.Body>
								<Card.Text>
									Some quick example text to build on the card title and make up the bulk
									of the card's content.
								</Card.Text>
							</Card.Body>
						</Card>

						<Card className="mb-3">
							<Card.Body>
								<Card.Text>
									Some quick example text to build on the card title and make up the bulk
									of the card's content.
								</Card.Text>
							</Card.Body>
							<Card.Img variant="bottom" src="https://via.placeholder.com/200x160.png" />
						</Card>

						<Card className="mb-3 bg-dark text-white">
							<Card.Img src="https://via.placeholder.com/270x100.png" alt="Card image" />
							<Card.ImgOverlay>
								<Card.Title>Card title</Card.Title>
								<Card.Text>
									This is a wider card with supporting text below as a natural lead-in to
									additional content. This content is a little bit longer.
								</Card.Text>
								<Card.Text>Last updated 3 mins ago</Card.Text>
							</Card.ImgOverlay>
						</Card>

						<Card className="mb-3">
							<Card.Header>
								<Nav variant="tabs" defaultActiveKey="#first">
									<Nav.Item>
										<Nav.Link href="#first">Active</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link href="#link">Link</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link href="#disabled" disabled>
											Disabled
										</Nav.Link>
									</Nav.Item>
								</Nav>
							</Card.Header>
							<Card.Body>
								<Card.Title>Special title treatment</Card.Title>
								<Card.Text>
									With supporting text below as a natural lead-in to additional content.
								</Card.Text>
								<Button variant="primary">Go somewhere</Button>
							</Card.Body>
						</Card>

						<Card className="mb-3">
							<Card.Header>
								<Nav variant="pills" defaultActiveKey="#first">
									<Nav.Item>
										<Nav.Link href="#first">Active</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link href="#link">Link</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link href="#disabled" disabled>
											Disabled
										</Nav.Link>
									</Nav.Item>
								</Nav>
							</Card.Header>
							<Card.Body>
								<Card.Title>Special title treatment</Card.Title>
								<Card.Text>
									With supporting text below as a natural lead-in to additional content.
								</Card.Text>
								<Button variant="primary">Go somewhere</Button>
							</Card.Body>
						</Card>

						{variants.map((variant, idx) => (
							<Card
								bg={variant.toLowerCase()}
								key={idx}
								text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
								style={{ width: '18rem' }}
								className="mb-3"
							>
								<Card.Header>Header</Card.Header>
								<Card.Body>
									<Card.Title>{variant} Card Title </Card.Title>
									<Card.Text>
										Some quick example text to build on the card title and make up the bulk
										of the card's content.
									</Card.Text>
								</Card.Body>
							</Card>
						))}

						{variants.map((variant, idx) => (
							<Card 
								key={idx}
								className="mb-3" 
								border={variant.toLowerCase()} 
								style={{ width: '18rem' }}>
							<Card.Header>Header</Card.Header>
							<Card.Body>
								<Card.Title>Primary Card Title</Card.Title>
								<Card.Text>
									Some quick example text to build on the card title and make up the bulk
									of the card's content.
								</Card.Text>
							</Card.Body>
							</Card>
						))}

						<CardGroup>
							<Card>
								<Card.Img variant="top" src="https://via.placeholder.com/200x160.png" />
								<Card.Body>
									<Card.Title>Card title</Card.Title>
									<Card.Text>
										This is a wider card with supporting text below as a natural lead-in to
										additional content. This content is a little bit longer.
									</Card.Text>
								</Card.Body>
								<Card.Footer>
									<small className="text-muted">Last updated 3 mins ago</small>
								</Card.Footer>
							</Card>
							<Card>
								<Card.Img variant="top" src="https://via.placeholder.com/200x160.png" />
								<Card.Body>
									<Card.Title>Card title</Card.Title>
									<Card.Text>
										This card has supporting text below as a natural lead-in to additional
										content.{' '}
									</Card.Text>
								</Card.Body>
								<Card.Footer>
									<small className="text-muted">Last updated 3 mins ago</small>
								</Card.Footer>
							</Card>
							<Card>
								<Card.Img variant="top" src="https://via.placeholder.com/200x160.png" />
								<Card.Body>
									<Card.Title>Card title</Card.Title>
									<Card.Text>
										This is a wider card with supporting text below as a natural lead-in to
										additional content. This card has even longer content than the first to
										show that equal height action.
									</Card.Text>
								</Card.Body>
								<Card.Footer>
									<small className="text-muted">Last updated 3 mins ago</small>
								</Card.Footer>
							</Card>
						</CardGroup>

						<Row xs={1} md={2} className="g-4">
							{Array.from({ length: 4 }).map((_, idx) => (
								<Col>
									<Card>
										<Card.Img variant="top" src="https://via.placeholder.com/200x160.png" />
										<Card.Body>
											<Card.Title>Card title</Card.Title>
											<Card.Text>
												This is a longer card with supporting text below as a natural
												lead-in to additional content. This content is a little bit longer.
											</Card.Text>
										</Card.Body>
									</Card>
								</Col>
							))}
						</Row>
					</article>

					<article className="my-3" id="carousel">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Carousel</h3>
						</div>

						<Carousel>
							<Carousel.Item interval={1000}>
								<img
									className="d-block w-100"
									src="https://via.placeholder.com/800x400.png"
									alt="First slide"
								/>
								<Carousel.Caption>
									<h3>First slide label</h3>
									<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
								</Carousel.Caption>
							</Carousel.Item>
							<Carousel.Item interval={500}>
								<img
									className="d-block w-100"
									src="https://via.placeholder.com/800x400.png"
									alt="Second slide"
								/>
								<Carousel.Caption>
									<h3>Second slide label</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
								</Carousel.Caption>
							</Carousel.Item>
							<Carousel.Item>
								<img
									className="d-block w-100"
									src="https://via.placeholder.com/800x400.png"
									alt="Third slide"
								/>
								<Carousel.Caption>
									<h3>Third slide label</h3>
									<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
								</Carousel.Caption>
							</Carousel.Item>
						</Carousel>
					</article>

					<article className="my-3" id="close-buttons">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Close Buttons</h3>
						</div>

						<CloseButton aria-label="Hide" />
						<CloseButton disabled />
						<div className="bg-dark p-3">
							<CloseButton variant="white" />
							<CloseButton variant="white" disabled />
						</div>
					</article>

					<article className="my-3" id="dropdowns">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Dropdowns</h3>
						</div>

						{['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger'].map(
							(variant) => (
								<DropdownButton
									as={ButtonGroup}
									key={variant}
									id={`dropdown-variants-${variant}`}
									variant={variant.toLowerCase()}
									title={variant}
								>
									<Dropdown.Item eventKey="1">Action</Dropdown.Item>
									<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
									<Dropdown.Item eventKey="3" active>
										Active Item
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
								</DropdownButton>
							),
						)}

						{['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger'].map(
								(variant) => (
									<SplitButton
										key={variant}
										id={`dropdown-split-variants-${variant}`}
										variant={variant.toLowerCase()}
										title={variant}
									>
										<Dropdown.Item eventKey="1">Action</Dropdown.Item>
										<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
										<Dropdown.Item eventKey="3" active>
											Active Item
										</Dropdown.Item>
										<Dropdown.Divider />
										<Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
									</SplitButton>
								),
							)}

							<div className="mb-2">
									{[DropdownButton, SplitButton].map((DropdownType, idx) => (
										<DropdownType
											as={ButtonGroup}
											key={idx}
											id={`dropdown-button-drop-${idx}`}
											size="lg"
											title="Drop large"
										>
											<Dropdown.Item eventKey="1">Action</Dropdown.Item>
											<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
											<Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
											<Dropdown.Divider />
											<Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
										</DropdownType>
									))}
								</div>
								<div>
									{[DropdownButton, SplitButton].map((DropdownType, idx) => (
										<DropdownType
											as={ButtonGroup}
											key={idx}
											id={`dropdown-button-drop-${idx}`}
											size="sm"
											variant="secondary"
											title="Drop small"
										>
											<Dropdown.Item eventKey="1">Action</Dropdown.Item>
											<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
											<Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
											<Dropdown.Divider />
											<Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
										</DropdownType>
									))}
								</div>

								<div className="mb-2">
									{['up', 'down', 'start', 'end'].map((direction) => (
										<DropdownButton
											as={ButtonGroup}
											key={direction}
											id={`dropdown-button-drop-${direction}`}
											drop={direction}
											variant="secondary"
											title={` Drop ${direction} `}
										>
											<Dropdown.Item eventKey="1">Action</Dropdown.Item>
											<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
											<Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
											<Dropdown.Divider />
											<Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
										</DropdownButton>
									))}
								</div>

								<div>
									{['up', 'down', 'start', 'end'].map((direction) => (
										<SplitButton
											key={direction}
											id={`dropdown-button-drop-${direction}`}
											drop={direction}
											variant="secondary"
											title={`Drop ${direction}`}
										>
											<Dropdown.Item eventKey="1">Action</Dropdown.Item>
											<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
											<Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
											<Dropdown.Divider />
											<Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
										</SplitButton>
									))}
								</div>
					</article>

					<article className="my-3" id="list-group">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>List group</h3>
						</div>

						<ListGroup>
						<ListGroup.Item>No style</ListGroup.Item>
						<ListGroup.Item variant="primary">Primary</ListGroup.Item>
						<ListGroup.Item action variant="secondary">
							Secondary
						</ListGroup.Item>
						<ListGroup.Item action variant="success">
							Success
						</ListGroup.Item>
						<ListGroup.Item action variant="danger">
							Danger
						</ListGroup.Item>
						<ListGroup.Item action variant="warning">
							Warning
						</ListGroup.Item>
						<ListGroup.Item action variant="info">
							Info
						</ListGroup.Item>
						<ListGroup.Item action variant="light">
							Light
						</ListGroup.Item>
						<ListGroup.Item action variant="dark">
							Dark
						</ListGroup.Item>
					</ListGroup>
					</article>
					
					<article className="my-3" id="modal">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Modal</h3>
							<a className="d-flex align-items-center" href="../components/modal/">Documentation</a>
						</div>

						<div>
							<div className="bd-example">
							<div className="d-flex justify-content-between flex-wrap">
								<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalDefault">
									Launch demo modal
								</button>
								<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdropLive">
									Launch static backdrop modal
								</button>
								<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalCenteredScrollable">
									Vertically centered scrollable modal
								</button>
								<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalFullscreen">
									Full screen
								</button>
							</div>
							</div>
						</div>
					</article>

					<article className="my-3" id="navs">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Navs</h3>
						</div>

						<Nav
							activeKey="/home"
							onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
						>
							<Nav.Item>
								<Nav.Link href="/home">Active</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="link-1">Link</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="link-2">Link</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="disabled" disabled>
									Disabled
								</Nav.Link>
							</Nav.Item>
						</Nav>
						<Nav className="justify-content-center" activeKey="/home">
							<Nav.Item>
								<Nav.Link href="/home">Active</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="link-1">Link</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="link-2">Link</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="disabled" disabled>
									Disabled
								</Nav.Link>
							</Nav.Item>
						</Nav>
						<Nav className="justify-content-end" activeKey="/home">
							<Nav.Item>
								<Nav.Link href="/home">Active</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="link-1">Link</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="link-2">Link</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="disabled" disabled>
									Disabled
								</Nav.Link>
							</Nav.Item>
						</Nav>
						<Nav variant="tabs" defaultActiveKey="/home">
							<Nav.Item>
								<Nav.Link href="/home">Active</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="link-1">Option 2</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="disabled" disabled>
									Disabled
								</Nav.Link>
							</Nav.Item>
						</Nav>
						<Nav variant="pills" defaultActiveKey="/home">
							<Nav.Item>
								<Nav.Link href="/home">Active</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="link-1">Option 2</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="disabled" disabled>
									Disabled
								</Nav.Link>
							</Nav.Item>
						</Nav>
						<Nav fill variant="tabs" defaultActiveKey="/home">
							<Nav.Item>
								<Nav.Link href="/home">Active</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="link-2">Link</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="disabled" disabled>
									Disabled
								</Nav.Link>
							</Nav.Item>
						</Nav>
					</article>

					<article className="my-3" id="navbar">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Navbar</h3>
						</div>

						<Navbar bg="light" expand="lg">
							<Container>
								<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
								<Navbar.Toggle aria-controls="basic-navbar-nav" />
								<Navbar.Collapse id="basic-navbar-nav">
									<Nav className="me-auto">
										<Nav.Link href="#home">Home</Nav.Link>
										<Nav.Link href="#link">Link</Nav.Link>
										<NavDropdown title="Dropdown" id="basic-nav-dropdown">
											<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
											<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
											<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
											<NavDropdown.Divider />
											<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
										</NavDropdown>
									</Nav>
								</Navbar.Collapse>
							</Container>
						</Navbar>

						<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
							<Container>
							<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
							<Navbar.Toggle aria-controls="responsive-navbar-nav" />
							<Navbar.Collapse id="responsive-navbar-nav">
								<Nav className="me-auto">
									<Nav.Link href="#features">Features</Nav.Link>
									<Nav.Link href="#pricing">Pricing</Nav.Link>
									<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
										<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
										<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
										<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
									</NavDropdown>
								</Nav>
								<Nav>
									<Nav.Link href="#deets">More deets</Nav.Link>
									<Nav.Link eventKey={2} href="#memes">
										Dank memes
									</Nav.Link>
								</Nav>
							</Navbar.Collapse>
							</Container>
						</Navbar>

						<Navbar bg="light" expand={false}>
							<Container fluid>
								<Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
								<Navbar.Toggle aria-controls="offcanvasNavbar" />
								<Navbar.Offcanvas
									id="offcanvasNavbar"
									aria-labelledby="offcanvasNavbarLabel"
									placement="end"
								>
									<Offcanvas.Header closeButton>
										<Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
									</Offcanvas.Header>
									<Offcanvas.Body>
										<Nav className="justify-content-end flex-grow-1 pe-3">
											<Nav.Link href="#action1">Home</Nav.Link>
											<Nav.Link href="#action2">Link</Nav.Link>
											<NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
												<NavDropdown.Item href="#action3">Action</NavDropdown.Item>
												<NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
												<NavDropdown.Divider />
												<NavDropdown.Item href="#action5">
													Something else here
												</NavDropdown.Item>
											</NavDropdown>
										</Nav>
										<Form className="d-flex">
											<FormControl
												type="search"
												placeholder="Search"
												className="me-2"
												aria-label="Search"
											/>
											<Button variant="outline-success">Search</Button>
										</Form>
									</Offcanvas.Body>
								</Navbar.Offcanvas>
							</Container>
						</Navbar>
					</article>

					<article className="my-3" id="pagination">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Pagination</h3>
						</div>

						<Pagination>
							<Pagination.First />
							<Pagination.Prev />
							<Pagination.Item>{1}</Pagination.Item>
							<Pagination.Ellipsis />

							<Pagination.Item>{10}</Pagination.Item>
							<Pagination.Item>{11}</Pagination.Item>
							<Pagination.Item active>{12}</Pagination.Item>
							<Pagination.Item>{13}</Pagination.Item>
							<Pagination.Item disabled>{14}</Pagination.Item>

							<Pagination.Ellipsis />
							<Pagination.Item>{20}</Pagination.Item>
							<Pagination.Next />
							<Pagination.Last />
						</Pagination>
					</article>

					<article className="my-3" id="popovers">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Popovers</h3>
						</div>

						<div>
							<div className="bd-example">
							<button type="button" className="btn btn-lg btn-danger" data-bs-toggle="popover" title="Popover title" data-bs-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>
							</div>

							<div className="bd-example">
							<button type="button" className="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
								Popover on top
							</button>
							<button type="button" className="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="right" data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
								Popover on end
							</button>
							<button type="button" className="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
								Popover on bottom
							</button>
							<button type="button" className="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="left" data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
								Popover on start
							</button>
							</div>
						</div>
					</article>

					<article className="my-3" id="progress">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Progress</h3>
						</div>

						<ProgressBar now={60} label={`60%`}/>
						<ProgressBar variant="success" now={40} />
						<ProgressBar variant="info" now={20} />
						<ProgressBar variant="warning" now={60} />
						<ProgressBar variant="danger" now={80} />
						<ProgressBar striped variant="success" now={40} />
						<ProgressBar striped variant="info" now={20} />
						<ProgressBar striped variant="warning" now={60} />
						<ProgressBar striped variant="danger" now={80} />
						<ProgressBar animated now={45} />
						<ProgressBar>
							<ProgressBar striped variant="success" now={35} key={1} />
							<ProgressBar variant="warning" now={20} key={2} />
							<ProgressBar striped variant="danger" now={10} key={3} />
						</ProgressBar>
					</article>

					<article className="my-3" id="scrollspy">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Scrollspy</h3>
							<a className="d-flex align-items-center" href="../components/scrollspy/">Documentation</a>
						</div>

						<div>
							<div className="bd-example">
								<nav id="navbar-example2" className="navbar navbar-light bg-light px-3">
									<a className="navbar-brand" href="#">Navbar</a>
									<ul className="nav nav-pills">
										<li className="nav-item">
											<a className="nav-link active" href="#scrollspyHeading1">First</a>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="#scrollspyHeading2">Second</a>
										</li>
										<li className="nav-item dropdown">
											<a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Dropdown</a>
											<ul className="dropdown-menu">
												<li><a className="dropdown-item" href="#scrollspyHeading3">Third</a></li>
												<li><a className="dropdown-item" href="#scrollspyHeading4">Fourth</a></li>
												<li><hr className="dropdown-divider" /></li>
												<li><a className="dropdown-item" href="#scrollspyHeading5">Fifth</a></li>
											</ul>
										</li>
									</ul>
								</nav>
							<div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" className="scrollspy-example" tabIndex="0">
									<h4 id="scrollspyHeading1">First heading</h4>
									<p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
									<h4 id="scrollspyHeading2">Second heading</h4>
									<p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
									<h4 id="scrollspyHeading3">Third heading</h4>
									<p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
									<h4 id="scrollspyHeading4">Fourth heading</h4>
									<p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
									<h4 id="scrollspyHeading5">Fifth heading</h4>
									<p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
								</div>
							</div>
						</div>
					</article>

					<article className="my-3" id="spinners">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Spinners</h3>
						</div>

						<Spinner animation="border" role="status">
							<span className="visually-hidden">Loading...</span>
						</Spinner>

						<Spinner animation="grow" />

						<Spinner animation="border" size="sm" />
						<Spinner animation="border" />
						<Spinner animation="grow" size="sm" />
						<Spinner animation="grow" />
						<Button variant="primary" disabled>
							<Spinner
								as="span"
								animation="border"
								size="sm"
								role="status"
								aria-hidden="true"
							/>
							<span className="visually-hidden">Loading...</span>
						</Button>{' '}
						<Button variant="primary" disabled>
							<Spinner
								as="span"
								animation="grow"
								size="sm"
								role="status"
								aria-hidden="true"
							/>
							Loading...
						</Button>

						<Spinner animation="border" variant="primary" />
						<Spinner animation="border" variant="secondary" />
						<Spinner animation="border" variant="success" />
						<Spinner animation="border" variant="danger" />
						<Spinner animation="border" variant="warning" />
						<Spinner animation="border" variant="info" />
						<Spinner animation="border" variant="light" />
						<Spinner animation="border" variant="dark" />
						<Spinner animation="grow" variant="primary" />
						<Spinner animation="grow" variant="secondary" />
						<Spinner animation="grow" variant="success" />
						<Spinner animation="grow" variant="danger" />
						<Spinner animation="grow" variant="warning" />
						<Spinner animation="grow" variant="info" />
						<Spinner animation="grow" variant="light" />
						<Spinner animation="grow" variant="dark" />
					</article>

					<article className="my-3" id="toasts">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Toasts</h3>
						</div>

						<Toast>
							<Toast.Header>
								<img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
								<strong className="me-auto">Bootstrap</strong>
								<small>11 mins ago</small>
							</Toast.Header>
							<Toast.Body>Hello, world! This is a toast message.</Toast.Body>
						</Toast>
					</article>

					<article className="mt-3 mb-5 pb-5" id="tooltips">
						<div className="bd-heading align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
							<h3>Tooltips</h3>
							<a className="d-flex align-items-center" href="../components/tooltips/">Documentation</a>
						</div>

						<div>
							<div className="bd-example tooltip-demo">
							<button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">Tooltip on top</button>
							<button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="right" title="Tooltip on end">Tooltip on end</button>
							<button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Tooltip on bottom">Tooltip on bottom</button>
							<button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="left" title="Tooltip on start">Tooltip on start</button>
							<button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-html="true" title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">Tooltip with HTML</button>
							</div>
						</div>
					</article>
				</section>
			</div>

			<div className="modal fade" id="exampleModalDefault" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							...
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary">Save changes</button>
						</div>
					</div>
				</div>
			</div>
			<div className="modal fade" id="staticBackdropLive" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLiveLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLiveLabel">Modal title</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<p>I will not close if you click outside me. Don't even try to press escape key.</p>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary">Understood</button>
						</div>
					</div>
				</div>
			</div>
			<div className="modal fade" id="exampleModalCenteredScrollable" tabIndex="-1" aria-labelledby="exampleModalCenteredScrollableTitle" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalCenteredScrollableTitle">Modal title</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<p>This is some placeholder content to show the scrolling behavior for modals. We use repeated line breaks to demonstrate how content can exceed minimum inner height, thereby showing inner scrolling. When content becomes longer than the prefedined max-height of modal, content will be cropped and scrollable within the modal.</p>
							<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
							<p>This content should appear at the bottom after you scroll.</p>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary">Save changes</button>
						</div>
					</div>
				</div>
			</div>
			<div className="modal fade" id="exampleModalFullscreen" tabIndex="-1" aria-labelledby="exampleModalFullscreenLabel" aria-hidden="true">
				<div className="modal-dialog modal-fullscreen">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title h4" id="exampleModalFullscreenLabel">Full screen modal</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							...
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
			
    </main>
  );
};

export default Assets;
