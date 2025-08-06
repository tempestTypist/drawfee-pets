const { Schema, model } = require('mongoose');

const baseBotSchema = new Schema({
	_id: {
    type: String
  },
  chassis: {
    type: String
  }
});

const BaseBot = model('BaseBot', baseBotSchema);

module.exports = BaseBot;
