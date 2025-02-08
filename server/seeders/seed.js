const db = require('../config/connection');
const { AllPets, Bots, Pet, User } = require('../models');
const allpetSeeds = require('./allpetSeeds.json');
const botSeeds = require('./botSeeds.json');

db.once('open', async () => {
  try {
    await AllPets.deleteMany({});
    await Pet.deleteMany({});
    await User.deleteMany({});
    await Bots.deleteMany({});


    // await AllPets.create(allpetSeeds);
    await Bots.create(botSeeds);

    // for (let i = 0; i < petSeeds.length; i++) {
    //   const { _id, petOwner } = await Pet.create(petSeeds[i]);
      
    //   const user = await User.findOneAndUpdate(
    //     { username: petOwner },
    //     {
    //       $addToSet: {
    //         pets: _id,
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
