"use strict"

var Watchlist = (function(){
	function Watchlist(options){
		this.elem;
		this.items = [];
		this.template;
		this.onRemove = null;
		
		$.extend(this, options);
	}
	
	$.extend(Watchlist.prototype, {
		setTemplate: function(data){
			this.template = data;
		},
		
		add: function(movie) {
			var items = this.items,
				$watchlist = this.elem,
				$watchListItem = $(this.template);
			
			$watchListItem.find(".item").html(movie.title);
			$watchListItem.find(".removeIcon").on("click", {_watchlist: this,
														_movie: movie}, function(e){
				e.data._watchlist.remove(e.data._movie);
				$(e.target).closest("li").remove();
				
				if(e.data._watchlist.onRemove){
					e.data._watchlist.onRemove(e.data._movie);
				}
			});
	
			$watchlist.find("#watchlist-items ul").append($watchListItem);
			
			items.push(JSON.stringify(movie));
			$watchlist.find("#counter").html(items.length);
		},
		
		remove: function(movie) {
			var items = this.items,
				movieStr = JSON.stringify(movie),
				movieIndex = items.indexOf(movieStr);
			
			if (movieIndex != -1) {
				var watchListCtr = items.length;
		
				items.splice(movieIndex, 1);
				this.elem.find("#counter").html(watchListCtr-1);
			}
		},
		
		update: function(){
			var items = this.items;
			
			this.items = [];
			this.elem.find("#watchlist-items ul").empty();
			for(var i=0; i<items.length; i++){
				this.add(JSON.parse(items[i]));
			}
		}
	});
	
	return Watchlist;
})();