"use strict"

var CMS = (function(){
	function CMS(option){
		this.viewport = $("body");
		
		$.extend(this, option);
	};
	
	$.extend(CMS.prototype, {
		loadContentTemplate: function(url, callback){
			load(url, callback);
		},
		
		loadContentData: function(url, callback){
			var CMS = this;
			
			load(url, function(data){			
				for(var i in data){
					CMS.applyContent(data[i]);
				}
			});
		},
		
		applyContent: function(data){
			var CMS = this,
				$viewport = CMS.viewport;
		
			switch(data.type){
				case "group":		populateGroupContent(data, CMS);
									break;
				case "image":		$viewport.find("#"+data.name).attr("src", data.value);
									break;
				case "carousel":	generateCarousel(data, $viewport);
									break;
				default:			$viewport.find("#"+data.name).text(data.value);
			}
		}
	});
	
	var load = function(url, onload){
		$.get(url, onload);
	};
	
	var populateGroupContent = function(data, CMS){
		var groupContents = data.value;
		
		for(var i=0; i<groupContents.length; i++){
			CMS.applyContent(groupContents[i]);
		}
	};

	var generateCarousel = function(data, $viewport){
		var name = data.name,
			indicator = "<li data-target='#"+name+"' data-slide-to='{0}'></li>",
			item = "<div class='item'><img src='{0}' /></div>",
			indicators = [],
			items = [],
			$carousel = $viewport.find("#"+name),
			$carouselIndicators = $carousel.find(".carousel-indicators"),
			$carouselInner = $carousel.find(".carousel-inner");
		
		for(var i=0; i<data.value.length; i++){
			indicators.push(indicator.replace("{0}", i));
			items.push(item.replace("{0}", data.value[i]));
		}
	
		$carouselIndicators.append(indicators.join(""));
		$carouselInner.append(items.join(""));
	
		$carouselIndicators.children(":first").addClass("active");
		$carouselInner.children(":first").addClass("active");
	};
	
	return CMS;
})();