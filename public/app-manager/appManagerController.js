'use strict';

(function(){
	angular
		.module("PileApp")
		.controller("AppManagerCtrl", AppManagerCtrl);

	AppManagerCtrl.$inject = ["$scope", "AppManagerService"];

	function AppManagerCtrl($scope, AppService) {
		$scope.appList = [{
				name: "Turtle in the Pond",
				path: "public/installed-apps/turtle-in-the-pond/index.html"
			},{
				name: "Movie Watchlist",
				path: "public/installed-apps/movie-watchlist/index.html"
			},{
				name: "Sample CMS",
				path: "public/installed-apps/cms/index.html"
			},{
				name: "Item Inventory",
				path: "public/installed-apps/item-inventory/itemInventory.html"
			}];
		$scope.currApp = null;
		$scope.navStatus = "collapsed";
		$scope.navIconTitle = "Expand Navigator";
		$scope.verNavIconClass = "arrow-left";
		$scope.horNavIconClass = "arrow-down";
			
		$scope.openApp = function(app){
			$scope.currApp = app;
			$scope.toggleNavigator();
		};
		
		$scope.toggleNavigator = function(){
			if($scope.navStatus == "collapsed"){
				$scope.navStatus = "";
				$scope.navIconTitle = "Collapse Navigator";
				$scope.verNavIconClass = "arrow-right";
				$scope.horNavIconClass = "arrow-up";
			}else{
				$scope.navStatus = "collapsed";
				$scope.navIconTitle = "Expand Navigator";
				$scope.verNavIconClass = "arrow-left";
				$scope.horNavIconClass = "arrow-down";
			}
		}
	}
})();
