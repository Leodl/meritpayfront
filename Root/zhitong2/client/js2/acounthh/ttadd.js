$(window).ready(function(){

//init
//var url = "http://forchild.zhitong.group";
var url = "http://106.15.137.203";
var url2 = "http://106.15.226.229";
var sessioninfo = sessionStorage.getItem("teacher");
var data =  eval('(' + sessioninfo + ')');
var userid = data.userid;
var token = data.token;

var gartenId = data.gartenid;
//var token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDg1NzY5NjIsInVzZXJJZCI6MTAwNSwidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi572X5a-G5qynIn0.QcZzpG1xhaqRk3dHADS5acKSXZnG2VPntSipvc2mlgs";
//var userid = 1005;
//var gartenId = 5;

//返回上一级
$(".gonone").click(function(){
	//location.href = "news=15";
	history.go(-1);
})

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
$.ajax({
	type:"post",
    url: ""+url2+"/zhitong/service/card/list",
    //http://106.15.226.229/zhitong/service/card/list
    beforeSend: function(request) {
 		 request.setRequestHeader("User-Token", token)
    },
    data:carddata,
    contentType:'application/json',
    success: function (res) {
        console.log(res);
        var ll = res.total;
        console.log(res.data);
        var cardstr = "";
        for ( var j = 0;j<ll; j++ ) {
        	cardstr+="<option onclick='selectClick()' value='"+res.data[j].cardno+"'>"+res.data[j].cardno+"</option>"
        }
        
        $("#cardnoSelect").html(cardstr);
        
        function selectClick(){
		    document.getElementById("cardnoSelect").removeAttribute("size");  
		    document.getElementById("cardnoSelect").blur();  
		    this.setAttribute("selected","");  
		} 
        
    }
})
    


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

////////////////////////测试域名
var domain = 'http://os4skw475.bkt.clouddn.com';
//var domain = 'http://oxpfj3y0x.bkt.clouddn.com';

var uploader = Qiniu.uploader({ 
	runtimes: 'html5,flash,html4',//上传模式,依次退化 
	browse_button: 'imgFile',//上传选择的点选按钮，**必需** 
	//uptoken_url: 'http://106.15.137.203/meritpay/qiniu/getauth',//Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
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
	    },
	    'BeforeUpload': function(up, file) {
	           // 每个文件上传前,处理相关的事情
	    },
	    'UploadProgress': function(up, file) {
	           // 每个文件上传时,处理相关的事情
	    },
	    'FileUploaded': function(up, file, info) {//事件触发没有预览
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

//保存   http://106.15.137.203/meritpay/roster/saveRosters

$("#ttaddbtn").click(function(){
	var headpic = window.sessionStorage.getItem("picurl");
	var username = $("input[name='username']").val();
	var mobileno = $("input[name='mobileno']").val(); 
	var gender = $("#genderSelect").find("option:selected").attr("data-gender-id");
	var cardno = $("#cardnoSelect").find("option:selected").val();
	var entrytime = $("#entrytime").val();
	var gartenid = gartenId;
	var role = $("#workSelect").find("option:selected").attr("data-role-id");
	var degree = $("#degreeSelect").find("option:selected").attr("data-degree-id");
	var certificate = $("#certificateSelect").find("option:selected").attr("data-certificate-id");
	var birthday = $("#birthday").val();
	var specialskill = $("input[name='specialskill']").val();
	var schoolage = $("#schoolageSelect").find("option:selected").attr("data-schoolage-id");
	
	if( headpic ==null ){
		headpic = "";
	}
	
	var ttadddata = {
	
	    "birthday": birthday,
	    "cardlist": [
	        {
	            "cardno": cardno
	        }
	    ],
	    "certificate": certificate,
	    "degree": degree,
	    "entrytime": entrytime,
	    "gartenid": gartenid,
	    "gender": gender,
	    "headpic": headpic,
	    "mobileno": mobileno,
	    "role": parseInt(role),
	    "schoolage": schoolage,
	    "specialskill": specialskill,
	    "username": username
	}
	ttadddata = JSON.stringify(ttadddata);
	console.log(ttadddata);
	$.ajax({
		type:"post",
		url:""+url2+"/zhitong/service/user/teacher/new",
		beforeSend: function(request) {
	 		request.setRequestHeader("User-Token",token);
	    },
	    contentType:"application/json",
		async:false,
		data:ttadddata,
		success:function(res){
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

function selectFocus(){  
    document.getElementById("cardnoSelect").setAttribute("size","5");  
}  
 


/////
})



