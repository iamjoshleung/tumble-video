(function () {
  angular
    .module('tumblrvideo')
    .service('tumblrVideoData', tumblrVideoData);

  tumblrVideoData.$inject = ['$http'];
  function tumblrVideoData($http) {
    var getVideoList = function (currentPage) {
      return $http.get('/api/videos?currentPage=' + currentPage);
    };

    var postVideo = function (link) {
      return $http.post('/api/videos', {link: link});
    };

    var getVideo = function (videoid) {
      return $http.get('/api/videos/' + videoid);
    };

    var updateVideo = function (videoid, data) {
      return $http.put('/api/videos/' + videoid, data);
    };

    return {
      getVideoList: getVideoList,
      postVideo: postVideo,
      getVideo: getVideo,
      updateVideo: updateVideo
    };
  }
})();
