const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    activePet: Pet
    pets: [Pet]!
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

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    allpets: [AllPets]
    pets(username: String): [Pet]
    pet(petId: ID!): Pet
    inbox(username: String): [Message]
    message(messageId: ID!): Message
    posts(username: String): [Post]
    post(postId: ID!): Post
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPet(petSpecies: String!, petName: String!, petColour: String!): Pet
    favouritePet(petId: String!): Pet
    removePet(petId: String!): Pet
    sendMessage(messageRecipient: String!, messageTitle: String!, messageText: String!): Message
    toggleRead(messageId: String!): Message
    deleteMessage(messageId: String!): Message
    addPost(postTitle: String!, postText: String!): Post
    addComment(postId: ID!, commentText: String!): Post
    removePost(postId: String!): Post
    removeComment(postId: String!, commentId: String!): Post
  }
`;

module.exports = typeDefs;