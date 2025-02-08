const { Schema, model } = require('mongoose');

const botsSchema = new Schema({
	_id: {
    type: String
  },
  chassis: {
    type: String
  }
});

const Bots = model('Bots', botsSchema);

module.exports = Bots;
