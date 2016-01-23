angular.module('randomQuoteTemplates', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("app/quote.tpl.html",
    "<div class=quote-wrapper><h2 class=quote>{{ quote.quote }}</h2><p class=author>{{ quote.author }} <em class=book ng-if=quote.book>, {{ quote.book }}</em></p><p class=buttons-wrapper><a ng-click=changeQuote() data-toggle=tooltip data-placement=top title=\"Generate New Quote\"><span class=\"fa fa-refresh\"></span></a> <a href=https://twitter.com/share class=twitter-share-button count data-text=\"{{ quote.quote }}~{{ quote.author }}\">Tweet</a></p></div>");
}]);

(function(){
	'use strict';

	angular
		.module('randomQuoteGenerator', ['randomQuoteTemplates']);

})();
(function(){
	'use strict';

	angular
		.module('randomQuoteGenerator')
		.factory('HttpResponseHandlers', HttpResponseHandlers);

	HttpResponseHandlers.$inject = ['$q'];

	function HttpResponseHandlers ($q) {
		return {
			handleSuccess: handleSuccess,
			handleError: handleError
		}

		//credits to Ben Nadel - http://www.bennadel.com/blog/2612-using-the-http-service-in-angularjs-to-make-ajax-requests.htm
		//transform the error response
		function handleError ( response ) {
			// The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if( !angular.isObject( response.data ) || !response.data.message) {
            	return ( $q.reject('An error occured.') );
            }

            //otherwise, use the expected error message
            return( $q.reject( response.data.message ) );
		}

		//transform the successful response, unwrapping the data from the api response payload
		function handleSuccess ( response ) {
			return( response.data );
		}
	}

})();
(function(){
	'use strict';

	angular
		.module('randomQuoteGenerator')
		.factory('QuotesService', QuotesService);

	QuotesService.$inject = ['$http','HttpResponseHandlers'];

	function QuotesService ($http, HttpResponseHandlers) {
		return {
			getQuotes: getQuotes
		}

		function getQuotes () {
			var request = $http.get('app/api/quotes.json');
			return request.then(HttpResponseHandlers.handleSuccess, HttpResponseHandlers.handleError);
		}
	}

})();
(function(){
	'use strict';

	angular
		.module('randomQuoteGenerator')
		.controller('QuoteCtrl', QuoteCtrl);

	QuoteCtrl.$inject = ['QuotesService', '$scope'];

	function QuoteCtrl (QuotesService, $scope) {
		var vm = this;
		vm.getQuotes = getQuotes;
		vm.getQuote = getQuote;
		vm.changeQuote = changeQuote;

		function getQuotes () {
			QuotesService.getQuotes().then(function (quotes) {
				vm.quotes = quotes;
				$scope.$broadcast('ready-to-render');
			});
		}

		function getQuote () {
			var num = Math.floor(Math.random() * (vm.quotes.length));
			return vm.quotes[num];
		}

		function changeQuote (quote_id) {
			var num = Math.floor(Math.random() * (vm.quotes.length));
			var quote = vm.quotes[num];
			if(quote.id === quote_id){
				return changeQuote(quote_id);
			}
			return quote;
		}
	}

})();
(function(){
	'use strict';

	angular
		.module('randomQuoteGenerator')
		.directive('rqQuotes', rqQuotes)
		.directive('rqQuote', rqQuote);

	rqQuotes.$inject = [];
	rqQuote.$inject = [];

	function rqQuotes () {
		return {
			restrict: 'E',
			require: 'rqQuotes',
			controller: 'QuoteCtrl as quote_ctrl',
			link: link
		}

		function link (scope, element, attributes, quotes_controller) {
			//initialize tooltips
			jQuery('[data-toggle="tooltip"]').tooltip()
			quotes_controller.getQuotes();
		}
	}

	function rqQuote () {
		return {
			restrict: 'E',
			scope: true,
			require: ['^rqQuotes'],
			link: link,
			templateUrl: 'app/quote.tpl.html',
			controller: controller
		}

		function controller ($scope) {
			$scope.changeQuote = function () {
				$scope.$broadcast('change-quote');
			}
		}

		function link (scope, element, attributes, controllers) {
			var quotes_controller = controllers[0];
			scope.$on('ready-to-render', function (e){
				scope.quote = quotes_controller.getQuote();
				jQuery('html body').css("background", "url('" + scope.quote.background_image + "')");
			});

			scope.$on('change-quote', function (e){
				scope.quote = quotes_controller.changeQuote(scope.quote.id);
				jQuery('html body').css("background", "url('" + scope.quote.background_image + "')");
			});
		}
	}

})();