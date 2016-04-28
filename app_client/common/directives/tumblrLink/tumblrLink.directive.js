(function () {
  angular
    .module('tumblrvideo')
    .directive('tumblrLink', tumblrLink);


  tumblrLink.$inject = ['$timeout'];

  function tumblrLink ($timeout) {

    return {
      restrict: 'EA',
      templateUrl: '/common/directives/tumblrLink/tumblrLink.template.html',
      controller: 'tumblrLink',
      controllerAs: 'vm',
      bindToController: true,
      scope: {},
      link: function (scope, element, attrs, ctrl) {
      }


    };
  }
})();
