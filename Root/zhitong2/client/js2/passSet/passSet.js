//init
//获取session
//var url = "http://forchild.zhitong.group";
var url = "http://106.15.137.203";
var sessioninfo = sessionStorage.getItem("teacher");
var data =  eval('(' + sessioninfo + ')');
var userId = data.userid;
var token = data.token;
var gartenId = data.gartenid;

//var gartenId = 5;
//var userId = 1005;

/*新旧密码确保一致  new == again*/
$("#pass_again").blur(function(){
	if($("#pass_again").val() != $("#newpass").val() ){
		
		$("#pass_again").val("与新密码不一致");
		//$("#pass_again").attr({"color":"red"});
	}
})

$("#pass_again").click(function(){
	if($("#pass_again").val() != $("#newpass").val() ){
		$("#pass_again").val("");
	}
})
/**/
$("#pass_again2").blur(function(){
	if($("#pass_again2").val() != $("#newpass2").val() ){
		
		$("#pass_again2").val("与新密码不一致")
		//$("#pass_again2").attr({"color":"red"})
	}
})

$("#pass_again2").click(function(){
	if($("#pass_again2").val() != $("#newpass2").val() ){
		$("#pass_again2").val("");
	}
})

//点击 保存  、、1005

//safepss  http://106.15.137.203/meritpay/secondpss/update  passbtn2  //oldpws  123456

$("#passbtn2").click(function(){
	
	if($("#pass_again2").val() != $("#newpass2").val() ){
		return false;
	}
	
	var oldpw = $("#oldpass").val();
	console.log(oldpw);
	var btncon = {
	 	"gartenId": parseInt(gartenId),
	  	"password": $("#pass_again2").val(),
	  	"userId":  parseInt( userId )
	}
	
	btncon = JSON.stringify(btncon);
	console.log(btncon);
	$.ajax({
		type:"put",
		url:""+url+"/meritpay/secondpss/update/"+oldpw,
		async:true,
		beforeSend: function(request) {
	 		request.setRequestHeader("User-Token",token);
	    },
		contentType:"application/json",
		data:btncon,
		success:function(res){
			//alert(res.message)
			Common.alertSuccess(res.message);
			window.sessionStorage.setItem( "safepss",JSON.stringify( res.data ) );
		}
	});
})










