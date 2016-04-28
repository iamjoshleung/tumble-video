(function () {
  angular
    .module('tumblrvideo')
    .controller('watchCtrl', watchCtrl);

  watchCtrl.$inject = ['$sce', '$uibModal', '$routeParams', 'tumblrVideoData'];
  function watchCtrl ($sce, $uibModal, $routeParams, tumblrVideoData) {
    var vm = this;

    tumblrVideoData
      .getVideo($routeParams.watchid)
      .then(function (response) {
        vm.videoData = response.data;
        vm.config = {
          sources: [
    				{src: $sce.trustAsResourceUrl(vm.videoData.src), type: "video/mp4"},
    			],
    			tracks: [
    				{
    					src: "",
    					kind: "",
    					srclang: "",
    					label: "",
    					default: ""
    				}
    			],
    			theme: "/videogular-themes-default/videogular.css",
    			plugins: {
    				poster: vm.videoData.poster
    			}
        };

      }, function (response) {
        console.log(response);
      });

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
