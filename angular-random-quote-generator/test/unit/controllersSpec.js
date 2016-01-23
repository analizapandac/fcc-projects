describe('Test Company Controller', function() {

	var CompanyCtrl, CompanyDataService;

	beforeEach(module('ui.router'));
	beforeEach(module('minislickApp.templates'));
	beforeEach(module('mockedServices'));

	beforeEach(module('minislickApp'));


	beforeEach(inject(function($controller, $injector){
		CompanyDataService = $injector.get('mockCompanyService');

		CompanyCtrl = $controller('CompanyCtrl', {
			CompanyDataService: CompanyDataService
		});

	}));

	it('should be defined', function() {
		expect(CompanyCtrl.companies).toBeDefined();
	});

	// it('should return list of companies', function() {
	// 	CompanyCtrl.getCompanies();
	// 	expect(CompanyCtrl.companies).toBe([
	// 						{
	// 							"id": 1,
	// 							"name": "Convert Better",
	// 							"created_at": "2016-01-06 00:00:00",
	// 							"updated_at": "2016-01-06 00:00:00"
	// 						},
	// 						{
	// 							"id": 2,
	// 							"name": "Getmore",
	// 							"created_at": "2016-01-06 00:00:00",
	// 							"updated_at": "2016-01-06 00:00:00"
	// 						},
	// 						{
	// 							"id": 3,
	// 							"name": "Loansolutions",
	// 							"created_at": "2016-01-06 00:00:00",
	// 							"updated_at": "2016-01-06 00:00:00"
	// 						}
	// 				]);
	// })
});