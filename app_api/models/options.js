var mongoose = require('mongoose');

var optionSchema = new mongoose.Schema({
  optionName: {type: String, required: true, min: 2, max: 25},
  optionValue: {type: String, required: true, min: 2, max: 2048}
});

mongoose.model('Option', optionSchema);
