(function () {
  angular.module('tumblrvideo',
                ['ngRoute',
                 'ngCookies',
                 'wu.masonry',
                 'ui.bootstrap',
                 'ngSanitize',
            		 'com.2fdevs.videogular',
            		 'com.2fdevs.videogular.plugins.controls',
            		 'com.2fdevs.videogular.plugins.overlayplay',
            		 'com.2fdevs.videogular.plugins.poster',
                 'ngclipboard',
                 'pascalprecht.translate',// angular-translate
                 'tmh.dynamicLocale'// angular-dynamic-locale
                ]
  );

  function routeConfig ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/watch/:watchid', {
        templateUrl: 'watch/watch.view.html',
        controller: 'watchCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        template: '<h1>Unmatched url</h1>'
      });

    $locationProvider.html5Mode(true);
  }

  function run ($rootScope, $timeout) {
    // Integrate with Google MDL
    $rootScope.$on('$viewContentLoaded', function () {
      $timeout(function () {
        componentHandler.upgradeAllRegistered();
      });
    });

    setInterval(function() {
      componentHandler.upgradeAllRegistered();
    }, 200);
  }

  function localesConstant () {
    return {
        'locales': {
          'zh_TW': '中文(繁體)',
          'zh_CN': '中文(简体)',
          'en_US': 'English'
      },
      'preferredLocale': 'en_US'
    }
  }

  function translateConfig ($translateProvider, tmhDynamicLocaleProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: '/resources/locales/locale-',// path to translations files
        suffix: '.json'// suffix, currently- extension of the translations
    });
    $translateProvider.preferredLanguage('en_US');// is applied on first load
    $translateProvider.useLocalStorage();// saves selected language to localStorage
    $translateProvider.useMissingTranslationHandlerLog(); //To get warnings in the developer console, regarding forgotten IDs in translations
    tmhDynamicLocaleProvider.localeLocationPattern('/angular-i18n/angular-locale_{{locale}}.js');
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
  }

  function generalSiteInfo ($rootScope, tumblrOptionData) {
    $rootScope.siteInfo = {
      name: '',
      description: '',
      headTitle: ''
    };
    tumblrOptionData
      .getGeneralSiteInfo()
      .then(function (response) {
        for(var i = 0; i < response.data.length; i++) {
          if (response.data[i].optionName === 'siteName') {
            $rootScope.siteInfo.name = response.data[i].optionValue;
          }

          if (response.data[i].optionName === 'siteDescription') {
            $rootScope.siteInfo.description = response.data[i].optionValue;
          }
        }
        $rootScope.siteInfo.headTitle = $rootScope.siteInfo.name + ' - ' + $rootScope.siteInfo.description;
      });
  }

  angular
    .module('tumblrvideo')
    .config(['$routeProvider', '$locationProvider', routeConfig])
    .config(['$translateProvider', 'tmhDynamicLocaleProvider', translateConfig])
    .run(['$rootScope', '$timeout', run])
    .run(['$rootScope', 'tumblrOptionData', generalSiteInfo])
    .constant('LOCALES', {
        'locales': {
          'zh_TW': '中文(繁體)',
          'zh_CN': '中文(简体)',
          'en_US': 'English'
      },
      'preferredLocale': 'en_US'
    });
})();
