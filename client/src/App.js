import { useState, useEffect } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import BotBuilder from './pages/BotBuilder'
import Forum from './pages/Forum'
import MessageCenter from './pages/MessageCenter'
import SingleMessage from './pages/SingleMessage'
import NewMessage from './pages/NewMessage'
import SinglePost from './pages/SinglePost'
import NewPost from './pages/NewPost'
import SingleBot from './pages/SingleBot'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import ProfileBots from './pages/ProfileBots'
import Header from './components/Header'
import { Sidebar } from './components/Sidebar'
import Footer from './components/Footer'
import Assets from './pages/Assets'
import ToastComponent from './components/ToastComponent'
import { ThemeContext } from './contexts/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/style.css'

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
  )

  const routes = [
    { path: '/', component: <Home/>, exact: true },
    { path: '/login', component: <Login/>, exact: true },
    { path: '/signup', component: <Signup/>, exact: true },
    { path: '/bot-builder', component: <BotBuilder/>, exact: true },
    { path: '/message-center/:tab', component: <MessageCenter/>, exact: true },
    { path: '/messages/:messageId', component: <SingleMessage/>, exact: true },
    { path: '/new-message', component: <NewMessage/>, exact: true },
    { path: '/community-forums', component: <Forum/>, exact: true },
    { path: '/posts/:postId', component: <SinglePost/>, exact: true },
    { path: '/new-post', component: <NewPost/>, exact: true },
    { path: '/edit-profile', component: <EditProfile/>, exact: true },
    { path: '/me', component: <Profile/>, exact: true },
    { path: '/profile/:username', component: <Profile/>, exact: true },
    { path: '/bots', component: <ProfileBots/>, exact: true },
    { path: '/profile/:username/bots', component: <ProfileBots/>, exact: true },
    { path: '/bots/:botId', component: <SingleBot/>, exact: true },
    { path: '/assets', component: <Assets/>, exact: true }
  ];

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
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <Header />
            <Container fluid>
              <Row className="main-content">
                <Sidebar />
                <Col lg={{span: 9, offset: 3}} xxl={{span: 10, offset: 2}} className="content">
                  {routes.map(({ path, component, exact }) => (
                    <Route key={path} exact={exact} path={path}>
                      {component}
                    </Route>
                  ))}
                  <ToastComponent />
                </Col>
              </Row>
            </Container>
            <Footer />
          </ThemeContext.Provider>
        </Router>
      </ApolloProvider>
  );
}

export default App;
