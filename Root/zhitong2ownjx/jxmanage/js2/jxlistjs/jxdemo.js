

	
	$("select.jxdemo").click(function(){
		//alert()
		var jxdemol = $(".democon .demobj").index();
		for ( var j = 0; j< jxdemol ;j++) {
			if( $(".democon tr td:nth-child(2)")[j].innerHTML == $(".jxdemo").val() ){
				$(".democon tr td:nth-child(2)")[j].parentElement.style.opacity = "1";
			}else{
				$(".democon tr td:nth-child(2)")[j].parentElement.style.opacity = "0";
			}
		}
		
	})

/* delete */

var demodele = $(".democon .demobj");
for( var i = 0; i<demodele.index(); i++ ){	
	$(".democon").on("click",".demodele",function(){
		if (confirm("确认删除？")) {
			$(this).parent().parent().remove();
       	}
	})
}



































