(function () {
  angular
    .module('tumblrvideo')
    .controller('videoModal', videoModal);

  videoModal.$inject = ['$uibModalInstance', 'videoData', '$sce', '$location'];
  function videoModal ($uibModalInstance, videoData, $sce, $location) {
    var vm = this;
    vm.videoData = videoData;


    vm.modal = {
      cancel: function () {
        $uibModalInstance.dismiss('cancel');
      }
    };

    vm.pathToCopy = $location.absUrl() + "watch/" + vm.videoData._id;

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


  }
})();
