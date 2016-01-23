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