const { AuthenticationError } = require('apollo-server-express');
const { User, Pet, Message, Post, AllPets } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('pets');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('pets').populate('inbox');
    },
    allpets: async () => {
      return AllPets.find().populate('allpets');
    },
    pets: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Pet.find(params).sort({ createdAt: -1 });
    },
    pet: async (parent, { petId }) => {
      return Pet.findOne({ _id: petId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('pets').populate('inbox');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    inbox: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Message.find(params).sort({ createdAt: -1 });
    },
    message: async (parent, { messageId }) => {
      return Message.findOne({ _id: messageId });
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {

      if (password === null) {
        throw new Error('Please enter a password!');
      }

      const user = await User.findOne({ email });
      const correctPw = await user.isCorrectPassword(password);


      if (!user || !correctPw) {
        throw new AuthenticationError('Incorrect email or password!');
      }

      const token = signToken(user);

      return { token, user };
    },
    addPet: async (parent, { petSpecies, petName, petColour }, context) => {
      if (context.user) {
        const pet = await Pet.create({
          petSpecies,
          petName,
          petColour,
          petOwner: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pets: pet._id } }
        );

        return pet;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    favouritePet: async (parent, { petId }, context) => {
      if (context.user) {
        const pet = await Pet.findOne({
          _id: petId,
          petOwner: context.user.username,
        });

        await User.findOneAndUpdate(
          { username: context.user.username },
          { $set: { activePet: pet } }
        );

        return pet;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removePet: async (parent, { petId }, context) => {
      if (context.user) {
        //when we make the change from pets to robots, itll be 'are you sure you wish to scrap this robot?' little less harsh than deleting a pet lmao
        const pet = await Pet.findOneAndDelete({
          _id: petId,
          petOwner: context.user.username,
        });

        await User.findOneAndUpdate(
          { username: context.user.username },
          { $pull: { pets: pet._id } }
        );

        return pet;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    sendMessage: async (parent, { messageRecipient, messageTitle, messageText }, context) => {
      if (context.user) {
        const message = await Message.create({
          messageRecipient,
          messageTitle,
          messageText,
          read: false,
          messageAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { username: messageRecipient },
          { $addToSet: { inbox: message._id } }
        );

        return message;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteMessage: async (parent, { messageId }, context) => {
      if (context.user) {
        const message = await Message.findOneAndDelete(
          { _id: messageId });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { inbox: message._id } }
        );

        return message;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addPost: async (parent, { postTitle, postText }, context) => {
      if (context.user) {
        const post = await Post.create({
          postTitle,
          postText,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
