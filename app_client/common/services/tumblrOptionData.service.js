(function () {
  angular
    .module('tumblrvideo')
    .service('tumblrOptionData', tumblrOptionData);

  tumblrOptionData.$inject = ['$http'];
  function tumblrOptionData ($http) {
    var getGeneralSiteInfo = function () {
      return $http.get('/api/options/general');
    };

    return {
      getGeneralSiteInfo: getGeneralSiteInfo
    }
  }

})();
