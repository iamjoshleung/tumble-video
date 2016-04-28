(function () {
  angular
    .module('tumblrvideo')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', '$uibModal', 'tumblrVideoData'];
  function homeCtrl ($scope, $uibModal, tumblrVideoData) {
    var vm = this;

    vm.currentPage = 0;
    vm.videos = [];
    vm.hasMoreVideo = true;

    // tumblrVideoData
    //   .getVideoList(vm.currentPage)
    //   .then(function (response) {
    //
    //
    //     vm.currentPage = response.data.nextPage;
    //     vm.videos.push.apply(vm.videos, response.data.videos);
    //     console.log(vm.videos);
    //
    //
    //   }, function (response) {
    //     console.log(response);
    //   });


    vm.popupVideo = function (video) {
      var modalInstance = $uibModal.open({
        templateUrl: '/videoModal/videoModal.view.html',
        controller: 'videoModal',
        controllerAs: 'vm',
        size: 'md',
        resolve: {
          videoData: function () {
            return video;
          }
        }
      });

    };

    vm.popupCreate = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/common/directives/tumblrLink/tumblrLink.template.html',
        controller: 'tumblrLink',
        controllerAs: 'vm',
        size: 'md'
      });
    };

    vm.loadMore = function () {
      tumblrVideoData
        .getVideoList(vm.currentPage)
        .then(function (response) {


          vm.currentPage = response.data.nextPage;
          vm.videos.push.apply(vm.videos, response.data.videos);

          if (response.data.items < response.data.MaxItemsAllowed) {
            vm.hasMoreVideo = false;
          }


        }, function (response) {
          console.log(response);
        });
    };

    vm.loadMore();


  }
})();
