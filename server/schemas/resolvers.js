const { AuthenticationError } = require('apollo-server-express');
const { User, Bot, Message, Post, Bots, Chip } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('userBots');
    },
    
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('userBots').populate({ path: 'inbox', options: { sort: { createdAt: -1 } } });
    },

    bots: async () => {
      return Bots.find().populate('bots');
    },

    bot: async (parent, { botId }) => {
      return Bot.findOne({ _id: botId });
    },

    userBots: async (parent, { username }) => {
      const params = username ? { username } : {};  // If a username is provided, filter by username
      return Bot.find(params).sort({ createdAt: -1 });  // Sort pets by creation date, descending
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate('userBots')
          .populate({ path: 'inbox', options: { sort: { createdAt: -1 } } });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    inbox: async (parent, { username }) => {
      return Message.find({ messageRecipient: username }).sort({ createdAt: -1 });
    },

    message: async (parent, { messageId }) => {
      return Message.findOne({ _id: messageId });
    },

    posts: async (parent, { username }) => {
      const params = username ? { username } : {};  // If a username is provided, filter by username
      return Post.find(params).sort({ createdAt: -1 });  // Sort posts by creation date, descending
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
        throw new Error('Please enter your password!');
      }

      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect email or password!');
      }
      
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    // addPet: async (parent, { petSpecies, petName, petColour }, context) => {
    //   if (context.user) {
    //     const pet = await Pet.create({
    //       petSpecies,
    //       petName,
    //       petColour,
    //       petOwner: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { pets: pet._id } }
    //     );

    //     return pet;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    addBot: async (parent, { chassis, botName, botColour }, context) => {
      if (context.user) {
        const bot = await Bot.create({
          chassis,
          botName,
          botColour,
          inventor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { userBots: bot._id } }
        );

        return bot;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // favouritePet: async (parent, { petId }, context) => {
    //   if (context.user) {
    //     const pet = await Pet.findOne({ _id: petId, petOwner: context.user.username });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $set: { activePet: { ...pet } } }
    //     );

    //     return pet;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    favouriteBot: async (parent, { botId }, context) => {
      if (context.user) {
        const bot = await Bot.findOne({ _id: botId, inventor: context.user.username });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { activeBot: { ...bot } } }
        );

        return bot;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // removePet: async (parent, { petId }, context) => {
    //   if (context.user) {
    //     const pet = await Pet.findOneAndDelete({
    //       _id: petId,
    //       petOwner: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { username: context.user.username },
    //       { $pull: { pets: pet._id } }
    //     );

    //     return pet;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    removeBot: async (parent, { botId }, context) => {
      if (context.user) {
        const bot = await Bot.findOneAndDelete({
          _id: botId,
          inventor: context.user.username,
        });

        await User.findOneAndUpdate(
          { username: context.user.username },
          { $pull: { pets: bot._id } }
        );

        return bot;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    getChip: async (parent, { chipType, chipName, chipDesc, chipEffect }, context) => {
      if (context.user) {
        const chip = await Chip.create({
          chipType,
          chipName,
          chipDesc,
          chipEffect
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { inventory: chip._id } }
        );

        return chip;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    equipChip: async (parent, { botId, chipId }, context) => {

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

        const user = await User.findOneAndUpdate(
          { username: message.messageRecipient },
          { $addToSet: { inbox: message._id } }
        );

        if (!user) {
          throw new AuthenticationError('Invalid recipient! Please check the spelling of the username!');
        }

        return message;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    toggleRead: async (parent, { messageId }, context) => {
      if (context.user) {
        const message = await Message.findOne({ _id: messageId });

        await Message.findOneAndUpdate(
          { _id: messageId },
          { $set: { read: !message.read } }
        );

        return message;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    deleteMessage: async (parent, { messageId }, context) => {
      if (context.user) {
        const message = await Message.findOneAndDelete({ _id: messageId });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { inbox: message._id } }
        );

        return message;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    deleteManyMessages: async (parent, { messageId }, context) => {
      if (context.user) {
        await Message.deleteMany({ _id: { $in: [...messageId] } });
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
              comments: { _id: commentId, commentAuthor: context.user.username },
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
