const { Schema, model } = require('mongoose');

const allpetsSchema = new Schema({
	_id: {
    type: String
  },
  petSpecies: {
    type: String
  }
});

const AllPets = model('AllPets', allpetsSchema);

module.exports = AllPets;
