const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    activeBot: Bot
    userbots: [Bot]!
    inbox: [Message]!
    posts: [Post]!
  }

  type Pet {
    _id: ID
    petSpecies: String
    petName: String
    petColour: String
    createdAt: String
    petOwner: String
  }

  type Bot {
    _id: ID
    chassis: String
    botName: String
    botColour: String
    createdAt: String
    botInventor: String
  }

  type Message {
    _id: ID
    messageRecipient: String
    messageTitle: String
    messageText: String
    messageAuthor: String
    read: Boolean!
    createdAt: String
  }

  type Post {
    _id: ID
    postTitle: String
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type AllPets {
    _id: String
    petSpecies: String!
  }

  type Bots {
    _id: String
    chassis: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    bots: [Bots]
    userbots(username: String): [Bot]
    bot(botId: ID!): Bot
    inbox(username: String): [Message]
    message(messageId: ID!): Message
    posts(username: String, offset: Int, limit: Int): [Post!]
    post(postId: ID!): Post
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBot(chassis: String!, botName: String!, botColour: String!): Bot
    favouriteBot(botId: ID!): Bot
    removeBot(botId: String!): Bot
    sendMessage(messageRecipient: String!, messageTitle: String!, messageText: String!): Message
    toggleRead(messageId: ID!): Message
    deleteMessage(messageId: String!): Message
    deleteManyMessages(messageId: String!): Message
    addPost(postTitle: String!, postText: String!): Post
    addComment(postId: ID!, commentText: String!): Post
    removePost(postId: String!): Post
    removeComment(postId: String!, commentId: String!): Post
  }
`;

module.exports = typeDefs;