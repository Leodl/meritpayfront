//init
//获取session
//var url = "http://forchild.zhitong.group";
var url = "http://106.15.137.203";
var url2 = "http://106.15.226.229";
var sessioninfo = sessionStorage.getItem("teacher");
var data =  eval('(' + sessioninfo + ')');
var userId = data.userid;
var token = data.token;

var gartenId = data.gartenid;

//var token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDg1NzY5NjIsInVzZXJJZCI6MTAwNSwidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi572X5a-G5qynIn0.QcZzpG1xhaqRk3dHADS5acKSXZnG2VPntSipvc2mlgs";
//var gartenId = 5;
//var userId = 1005;

//登入
$("#mmagain").click(function(){
	
	var savedata = {
	  "gartenId": parseInt(gartenId),
	  "password": $("#insafepss").val(),
	  "userId":  parseInt( userId )
	}
	
	savedata = JSON.stringify(savedata);
	
	$.ajax({
		type:"post",
		url:""+url+"/meritpay/secondpss/login",
		async:true,
		beforeSend: function(request) {
	 		request.setRequestHeader("User-Token",token);
	    },
		contentType:"application/json",
		data:savedata,
		success:function(res){
			
			if(res.result==-3){
				Common.alertError(res.message);
				return false;
			}
			
//			if(res.result==-2){
//				alert("没有设置安全密码");
//				location.href = ""+url2+"/zhitong2/client/newview/moneyCon/moneylogin.html";
//				return false;
//			}
			
			console.log(res);
			window.sessionStorage.setItem( "sedtoken",JSON.stringify( res.data ) );
			
			//判断跳转
			location.href = ""+url2+"/zhitong2/client/newview/moneyCon/moneyset.html"
		}
	});
	
})




























