(function () {
  angular
    .module('tumblrvideo')
    .controller('videoCreationModal', videoCreationModal);

  videoCreationModal.$inject = ['$uibModalInstance', '$timeout'];
  function videoCreationModal ($uibModalInstance, $timeout) {
    var vm = this;

    vm.modal = {
      cancel: function () {
        $uibModalInstance.dismiss('cancel');
      }
    };

  }
})();
