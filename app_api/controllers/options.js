var mongoose = require('mongoose');
var Opt = mongoose.model('Option');

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.optionsGeneral = function (req, res) {
  Opt
    .find({
      optionName: { $in: [
          'siteName',
          'siteDescription'
      ]}
    })
    .select('optionName optionValue')
    .exec(function (err, options) {
      if (err) {
        sendJsonResponse(res, 404, err);
        return;
      }
      if (!options) {
        sendJsonResponse(res, 404, {message: 'Unknown error occured'});
        return;
      }
      sendJsonResponse(res, 200, options);
    });
};
