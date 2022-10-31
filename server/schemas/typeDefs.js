const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    activePet: Pet
    pets: [Pet]!
  }

  type Pet {
    _id: ID
    petSpecies: String
    petName: String
    petColour: String
    createdAt: String
    petOwner: String
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
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPet(petSpecies: String!, petName: String!, petColour: String!): Pet
    favouritePet(petId: String!): Pet
    removePet(petId: String!): Pet
  }
`;

module.exports = typeDefs;