
$(window).ready(function(){
////////	

//init
var sessioninfo = sessionStorage.getItem("teacher");
var data =  eval('(' + sessioninfo + ')');
//var userId = data.userid;
var token = data.token;

var gartenId = data.gartenid;

var host = window.location.host;
var test = window.location.protocol;
var url = test+"//"+host;
var userid = parseInt( GetQueryString("userId") );//1021
var usercard = GetQueryString("usercard");
var stationsId = GetQueryString("stationsId");

var dimissionstatus = null;

//返回上一级
$(".gonone").click(function(){
	history.go(-1)
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

//岗位查询
var valcon = "";
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
			if(stationsId == res.data[k].stationsId){
				valcon = res.data[k].stationsName;
			}
		}
		//console.log(workcon);
		$("#workname").html(valcon);
	}
});
//var gartenId = 5;
var headpic2 = null;

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
		
		if( res.data.gender == 1 ){
			var gendersex =  "男"
		}else if( res.data.gender == 2 ){
			var gendersex =  "女"
		}else{
			var gendersex = " "
		}
		
		$("#genderSelect").html(gendersex)
		
		//cardstr +=usercard;
		//$("#cardnoSelect").html(usercard);
		
		$("#entrytime")[0].value = res.data.entrytime;
		if( res.data.entrytime == false || res.data.entrytime==undefined || res.data.entrytime==null||res.data.entrytime=="undefined" ){
			$("#entrytime")[0].value = " "
		}

		
		if( res.data.degree == 1 ){
			var degreenamme = "大专"
		}else if( res.data.degree == 2 ){
			var degreenamme = "本科"
		}else if( res.data.degree == 3 ){
			var degreenamme = "硕士"
		}else if( res.data.degree == 4 ){
			var degreenamme = "博士"
		}else if( res.data.degree == 5 ){
			var degreenamme = "博士后"
		}else if( res.data.degree == 6 ){
			var degreenamme = "其他"
		}else{
			var degreenamme = " "
		}
		$("#degreeSelect").html(degreenamme)

		if( res.data.certificate == 1 ){
			var certificateCon = "不足1年"
		}else if( res.data.certificate == 2 ){
			var certificateCon = "1至3年"
		}else if( res.data.certificate == 3 ){
			var certificateCon = "3至5年"
		}else if( res.data.certificate == 4 ){
			var certificateCon = "5年以上"
		}else{
			var certificateCon = " "
		}
		$("#certificateSelect").html(certificateCon)

		
		$("#birthday")[0].value = res.data.birthday;
		if(res.data.birthday == false || res.data.birthday==undefined || res.data.birthday==null||res.data.birthday=="undefined"){
			$("#birthday")[0].value = " ";
		}
		$("input[name='specialskill']")[0].value = res.data.specialskill;
		if(res.data.specialskill == false||res.data.specialskill==undefined||res.data.specialskill==null|| res.data.specialskill=="null" ||res.data.specialskill=="undefined"){
			$("input[name='specialskill']")[0].value = " "
		}
		
		if( res.data.schoolage == 1 ){
			var schoolageState = "有"
		}else if( res.data.schoolage == 2 ){
			var schoolageState = "无"
		}else{
			var schoolageState = " "
		}
		$("#schoolageSelect").html(schoolageState)
		
		$("#imgcon").html("<img src='"+domain+"/"+res.data.headpic+"' alt=''>")
		
		headpic2 = res.data.headpic;
		console.log(headpic2)
		
	}
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