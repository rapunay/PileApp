'use strict';

(function(){
	angular
		.module("PileApp")
		.factory("AppManagerService", AppManagerService);

	AppManagerService.$inject = ["$http"];
	
	function AppManagerService($http, Upload){
		var baseUrl = "http://localhost:3000",
			service = {};
		
		return service;
	}
})();
