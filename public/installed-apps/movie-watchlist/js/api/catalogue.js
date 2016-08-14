"use strict"

var Catalogue = (function(){
	function Catalogue(options){
		this.elem;
		this.size;
		this.data;
		this.template;
		this.onAddToWatchlist;
	
		$.extend(this, options);
	};
	
	$.extend(Catalogue.prototype, {
		setTemplate: function(data){
			this.template = data;
		},
		
		setData: function(data){
			this.data = data;
		},
		
		displayMoviesOnPage: function(page){
			var $catalogue = this.elem;
			
			$catalogue.empty();
			$catalogue.removeClass("hasMovies");
			this.addMovies(this.getMoviesOnPage(page));
			
			if($catalogue.children().length > 0){
				setTimeout(function(args){
					args[0].addClass("hasMovies");
				}, 10, [$catalogue]);
			}
		},
		
		getMoviesOnPage: function(pageNumber){
			var rangeStart = (pageNumber-1) * this.size,
				rangeEnd = pageNumber * this.size,
				moviesOnPage = this.data.slice(rangeStart, rangeEnd);

			return moviesOnPage;
		},
		
		addMovies: function(movieList){
			for(var i=0; i<movieList.length; i++){
				this.addMovie(movieList[i]);
			}
		},
		
		addMovie: function(movie){
			var titleYear = movie.title + " (" + movie.year + ")",
				imageUrl = movie.imgURL,
				director = movie.director,
				desc = movie.description,
				rating = movie.rating,
				genre = movie.classification.join(" | "),
				movieDiv = $(this.template);
				
			movieDiv.find(".title").html(titleYear);
			movieDiv.find(".photo").attr("src", imageUrl);
			movieDiv.find(".caption").html(desc);
			movieDiv.find(".classification").html(genre);
			
			movieDiv.find(".addBtn").on("click", {_movie: movie, _catalogue:this}, _addToWatchlistClickHandler);
			movieDiv.find(".removeBtn").on("click", {_movie: movie, _catalogue:this}, _removeFromWatchlistClickHandler);
	
			this.elem.append(movieDiv);
		}
	});
	
	function _addToWatchlistClickHandler(e){
		var _catalogue = e.data._catalogue;
		
		$(e.target).closest(".movie").addClass("listed");
			
		if(_catalogue.onAddToWatchlist){
			_catalogue.onAddToWatchlist(e.data._movie);
		}
	};
	
	function _removeFromWatchlistClickHandler(e){
		var _catalogue = e.data._catalogue;
		
		$(e.target).closest(".movie").removeClass("listed");
			
		if(_catalogue.onRemoveFromWatchlist){
			_catalogue.onRemoveFromWatchlist(e.data._movie);
		}
	};
	
	return Catalogue;
})();