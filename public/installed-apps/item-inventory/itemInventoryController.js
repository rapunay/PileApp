'use strict';

(function(){
	angular
		.module("ItemInventory")
		.controller("ItemInventoryCtrl", ItemInventoryCtrl);

	ItemInventoryCtrl.$inject = ["$scope", "ItemInventoryService"];

	function ItemInventoryCtrl($scope, ItemService) {
		var templates = {
				itemFormView: "templates/form.html",
				recordsView: "templates/records.html",
				searchView: "templates/search.html"
			},
			currPanel = "create";
		
		$scope.templateUrl = templates.itemFormView;
		$scope.itemList = [];
		$scope.item = {};
		$scope.searchCriteria = {};
		$scope.mode = {
			update: false,
			remove: false,
			modal: false,
			reqError: false,
			reqSuccess: false
		};
		$scope.searchOptions = ["Id", "Name", "Model", "Type", "Quantity", "Price"];
		$scope.appMsg = "";
		
		$scope.addItem = function(form){
			$scope.toggleMode("reqError", false);
			$scope.toggleMode("reqSuccess", false);
			$scope.toggleMode("loading", true);
			
			var newItem = createItemData($scope.item);
			
			ItemService.add(newItem)
				.then(function(data){					
					var itemImage = $scope.item.image,
						itemData = data;
						
					if(itemImage){
						uploadItemImage(itemImage, itemData, ItemService);
					}
					
					$scope.itemList.push(itemData);
					resetForm($scope, form);
					$scope.toggleMode("reqSuccess", true);
					$scope.toggleMode("loading", false);
					$scope.appMsg = "The item has been created successfully!"
				}, function(reason){
					if(reason && reason.errno){
						if(reason.errno == 1062){
							$scope.toggleMode("reqError", true);
							$scope.appMsg = "An item with the given id already exists!"
						}
					}
					$scope.toggleMode("loading", false);
				});		
		};
		
		$scope.removeItem = function(){
			$scope.toggleMode("loading", true);
			
			if($scope.item._recStatus == "DELETED"){
				ItemService.hardRemove($scope.item.id)
					.then(function(data){
						var itemList = $scope.itemList;
					
						for(var i=0; i<itemList.length; i++){
							if(itemList[i].id == data.id){
								itemList.splice(i, 1);
								$scope.toggleMode("reqSuccess", true);
								$scope.appMsg = "Item " +data.id+ " has been permanently removed!"
							}
						}
						$scope.toggleMode("loading", false);
					},function(reason){
						$scope.toggleMode("loading", false);
					});
			}else{
				ItemService.remove($scope.item._id)
					.then(function(data){
						var itemList = $scope.itemList;
					
						for(var i=0; i<itemList.length; i++){
							if(itemList[i].id == data.id){
								itemList[i] = data;
								$scope.toggleMode("reqSuccess", true);
								$scope.appMsg = "Item " +data.id+ " has been removed successfully!"
							}
						}
						$scope.toggleMode("loading", false);
					},function(reason){
						$scope.toggleMode("loading", false);
					});
			}
					
			$scope.toggleMode("remove", false);
		};
		
		$scope.updateItem = function(form){
			$scope.toggleMode("loading", true);
			var updateData = createItemData($scope.item);
		
			ItemService.update(updateData)
				.then(function(data){					
					var itemList = $scope.itemList,
						itemImage = $scope.item.image,
						itemData = data;
				
					if(itemImage){
						uploadItemImage(itemImage, itemData, ItemService);
					}
				
					for(var i=0; i<itemList.length; i++){
						if(itemList[i].id == itemData.id){
							itemList[i] = itemData;
						}
					}
					resetForm($scope, form);
					$scope.toggleMode("update", false);
					$scope.toggleMode("reqSuccess", true);
					$scope.toggleMode("loading", false);
					$scope.appMsg = "Item " +itemData.id+ " has been modified successfully!"
				},function(reason){
					$scope.toggleMode("loading", false);
				});
		};
		
		$scope.findItem = function(){
			$scope.toggleMode("loading", true);
			$scope.toggleMode("reqError", false);
			if(!$scope.searchCriteria.val){
				$scope.getAllItems();
				return;
			}
			
			ItemService.findItem($scope.searchCriteria.prop.toLowerCase(), $scope.searchCriteria.val)
				.then(function(data){					
					var itemList = data;
					if(itemList.length == 0){
						$scope.toggleMode("reqError", true);
						$scope.appMsg = "The search did not find any item that matches the given criteria."
					}
					$scope.itemList = itemList;
					$scope.toggleMode("loading", false);
				},function(reason){
					$scope.toggleMode("loading", false);
				});
		};
		
		$scope.getAllItems = function(){
			$scope.toggleMode("loading", true);
			ItemService.getAll()
				.then(function(data){
					var itemList = data;
					$scope.itemList = itemList;
					$scope.toggleMode("loading", false);
				},function(reason){
					$scope.toggleMode("loading", false);
				});
		};
		
		$scope.toggleMode = function(mode, toggle, item){
			switch(mode){
				case "update":		if(toggle){
										var itemData = createItemData(item);
										$scope.item = itemData;
									}else{
										$scope.item = {};
									}
									$scope.mode["modal"] = toggle;
									$scope.mode[mode] = toggle;
									$scope.toggleMode("reqSuccess", false);
									break;
				case "remove":		if(toggle){
										$scope.item = item;
									}else {
										$scope.item = {};
									}
									$scope.mode[mode] = toggle;
									$scope.mode["modal"] = toggle;
									$scope.toggleMode("reqSuccess", false);
									break;
				case "modal":		$scope.mode[mode] = toggle;
									break;
				case "reqError": 	$scope.mode[mode] = toggle;
									break;
				case "reqSuccess":	$scope.mode[mode] = toggle;
									break;
				case "loading":		$scope.mode[mode] = toggle;
			}
		};
		
		$scope.openPanel = function(panelName){
			closeNavigator();
			if(currPanel == panelName){
				return;
			}
			
			switch(panelName){
				case "create":	$scope.templateUrl = templates.itemFormView;
								break;
				case "records": $scope.templateUrl = templates.recordsView;
								$scope.getAllItems();
								break;
				case "search": $scope.templateUrl = templates.searchView;
								$scope.itemList = [];
								break;
				default:		$scope.templateUrl = templates.itemFormView;
			}
			
			$scope.toggleMode("reqError", false);
			$scope.toggleMode("reqSuccess", false);
			$scope.item = {};
			$scope.searchCriteria = {};
			currPanel = panelName;
		};
		
		var createItemData = function(item){
			var itemData = item;
			itemData["price"] = (item.price ? parseFloat(item.price) : undefined);
			itemData["itemImage"] = (item.itemImage || "assets/images/default-item-image.jpg");
			return itemData;
		};
		
		var uploadItemImage = function(image, item, ItemService){
			ItemService.uploadImage(image)
				.then(function(resp){
					if(resp.status == 200){
						item["itemImage"] = "data:image/jpeg;base64," + resp.data.base64;
						ItemService.update(item);
					}
				});
		};
		
		var resetForm = function($scope, form){
			if(form){
				form.$setPristine();
				form.$setUntouched();
			}
			$scope.item = {};
		};
		
		var closeNavigator = function(){
			angular.element(document.querySelector("#item-panel .app-nav .nav-icon")).removeClass("active");
		};
	}

})();
