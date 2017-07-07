$(document).ready(function(){
	//Search Button Clicked
	$("#search").on("click", "#btnSearch", function(){
		$("#btnSearch").replaceWith('<div class="input-group"><input id="txtSearch" type="text" class="form-control" placeholder="Enter Something To Search" aria-describedby="basic-addon2"><span class="input-group-addon" id="basic-addon2"><button id="btnClose" type="button" class="close"><span aria-hidden="true">&times;</span></button></span></div>');
		$(".form-control").focus();
	});
	// Close Search Button Clicked
	$("#search").on("click", "#btnClose", function(){
		$(".input-group").replaceWith('<button id="btnSearch" class="btn btn-lg btn-primary" type="button"><span class="glyphicon glyphicon-search"></span></button>');
		$("#searchResults").empty();
	});
	// Submit Search Text Box
	$("#search").on("keyup", "#txtSearch", function(e){
		if(e.which == 13){
			if($("#txtSearch").val().trim()){
				$.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&search=" + $("#txtSearch").val() + "&limit=15&namespace=0&format=json&callback=?", function(result){
					$("#searchResults").empty();
					for(var i = 0; i < result[1].length; i++){
						$("#searchResults").append('<div id="result' + i +'"class="result" data-url=""><ul><li><p id="name"></p></li><li><p id="description"></p></li></ul></div>');
						$("#result" + i).find("#name").text(result[1][i]);
						$("#result" + i).find("#description").text(result[2][i]);
						$("#result" + i).attr("data-url", result[3][i]);
					}
				});
			}
		}
	});
	// Result Click
	$("#searchResults").on("click", ".result", function(){
		window.open($(this).attr("data-url"), '_blank');
	});
});
