(function () {
  angular
    .module('tumblrvideo')
    .controller('tumblrNav', tumblrNav);

  tumblrNav.$inject = ['$uibModal'];

  function tumblrNav ($uibModal) {
    var vm = this;


    vm.popupCreate = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/common/directives/tumblrLink/tumblrLink.template.html',
        controller: 'tumblrLink',
        controllerAs: 'vm',
        size: 'md'
      });
    };

  }

})();
