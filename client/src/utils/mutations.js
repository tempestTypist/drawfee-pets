import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PET = gql`
  mutation addPet($petSpecies: String!, $petName: String!, $petColour: String!) {
    addPet(petSpecies: $petSpecies, petName: $petName, petColour: $petColour) {
      _id
      petSpecies
      petName
      petColour
      createdAt
      petOwner
    }
  }
`;

export const FAVOURITE_PET = gql`
  mutation favouritePet($petId: String!) {
    favouritePet(petId: $petId) {
      _id
    }
  }
`;

export const REMOVE_PET = gql`
  mutation removePet($petId: String!) {
    removePet(petId: $petId) {
      _id
      petName
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

