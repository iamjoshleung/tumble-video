var http = require('http');
var https = require('https');

// Return raw html content form the url
// precondition: url must be a valid link with https as protocol
module.exports.getHtmlContent = function (url) {
  https.get(url, (res) => {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function () {
      return {
        status: 'success',
        content: data
      };
    });
  }).on('error', (e) => {
    return {
      status: 'failure',
      content: e.message
    };
  });
};
