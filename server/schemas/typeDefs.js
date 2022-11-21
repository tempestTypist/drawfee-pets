const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    activePet: Pet
    pets: [Pet]!
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

  type Post {
    _id: ID
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
    addPost(postText: String!): Post
    addComment(postId: ID!, commentText: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;