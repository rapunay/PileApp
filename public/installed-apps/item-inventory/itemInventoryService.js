'use strict';

(function(){
	angular
		.module("ItemInventory")
		.factory("ItemInventoryService", ItemInventoryService);

	ItemInventoryService.$inject = ["$http", "$q", 'Upload'];
	function ItemInventoryService($http, $q, Upload){
		var baseUrl = "https://pileapp-server.herokuapp.com",
			service = {};
		
		service.add = function(newItem){
			var deferred = $q.defer();
			$http.post(baseUrl + "/item", newItem)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(data){
					deferred.reject(data);
				});
			
			return deferred.promise;
		};
		
		service.remove = function(id){
			var deferred = $q.defer();
			$http.delete(baseUrl + "/item/" + id)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(data){
					deferred.reject(data);
				});
			
			return deferred.promise;
		};
		
		service.hardRemove = function(id){
			var deferred = $q.defer();
			$http.delete(baseUrl + "/item/hardremove/" + id)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(data){
					deferred.reject(data);
				});
			
			return deferred.promise;
		};
		
		service.update = function(updateData){
			var deferred = $q.defer();
			$http.put(baseUrl + "/item", updateData)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(data){
					deferred.reject(data);
				});
			
			return deferred.promise;
		};
		
		service.findItem = function(key, value){
			var deferred = $q.defer();
			$http.get(baseUrl + "/item/find/" + key + "/" + value)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(data){
					deferred.reject(data);
				});
			
			return deferred.promise;
		}
		
		service.getAll = function(){
			var deferred = $q.defer();
			$http.get(baseUrl + "/item")
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(data){
					deferred.reject(data);
				});
			
			return deferred.promise;
		};
		
		service.uploadImage = function(file) {
			file.upload = Upload.upload({
				url: baseUrl + "/image",
				data: {file: file}
			});
			
			return file.upload;
		};
		
		return service;
	}
})();
