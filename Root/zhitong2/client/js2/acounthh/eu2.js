$(function() {
//init
var host = window.location.host;
var test = window.location.protocol;
//var url = test+"//"+host;
var sessioninfo = sessionStorage.getItem("teacher");
var data =  eval('(' + sessioninfo + ')');
//var userId = data.userid;
//var token = data.token;
//var gartenId = data.gartenid;

	var url = Constants.ROOT_URLJX;
	var userId = 100178;
	var gartenId = 31;
	var token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTY1MDYwMDIsInVzZXJJZCI6MTAwMTc4LCJ1c2VyVHlwZSI6MSwidXNlck5hbWUiOiLpmYjlsI_mnpcifQ.x0az9KFem87cDoIRYQEvxdfOUs-ubFyY2njzPiODxG8"

//加载 
$("#goadd").click(function(){
	window.location.href ="ttadd.html"
})

//无组织架构提示
$.ajax({
	type:"get",
	url:""+url+"/meritpay/stations/get/"+gartenId,
	async:false,
	beforeSend: function(request) {
	 	request.setRequestHeader("User-Token",token);
	},
	success:function(res){
		//console.log(res);
		var arrL = res.data.length;
		if(arrL ==1 ){
			$("#tipbox").show();	
		}
	}
});

$("#goorg").click(function(){
	location.href=""+url+"/zhitong/client/newview/zuzhi/org.html";
})

//考情卡没有不显示
function cardnone(){
	var eulistL = $(".eulist").length;
	for( var n = 0;n<eulistL;n++ ){
		console.log($(".eulist").eq(n).find("td:nth-child(5)").html())
		if( $(".eulist").eq(n).find("td:nth-child(5)").html() == "undefined"){
			$(".eulist").eq(n).find("td:nth-child(5)").html(" ");
		}
	}
}

//总条数
var totalnum = null;
//总页数

//显示条数
var shownum = 10;
//园长没离职
function lizhinone(){
	var lizhibtnL = $(".lizhibtn").length;
	for ( var kk = 0;kk<lizhibtnL;kk++) {
		var checkid = $(".lizhibtn").eq(kk).parent().parent().attr("data-user-id");
		if( checkid == userId){
			$(".lizhibtn").eq(kk).hide();
		}
	}
}
////////////////////获取

var data1 = {
	"dimissionstatus":2,
	"gartenid": parseInt( gartenId )
}
data1 = JSON.stringify(data1);	

$.ajax({
	type:"post",
	url:""+url+"/meritpay/roster/get/1/"+shownum,
	data:data1,
	async:false,
	beforeSend: function(request) {
 		request.setRequestHeader("User-Token",token);
    },
    contentType:"application/json",
	success:function(res){
		try{
			$(".pagebox2").css("display","none");
			$(".pagebox3").css("display","none");
			$(".pagebox").css("display","block");
		}catch(e){}
		
		console.log(res)
		
		var datal = res.data.length;
		//console.log(datal);
		var str = "";
		
		totalnum = res.total;
		//条数
		var shownum = 10;
		//总页数
		var allPage = Math.ceil(totalnum/shownum);
		
		//console.log(totalnum)
		for ( var i = 0;i<datal;i++ ) {
			
			var status = null;
			var setstatus = null;
			if( res.data[i].dimissionstatus == 2 ){
				status = "在职";
				setstatus = "离职";
			}else if( res.data[i].dimissionstatus == 1 ){
				status = "离职";
				setstatus = "";
			}
			
			var entrytime = res.data[i].entrytime;
			if(entrytime == "undefined" || entrytime == undefined || entrytime == false){
				entrytime = "";
			}
			str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
        		+"<td class='sorting_disabled' data-role-id='"+res.data[i].stationsId+"'>"+res.data[i].stationsName+"</td>"
        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
//      		+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
        		+"<td class='sorting_disabled'>"+entrytime+"</td>"
        		+"<td class='sorting_disabled rowspan='1' class='setcon'>"
        				+"<a class='chakanbtn'> 查看 </a>"
        				+"<a class='margin-left-10 bjbtn' > 编辑 </a>"
        				+"<a class='font-red margin-left-10 lizhibtn'> "+setstatus+" </a>"
        		+"</td>"
        	+"</tr>"
		}
		$("#eucon").html(str);
		
		//考情卡没有不显示
		//cardnone()
		function cardnone(){
		
			var eulistL = $(".eulist").length;
			for( var n = 0;n<eulistL;n++ ){
				if( $(".eulist").eq(n).find("td:nth-child(5)").html() == "undefined"){
					$(".eulist").eq(n).find("td:nth-child(5)").html(" ");
				}
			}
		}
		//园长没离职
		lizhinone()
		//查看
		chakanclick();
		//bj
		bjclick()
		//点击离职
		lizhiclick()
		
		//分页
		var that = this;
		$("#pagination1").pagination({
			
			currentPage: 1,// 当前页数
			totalPage: allPage,// 总页数
			isShow: true,// 是否显示首尾页
			//count: 5,// 显示个数
			homePageText: "首页",// 首页文本
			endPageText: "尾页",
			prevPageText: "上一页",// 上一页文本
			nextPageText: "下一页",
			callback: function(current) {
				
				var lsatshownum = (totalnum%shownum);			
		
				if( current != totalnum ){
					besideslast(gartenId,current,shownum);
				}else if(current == totalnum){
					lastshow(gartenId,current,lsatshownum);
				}
			}
		});
		
	}
});


//initend
////////////
function besideslast(mongardenid,current,shownum){
	
	$.ajax({
		type:"post",
		url:""+url+"/meritpay/roster/get/"+current+"/"+shownum,
		data:data1,
		async:false,
		beforeSend: function(request) {
	 		request.setRequestHeader("User-Token",token);
	    },
	    contentType:"application/json",
		success:function(res){
			try{
				$(".pagebox2").css("display","none");
				$(".pagebox3").css("display","none");
				$(".pagebox").css("display","block");
			}catch(e){}
			
			//console.log(res);
			var datal = res.data.length;
			//console.log(datal);
			var str = "";
			totalnum = res.total;
			//条数
			var shownum = 10;
			//总页数
			var allPage = Math.ceil(totalnum/shownum);
			
			for ( var i = 0;i<datal;i++ ) {
			
			var status = null;
			var setstatus = null;
			if( res.data[i].dimissionstatus == 2 ){
				status = "在职";
				setstatus = "离职";
			}else if( res.data[i].dimissionstatus == 1 ){
				status = "离职";
				setstatus = "";
			}
			
			var entrytime = res.data[i].entrytime;
			if(entrytime == "undefined" || entrytime == undefined || entrytime == false){
				entrytime = "";
			}
			
			str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
        		+"<td class='sorting_disabled' data-role-id='"+res.data[i].stationsId+"'>"+res.data[i].stationsName+"</td>"
        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
        		//+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
        		+"<td class='sorting_disabled'>"+entrytime+"</td>"
        		+"<td class='sorting_disabled rowspan='1' class='setcon'>"
        				+"<a class='chakanbtn'> 查看 </a>"
        				+"<a class='margin-left-10 bjbtn'> 编辑 </a>"
        				+"<a class='font-red margin-left-10 lizhibtn'> "+setstatus+" </a>"
        		+"</td>"
        	+"</tr>"
		}
			
			$("#eucon").html(str);
			//查看
			chakanclick();
			//bj
			bjclick()
			//点击离职
			lizhiclick()
			//园长没离职
			lizhinone()
			//考情卡没有不显示
			//cardnone()
			function cardnone(){
			
				var eulistL = $(".eulist").length;
				for( var n = 0;n<eulistL;n++ ){
					//console.log($(".eulist").eq(n).find("td:nth-child(5)").html())
					if( $(".eulist").eq(n).find("td:nth-child(5)").html() == "undefined"){
						$(".eulist").eq(n).find("td:nth-child(5)").html(" ");
					}
				}
			}
			var that = this;
			$("#pagination1").pagination({
				
				currentPage: current,// 当前页数
				totalPage: allPage,// 总页数
				isShow: true,// 是否显示首尾页
				//count: 5,// 显示个数
				homePageText: "首页",// 首页文本
				endPageText: "尾页",
				prevPageText: "上一页",// 上一页文本
				nextPageText: "下一页",
				callback: function(current) {
					var lsatshownum = (totalnum%shownum);			
			
					if( current != totalnum ){
						besideslast(gartenId,current,shownum);
					}else if(current == totalnum){
						lastshow(gartenId,current,lsatshownum);
					}
				}
			});
		}
	});
}
//////////
function lastshow(mongardenid,current,lsatshownum){
	
	$.ajax({
		type:"post",
		url:""+url+"/meritpay/roster/get/"+current+"/"+lsatshownum,
		data:data1,
		async:false,
		beforeSend: function(request) {
	 		request.setRequestHeader("User-Token",token);
	    },
	    contentType:"application/json",
		success:function(res){
			console.log(res)
			try{
				$(".pagebox2").css("display","none");
				$(".pagebox3").css("display","none");
				$(".pagebox").css("display","block");
			}catch(e){}
			//console.log(res);
			var datal = res.data.length;
			//console.log(datal);
			var str = "";
			totalnum = res.total;
			//条数
			var shownum = 10;
			//总页数
			var allPage = Math.ceil(totalnum/shownum);
			for ( var i = 0;i<datal;i++ ) {
				var status = null;
				var setstatus = null;
				if( res.data[i].dimissionstatus == 2 ){
					status = "在职";
					setstatus = "离职";
				}else if( res.data[i].dimissionstatus == 1 ){
					status = "离职";
					setstatus = "";
				}
				
				var entrytime = res.data[i].entrytime;
				if(entrytime == "undefined" || entrytime == undefined || entrytime == false){
					entrytime = "";
				}
				
				str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
	        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
	        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
	        		+"<td class='sorting_disabled' data-role-id='"+res.data[i].stationsId+"'>"+res.data[i].stationsName+"</td>"
	        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
	        		//+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
	        		+"<td class='sorting_disabled'>"+entrytime+"</td>"
	        		+"<td class='sorting_disabled rowspan='1' class='setcon'>"
	        				+"<a class='chakanbtn'> 查看 </a>"
	        				+"<a class='margin-left-10 bjbtn'> 编辑 </a>"
	        				+"<a class='font-red margin-left-10 lizhibtn'> "+setstatus+" </a>"
	        		+"</td>"
	        	+"</tr>"
			}
			$("#eucon").html(str);
			//查看
			chakanclick();
			//bj
			bjclick()
			//园长没离职
			lizhinone()
			//点击离职
			lizhiclick()
			//考情卡没有不显示
			//cardnone()
			function cardnone(){
				var eulistL = $(".eulist").length;
				for( var n = 0;n<eulistL;n++ ){
					if( $(".eulist").eq(n).find("td:nth-child(5)").html() == "undefined"){
						$(".eulist").eq(n).find("td:nth-child(5)").html(" ");;
					}
				}
			}
			$("#pagination1").pagination({
				
				currentPage: current,// 当前页数
				totalPage: allPage,// 总页数
				isShow: true,// 是否显示首尾页
				//count: 5,// 显示个数
				homePageText: "首页",// 首页文本
				endPageText: "尾页",
				prevPageText: "上一页",// 上一页文本
				nextPageText: "下一页",
				callback: function(current) {
					var lsatshownum = (totalnum%shownum);			
			
					if( current != totalnum ){
						besideslast(gartenId,current,shownum);
					}else if(current == totalnum){
						lastshow(gartenId,current,lsatshownum);
					}
				}
			});
		}
	});	
}



//职位搜索

//classfaget();
//function classfaget(){
//岗位查询
$.ajax({
	type:"get",
	url:""+url+"/meritpay/stations/get/"+gartenId,
	async:false,
	beforeSend: function(request) {
	 	request.setRequestHeader("User-Token",token);
	},
	success:function(res){
		//console.log(res);
		//console.log( res.data )
		var data = res.data;
		var aaaa = JSON.stringify(data);
		console.log(JSON.parse(aaaa));
		var dataL = data.length;
		
		var workcon1 = "<option value='请选择岗位'>请选择岗位</option>";
		var workcon ="";
		
		for ( var k = 1;k<dataL;k++ ) {
			workcon += "<option data-station-id='"+res.data[k].stationsId+"' value='"+res.data[k].stationsName+"'>"+res.data[k].stationsName+"</option>";
		}
		var workcon2 = workcon1.concat(workcon);
		$("#zai2").append(workcon2);
	}
});
	
var data3 = null;
$("#zai2").change(function(){
	
	var stationsId = $("#zai2").find("option:checked").attr("data-station-id");
	var stateid = $("#zaizhi").find("option:checked").attr("data-state-id");
	data3 = {
		"gartenid": parseInt( gartenId ),
		"dimissionstatus": parseInt( stateid ),
		"stationsId":stationsId
	}
	
	if( $("#zai2").find("option:checked").val() == "请选择岗位" ){
		data1 = {
			"gartenid": parseInt( gartenId ),
			"dimissionstatus": parseInt( stateid )
		}
		data1 = JSON.stringify(data1);
		var current1 = 1;
		besideslast(gartenId,current1,shownum);
		//处理样式
		return false;
	}
	
	data3 = JSON.stringify(data3);
	var shownum2 = 10;
	$.ajax({
		type:"post",
		url:""+url+"/meritpay/roster/getUsersByStationsId/1/"+shownum2,
		async:false,
		beforeSend: function(request) {
	 		request.setRequestHeader("User-Token",token);
	   	},
	   	data:data3,
	   	contentType:"application/json",
		success:function(res){
			try{
				$(".pagebox").css("display","none");
				$(".pagebox3").css("display","none");
				$(".pagebox2").css("display","block");
			}catch(e){}
			console.log(res);
			var datal = res.data.length;
			console.log(datal);
			
			totalnum = res.total;
			var shownum2 = 10;
			var allPage2 = Math.ceil(totalnum/shownum2);
			
			var str = "";
			for ( var i = 0;i<datal;i++ ) {
				var status = null;
				var setstatus = null;
				if( res.data[i].dimissionstatus == 2 ){
					status = "在职";
					setstatus = "离职";
				}else if( res.data[i].dimissionstatus == 1 ){
					status = "离职";
					setstatus = "";
				}
				
				var entrytime = res.data[i].entrytime;
				if(entrytime == "undefined" || entrytime == undefined || entrytime == false){
					entrytime = "";
				}
				
				str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
	        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
	        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
	        		+"<td class='sorting_disabled' data-role-id='"+res.data[i].stationsId+"'>"+res.data[i].stationsName+"</td>"
	        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
	        		//+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
	        		+"<td class='sorting_disabled'>"+entrytime+"</td>"
	        		+"<td class='sorting_disabled rowspan='1' class='setcon'>"
	        				+"<a class='chakanbtn'> 查看 </a>"
	        				+"<a class='margin-left-10 bjbtn'> 编辑 </a>"
	        				+"<a class='font-red margin-left-10 lizhibtn'> "+setstatus+" </a>"
	        		+"</td>"
	        	+"</tr>"
			}
			$("#eucon").html(str);
			//查看
			chakanclick();
			//bj
			bjclick()
			//点击离职
			lizhiclick()
			//园长没离职
			lizhinone()
			//考情卡没有不显示
			//cardnone()
			var stationsId = stationsId;
			$("#pagination2").pagination({
			
				currentPage: 1,// 当前页数
				totalPage: allPage2,// 总页数
				isShow: true,// 是否显示首尾页
				//count: 5,// 显示个数
				homePageText: "首页",// 首页文本
				endPageText: "尾页",
				prevPageText: "上一页",// 上一页文本
				nextPageText: "下一页",
				callback: function(current) {
					//console.log(totalPage)
					//$("#current2").html(current);
					
					var lsatshownum2 = (totalnum%shownum);
					if( current != totalnum ){
						besideswork(stationsId,gartenId,current,shownum);
					}else if(current == totalnum){
						lastwork(stationsId,gartenId,current,lsatshownum2);
					}
					
				}	
			});
			
		}
	})
	//ajax end
})

function besideswork(stationsId,mongardenid,current,shownum){
	
	$.ajax({
		type:"post",
		url:""+url+"/meritpay/roster/getUsersByStationsId/"+current+"/"+shownum2,
		async:false,
		beforeSend: function(request) {
	 		request.setRequestHeader("User-Token",token);
	   	},
	   	data:data3,
	   	contentType:"application/json",
		success:function(res){
			try{
				$(".pagebox").css("display","none");
				$(".pagebox3").css("display","none");
				$(".pagebox2").css("display","block");
			}catch(e){}
			//console.log(res);
			var datal = res.data.length;
			//console.log(datal);
			var str = "";
			totalnum = res.total;
			//条数
			var shownum = 10;
			//总页数
			var allPage = Math.ceil(totalnum/shownum);
			
			for ( var i = 0;i<datal;i++ ) {
			var status = null;
			var setstatus = null;
			if( res.data[i].dimissionstatus == 2 ){
				status = "在职";
				setstatus = "离职";
			}else if( res.data[i].dimissionstatus == 1 ){
				status = "离职";
				setstatus = "";
			}
			
			var entrytime = res.data[i].entrytime;
			if(entrytime == "undefined" || entrytime == undefined || entrytime == false){
				entrytime = "";
			}
			
			str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
        		+"<td class='sorting_disabled' data-role-id='"+res.data[i].stationsId+"'>"+res.data[i].stationsName+"</td>"
        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
        		//+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
        		+"<td class='sorting_disabled'>"+entrytime+"</td>"
        		+"<td class='sorting_disabled rowspan='1' class='setcon'>"
        				+"<a class='chakanbtn'> 查看 </a>"
        				+"<a class='margin-left-10 bjbtn'> 编辑 </a>"
        				+"<a class='font-red margin-left-10 lizhibtn'> "+setstatus+" </a>"
        		+"</td>"
        	+"</tr>"
		}
			
			$("#eucon").html(str);
			//查看
			chakanclick();
			//bj
			bjclick()
			//点击离职
			lizhiclick()
			//园长没离职
			lizhinone()
			//考情卡没有不显示
			//cardnone()
			function cardnone(){
			
				var eulistL = $(".eulist").length;
				for( var n = 0;n<eulistL;n++ ){
					//console.log($(".eulist").eq(n).find("td:nth-child(5)").html())
					if( $(".eulist").eq(n).find("td:nth-child(5)").html() == "undefined"){
						$(".eulist").eq(n).find("td:nth-child(5)").html(" ");
					}
				}
				
			}
			var that = this;
			$("#pagination2").pagination({
				
				currentPage: current,// 当前页数
				totalPage: allPage,// 总页数
				isShow: true,// 是否显示首尾页
				//count: 5,// 显示个数
				homePageText: "首页",// 首页文本
				endPageText: "尾页",
				prevPageText: "上一页",// 上一页文本
				nextPageText: "下一页",
				callback: function(current) {
					//console.log(totalPage)
					//$("#current2").html(current)
					//
					var lsatshownum = (totalnum%shownum);			
			
					if( current != totalnum ){
						besideswork(stationsId,gartenId,current,shownum);
					}else if(current == totalnum){
						lastwork(stationsId,gartenId,current,lsatshownum);
					}
				}
			});
			
		}
	});
}


function besideszaizhi2(stationsId,gartenId,current,shownum){
	var shownum2 = 10;
	$.ajax({
		type:"post",
		url:""+url+"/meritpay/roster/get/"+current+"/"+shownum2,
		data:data5,
		async:false,
		beforeSend: function(request) {
	 		request.setRequestHeader("User-Token",token);
	    },
	    contentType:"application/json",
		success:function(res){
			try{
				$(".pagebox").css("display","none");
				$(".pagebox2").css("display","none");
				$(".pagebox3").css("display","block");
			}catch(e){}
			//console.log(res);
			var datal = res.data.length;
			//console.log(datal);
			var str = "";
			totalnum = res.total;
			//条数
			var shownum = 10;
			//总页数
			var allPage = Math.ceil(totalnum/shownum);
			
			for ( var i = 0;i<datal;i++ ) {
			var status = null;
			var setstatus = null;
			if( res.data[i].dimissionstatus == 2 ){
				status = "在职";
				setstatus = "离职";
			}else if( res.data[i].dimissionstatus == 1 ){
				status = "离职";
				setstatus = "";
			}
			
			var entrytime = res.data[i].entrytime;
			if(entrytime == "undefined" || entrytime == undefined || entrytime == false){
				entrytime = "";
			}
			
			str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
        		+"<td class='sorting_disabled' data-role-id='"+res.data[i].stationsId+"'>"+res.data[i].stationsName+"</td>"
        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
        		//+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
        		+"<td class='sorting_disabled'>"+entrytime+"</td>"
        		+"<td class='sorting_disabled rowspan='1' class='setcon'>"
        				+"<a class='chakanbtn'> 查看 </a>"
        				+"<a class='margin-left-10 bjbtn'> 编辑 </a>"
        				+"<a class='font-red margin-left-10 lizhibtn'> "+setstatus+" </a>"
        		+"</td>"
        	+"</tr>"
		}
			
			$("#eucon").html(str);
			//查看
			chakanclick();
			//bj
			bjclick()
			//点击离职
			lizhiclick()
			//园长没离职
			lizhinone()
			//考情卡没有不显示
			//cardnone()
			function cardnone(){
			
				var eulistL = $(".eulist").length;
				for( var n = 0;n<eulistL;n++ ){
					if( $(".eulist").eq(n).find("td:nth-child(5)").html() == "undefined"){
						$(".eulist").eq(n).find("td:nth-child(5)").html(" ");
					}
				}
			}
			var that = this;
			$("#pagination3").pagination({
				
				currentPage: current,// 当前页数
				totalPage: allPage,// 总页数
				isShow: true,// 是否显示首尾页
				//count: 5,// 显示个数
				homePageText: "首页",// 首页文本
				endPageText: "尾页",
				prevPageText: "上一页",// 上一页文本
				nextPageText: "下一页",
				callback: function(current) {
					var lsatshownum = (totalnum%shownum)
					if( current != totalnum ){
						besideszaizhi2(stationsId,gartenId,current,shownum);
					}else if(current == totalnum){
						lastzaizhi2(stationsId,gartenId,current,lsatshownum);
					}
				}
			});
			
		}
	});
};

//是否在职
//sfzaizhi();
//function sfzaizhi(){
	$("#zaizhi").select2();
	$("#zai2").select2();
	
	var data4 = null;
	var data5 = null;
	$("#zaizhi").change(function(){
		
		var stationsId = $("#zai2").find("option:checked").attr("data-station-id");
		var stateid = $("#zaizhi").find("option:checked").attr("data-state-id");
		
		data4 = {
			"gartenid": parseInt( gartenId ),
			"dimissionstatus": parseInt( stateid ),
			"stationsId":stationsId
		}
		data4 = JSON.stringify(data4);
		
		if( $("#zai2").find("option:checked").val() == "请选择岗位" ){
			data5 = {
				"gartenid": parseInt( gartenId ),
				"dimissionstatus": parseInt( stateid )
			}
			data5 = JSON.stringify(data5);
			
			var shownum2 = 10;
			$.ajax({
				type:"post",
				url:""+url+"/meritpay/roster/get/1/"+shownum2,
				data:data5,
				async:false,
				beforeSend: function(request) {
			 		request.setRequestHeader("User-Token",token);
			    },
			    contentType:"application/json",
				success:function(res){
					try{
						$(".pagebox").css("display","none");
						$(".pagebox2").css("display","none");
						$(".pagebox3").css("display","block");
					}catch(e){}
					console.log(res);
					var datal = res.data.length;
					//console.log(datal);
					
					totalnum = res.total;
					var shownum2 = 10;
					var allPage2 = Math.ceil(totalnum/shownum2);
					
					var str = "";
					for ( var i = 0;i<datal;i++ ) {
						var status = null;
						var setstatus = null;
						if( res.data[i].dimissionstatus == 2 ){
							status = "在职";
							setstatus = "离职";
						}else if( res.data[i].dimissionstatus == 1 ){
							status = "离职";
							setstatus = "";
						}
						
						var entrytime = res.data[i].entrytime;
						if(entrytime == "undefined" || entrytime == undefined || entrytime == false){
							entrytime = "";
						}
						
						str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
			        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
			        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
			        		+"<td class='sorting_disabled' data-role-id='"+res.data[i].stationsId+"'>"+res.data[i].stationsName+"</td>"
			        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
			        		//+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
			        		+"<td class='sorting_disabled'>"+entrytime+"</td>"
			        		+"<td class='sorting_disabled rowspan='1' class='setcon'>"
			        				+"<a class='chakanbtn'> 查看 </a>"
			        				+"<a class='margin-left-10 bjbtn'> 编辑 </a>"
			        				+"<a class='font-red margin-left-10 lizhibtn'> "+setstatus+" </a>"
			        		+"</td>"
			        	+"</tr>"
					}
					$("#eucon").html(str);
					//查看
					chakanclick();
					//bj
					bjclick();
					//点击离职
					lizhiclick();
					//园长没离职
					lizhinone();
					//考情卡没有不显示
					//cardnone();
					
					$("#pagination3").pagination({
					
						currentPage: 1,// 当前页数
						totalPage: allPage2,// 总页数
						isShow: true,// 是否显示首尾页
						//count: 5,// 显示个数
						homePageText: "首页",// 首页文本
						endPageText: "尾页",
						prevPageText: "上一页",// 上一页文本
						nextPageText: "下一页",
						callback: function(current) {
							var lsatshownum2 = (totalnum%shownum2);
							if( current != totalnum ){
								besideszaizhi2(stationsId,gartenId,current,shownum2);
							}else if(current == totalnum){
								lastzaizhi2(stationsId,gartenId,current,lsatshownum2);
							}
						}	
					});
				}
			});
			
			return false;
		}
		
		
		var shownum2 = 10;
		$.ajax({
			type:"post",
			url:""+url+"/meritpay/roster/getUsersByStationsId/1/"+shownum2,
			data:data4,
			async:false,
			beforeSend: function(request) {
		 		request.setRequestHeader("User-Token",token);
		    },
		    contentType:"application/json",
			success:function(res){
				try{
					$(".pagebox").css("display","none");
					$(".pagebox2").css("display","none");
					$(".pagebox3").css("display","block");
				}catch(e){}
				console.log(res);
				var datal = res.data.length;
				//console.log(datal);
				
				totalnum = res.total;
				var shownum2 = 10;
				var allPage2 = Math.ceil(totalnum/shownum2);
				
				var str = "";
				for ( var i = 0;i<datal;i++ ) {
					var status = null;
					var setstatus = null;
					if( res.data[i].dimissionstatus == 2 ){
						status = "在职";
						setstatus = "离职";
					}else if( res.data[i].dimissionstatus == 1 ){
						status = "离职";
						setstatus = "";
					}
					
					var entrytime = res.data[i].entrytime;
					if(entrytime == "undefined" || entrytime == undefined || entrytime == false){
						entrytime = "";
					}
					
					str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
		        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
		        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
		        		+"<td class='sorting_disabled' data-role-id='"+res.data[i].stationsId+"'>"+res.data[i].stationsName+"</td>"
		        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
		        		//+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
		        		+"<td class='sorting_disabled'>"+entrytime+"</td>"
		        		+"<td class='sorting_disabled rowspan='1' class='setcon'>"
		        				+"<a class='chakanbtn'> 查看 </a>"
		        				+"<a class='margin-left-10 bjbtn'> 编辑 </a>"
		        				+"<a class='font-red margin-left-10 lizhibtn'> "+setstatus+" </a>"
		        		+"</td>"
		        	+"</tr>"
				}
				$("#eucon").html(str);
				//查看
				chakanclick();
				//bj
				bjclick()
				//点击离职
				lizhiclick()
				//园长没离职
				lizhinone()
				//考情卡没有不显示
				//cardnone()
				
				$("#pagination3").pagination({
				
					currentPage: 1,// 当前页数
					totalPage: allPage2,// 总页数
					isShow: true,// 是否显示首尾页
					//count: 5,// 显示个数
					homePageText: "首页",// 首页文本
					endPageText: "尾页",
					prevPageText: "上一页",// 上一页文本
					nextPageText: "下一页",
					callback: function(current) {
						var lsatshownum2 = (totalnum%shownum2);
						if( current != totalnum ){
							besideszaizhi(stationsId,gartenId,current,shownum2);
						}else if(current == totalnum){
							lastzaizhi(stationsId,gartenId,current,lsatshownum2);
						}
					}	
				});
			}
		})
		//ajax end
			
	})
//}

function besideszaizhi(stationsId,gartenId,current,shownum){
	var shownum2 = 10;
	$.ajax({
		type:"post",
		url:""+url+"/meritpay/roster/getUsersByStationsId/"+current+"/"+shownum2,
		data:data4,
		async:false,
		beforeSend: function(request) {
	 		request.setRequestHeader("User-Token",token);
	    },
	    contentType:"application/json",
		success:function(res){
			try{
				$(".pagebox").css("display","none");
				$(".pagebox2").css("display","none");
				$(".pagebox3").css("display","block");
			}catch(e){}
			//console.log(res);
			var datal = res.data.length;
			//console.log(datal);
			var str = "";
			totalnum = res.total;
			//条数
			var shownum = 10;
			//总页数
			var allPage = Math.ceil(totalnum/shownum);
			
			for ( var i = 0;i<datal;i++ ) {
			var status = null;
			var setstatus = null;
			if( res.data[i].dimissionstatus == 2 ){
				status = "在职";
				setstatus = "离职";
			}else if( res.data[i].dimissionstatus == 1 ){
				status = "离职";
				setstatus = "";
			}
			
			var entrytime = res.data[i].entrytime;
			if(entrytime == "undefined" || entrytime == undefined || entrytime == false){
				entrytime = "";
			}
			
			str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
        		+"<td class='sorting_disabled' data-role-id='"+res.data[i].stationsId+"'>"+res.data[i].stationsName+"</td>"
        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
        		//+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
        		+"<td class='sorting_disabled'>"+entrytime+"</td>"
        		+"<td class='sorting_disabled rowspan='1' class='setcon'>"
        				+"<a class='chakanbtn'> 查看 </a>"
        				+"<a class='margin-left-10 bjbtn'> 编辑 </a>"
        				+"<a class='font-red margin-left-10 lizhibtn'> "+setstatus+" </a>"
        		+"</td>"
        	+"</tr>"
		}
			
			$("#eucon").html(str);
			//查看
			chakanclick();
			//bj
			bjclick()
			//点击离职
			lizhiclick()
			//园长没离职
			lizhinone()
			//考情卡没有不显示
			//cardnone()
			function cardnone(){
			
				var eulistL = $(".eulist").length;
				for( var n = 0;n<eulistL;n++ ){
					if( $(".eulist").eq(n).find("td:nth-child(5)").html() == "undefined"){
						$(".eulist").eq(n).find("td:nth-child(5)").html(" ");;
					}
				}
				
			}
			var that = this;
			$("#pagination3").pagination({
				
				currentPage: current,// 当前页数
				totalPage: allPage,// 总页数
				isShow: true,// 是否显示首尾页
				//count: 5,// 显示个数
				homePageText: "首页",// 首页文本
				endPageText: "尾页",
				prevPageText: "上一页",// 上一页文本
				nextPageText: "下一页",
				callback: function(current) {
					var lsatshownum = (totalnum%shownum);			
			
					if( current != totalnum ){
						besideszaizhi(stationsId,gartenId,current,shownum);
					}else if(current == totalnum){
						lastzaizhi(stationsId,gartenId,current,lsatshownum);
					}
				}
			});
			
		}
	});
};


//点击bj
function bjclick(){
	var chakanL =  $(".bjbtn").length;
	$(".bjbtn").on('click',function(){
		var userid =  $(this).parent().parent().attr("data-user-id");
		var usercard = $(this).parent().parent().find("td:nth-child(5)").html();
		var stationsId = $(this).parent().parent().find("td:nth-child(3)").attr("data-role-id");
		//console.log(stationsId);
		location.href = "eu2bj.html?userId="+userid+"&usercard="+usercard+"&stationsId="+stationsId;
	})
}

//点击查看
function chakanclick(){
	var chakanL =  $(".chakanbtn").length;
	$(".chakanbtn").on('click',function(){
		var userid =  $(this).parent().parent().attr("data-user-id");
		var usercard = $(this).parent().parent().find("td:nth-child(5)").html();
		var stationsId = $(this).parent().parent().find("td:nth-child(3)").attr("data-role-id");
		location.href = "eu2ck.html?userId="+userid+"&usercard="+usercard+"&stationsId="+stationsId;
	})
}

//点击离职
function lizhiclick(){
	var lizhibtnL = $(".lizhibtn").length;
	$(".lizhibtn").on('click',function(){
		var userid =  $(this).parent().parent().attr("data-user-id");
		
		swal({
			title: "是否确定继续操作?",  
			text: "操作后将无法恢复，请谨慎操作！",   
			type: "warning",   
			showCancelButton: true,   
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "确定",   
			cancelButtonText: "取消",   
			closeOnConfirm: false,  
			closeOnCancel: false 
		},
		function(isConfirm){   
			if (isConfirm) {
				var lizhicon = {
				"userid":userid,
				"dimissionstatus":1
				}
				lizhicon = JSON.stringify(lizhicon);
				console.log(lizhicon)
				$.ajax({
					type:"post",
					url:""+url+"/zhitong/service/user/teacher/update",
					async:true,
					beforeSend: function(request) {
				 		request.setRequestHeader("User-Token",token);
				    },
				    contentType:"application/json",
				    data:lizhicon,
				    success:function(res){
				    	console.log(res)
				    	Common.alertSuccess("操作成功");
				    	window.setTimeout("history.go(0)",1100)
				    }
				});
				//swal("Deleted!", "Your imaginary file has been deleted.", "success");   
			} else {     
				swal("取消操作", "您取消了离职操作", "error");
			} 
		});
		
	})
}

//cardNoShow
function cardnone(){
			
	var eulistL = $(".eulist").length;
	for( var n = 0;n<eulistL;n++ ){
		if( $(".eulist").eq(n).find("td:nth-child(5)").html() == "undefined"){
			$(".eulist").eq(n).find("td:nth-child(5)").html(" ");;
		}
	}
	
}
//手机号搜索
//搜索  ..
var data2 = null;
$("#mobsearch")[0].onclick = function(){
	
	data2 = {
		"gartenid": parseInt( gartenId ),
		"mobileno": $("#searchname").val()
	}
	
	var phone = $("#searchname").val();
	
	if(!(/^1[34578]\d{9}$/.test(phone))){
		data2 = {
			"gartenid": parseInt( gartenId ),
			"username": $("#searchname").val()
		}
	}
	//console.log($("#searchname").val());
	if( $("#searchname").val() == " " || $("#searchname").val() == false){
		//alert(111)
		//history.go(0);
		var alldata = {
			"dimissionstatus":2,
			"gartenid": parseInt( gartenId )
		}
		alldata = JSON.stringify(alldata);
		
			var shownum2 = 10;
			$.ajax({
				type:"post",
				url:""+url+"/meritpay/roster/get/1/"+shownum2,
				data:alldata,
				async:false,
				beforeSend: function(request) {
			 		request.setRequestHeader("User-Token",token);
			    },
			    contentType:"application/json",
				success:function(res){
					try{
						$(".pagebox2").css("display","none");
						$(".pagebox3").css("display","none");
						$(".pagebox").css("display","block");
					}catch(e){}
					
					//$("#searchname").val(" ");
					console.log(res);
					var datal = res.data.length;
					//console.log(datal);
					
					var str = "";
					totalnum = res.total;
					//条数
					var shownum = 10;
					//总页数
					var allPage = Math.ceil(totalnum/shownum);
					
					for ( var i = 0;i<datal;i++ ) {
						var status = null;
						var setstatus = null;
						if( res.data[i].dimissionstatus == 2 ){
							status = "在职";
							setstatus = "离职";
						}else if( res.data[i].dimissionstatus == 1 ){
							status = "离职";
							setstatus = "";
						}
						
						var entrytime = res.data[i].entrytime;
						if(entrytime == "undefined" || entrytime == undefined || entrytime == false){
							entrytime = "";
						}
						
						str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
			        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
			        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
			        		+"<td class='sorting_disabled' data-role-id='"+res.data[i].stationsId+"'>"+res.data[i].stationsName+"</td>"
			        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
			        		//+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
			        		+"<td class='sorting_disabled'>"+entrytime+"</td>"
			        		+"<td class='sorting_disabled rowspan='1' class='setcon'>"
			        				+"<a class='chakanbtn'> 查看 </a>"
			        				+"<a class='margin-left-10 bjbtn'> 编辑 </a>"
			        				+"<a class='font-red margin-left-10 lizhibtn'> "+setstatus+" </a>"
			        		+"</td>"
			        	+"</tr>"
					}
					$("#eucon").html(str);
					//查看
					chakanclick();
					//bj
					bjclick()
					//点击离职
					lizhiclick()
					//园长没离职
					lizhinone()
					//考情卡没有不显示
					//cardnone()
					//
					$("#pagination1").pagination({
						currentPage: 1,// 当前页数
						totalPage: allPage,// 总页数
						isShow: true,// 是否显示首尾页
						//count: 5,// 显示个数
						homePageText: "首页",// 首页文本
						endPageText: "尾页",
						prevPageText: "上一页",// 上一页文本
						nextPageText: "下一页",
						callback: function(current) {
							var lsatshownum = (totalnum%shownum);			
					
							if( current != totalnum ){
								besideslast(gartenId,current,shownum);
							}else if(current == totalnum){
								lastshow(gartenId,current,lsatshownum);
							}
						}
					});
					
				}
			})
		
		return false;
	}
	
	data2 = JSON.stringify(data2);
	var shownum2 = 10;
	$.ajax({
		type:"post",
		url:""+url+"/meritpay/roster/getUserByLikeUsername/",
		data:data2,
		async:false,
		beforeSend: function(request) {
	 		request.setRequestHeader("User-Token",token);
	    },
	    contentType:"application/json",
		success:function(res){
			try{
				$(".pagebox2").css("display","none");
				$(".pagebox3").css("display","none");
				$(".pagebox").css("display","none");
			}catch(e){}
			
			//$("#searchname").val(" ");
			console.log(res);
			var datal = res.data.length;
			//console.log(datal);
			
			var str = "";
			totalnum = res.total;
			//条数
			var shownum = 10;
			//总页数
			var allPage = Math.ceil(totalnum/shownum);
			
			for ( var i = 0;i<datal;i++ ) {
				var status = null;
				var setstatus = null;
				if( res.data[i].dimissionstatus == 2 ){
					status = "在职";
					setstatus = "离职";
				}else if( res.data[i].dimissionstatus == 1 ){
					status = "离职";
					setstatus = "";
				}
				
				var entrytime = res.data[i].entrytime;
				if(entrytime == "undefined" || entrytime == undefined || entrytime == false){
					entrytime = "";
				}
				
				str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
	        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
	        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
	        		+"<td class='sorting_disabled' data-role-id='"+res.data[i].stationsId+"'>"+res.data[i].stationsName+"</td>"
	        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
	        		//+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
	        		+"<td class='sorting_disabled'>"+entrytime+"</td>"
	        		+"<td class='sorting_disabled rowspan='1' class='setcon'>"
	        				+"<a class='chakanbtn'> 查看 </a>"
	        				+"<a class='margin-left-10 bjbtn'> 编辑 </a>"
	        				+"<a class='font-red margin-left-10 lizhibtn'> "+setstatus+" </a>"
	        		+"</td>"
	        	+"</tr>"
			}
			$("#eucon").html(str);
			//查看
			chakanclick();
			//bj
			bjclick()
			//点击离职
			lizhiclick()
			//园长没离职
			lizhinone()
			//考情卡没有不显示
			//cardnone()
			//
//			$("#pagination1").pagination({});
			
		}
	})
	
}

//$end
});