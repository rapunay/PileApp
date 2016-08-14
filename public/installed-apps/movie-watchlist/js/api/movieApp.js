"use strict"

var MovieApp = (function(){
	function MovieApp(options){
		this.pageSize = 3;
		this.catalogue;
		this.paginator;
		this.watchlist;
		
		$.extend(this, options);
		_init(this);
	};
		
	$.extend(MovieApp.prototype, {
		setPageSize: function(size){
			this.pageSize = size;
		}
	});	
	
	function _init(MovieApp){
		var catalogue = new Catalogue({
				elem: $("#catalog"),
				size: MovieApp.pageSize,
				onAddToWatchlist: function(movie){
					MovieApp.watchlist.add(movie);
				},
				onRemoveFromWatchlist: function(movie){
					MovieApp.watchlist.remove(movie);
					MovieApp.watchlist.update();
				}
			}),
			
			paginator = new Paginator({
				elem: $("#pagination"),
				size: MovieApp.pageSize,
				onSwitchPage: function(pageNumber){
					var moviesOnPage = MovieApp.catalogue.getMoviesOnPage(pageNumber);
					
					MovieApp.catalogue.displayMoviesOnPage(pageNumber);
					
					for(var i=0; i<moviesOnPage.length; i++){
						var movieStr = JSON.stringify(moviesOnPage[i]);
						
						if(MovieApp.watchlist.items.indexOf(movieStr) >= 0){
							$("#catalog .movie").eq(i).addClass("listed");
						}
					}
					$("#wrapper").scrollTop(0);
				}
			}),
			
			watchlist = new Watchlist({
				elem: $("#watchlist"),
				size: MovieApp.pageSize,
				onRemove: function(movie){
					var pageNumber = MovieApp.paginator.page,
						moviesOnPage = MovieApp.catalogue.getMoviesOnPage(pageNumber);
						
					for(var i=0; i<moviesOnPage.length; i++){
						if(movie["title"] == moviesOnPage[i]["title"]){
							$("#catalog .movie").eq(i).removeClass("listed");
						}
					}
				}
			});
		
		if(MovieApp.movieData){
			MovieApp.paginator.paginate(MovieApp.movieData.length);
			MovieApp.displayMovies(MovieApp.paginator.page);
		}
		
		MovieApp.catalogue = catalogue;
		MovieApp.paginator = paginator;
		MovieApp.watchlist = watchlist;
	};
	
	return MovieApp;
})();