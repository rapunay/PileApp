"use strict"

$(function init(){
	var movieApp = new MovieApp({pageSize:4});
		
		$.get("templates/movie.html", function(data){
			movieApp.catalogue.setTemplate(data);
		});
		
		$.get("assets/movies.json", function(data){
			movieApp.catalogue.setData(data);
			movieApp.paginator.paginate(data.length);
			movieApp.paginator.goToPage(1);
		});
		
		$.get("templates/watchlist.html", function(data){
			movieApp.watchlist.setTemplate(data);
		});
});