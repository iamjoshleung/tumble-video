(function () {
  angular
    .module('tumblrvideo')
    .service('locale', locale);

    locale.$inject = ['$translate', 'LOCALES', '$rootScope', 'tmhDynamicLocale'];
    function locale ($translate, LOCALES, $rootScope, tmhDynamicLocale) {
      'use strict';
      // PREPARING LOCALES INFO
      var localesObj = LOCALES.locales;

      // locales and locales display names
      var _LOCALES = Object.keys(localesObj);
      if (!_LOCALES || _LOCALES.length === 0) {
        console.error('There are no _LOCALES provided');
      }
      var _LOCALES_DISPLAY_NAMES = [];
      _LOCALES.forEach(function (localeStr) {
        _LOCALES_DISPLAY_NAMES.push(localesObj[localeStr]);
      });

      // STORING CURRENT LOCALE
      var currentLocale = $translate.use();// because of async loading

      // console.log($translate.use());

      // METHODS
      var checkLocaleIsValid = function (localeStr) {
        return _LOCALES.indexOf(localeStr) !== -1;
      };

      var setLocale = function (localeStr) {
        if (!checkLocaleIsValid(localeStr)) {
          console.error('Locale name "' + localeStr + '" is invalid');
          return;
        }
        currentLocale = localeStr;// updating current locale

        // asking angular-translate to load and apply proper translations
        $translate.use(localeStr);
      };

      // EVENTS
      // on successful applying translations by angular-translate
      $rootScope.$on('$translateChangeSuccess', function (event, data) {
        document.documentElement.setAttribute('lang', data.language);// sets "lang" attribute to html

         // asking angular-dynamic-locale to load and apply proper AngularJS $locale setting
        tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
      });

      return {
        getLocaleDisplayName: function () {
          return localesObj[currentLocale];
        },
        setLocaleByDisplayName: function (localeDisplayName) {
          setLocale(
            _LOCALES[
              _LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)// get locale index
              ]
          );
        },
        getLocalesDisplayNames: function () {
          return _LOCALES_DISPLAY_NAMES;
        }
      };
    }
})();
