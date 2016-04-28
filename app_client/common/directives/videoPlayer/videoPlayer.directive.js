(function () {
  angular
    .module('tumblrvideo')
    .directive('videoPlayer', videoPlayer);


  videoPlayer.$inject = ['$timeout'];

  function videoPlayer ($timeout) {

    return {
      restrict: 'EA',
      templateUrl: '/common/directives/videoPlayer/videoPlayer.template.html',
      scope: {
        videoData: "="
      },
      // link: function (scope, element, attrs) {
      //
      // }

    };
  }
})();
