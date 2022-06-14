const db = require('../config/connection');
const { User, Pet, AllPets } = require('../models');
const userSeeds = require('./userSeeds.json');
const petSeeds = require('./petSeeds.json');
const allpetSeeds = require('./allpetSeeds.json');


db.once('open', async () => {
  try {
    await AllPets.deleteMany({});
    await Pet.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);
    await AllPets.create(allpetSeeds);

    for (let i = 0; i < petSeeds.length; i++) {
      const { _id, petOwner } = await Pet.create(petSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: petOwner },
        {
          $addToSet: {
            pets: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
