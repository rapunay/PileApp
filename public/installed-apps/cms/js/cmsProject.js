"use strict"

var cmsProject = (function(cmsProject){
	var cms,
		$viewPort,
		isEditMode = false;
	
	cmsProject.init = function(){
		$viewPort = $("#page-viewport");
		
		initConfiguration();
		initEvents();
		
		cms = new CMS({
			viewport: $viewPort
		});
	
		if(config.isAdminUser){
			cms.loadContentTemplate("templates/admin-panel.html", function(data){
				$viewPort.prepend(data);
				$viewPort.find("#edit-page").on("click", initEditMode);
			});
		}
	
		cms.loadContentData("assets/contents/index.json");
		cms.loadContentData("assets/contents/more-projects.json");
	};
	
	var initConfiguration = function(){
		config.isAdminUser = true;
	};

	var initEvents = function(){
		$viewPort.find("img.modal-caption").on("click", function(e){
			$(this).siblings(".modal").addClass("show");
			$("#overlay").addClass("show");
		});
	
		$viewPort.find(".modal span").on("click", function(e){
			$(this).closest(".modal").removeClass("show");
			$("#overlay").removeClass("show");
		});
	};
	
	var initEditMode = function(e){
		if(isEditMode){
			return;
		}
		isEditMode = true;
		cms.loadContentTemplate("templates/group-edit-panel.html", function(data){
			var $groupList = $viewPort.find(".viewport-group");
			for(var i=0; i<$groupList.length; i++){
				var $group = $groupList.eq(i);
				$group.prepend(data);
			}
		});
		cms.loadContentTemplate("templates/confirm-button-panel.html", function(data){
			data = data.replace("{0}", "Cancel").replace("{1}", "Save");
			$viewPort.append(data);
			
			$viewPort.find("#cancel-btn").on("click", exitInitMode);
		});
	};
	
	var exitInitMode = function(e){
		isEditMode = false;
		$viewPort.find(".edit-group-row").remove();
		$(e.target).closest(".row").remove();
	};
	
	return cmsProject;
})(cmsProject || (cmsProject = {}));

$(function(){
	cmsProject.init();
});