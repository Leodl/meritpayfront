
$(window).ready(function(){
////////	

//init
var sessioninfo = sessionStorage.getItem("teacher");
var data =  eval('(' + sessioninfo + ')');
//var userId = data.userid;
var token = data.token;

var gartenId = data.gartenid;
//var token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDg1NzY5NjIsInVzZXJJZCI6MTAwNSwidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi572X5a-G5qynIn0.QcZzpG1xhaqRk3dHADS5acKSXZnG2VPntSipvc2mlgs";
//var url = "http://forchild.zhitong.group";
var url = "http://106.15.137.203";
var url2 = "http://106.15.226.229";
var userid = parseInt( GetQueryString("userId") );//1021
var usercard =  GetQueryString("usercard");
console.log(usercard)
var dimissionstatus = null;


//返回上一级
$(".gonone").click(function(){
	history.go(-1)
})
////////////////////测试域名
var domain = 'http://os4skw475.bkt.clouddn.com';
//var domain = 'http://oxpfj3y0x.bkt.clouddn.com';
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
$.ajax({
	type:"post",
    url: ""+url2+"/zhitong/service/card/list",//http://106.15.226.229/zhitong/service/card/list
    beforeSend: function(request) {
 		 request.setRequestHeader("User-Token", token)
    },
    async:false,
    data:carddata,
    contentType:'application/json',
    success: function (res) {
        console.log(res);
        var ll = res.total;
        //console.log(res.data);
        
        for ( var j = 0;j<ll; j++ ) {
        	cardstr+="<option onclick='selectClick()' value='"+res.data[j].cardno+"'>"+res.data[j].cardno+"</option>"
        }
        
        //$("#cardnoSelect").html(cardstr);
        
    }
})


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
		cardstr += "<option onclick='selectClick()' selected='selected'>"+usercard+"</option>";
		$("#cardnoSelect").html(cardstr);
		
		$("#entrytime")[0].value = res.data.entrytime;
		
		var rolel = $("#workSelect").find("option").length;
		for ( var b = 0;b<rolel;b++ ) {
			if( res.data.role == $("#workSelect").find("option")[b].getAttribute("data-role-id") ){
				$("#workSelect").find("option")[b].setAttribute("selected","selected");
			}
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
		
		$("#birthday")[0].value = res.data.birthday;
		$("input[name='specialskill']")[0].value = res.data.specialskill;
		
		var schoolagel = $("#schoolageSelect").find("option").length;
		for ( var e = 0;e<certificatel;e++ ) {
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
var qiniudata = {
	  bucketname: "forchild-user-dev"
	  //bucketname: "forchild-user"
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

//$("#teacherAddForm").validate({
//  submitHandler: function (form) {
//      var count = $('#imgFile').fileinput('getFilesCount');
//      if (count > 0) {
//          $('#imgFile').fileinput('upload');
//      } else {
//          teacherService.addTeacher();
//      }
//  }
//})

//$("#ttaddbtn").click(function(){
//	//图片上传
//	uploader.start();
//});

var uploader = Qiniu.uploader({ 
	runtimes: 'html5,flash,html4',//上传模式,依次退化 
	browse_button: 'imgFile',//上传选择的点选按钮，**必需** 
	uptoken_url: 'http://106.15.137.203/meritpay/qiniu/getauth',//Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
	uptoken:token2, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
	// unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
	// save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
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


//保存   http://106.15.137.203/meritpay/roster/saveRosters


$("#ttaddbtn").click(function(){

//	console.log(headpic2)
	var headpic3 = headpic2;
	var username = $("input[name='username']").val();
	var mobileno = $("input[name='mobileno']").val();
	var gender = $("#genderSelect").find("option:selected").attr("data-gender-id");
	var entrytime = $("#entrytime").val();
	var cardno = $("#cardnoSelect").find("option:selected").val();
	var gartenid = gartenId;
	var role = $("#workSelect").find("option:selected").attr("data-role-id");
	var degree = $("#degreeSelect").find("option:selected").attr("data-degree-id");
	var certificate = $("#certificateSelect").find("option:selected").attr("data-certificate-id");
	var birthday = $("#birthday").val();
	var specialskill = $("input[name='specialskill']").val();
	var schoolage = $("#schoolageSelect").find("option:selected").attr("data-schoolage-id");
	
	//
	//cardno  bj  http://106.15.226.229/zhitong/service/teacher/update
	var bjcard = {
		"gartenid":gartenId,
		"userid":userid,
		 "cardlist": [
		    {
		      "cardno": cardno
		    }
		]
	}
	
	bjcard = JSON.stringify(bjcard);
	console.log(bjcard);
	$.ajax({
		type:"post",
		url:""+url2+"/zhitong/service/user/teacher/update",
		async:false,
		beforeSend: function(request) {
	 		request.setRequestHeader("User-Token",token);
	    },
	    contentType:"application/json",
	    data:bjcard,
	    success:function(res){
	    	console.log(res)
	    }
	});
	
	
	var ttadddata = {
		"userid": userid,
		"username": username,
		"mobileno": mobileno,
		"gender": parseInt( gender),//1男2女
		"entrytime": entrytime,//入职
		"dimissionstatus": parseInt( dimissionstatus ),//离职：1是，2否
		"birthday": birthday,
		"degree":parseInt( degree),//1大专2本科3硕士4博士5博士后6其他
		"role":parseInt( role),//老师角色：1园长2老师3教工
		"schoolage":parseInt( schoolage ),//教龄，单位年。不自动改变，用户手动修改
	    "certificate": parseInt( certificate ),//教师资格证：1有，2无
	    "specialskill": specialskill,
	    //"cardno":cardno,
	    "headpic": headpic3,
//	    "gartenid": gartenid,
	    "usertype": 1 //1老师（包括园长）2家长(学生)
	}
	
	ttadddata = JSON.stringify(ttadddata);
	console.log(ttadddata);
	$.ajax({
		type:"put",
		url:""+url+"/meritpay/roster/updateRosters",
		beforeSend: function(request) {
	 		request.setRequestHeader("User-Token",token);
	    },
	    contentType:"application/json",
		async:false,
		data:ttadddata,
		success:function(res){
			console.log(res.result);
			if( res.result == 0 ){
	    		Common.alertSuccess("保存成功");
	    	}else{
	    		Common.alertError(res.message);
	    		return false;
	    	}
		}
	});
	
	
	
	
})
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