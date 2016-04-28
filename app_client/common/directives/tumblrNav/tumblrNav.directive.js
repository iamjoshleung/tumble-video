(function () {
  angular
    .module('tumblrvideo')
    .directive('tumblrNav', tumblrNav);


  tumblrNav.$inject = ['$timeout'];

  function tumblrNav ($timeout) {

    return {
      restrict: 'EA',
      templateUrl: '/common/directives/tumblrNav/tumblrNav.template.html',
      controller: 'tumblrNav',
      controllerAs: 'vm',
      bindToController: true,
      scope: {},
      // link: function (scope, element, attrs) {
      //   $timeout(function () {
      //     componentHandler.upgradeAllRegistered();
      //   });
      // }


    };
  }
})();
