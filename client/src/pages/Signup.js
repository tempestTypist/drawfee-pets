import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { ADD_USER } from '../utils/mutations'
import { Card, InputGroup, FormControl } from 'react-bootstrap'
import JankyButton from '../components/JankyButton'
import ToastComponent from '../components/ToastComponent'

import Auth from '../utils/auth';

const isUsername = (username) =>
  /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/i.test(username);

const isEmail = (email) => 
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(email);

const isPassword = (password) =>
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/i.test(password);

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmpass: '',
  });

  const [errors, setErrors] = useState({});

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { username, email, password, confirmpass } = formState;
    const errors = {};
    setErrors();

    if (username.trim().length === 0) {
      errors.usernameNull = "Please choose your username!"
    } else if ((username.trim().length >= 1 && username.trim().length < 5) || username.trim().length > 30) {
      errors.usernameReq = "Username has to be between 5-30 characters long."
    } else if (!isUsername(username)) {
      errors.validUsername = "Please enter a valid username! Usernames can contain characters a-z, 0-9, underscores and periods. The username cannot start or end with a period. It must also not have more than one period sequentially. Max length is 30 chars."
    }

    if (email.trim().length === 0) {
      errors.emailNull = "Please enter your email!"
    } else if (!isEmail(email)) {
      errors.validEmail = "Please enter a valid email address!"
    }

    if (password.trim().length === 0 || confirmpass.trim().length === 0) {
      errors.passwordNull = "Please pick and confirm a password!"
    } else if (!isPassword(password)) {
      errors.validPassword = "Password must be at least 8 characters long and have at least one uppercase letter, one number, and one symbol."
    }

    if (password !== confirmpass) {
      errors.passwordMismatch = "Password mismatch! Please try again."
    }

    setErrors(errors);

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
        const { data } = await addUser({
          variables: { ...formState },
        });
  
        Auth.login(data.addUser.token);
        window.location.assign('/create-pet')
      } catch (e) {
        const { name, message } = e;
  
        setErrors({
          [name]: message,
        });
      }
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
                    <InputGroup.Text id="username-input">Username</InputGroup.Text>
                    <FormControl
                      aria-label="Username"
                      aria-describedby="username-input"
                      placeholder="Username"
                      name="username"
                      type="text"
                      value={formState.username}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="email-input">Email</InputGroup.Text>
                    <FormControl
                      aria-label="Email"
                      aria-describedby="email-input"
                      placeholder="Email"
                      name="email"
                      type="text"
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="password-input">Password</InputGroup.Text>
                    <FormControl
                      aria-label="Password"
                      aria-describedby="password-input"
                      placeholder="******"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="confirm-password-input">Confirm Password</InputGroup.Text>
                    <FormControl
                      aria-label="Confirm Password"
                      aria-describedby="confirm-password-input"
                      placeholder="******"
                      name="confirmpass"
                      type="password"
                      value={formState.confirmpass}
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

              {/* {Object.entries(errors).map(([key, err]) => (
                <span
                  key={`${key}: ${err}`}
                  className="my-1 p-3 bg-danger text-white"
                >
                  {key} : {err}
                </span>
              ))} */}

              {/* {error && (
                <div className="my-1 p-3 bg-danger text-white">
                  {JSON.stringify(error)}
                </div>
              )} */}
            </div>

          </Card.Body>
        </div>
      </Card>

      </div>
      <ToastComponent
        errors={errors} 
      />
    </main>
  );
};

export default Signup;
