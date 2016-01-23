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