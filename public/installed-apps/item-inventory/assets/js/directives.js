'use strict';

(function(){
	var app = angular
		.module("ItemInventory");
		
	app.directive('integerOnly', function(){
		return {
			require: 'ngModel',
			link: function (scope, element, attr, ngModelCtrl) {
				function fromUser(text) {
					if (text) {
						var transformedInput = text.replace(/[^0-9]/g, '');

						if (transformedInput !== text) {
							ngModelCtrl.$setViewValue(transformedInput);
							ngModelCtrl.$render();
						}
						return transformedInput;
					}
					return undefined;
				}            
				ngModelCtrl.$parsers.push(fromUser);
			}
		};
	});
	
	app.directive('decimalOnly', function(){
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, ngModelCtrl){
			
				if(!ngModelCtrl) {
					return;
				}

				ngModelCtrl.$parsers.push(function(val){
					if (angular.isUndefined(val)){
						var val = '';
					}
			
					var clean = val.replace(/[^0-9\.]/g, ''),
						decimalCheck = clean.split('.');
				
					if(!angular.isUndefined(decimalCheck[1])){
						decimalCheck[1] = decimalCheck[1].slice(0,2);
						clean = decimalCheck[0] + '.' + decimalCheck[1];
					}
				
					if(val !== clean){
						ngModelCtrl.$setViewValue(clean);
						ngModelCtrl.$render();
					}
				
					return clean;
				});
			
				element.bind('keypress', function(event){
					if(event.keyCode === 32){
						event.preventDefault();
					}
				});
			}
		};
	});
	
	app.directive('toggleClass', function(){
		return {
			restrict: 'A',
			link: function(scope, element, attrs){
				element.bind('click', function(){
					element.toggleClass(attrs.toggleClass);
				});
			}
		};
	});
})();
