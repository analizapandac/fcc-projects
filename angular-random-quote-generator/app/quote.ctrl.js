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