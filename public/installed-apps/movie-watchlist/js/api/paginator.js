"use strict"

var Paginator = (function(){
	function Paginator(options){
		this.elem = null;
		this.size = 3;
		this.page = 1;
		this.maxPage = 1;
		this.onSwitchPage = null;
		
		$.extend(this, options);
	};
	
	$.extend(Paginator.prototype, {
		setPage: function(page){
			this.page = page;
		},
		
		paginate: function(dataLength){
			this.maxPage = Math.ceil(dataLength/this.size);
			_init(this);
			this.goToPage(1);
		},
		
		goToPage: function(pageNumber){
			var $elem = this.elem,
				paginator = this;
				
			if(pageNumber < 1){
				pageNumber = 1;
			}else if(pageNumber > paginator.maxPage){
				pageNumber = paginator.maxPage;
			}

			paginator.setPage(pageNumber);
			if(paginator.onSwitchPage){
				paginator.onSwitchPage(pageNumber);
			}
			paginator.update();
		},
		
		update: function(){
			var paginator = this,
				$elem = this.elem,
				pageNumber = paginator.page;
			
			$elem.find(".pageBtn").remove();
			_createPageSelector(paginator);
			$elem.find("button:first, button:last").removeClass("hidden");
			$elem.find("button.selected").removeClass("selected");
			$elem.find("#page"+pageNumber).addClass("selected");
		
			if(pageNumber == 1){
				$elem.find("button:first").addClass("hidden");
			}
			if(pageNumber == this.maxPage){
				$elem.find("button:last").addClass("hidden");
			}
		}
	});
	
	function _init(paginator){
		var $prevBtn = _createButtonElement("prevBtn", "", "Previous"),
			$nextBtn = _createButtonElement("nextBtn", "", "Next");

		paginator.elem.append($prevBtn);
		paginator.elem.append($nextBtn);
		_createPageSelector(paginator);
		
		$prevBtn.on("click", {_paginator: paginator}, _onPrevHandler);			
		$nextBtn.on("click", {_paginator: paginator}, _onNextHandler);
	};
	
	function _createPageSelector(paginator){
		var pageLength = paginator.maxPage,
			start = paginator.page - 2,
			end = paginator.page + 2;
		
		if(end > pageLength){
			end = pageLength;
			start = end - 4;
		}
		if(start < 1){
			start = 1;
			if((start + 4) <= pageLength){
				end = start + 4;
			}else{
				end = pageLength;
			}
		}

		for(var i=start; i<=end; i++){
			_createButtonElement("page"+i, "pageBtn", i)
								.insertBefore(paginator.elem.find("#nextBtn"))
								.on("click", {_paginator: paginator}, _paginationClickHandler);
		}
	};
	
	function _createButtonElement(id, className, text){
		return $(["<button id='", id, "' class='", className, "'>", text, "</button>"].join(""));
	};
	
	function _paginationClickHandler(e){
		var pageNumber = parseInt($(e.target).html(), 10),
			_paginator = e.data._paginator;
							
		if(_paginator.page != pageNumber){
			_paginator.goToPage(pageNumber);
		}
	};
	
	function _onPrevHandler(e){
		var _paginator = e.data._paginator,
			pageNumber = _paginator.page;
			
		if(pageNumber > 1){
			_paginator.goToPage(--pageNumber);
		}
	};
	
	function _onNextHandler(e){
		var _paginator = e.data._paginator,
			pageNumber = _paginator.page;
			
		if(pageNumber < _paginator.maxPage){
			_paginator.goToPage(pageNumber+1);
		}
	};
	
	return Paginator;
})();