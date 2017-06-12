$(document).ready(function() {
	$("#myModal").modal("show");
	$(".spinner").css("display","none");
    $("#wrapper").css("display","block");
    var showTutorial = Cookies.get('tutorial');
    if(!(showTutorial === undefined)){
        $("#myModal").modal("hide");
    }
    
    $('#checkShow:checkbox').change(function () {
        if($('#checkShow:checkbox:checked').length){
            Cookies.set('tutorial', 'notShow', { expires: 15 });
        }
        else{
            Cookies.remove('tutorial');
        }
    });
    $( "#help" ).click(function(e) {
		if($(window).width() < 1000){
			menuListener(e);
		}
		$("#myModal").modal("show");
		showTutorial = Cookies.get('tutorial');
		if(!(showTutorial === undefined)){
        	$('#checkShow:checkbox').prop('checked', true);
		}		
	});
});
