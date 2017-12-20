
$(document).ready(function(){

//init
//获取session
//var url = "http://forchild.zhitong.group";
var url = "http://106.15.137.203";
var sessioninfo = sessionStorage.getItem("teacher");
var data =  eval('(' + sessioninfo + ')');
var userId = data.userid;
var token = data.token;

var gardenid = data.gartenid;

//	var token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDg1NzY5NjIsInVzZXJJZCI6MTAwNSwidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi572X5a-G5qynIn0.QcZzpG1xhaqRk3dHADS5acKSXZnG2VPntSipvc2mlgs";
//	var gardenid = 5;

var showdata = {
	"gartenId": gardenid
}

showdata = JSON.stringify(showdata);

$.ajax({
	type:"post",
	url:""+url+"/meritpay/salaryTable/getAll",
	async:false,
	beforeSend: function(request) {
 		request.setRequestHeader("User-Token",token);
 		var sedtoken = window.sessionStorage.getItem("sedtoken");
 		
 		try{
 			sedtoken = sedtoken.replace(/^\"|\"$/g,'');
 		}catch(e){
			Common.alertError("请设置安全密码");
			return false;
 			//alert("请设置安全密码");
 		}
 		
 		console.log(sedtoken);
 		request.setRequestHeader("Second-Token",sedtoken);
    },
	data:showdata,
	contentType:"application/json",
	success:function(res){
		console.log(res);
		
		var listL = res.data.length;
		var sstr = "";
		for ( var i = 0;i<listL;i++ ) {
			var aaa = res.data[i].createDate;
			var bbb = aaa.substr(5,2);
			var datamoon = parseInt(bbb);
			//console.log(datamoon);
			
			sstr +="<tr role='row'>"
            	+"<td class='moon' rowspan='1' colspan='3' style='width: 60px;'> "+datamoon+"月</td>"
            	+"<td class='status' rowspan='1' colspan='3' style='width: 60px;'> 进行中 </td>"
            	+"<td class='allmany' rowspan='1' colspan='3' style='width: 60px;'>"+res.data[i].totalActualSalary+"</td>"
            	+"<td class='toset' rowspan='1' colspan='3' style='width: 60px;'>"
            		+"<a href='mlistdetail.html?id="+i+"'>查看</a>"//
            	+"</td>"
           	+"</tr>";

		}
		
		$("#showtbody").html(sstr);

		var listshowL = $(".toset").length;
		console.log(listshowL);

		//$(".toset a").click(function(){
		//	console.log( $(this) )
		//	var index = $(this).index();
		//	alert(index);
		//	//location.href = "mlistdetail.html?id="+j;
		//	return false;
		//});

	//success end
	}
});
















//ready  end
})













