import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Card, InputGroup, FormControl } from 'react-bootstrap';
import JankyButton from '../components/JankyButton';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
      window.location.assign('/create-pet')
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">

      <Card className="janky-card-wrapper">
          <Card.Header className="janky-card-header">
            Sign up
          </Card.Header>
          <div className="janky-card-body-wrapper">
            <Card.Body className="janky-card-body">
              <div className="janky-card-inner-body d-flex flex-column align-items-center">
                {data ? (
                  <p>
                    Success! Onto the{' '}
                    <Link to="/create-pet">next step.</Link>
                  </p>
                ) : (
                  <form onSubmit={handleFormSubmit}>

                    <InputGroup className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-default">Username</InputGroup.Text>
                      <FormControl
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Username"
                        name="username"
                        type="text"
                        value={formState.username}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-default">Email</InputGroup.Text>
                      <FormControl
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-default">Password</InputGroup.Text>
                      <FormControl
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="******"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    
                    <JankyButton 
                      type="submit"
                      label="Next"
                      variant="red"
                    />
                  </form>
                )}

                {error && (
                  <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                  </div>
                )}
              </div>
            </Card.Body>
          </div>
        </Card>

      </div>
    </main>
  );
};

export default Signup;
