(function () {
  angular
    .module('tumblrvideo')
    .controller('tumblrLink', tumblrLink);

  tumblrLink.$inject = ['$scope', '$sce', '$uibModalInstance', 'tumblrVideoData', '$location'];

  function tumblrLink ($scope, $sce, $uibModalInstance, tumblrVideoData, $location) {
    var vm = this;

    vm.pattern = "(?:https?:\/\/)?(www\.)?[a-zA-Z0-9]+\.tumblr.com\/post\/[0-9]+(?:\/[a-zA-Z0-9-]*)?";

    vm.validity = false;

    vm.tumblrLink = "";

    vm.sending = false;




    // $scope.$watch('vm.config', function (newVal, oldVal) {
    //   console.log(newVal);
    // });

    vm.isValid = function (valid) {
      if (valid) {
        vm.validity = true;

        vm.sending = true;

        tumblrVideoData
          .postVideo(vm.tumblrLink)
          .then(function (response) {
            vm.videoData = response.data;

            vm.sending = false;

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
            vm.sending = false;
            console.log('failed posting');
          });





      }
    };

    vm.updateVideo = function (videoid) {
      tumblrVideoData
        .updateVideo(videoid, {description: vm.tumblrLinkDescription})
        .then(function (response) {
          vm.modal.cancel();
          $location.path('/watch/' + videoid);
        }, function (response) {
          console.log(response);
        });
    };

    vm.modal = {
      cancel: function () {
        $uibModalInstance.dismiss('cancel');
      }
    };




  }

})();
