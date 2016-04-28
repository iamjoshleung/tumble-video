var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
  poster: { type: String, required: true },
  src: { type: String, required: true },
  description: { type: String, max: 255 },
  downloadShorten: { type: String, required: true },
  originShorten: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

mongoose.model('Video', videoSchema);
