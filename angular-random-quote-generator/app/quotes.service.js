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