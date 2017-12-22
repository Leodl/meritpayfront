
$(window).ready(function(){
////////	

//init
var sessioninfo = sessionStorage.getItem("teacher");
var data =  eval('(' + sessioninfo + ')');
var userId = 100178;
var token ="eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTY1MDYwMDIsInVzZXJJZCI6MTAwMTc4LCJ1c2VyVHlwZSI6MSwidXNlck5hbWUiOiLpmYjlsI_mnpcifQ.x0az9KFem87cDoIRYQEvxdfOUs-ubFyY2njzPiODxG8";
//var roleid = data.role;
var gartenId = 31;

var host = window.location.host;
var test = window.location.protocol;
//var url = test+"//"+host;
	var url = Constants.ROOT_URLJX;
var userid = parseInt( GetQueryString("userId") );//1021
var usercard =  GetQueryString("usercard");
var stationsId =  GetQueryString("stationsId");

console.log(stationsId)
var dimissionstatus = null;
var role = null;
//园长
var checkinfo = {
	"userid": userid
}
//返回上一级
$(".gonone").click(function(){
	window.location.href = ""+url+"/zhitong/client/newview/acounthh/eu2.html";
	return false;
});

checkinfo = JSON.stringify(checkinfo);

console.log(checkinfo);
///zhitong/service/user/teacher/update
$.ajax({
	type:"post",
	url:""+url+"/zhitong/service/user/teacher/detail",
	beforeSend: function(request) {
 		request.setRequestHeader("User-Token",token);
    },
    contentType:"application/json",
	async:false,
	data:checkinfo,
	success:function(res){
		console.log(res);
		role = res.data.role;
    	if( res.data.role == "1" ){
    		$("#workname").attr("disabled","disabled");
    		$("input[name='mobileno']").attr("readonly","readonly");    		
    	}
	}
});


//var gartenId = 5;
var headpic2 = null;

//考勤卡查询
var curpage = 1;
var pagesize = 10000;
//var gartenId = gartenId;
var cardstatus = 1;

var cardstr = "";
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
//  async:false,
//  data:carddata,
//  contentType:'application/json',
//  success: function (res) {
//      console.log(res);
//      
//      var ll = res.total;
//      //console.log(res.data);
//      
//      for ( var j = 0;j<ll; j++ ) {
//      	cardstr+="<option value='"+res.data[j].cardno+"'>"+res.data[j].cardno+"</option>"
//      }
//      
//  }
//})

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
		var valnum = 1;
		for ( var k = 1;k<dataL;k++ ) {
			workcon += "<option value='"+valnum+"' data-station-id='"+res.data[k].stationsId+"' value='"+res.data[k].stationsName+"'>"+res.data[k].stationsName+"</option>";
			valnum++;
		}
		//console.log(workcon);
		$("#workname").html(workcon);
	}
});	

if(url == "http://106.15.137.203"){
	////////////////////测试域名
	var domain = 'http://os4skw475.bkt.clouddn.com';
}else if(url == "http://test.zhitong.group"){
	////////////////////测试域名
	var domain = 'http://os4skw475.bkt.clouddn.com';
}else if( url == "http://forchild.zhitong.group" ){
	//正式
	var domain = 'http://oxpfj3y0x.bkt.clouddn.com';
}else{
	////////////////////测试域名
	var domain = 'http://os4skw475.bkt.clouddn.com';
}

$.ajax({
	type:"get",
	url:""+url+"/meritpay/roster/getDetail/"+userid,
	async:false,
	beforeSend: function(request) {
 		 request.setRequestHeader("User-Token", token);
    },
	success:function(res){
		console.log(res);
		dimissionstatus = res.data.dimissionstatus;
		
		$("input[name='username']")[0].value = res.data.username;
		$("input[name='mobileno']")[0].value = res.data.mobileno;
		var genderl = $("#genderSelect").find("option").length;
		for ( var a = 0;a<genderl;a++ ) {
			if( res.data.gender == $("#genderSelect").find("option")[a].getAttribute("data-gender-id") ){
				$("#genderSelect").find("option")[a].setAttribute("selected","selected");
			}
		}
		
		cardstr += "<option selected='selected'>"+usercard+"</option>";
//		var cardno = "<option>不选</option>";
//		var cardall = cardno.concat(cardstr);
		$("#cardnoSelect").html(cardstr);
        $("#cardnoSelect").select2({
		    placeholder: "请选择",
		    allowClear: true
		});
		
		$("#workname").select2({
		    placeholder: "请选择",
		    allowClear: false
		});
		var xxxval = $("#workname option[data-station-id='"+stationsId+"']").attr("value");
		var xxx = $("#workname").select2();
		xxx.val(xxxval).trigger("change");
		xxx.change();
		
		var entrytimecon = res.data.entrytime;
		
		$("#entrytime")[0].value = entrytimecon;
		if( entrytimecon == false|| entrytimecon==undefined||entrytimecon==null||entrytimecon=="null"||entrytimecon=="undefined"  ){
			$("#entrytime")[0].value = "";
		}
	
		var degreel = $("#degreeSelect").find("option").length;
		for ( var c = 0;c<degreel;c++ ) {
			if( res.data.degree == $("#degreeSelect").find("option")[c].getAttribute("data-degree-id") ){
				$("#degreeSelect").find("option")[c].setAttribute("selected","selected");
			}
		}
		var certificatel = $("#certificateSelect").find("option").length;
		for ( var d = 0;d<certificatel;d++ ) {
			if( res.data.certificate == $("#certificateSelect").find("option")[d].getAttribute("data-certificate-id") ){
				$("#certificateSelect").find("option")[d].setAttribute("selected","selected");
			}
		}
		
		var birthdaycon = res.data.birthday;
		$("#birthday")[0].value = birthdaycon;
		if(birthdaycon == false||birthdaycon==undefined||birthdaycon==null||birthdaycon=="null"||birthdaycon=="undefined"){
			$("#birthday")[0].value = ""
		}
		
		$("input[name='specialskill']")[0].value = res.data.specialskill;
		if(res.data.specialskill == false||res.data.specialskill==undefined||res.data.specialskill==null||res.data.specialskill=="null"||res.data.specialskill=="undefined"){
			$("input[name='specialskill']")[0].value = " "
		}
		
		var schoolagel = $("#schoolageSelect").find("option").length;
		for ( var e = 0;e<schoolagel;e++ ) {
			if( res.data.schoolage == $("#schoolageSelect").find("option")[e].getAttribute("data-schoolage-id") ){
				$("#schoolageSelect").find("option")[e].setAttribute("selected","selected");
			}
		}
		
		$("#imgcon").html("<img src='"+domain+"/"+res.data.headpic+"' alt=''>")
		
		headpic2 = res.data.headpic;
		console.log(headpic2)
		

		
	}
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
		//console.log(res);
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

var uploader = Qiniu.uploader({ 
	runtimes: 'html5,flash,html4',//上传模式,依次退化 
	browse_button: 'imgFile',//上传选择的点选按钮，**必需** 
	//uptoken_url: ''+url+'/meritpay/qiniu/getauth',//Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
	uptoken:token2, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
	domain: domain,   //bucket 域名，下载资源时用到，**必需** //owm1k0zpn.bkt.clouddn.com 测试域名
	get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
	//container: 'container',           //上传区域DOM ID，默认是browser_button的父元素，
	max_file_size: '100mb',           //最大文件体积限制
	//flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
	max_retries: 3,                   //上传失败最大重试次数
	dragdrop: true,                   //开启可拖曳上传
	//drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
	chunk_size: '4mb',                //分块上传时，每片的体积
	auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
	
	init: {
	    'FilesAdded': function(up, files) {
	        plupload.each(files, function(file) {
	            // 文件添加进队列后,处理相关的事情
	        });
//	        for (var i = 0; i < files.length; i++) {
//		       showPreview (files[i]);
//		  	}
	    },
	    'BeforeUpload': function(up, file) {
	           // 每个文件上传前,处理相关的事情
	    },
	    'UploadProgress': function(up, file) {
	           // 每个文件上传时,处理相关的事情
	    },
	    'FileUploaded': function(up, file, info) {
	           var res = JSON.parse(info);
	           var sourceLink = domain +"/"+ res.key; //获取上传成功后的文件的Url;
	           $("#imgcon").html("<img src='"+sourceLink+"' alt='"+res.key+"'>")
	           window.sessionStorage.setItem("picurl",res.key);
	           headpic2 = res.key;
	           console.log(headpic2)
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

//预览函数  待定
function showPreview (file) {
    var image = new Image();
    var preloader = new mOxie.Image();
    preloader.onload = function() {
        preloader.downsize( 200, 170 );
        image.setAttribute( "src", preloader.getAsDataURL() );
        $('#imgcon').html(image);
    };
    preloader.load( file.getSource() );
}

$("#ttaddbtn").click(function(){

//	console.log(headpic2)
	var headpic3 = headpic2;
	var username = $("input[name='username']").val();
	var mobileno = $("input[name='mobileno']").val();
	var gender = $("#genderSelect").find("option:selected").attr("data-gender-id");
	var entrytime = $("#entrytime").val();
	//var cardno = $("#cardnoSelect").find("option:selected").val();

	var gartenid = gartenId;
	var role = role;
	var stationsId = $("#workname").find("option:selected").attr("data-station-id");
	//$("#workSelect").find("option:selected").attr("data-role-id")
	var degree = $("#degreeSelect").find("option:selected").attr("data-degree-id");
	var certificate = $("#certificateSelect").find("option:selected").attr("data-certificate-id");
	var birthday = $("#birthday").val();
	var specialskill = $("input[name='specialskill']").val();
	var schoolage = $("#schoolageSelect").find("option:selected").attr("data-schoolage-id");
	
	if( headpic3 ==null || headpic3 == false ){
		headpic3 = "";
	}
	
	if( username == false || mobileno == false ||workname == false){
		Common.alertError("姓名、手机号和岗位必填");
		return false;
	}
	
	if(!(/^1[34578]\d{9}$/.test(mobileno))){
		Common.alertError("手机号码有误，请重填");
		return false;
	}
	
	//if(cardno == "undefined" || cardno == undefined || cardno == false){
		var ttadddata = {
			"userid": userid,
			"username": username,
			"mobileno": mobileno,
			"gender": parseInt( gender),//1男2女
			"entrytime": entrytime,//入职
			"dimissionstatus": parseInt( dimissionstatus ),//离职：1是，2否
			"birthday": birthday,
			"degree":parseInt( degree),//1大专2本科3硕士4博士5博士后6其他
			"schoolage":parseInt( schoolage ),//教龄，单位年。不自动改变，用户手动修改
		    "certificate": parseInt( certificate ),//教师资格证：1有，2无
		    "specialskill": specialskill,
		    "headpic": headpic3,
		    "gartenid": parseInt(gartenid),
		    "usertype": 1, //1老师（包括园长）2家长(学生)
		    "stationsId":stationsId
		}
//	}else{
//		var ttadddata = {
//			"userid": userid,
//			"username": username,
//			"mobileno": mobileno,
//			"gender": parseInt( gender),
//			"entrytime": entrytime,
//			"dimissionstatus": parseInt( dimissionstatus ),
//			"birthday": birthday,
//			"degree":parseInt( degree),
//			"schoolage":parseInt( schoolage ),
//		    "certificate": parseInt( certificate ),
//		    "specialskill": specialskill,
//		     "cardlist": [
//			    {
//			      "cardno": cardno
//			    }
//			],
//		    "headpic": headpic3,
//		    "gartenid": parseInt(gartenid),
//		    "usertype": 1, 
//		    "stationsId":stationsId
//		}
//	}
	
	ttadddata = JSON.stringify(ttadddata);
	
	console.log(ttadddata);
	///zhitong/service/user/teacher/update
	$.ajax({
		type:"post",
		url:""+url+"/zhitong/service/user/teacher/update",
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
				window.setTimeout("history.go(-1)",1100);
	    	}else if(res.result == -2){
				Common.alertError(res.message);
				return false;
			}else{
	    		Common.alertError(res.message);
	    		return false;
	    	}
		}
	});
});
//////
//获取地址栏参数
function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null){
		return unescape(r[2]);
	}
	return null;
}

////ready end
})