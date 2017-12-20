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
//保存   save
$("#mloginsave").click(function(){
	
	if( $("#safe1").val() != $("#safe2").val() ){
		Common.alertError("第二次输入有误");
		return false;
	}
	
	var safepss = toString( $("#safe2").val() ) ;
	var savedata = {
	  "gartenId": parseInt(gartenId),
	  "password": $("#safe2").val(),
	  "userId":  parseInt( userId )
	}
	console.log( savedata );
	savedata = JSON.stringify(savedata);
	console.log( savedata );

	$.ajax({
		type:"post",
		url:""+url+"/meritpay/secondpss/save",
		data:savedata,
		contentType:"application/json",
		async:true,
		beforeSend: function(request) {
	 		request.setRequestHeader("User-Token",token);
	    },
		success:function(res){
			console.log(res)
			var sedtoken = res.data;
			if( res.result == -5 ){
				Common.alertError(res.message);
				//失败
				//location.href = ""+url2+"/zhitong2/client/newview/moneyCon/moneyinkey.html"
				return false;
			}
			//window.sessionStorage.setItem("sedtoken",sedtoken);
			//判断跳转
			location.href = ""+url2+"/zhitong2/client/newview/moneyCon/moneyinkey.html"
		}
	});
	
});







