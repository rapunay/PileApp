'use strict';

(function(){
	angular
		.module("PileApp")
		.controller("AppManagerCtrl", AppManagerCtrl);

	AppManagerCtrl.$inject = ["$scope", "AppManagerService"];

	function AppManagerCtrl($scope, AppService) {
		$scope.appList = [{
				name: "Turtle in the Pond",
				path: "/public/installed-apps/turtle-in-the-pond/index.html"
			},{
				name: "Movie Watchlist",
				path: "/public/installed-apps/movie-watchlist/index.html"
			},{
				name: "Sample CMS",
				path: "/public/installed-apps/cms/index.html"
			},{
				name: "Item Inventory",
				path: "/public/installed-apps/item-inventory/itemInventory.html"
			}];
		$scope.currApp = null;
			
		$scope.openApp = function(app){
			$scope.currApp = app;
		};
	}
})();
