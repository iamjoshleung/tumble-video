var mongoose = require('mongoose');
var Video = mongoose.model('Video');
var request = require('request');
var cheerio = require('cheerio');
var adfly = require("adf.ly")("13272837","f77dab9ad3083a2996f8b7db2796f056");

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.videosListByDate = function (req, res) {
  var nextPage, items = 15;
  if (req.query && req.query.currentPage) {
    nextPage = parseInt(req.query.currentPage) + 1;
  } else {
    nextPage = 1;
  }

  Video.find({})
    .skip(items * req.query.currentPage)
    .limit(items)
    .sort({createdAt: -1})
    .exec('find', function (err, videos) {
      if(err) {
        sendJsonResponse(res, 404, err);
        return;
      } else {
        sendJsonResponse(res, 200, {
          nextPage: nextPage,
          MaxItemsAllowed: items,
          items: videos.length,
          videos: videos
        });
      }
    });
};



module.exports.videosCreate = function (req, res) {


  if (req.body && req.body.link && req.body.link.match(/(?:https?:\/\/)?(www\.)?[a-zA-Z0-9]+\.tumblr.com\/post\/[0-9]+(?:\/[a-zA-Z0-9-]*)?/i)) {
    request(req.body.link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        var secondUrl = $("iframe").attr('src');

        if(secondUrl) {
          request(secondUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              var $ = cheerio.load(body);
              var poster = $("video").attr('poster');
              var src = $("video source").attr('src');
              var videoShorten, originShorten;

              if (!poster || !src) {
                sendJsonResponse(res, 404, {message: "Unable to find the poster and the video"});
              } else {

                adfly.short(req.body.link, function(url){
                	originShorten = url;

                  adfly.short(src, function(url){
                  	videoShorten = url;

                    Video.create({
                      poster: poster,
                      src: src,
                      description: "",
                      downloadShorten: videoShorten,
                      originShorten: originShorten,
                    }, function (err, video) {
                      if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                      }
                      sendJsonResponse(res, 200, {
                        _id: video._id,
                        poster: poster,
                        src: src,
                      });
                    });
                  });
                });

              }
            } else {
              sendJsonResponse(res, 404, error);
            }
          });
        } else {
          sendJsonResponse(res, 404, {message: 'Unable to find the video'});
        }

      } else {
        sendJsonResponse(res, 404, {message: "link error"});
      }
    });
  } else {
    sendJsonResponse(res, 404, {message: 'No link is found or invalid link'});
  }





};

module.exports.videosReadOne = function (req, res) {
  if (req.params && req.params.videoid) {
    Video
      .findById(req.params.videoid)
      .exec(function (err, video) {
        if (!video) {
          sendJsonResponse(res, 404, {
            "message": "videoid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 200, video);
      });
  } else {
    sendJsonResponse(res, 404, {
      "message": "No videoid in request"
    });
  }
};

module.exports.videosUpdateOne = function (req, res) {
  if (req.params && req.params.videoid) {
    if (!req.body.description) {
      sendJsonResponse(res, 404, {message: "nothing to update"});
      return;
    }
    Video
      .findById(req.params.videoid)
      .select('description')
      .exec(function (err, video) {
        if (err) {
          sendJsonResponse(res, 404, err);
          return;
        } else if (!video) {
          sendJsonResponse(res, 404, {message: "no video found"});
          return;
        }
        video.description = req.body.description;
        video.save(function (err, video) {
          if (err) {
            sendJsonResponse(res, 404, err);
            return;
          }
          sendJsonResponse(res, 200, video);
        });
      });
  } else {
    sendJsonResponse(res, 404, {
      "message": "No videoid in request"
    });
  }
};

module.exports.videosDeleteOne = function (req, res) {
  var videoid = req.params.videoid;
  if(videoid) {
    Video
      .findByIdAndRemove(videoid)
      .exec(function (err, video) {
        if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 204, null);
      });
  }
};
