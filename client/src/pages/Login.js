import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Card, InputGroup, FormControl } from 'react-bootstrap';
import JankyButton from '../components/JankyButton';
import Auth from '../utils/auth';
import { useError } from '../components/ErrorContext'

const Login = () => {
  const [formState, setFormState] = useState({ 
    email: '', 
    password: '' 
  });

  const { setError } = useError();

  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { email, password } = formState;
    const errors = {};
    setError();

    if (email.trim().length === 0) {
      errors.emailNull = "Please enter your email!"
    }

    if (password.trim().length === 0) {
      errors.passwordNull = "Please enter your password!"
    }

    setError(errors)

    if (Object.keys(errors).length > 0) {
      return false
    } else {
      return true
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const { data } = await login({
          variables: { ...formState },
        });

        Auth.login(data.login.token);
      } catch (err) {
        const { name, message } = err;
    
        setError({
          [name]: message,
        });
      }
    }
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
    
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">

        <Card className="janky-card-wrapper">
          <Card.Header className="janky-card-header">
            Log in
          </Card.Header>
          <div className="janky-card-body-wrapper">
            <Card.Body className="janky-card-body">
              <div className="janky-card-inner-body d-flex flex-column align-items-center">
                {data ? (
                  <p>
                    Success! You may now head{' '}
                    <Link to="/">back to the homepage.</Link>
                  </p>
                ) : (
                  <form className="d-flex flex-column my-3" onSubmit={handleFormSubmit}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-default">Email</InputGroup.Text>
                      <FormControl
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Your email"
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
                      variant="theme"
                    />
                  </form>
                )}
              </div>
            </Card.Body>
          </div>
        </Card>

      </div>
    </main>
  );
};

export default Login;
