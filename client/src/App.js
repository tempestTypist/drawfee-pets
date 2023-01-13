import React, { useState, useEffect } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/style.css'

import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import CreatePet from './pages/CreatePet'
import Forum from './pages/Forum'
import SinglePost from './pages/SinglePost'
import NewPost from './pages/NewPost'
import SinglePet from './pages/SinglePet'
import Profile from './pages/Profile'
import ProfilePets from './pages/ProfilePets'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Assets from './pages/Assets'

// construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const [theme, setTheme] = useState(
      localStorage.getItem('theme') || 'light'
    );

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme', theme) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    
    if (storedTheme) { 
      document.documentElement.setAttribute('data-theme', storedTheme) 
    }

    document.documentElement.setAttribute('data-theme', theme)
  }, [theme]);
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header theme={theme} setTheme={setTheme} />
        <Container fluid>
          <Row className="main-content">
            <Sidebar />
            <Col lg={{span: 9, offset: 3}} xxl={{span: 10, offset: 2}} className="content">
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/create-pet">
                <CreatePet />
              </Route>
              <Route exact path="/community-forums">
                <Forum />
              </Route>
              <Route exact path="/posts/:postId">
                <SinglePost />
              </Route>
              <Route exact path="/new-post">
                <NewPost />
              </Route>
              <Route exact path="/me">
                <Profile />
              </Route>
              <Route exact path="/profile/:username">
                <Profile />
              </Route>
              <Route exact path="/pets">
                <ProfilePets />
              </Route>
              <Route exact path="/profile/:username/pets">
                <ProfilePets />
              </Route>
              <Route exact path="/pets/:petId">
                <SinglePet />
              </Route>
              <Route exact path="/assets">
                <Assets />
              </Route>
            </Col>
          </Row>
        </Container>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
