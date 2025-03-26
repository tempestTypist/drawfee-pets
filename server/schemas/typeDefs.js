const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    birthday: String
    email: String
    password: String
    activeBot: Bot
    userBots: [Bot]
    inventory: [Chip]!
    inbox: [Message]!
    posts: [Post]!
    createdAt: String
  }

  type Bot {
    _id: ID
    chassis: String
    botName: String
    botColour: String
    createdAt: String
    modules: [Chip]!
    inventor: String
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

  type Bots {
    _id: String
    chassis: String!
  }

  type Chip {
    _id: ID
    type: String
    name: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    bots: [Bots]
    userBots(username: String): [Bot]
    bot(botId: ID!): Bot
    inventory(username: String): [Chip]
    inbox(username: String): [Message]
    message(messageId: ID!): Message
    posts(username: String, offset: Int, limit: Int): [Post!]
    post(postId: ID!): Post
    me: User
  }

  type Mutation {
    addUser(username: String!, birthday: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBot(chassis: String!, botName: String!, botColour: String!): Bot
    favouriteBot(botId: ID!): Bot
    removeBot(botId: String!): Bot
    getChip(chipType: String!, chipName: String!, chipDesc: String!, chipEffect: String! ): Chip
    equipChip(chipId: ID!, botId: ID!): Chip
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