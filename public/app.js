//where we configure routes
'use strict';

(function(){
	angular
		.module("PileApp", ["ngRoute", "ngFileUpload"])
		.config(config);
		
			
	config.$inject=["$routeProvider"];

function config($routeProvider){
	$routeProvider
		.when('/dashboard', {
			"controller":"DashboardCtrl",
			"templateUrl" : "public/dashboard/dashboard.html" })
		.when('/apps', {
			"controller":"AppManagerCtrl",
			"templateUrl" : "public/app-manager/appManager.html" })
		.otherwise({"redirectTo" : "dashboard"});
}
})(); 