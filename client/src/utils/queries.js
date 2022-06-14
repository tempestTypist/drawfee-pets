import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      activePet {
        _id
        petName
        petSpecies
        createdAt
        petOwner
      }
      pets {
        _id
        petName
        petSpecies
        createdAt
        petOwner
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      activePet {
        _id
        petName
        petSpecies
        createdAt
        petOwner
      }
      pets {
        _id
        petName
        petSpecies
        createdAt
        petOwner
      }
    }
  }
`;

export const QUERY_ALLPETS = gql`
  query getAllPets {
    allpets {
      petSpecies
    }
  }
`;

export const QUERY_PETS = gql`
  query getPets {
    pets {
      _id
      petSpecies
      petName
      petColour
      createdAt
      petOwner
    }
  }
`;

export const QUERY_SINGLE_PET = gql`
  query getSinglePet($petId: ID!) {
    pet(petId: $petId) {
      _id
      petSpecies
      petName
      petColour
      createdAt
      petOwner
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      activePet {
        _id
        petName
        petSpecies
        createdAt
        petOwner
      }
      pets {
        _id
        petName
        petSpecies
        createdAt
        petOwner
      }
    }
  }
`;
