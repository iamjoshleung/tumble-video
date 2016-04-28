(function () {
  angular
    .module('tumblrvideo')
    .controller('ngTranslateLanguageSelect', ngTranslateLanguageSelect);

  ngTranslateLanguageSelect.$inject = ['locale'];
  function ngTranslateLanguageSelect (locale) {
      var vm = this;
      vm.currentLocaleDisplayName = locale.getLocaleDisplayName();
      vm.localesDisplayNames = locale.getLocalesDisplayNames();
      vm.visible = vm.localesDisplayNames &&
      vm.localesDisplayNames.length > 1;

      vm.changeLanguage = function (localeToBeChange) {
          locale.setLocaleByDisplayName(localeToBeChange);
      };
  }
})();
