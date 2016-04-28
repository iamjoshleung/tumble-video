(function () {
  angular
    .module('tumblrvideo')
    .directive('ngTranslateLanguageSelect', ngTranslateLanguageSelect);

    ngTranslateLanguageSelect.$inject = [];
    function ngTranslateLanguageSelect () {
      'use strict';
      return {
          restrict: 'EA',
          templateUrl: '/common/directives/ngTranslateLanguageSelect/ngTranslateLanguageSelect.template.html',
          controller: 'ngTranslateLanguageSelect',
          controllerAs: 'vm',
          bindToController: true,
          scope: {}
      };
    }
})();
