var url = require('url');
var http = require('http');
var https = require('https');
var cheerio = require('cheerio');

// Return a tumblr post link with https as the protocol
// precondition: link must not be empty and is a valid url
module.exports.changeProtocolToHttps = function (link) {
  var parsedUrl = url.parse(link);
  if(parseUrl.protocol === 'https:') {
    return link;
  }
  return link.replace('http', 'https');
};

// Return an object with 'poster' and 'video source' as properties
// which is parsed from the link
// precondition: link must be a tumblr post link with https as protocol
module.exports.getTumblrData = function (link) {
  https.get(url, (res) => {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function () {
      var $ = cheerio.load(data);
      // console.log($('video').attr('poster'));
    });
  }).on('error', (e) => {
    return {
      status:
    };
  });
};
