$(window).ready(function(){

//init
var host = window.location.host;
var test = window.location.protocol;
//console.log(host);//106.15.137.203
//console.log(test);//http:
//var url = test+"//"+host;
var url = "http://106.15.226.229";
var sessioninfo = sessionStorage.getItem("teacher");
var data =  eval('(' + sessioninfo + ')');
//var userid = data.userid;
var token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTY1MDYwMDIsInVzZXJJZCI6MTAwMTc4LCJ1c2VyVHlwZSI6MSwidXNlck5hbWUiOiLpmYjlsI_mnpcifQ.x0az9KFem87cDoIRYQEvxdfOUs-ubFyY2njzPiODxG8";

var gartenId = 31;

//返回上一级
$(".gonone").click(function(){
	//location.href = "news=15";
	history.go(-1);
})


//岗位查询
$.ajax({
	type:"get",
	url:""+url+"/meritpay/stations/get/"+gartenId,
	async:false,
	beforeSend: function(request) {
	 	request.setRequestHeader("User-Token",token);
	},
	success:function(res){
		console.log(res);
		//console.log( res.data )
		var data = res.data;
		var aaaa = JSON.stringify(data);
		console.log(JSON.parse(aaaa));
		var workcon ="";
		var dataL = data.length;
		for ( var k = 1;k<dataL;k++ ) {
			workcon += "<option data-station-id='"+res.data[k].stationsId+"' value='"+res.data[k].stationsName+"'>"+res.data[k].stationsName+"</option>";
		}
		$("#workname").html(workcon);
	}
});



//考勤卡查询
var curpage = 1;
var pagesize = 10000;
//var gartenId = gartenId;
var cardstatus = 1;

var carddata = {
   "curpage":curpage,
   "pagesize":pagesize,
   "gartenid":gartenId,
   "status":cardstatus
} 

carddata = JSON.stringify(carddata);
console.log(carddata);
//$.ajax({
//	type:"post",
//  url: ""+url+"/zhitong/service/card/list",
//  beforeSend: function(request) {
// 		 request.setRequestHeader("User-Token", token)
//  },
//  data:carddata,
//  contentType:'application/json',
//  success: function (res) {
//      console.log(res);
//      
//      var ll = res.total;
//      console.log(res.data);
//      var cardstr = "";
//      for ( var j = 0;j<ll; j++ ) {
//      	cardstr+="<option value='"+res.data[j].cardno+"'>"+res.data[j].cardno+"</option>"
//      }
//		$("#cardnoSelect").html(cardstr);
//      $("#cardnoSelect").select2({
//		    placeholder: "请选择",
//		    allowClear: true
//		});
//		
//      $("#cardnoSelect").click(function(){
//      	val(" ").trigger('change');
//      });
//      
//  }
//})

//岗位获取
//$("#workname").html("")
$("#workname").select2({
    placeholder: "请选择",
    allowClear: true
});
$("#workname").click(function(){
	val(" ").trigger('change');
});


//qiniu token   
var token2 =null;
if(url == "http://106.15.137.203"){
	var qiniudata = {
	  	bucketname: "forchild-user-dev"
	  	//bucketname: "forchild-user"
	}
}else if( url == "http://test.zhitong.group" ){
	var qiniudata = {
	  	bucketname: "forchild-user-dev"
	  	//bucketname: "forchild-user"
	}
}else if( url == "http://forchild.zhitong.group" ){
	//正式
	var qiniudata = {
	  	bucketname: "forchild-user"
	}
}else{
	var qiniudata = {
	  	bucketname: "forchild-user-dev"
	  	//bucketname: "forchild-user"
	}
}


qiniudata = JSON.stringify(qiniudata);
$.ajax({
	type:"post",
	url:""+url+"/meritpay/qiniu/getauth",
	data:qiniudata,
	beforeSend: function(request) {
 		request.setRequestHeader("User-Token", token);
    },
	contentType:"application/json",
	async:false,
	success:function(res){
		console.log(res);
		token2 = res.data;
	}
});

console.log(token2)

//cookie  userid  token2
$("#imgFile").qiniu({
    showCaption:false,
    browseClass:'',
    browseLabel: '<div class="z_file"></div>'
});

$("#teacherAddForm").validate({
    submitHandler: function (form) {
        var count = $('#imgFile').fileinput('getFilesCount');
        if (count > 0) {
            $('#imgFile').fileinput('upload');
        } else {
            teacherService.addTeacher();
        }
    }
})

if(url == "http://106.15.137.203"){
	////////////////////测试域名
	var domain = 'http://os4skw475.bkt.clouddn.com';
}else if( url == "http://forchild.zhitong.group" ){
	//正式
	var domain = 'http://oxpfj3y0x.bkt.clouddn.com';
}else if( url == "http://test.zhitong.group" ){
	////////////////////测试域名
	var domain = 'http://os4skw475.bkt.clouddn.com';
}else{
	////////////////////测试域名
	var domain = 'http://os4skw475.bkt.clouddn.com';
}
//var domain = 'http://oxpfj3y0x.bkt.clouddn.com';

var uploader = Qiniu.uploader({ 
	runtimes: 'html5,flash,html4',//上传模式,依次退化 
	browse_button: 'imgFile',//上传选择的点选按钮，**必需**
	//uptoken_url: 'http://106.15.137.203/meritpay/qiniu/getauth',//Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
	uptoken:token2, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
	domain: domain,   //bucket 域名，下载资源时用到，**必需** //owm1k0zpn.bkt.clouddn.com 测试域名
	get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
	max_file_size: '100mb',           //最大文件体积限制
	max_retries: 3,                   //上传失败最大重试次数
	dragdrop: true,                   //开启可拖曳上传
	chunk_size: '4mb',                //分块上传时，每片的体积
	auto_start: true,                //选择文件后自动上传，若关闭需要自己绑定事件触发上传
	
	init: {
	    'FilesAdded': function(up, files) {
	        plupload.each(files, function(file) {
	            // 文件添加进队列后,处理相关的事情
	        });
	    },
	    'BeforeUpload': function(up, file) {
	           // 每个文件上传前,处理相关的事情
	    },
	    'UploadProgress': function(up, file) {
	           // 每个文件上传时,处理相关的事情
	    },
	    'FileUploaded': function(up, file, info) {//事件触发注意预览
	    	//alert(222)
	           var res = JSON.parse(info);
	           var sourceLink = domain +"/"+ res.key; //获取上传成功后的文件的Url;
	           $("#imgcon").html("<img src='"+sourceLink+"' alt='"+res.key+"'>")
	           window.sessionStorage.setItem("picurl",res.key);
	    },
	    'Error': function(up, err, errTip) {
	           //上传出错时,处理相关的事情
	           console.log(errTip)
	    },
	    'UploadComplete': function() { 
	           //队列文件处理完毕后,处理相关的事情
	    }
   	}
});

$("#ttaddbtn").click(function(){
	uploader.start();
	
	var headpic = window.sessionStorage.getItem("picurl");
	console.log(headpic);
//	return false;
	var username = $("input[name='username']").val();
	var mobileno = $("input[name='mobileno']").val(); 
	var gender = $("#genderSelect").find("option:selected").attr("data-gender-id");
	//var cardno = $("#cardnoSelect").find("option:selected").val();

	var stationsId = $("#workname").find("option:selected").attr("data-station-id");
	var entrytime = $("#entrytime").val();
	var gartenid = gartenId;
	var role = 3;
	//$("#workSelect").find("option:selected").attr("data-role-id")
	var degree = $("#degreeSelect").find("option:selected").attr("data-degree-id");
	var certificate = $("#certificateSelect").find("option:selected").attr("data-certificate-id");
	var birthday = $("#birthday").val();
	var specialskill = $("input[name='specialskill']").val();
	var schoolage = $("#schoolageSelect").find("option:selected").attr("data-schoolage-id");
	
	if( headpic ==null || headpic == false ){
		headpic = "";
	}
	
	if(!(/^1[34578]\d{9}$/.test(mobileno))){
		Common.alertError("手机号码有误，请重填");
		return false;
	}
	
	var workname = $("#workname").find("option:selected").val();
	if( username == false || mobileno == false ||workname == false){
		Common.alertError("姓名、手机号和岗位必填");
		return false;
	}
	
	console.log(cardno);
	//if(cardno == "undefined" || cardno == undefined || cardno == false){
		var ttadddata = {
		    "birthday": birthday,
		    "certificate": parseInt(certificate),
		    "degree":parseInt(degree),
		    "entrytime":entrytime,
		    "gartenid":parseInt(gartenid),
		    "gender":parseInt(gender),
		    "headpic":headpic,
		    "mobileno":mobileno,
		    "role":parseInt(role),
		    "schoolage":parseInt(schoolage),
		    "specialskill":specialskill,
		    "username":username,
		    "stationsId":stationsId
		}
//	}else{
//		var ttadddata = {
//		    "birthday": birthday,
//		    "cardlist": [
//		        {
//		            "cardno": cardno
//		        }
//		    ],
//		    "certificate":parseInt(certificate),
//		    "degree":parseInt(degree),
//		    "entrytime": entrytime,
//		    "gartenid": parseInt(gartenid),
//		    "gender":parseInt(gender),
//		    "headpic": headpic,
//		    "mobileno": mobileno,
//		    "role": parseInt(role),
//		    "schoolage": parseInt(schoolage),
//		    "specialskill": specialskill,
//		    "username": username,
//		    "stationsId":stationsId
//		}
//	}
	
	ttadddata = JSON.stringify(ttadddata);
	console.log(ttadddata);
	var teacherid = null;
	$.ajax({
		type:"post",
		url:""+url+"/zhitong/service/user/teacher/new",
		beforeSend: function(request) {
	 		request.setRequestHeader("User-Token",token);
	    },
	    contentType:"application/json",
		async:false,
		data:ttadddata,
		success:function(res){
			console.log(res);
			if( res.result == 0 ){
				Common.alertSuccess("保存成功");
				window.setTimeout("history.go(-1)",1000);
			}else if(res.result == -2){
				Common.alertError(res.message);
				return false;
			}else{
				Common.alertError(res.message);
				return false;
			}
			
		}
	});
	
	
	
})
//////
	//下面用于图片上传预览功能
function setImagePreview(avalue) {
	alert(666)
	var docObj=document.getElementById("imgFile");
	 
	var imgObjPreview=document.getElementById("preview");
	if(docObj.files &&docObj.files[0]){
		//火狐下，直接设img属性
		imgObjPreview.style.display = 'block';
		imgObjPreview.style.width = '200px';
		imgObjPreview.style.height = '170px';
		//imgObjPreview.src = docObj.files[0].getAsDataURL();
		 
		//火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
		imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
	}else{
		//IE下，使用滤镜
		docObj.select();
		var imgSrc = document.selection.createRange().text;
		var localImagId = document.getElementById("imgcon");
		//必须设置初始大小
		localImagId.style.width = "200px";
		localImagId.style.height = "170px";
		//图片异常的捕捉，防止用户修改后缀来伪造图片
		try{
			localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
			localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
		}catch(e){
			alert("您上传的图片格式不正确，请重新选择!");
			return false;
		}
		imgObjPreview.style.display = 'none';
		document.selection.empty();
	}
		return true;
}
$("#imgFile").on("change",function(){
	//setImagePreview();
})

/////
})



