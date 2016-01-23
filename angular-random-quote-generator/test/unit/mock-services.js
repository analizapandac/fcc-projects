(function(){
	'use strict';

	var app =angular.module('mockedServices', []);

	app.factory('mockCompanyService', mockCompanyService);

	mockCompanyService.$inject = ['$q'];

	function mockCompanyService ($q) {

		var companies  = [
							{
								"id": 1,
								"name": "Convert Better",
								"created_at": "2016-01-06 00:00:00",
								"updated_at": "2016-01-06 00:00:00"
							},
							{
								"id": 2,
								"name": "Getmore",
								"created_at": "2016-01-06 00:00:00",
								"updated_at": "2016-01-06 00:00:00"
							},
							{
								"id": 3,
								"name": "Loansolutions",
								"created_at": "2016-01-06 00:00:00",
								"updated_at": "2016-01-06 00:00:00"
							}
					];

		return {
			getCompanies: getCompanies,
			addCompany: addCompany,
			editCompany: editCompany,
			updateCompany: updateCompany
		};

		function getCompanies () {
			var defer = $q.defer();
			defer.resolve(companies);
			return defer.promise;
		}

		function addCompany (company) {
			var defer = $q.defer();
		
			companies.push(company);
			defer.resolve(company);

			return defer.promise;
		}

		function editCompany () {

		}

		function updateCompany () {

		}

	}

})();