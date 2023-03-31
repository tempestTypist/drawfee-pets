import React, { useState, useEffect, Suspense } from 'react'
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
import MessageCenter from './pages/MessageCenter'
import SingleMessage from './pages/SingleMessage'
import NewMessage from './pages/NewMessage'
import SinglePost from './pages/SinglePost'
import NewPost from './pages/NewPost'
import SinglePet from './pages/SinglePet'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import ProfilePets from './pages/ProfilePets'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Assets from './pages/Assets'
import Loading from './components/Loading'
import ToastComponent from './components/ToastComponent'

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
  const [errors, setErrors] = useState({})
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  )

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme', theme) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    
    if (storedTheme) { 
      document.documentElement.setAttribute('data-theme', storedTheme) 
    }

    document.documentElement.setAttribute('data-theme', theme)
  }, [theme, errors]);
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header theme={theme} setTheme={setTheme} setErrors={setErrors} />
        <Container fluid>
          <Row className="main-content">
            <Sidebar />
            <Col lg={{span: 9, offset: 3}} xxl={{span: 10, offset: 2}} className="content">
              {/* uses image import, QUERY_PETS */}
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login setErrors={setErrors} />
              </Route>
              <Route exact path="/signup">
                <Signup setErrors={setErrors} />
              </Route>
              {/*uses image import, QUERY_ALLPETS*/}
              <Route exact path="/create-pet">
                <CreatePet setErrors={setErrors} />
              </Route>
              <Route exact path="/message-center/:tab">
                <MessageCenter setErrors={setErrors} />
              </Route>
              <Route exact path="/messages/:messageId">
                <SingleMessage setErrors={setErrors} />
              </Route>
              <Route exact path="/new-message">
                <NewMessage setErrors={setErrors} />
              </Route>
              {/* uses QUERY_POSTS */}
              <Route exact path="/community-forums">
                <Forum />
              </Route>
              <Route exact path="/posts/:postId">
                <SinglePost setErrors={setErrors} />
              </Route>
              <Route exact path="/new-post">
                <NewPost setErrors={setErrors} />
              </Route>
              {/* uses QUERY_USER, QUERY_ME */}
              <Route exact path="/edit-profile">
                <EditProfile />
              </Route>
              <Route exact path="/me">
                <Profile />
              </Route>
              <Route exact path="/profile/:username">
                <Profile />
              </Route>
              {/* uses QUERY_USER, QUERY_ME */}
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
              <ToastComponent toasts={errors} />
            </Col>
          </Row>
        </Container>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
