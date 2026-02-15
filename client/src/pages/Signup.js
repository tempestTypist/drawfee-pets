import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { ADD_USER } from '../utils/mutations'
import Auth from '../utils/auth';
import { useError } from '../contexts/ErrorContext'
import { Card, InputGroup, FormControl } from 'react-bootstrap'
import JankyButton from '../components/JankyButton'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
const dateFormat = require('../utils/dateFormat');

const isUsername = (username) =>
  /^[a-zA-Z0-9](?!.*\.\.)(?!.*\.$)[\w.]{0,29}$/i.test(username);

const isEmail = (email) => 
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(email);

const isPassword = (password) =>
  /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/i.test(password);

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    birthday: null,
    email: '',
    password: '',
    confirmpass: '',
  });
  const { setError } = useError();

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(formState)
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleDate = (date) => {
  //   setFormState((prevData) => ({
  //     ...prevData,
  //     birthday: date,
  //   }));
  //   console.log(formState)
  // };

  const validateForm = () => {
    const { username, email, password, confirmpass } = formState;
    setError(null);
    console.log("validating.......")

    if (username.trim().length === 0) {
      setError({ message: 'Please choose your username!' });
      return false;
    } else if ((username.trim().length >= 1 && username.trim().length < 5) || username.trim().length > 30) {
      setError({ message: 'Username has to be between 5-30 characters long.' });
      return false;
    } else if (!isUsername(username)) {
      setError({ message: 'Please enter a valid username! Usernames can contain characters a-z, 0-9, underscores and periods. The username cannot start or end with a period. It must also not have more than one period sequentially. Max length is 30 chars.' });
      return false;
    }

    if (email.trim().length === 0) {
      setError({ message: 'Please enter your email!' });
      return false;
    } else if (!isEmail(email)) {
      setError({ message: 'Please enter a valid email address!' });
      return false;
    }

    if (password.trim().length === 0 || confirmpass.trim().length === 0) {
      setError({ message: 'Please pick and confirm a password!' });
      return false;
    } else if (!isPassword(password)) {
      setError({ message: 'Password must be at least 8 characters long and have at least one uppercase letter, one number, and one symbol.' });
      return false;
    }

    if (password !== confirmpass) {
      setError({ message: 'Password mismatch! Please try again.' });
      return false;
    }
    console.log("returned true!")
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting.......")
    if (validateForm()) {
      try {
        const { data } = await addUser({
          variables: { ...formState },
        });

        Auth.login(data.addUser.token);
        window.location.assign('/bot-builder');
      } catch (err) {
        console.log("failed to submit!")
        setError({ message: err.message });
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
                    <Link to="/bot-builder">next step.</Link>
                  </p>
                ) : (
                  <form className="my-3" onSubmit={handleFormSubmit}>

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
                      <InputGroup.Text id="birthday-input">Birthday</InputGroup.Text>
                      <DatePicker
                        aria-label="Birthday"
                        aria-describedby="birthday-input"
                        placeholder="MM/DD/YYYY"
                        name="birthday"
                        type="date"
                        selected={formState.birthday}
                        value={formState.birthday}
                        onChange={(date) => setFormState((prevData) => ({
                              ...prevData,
                              birthday: dateFormat(date, { formatType: 'MM/DD/YYYY' }),
                            }))}
                        dateFormat="MM/dd/yyyy"
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
                      variant="theme"
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
    </main>
  );
};

export default Signup;