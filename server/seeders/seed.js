const db = require('../config/connection');
const { BaseBot, User, UserBot } = require('../models');
const baseBotSeeds = require('./baseBotSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await UserBot.deleteMany({});
    await BaseBot.deleteMany({});

    await BaseBot.create(baseBotSeeds);

    // for (let i = 0; i < userBotSeeds.length; i++) {
    //   const { _id, inventor } = await Bot.create(userBotSeeds[i]);
      
    //   const user = await User.findOneAndUpdate(
    //     { username: inventor },
    //     {
    //       $addToSet: {
    //         userBots: _id,
    //       },
    //     }
    //   );
    // }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Database seeded!');
  process.exit(0);
});
