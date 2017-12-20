$(function() {
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
//var token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDg1NzY5NjIsInVzZXJJZCI6MTAwNSwidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi572X5a-G5qynIn0.QcZzpG1xhaqRk3dHADS5acKSXZnG2VPntSipvc2mlgs";
//加载 

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
//搜索  ..
var data2 = null;
$("#mobsearch")[0].onclick = function(){
	
	data2 = {
		"gartenid": parseInt( gartenId ),
		"mobileno": $("#searchname").val()
	}
	
	if( $("#searchname").val() == " " ){
		//history.go(0);
		data2 = {
			"gartenid": parseInt( gartenId )
		}
	}
	
	data2 = JSON.stringify(data2);
	var shownum2 = 10;
	$.ajax({
		type:"post",
		url:""+url+"/meritpay/roster/get/1/"+shownum2,
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
				$(".pagebox").css("display","block");
			}catch(e){}
			
			$("#searchname").val(" ");
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
				var addtime = res.data[i].addtime;
				addtime = addtime.substring(0,10);
				
				var status = null;
				var setstatus = null;
				if( res.data[i].dimissionstatus == 2 ){
					status = "在职";
					setstatus = "离职";
				}else if( res.data[i].dimissionstatus == 1 ){
					status = "离职";
					setstatus = "";
				}
				
				var rolename = null;
				if( res.data[i].role == 1 ){
					rolename = "园长";
					setstatus = " ";
				}else if( res.data[i].role == 2 ){
					rolename = "教师"
				}else if( res.data[i].role == 3 ){
					rolename = "教工"
				}
				
				str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
	        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
	        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
	        		+"<td class='sorting_disabled data-role-id='"+res.data[i].role+"'>"+rolename+"</td>"
	        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
	        		+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
	        		+"<td class='sorting_disabled'>"+addtime+"</td>"
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
			//考情卡没有不显示
			cardnone()
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
					//console.log(totalPage)
					//$("#current1").html(current)
					
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
	
}
////////////////////获取


var data1 = {
	"gartenid": parseInt( gartenId )
}
data1 = JSON.stringify(data1);	

$.ajax({
	type:"post",
	//http://106.15.137.203/meritpay/roster/get/1/10
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
		//console.log(res);
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
			var addtime = res.data[i].addtime;
			addtime = addtime.substring(0,10);
			
			var status = null;
			var setstatus = null;
			if( res.data[i].dimissionstatus == 2 ){
				status = "在职";
				setstatus = "离职";
			}else if( res.data[i].dimissionstatus == 1 ){
				status = "离职";
				setstatus = "";
			}
			
			var rolename = null;
			if( res.data[i].role == 1 ){
				rolename = "园长";
				setstatus = " ";
			}else if( res.data[i].role == 2 ){
				rolename = "教师"
			}else if( res.data[i].role == 3 ){
				rolename = "教工"
			}
			
			str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
        		+"<td class='sorting_disabled data-role-id='"+res.data[i].role+"'>"+rolename+"</td>"
        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
        		+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
        		+"<td class='sorting_disabled'>"+addtime+"</td>"
        		+"<td class='sorting_disabled rowspan='1' class='setcon'>"
        				+"<a class='chakanbtn'> 查看 </a>"
        				+"<a class='margin-left-10 bjbtn' > 编辑 </a>"
        				+"<a class='font-red margin-left-10 lizhibtn'> "+setstatus+" </a>"
        		+"</td>"
        	+"</tr>"
		}
		$("#eucon").html(str);
		
		//考情卡没有不显示
		cardnone()
		function cardnone(){
		
			var eulistL = $(".eulist").length;
			for( var n = 0;n<eulistL;n++ ){
				//console.log($(".eulist").eq(n).find("td:nth-child(5)").html())
				if( $(".eulist").eq(n).find("td:nth-child(5)").html() == "undefined"){
					$(".eulist").eq(n).find("td:nth-child(5)").html(" ");;
				}
			}
		}
		
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
				//console.log(totalPage)
				//$("#current1").html(current)
				
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
			var addtime = res.data[i].addtime;
			addtime = addtime.substring(0,10);
			
			var status = null;
			var setstatus = null;
			if( res.data[i].dimissionstatus == 2 ){
				status = "在职";
				setstatus = "离职";
			}else if( res.data[i].dimissionstatus == 1 ){
				status = "离职";
				setstatus = "";
			}
			
			var rolename = null;
			if( res.data[i].role == 1 ){
				rolename = "园长";
				setstatus = " ";
			}else if( res.data[i].role == 2 ){
				rolename = "教师"
			}else if( res.data[i].role == 3 ){
				rolename = "教工"
			}
			
			str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
        		+"<td class='sorting_disabled data-role-id='"+res.data[i].role+"'>"+rolename+"</td>"
        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
        		+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
        		+"<td class='sorting_disabled'>"+addtime+"</td>"
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
			//考情卡没有不显示
			cardnone()
			function cardnone(){
			
				var eulistL = $(".eulist").length;
				for( var n = 0;n<eulistL;n++ ){
					//console.log($(".eulist").eq(n).find("td:nth-child(5)").html())
					if( $(".eulist").eq(n).find("td:nth-child(5)").html() == "undefined"){
						$(".eulist").eq(n).find("td:nth-child(5)").html(" ");;
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
					//console.log(totalPage)
					//$("#current1").html(current)
					//
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
				var addtime = res.data[i].addtime;
				addtime = addtime.substring(0,10);
				
				var status = null;
				var setstatus = null;
				if( res.data[i].dimissionstatus == 2 ){
					status = "在职";
					setstatus = "离职";
				}else if( res.data[i].dimissionstatus == 1 ){
					status = "离职";
					setstatus = "";
				}
				
				var rolename = null;
				if( res.data[i].role == 1 ){
					rolename = "园长";
					setstatus = " ";
				}else if( res.data[i].role == 2 ){
					rolename = "教师"
				}else if( res.data[i].role == 3 ){
					rolename = "教工"
				}
				
				str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
	        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
	        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
	        		+"<td class='sorting_disabled data-role-id='"+res.data[i].role+"'>"+rolename+"</td>"
	        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
	        		+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
	        		+"<td class='sorting_disabled'>"+addtime+"</td>"
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
			//考情卡没有不显示
			cardnone()
			function cardnone(){
				var eulistL = $(".eulist").length;
				for( var n = 0;n<eulistL;n++ ){
					//console.log($(".eulist").eq(n).find("td:nth-child(5)").html())
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
					//console.log(totalPage)
					//$("#current1").html(current)
					//
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
	var data3 = null;
	$("#zai2").click(function(){
		
		var roleid = $("#zai2").find("option:checked").attr("data-role-id");
		data3 = {
			"gartenid": parseInt( gartenId ),
			"role": parseInt( roleid )
		}
		
		if( $("#zai2").find("option:checked").val() == "请选择岗位" ){
			//history.go(0);
			//处理样式
			return false;
//			data3 = {
//				"gartenid": parseInt( gartenId )
//			}
		}
		
		data3 = JSON.stringify(data3);
		var shownum2 = 10;
		$.ajax({
			type:"post",
			url:""+url+"/meritpay/roster/get/1/"+shownum2,
			data:data3,
			async:false,
			beforeSend: function(request) {
		 		request.setRequestHeader("User-Token",token);
		    },
		    contentType:"application/json",
			success:function(res){
				var zai2con = "<option value='请选择岗位'>请选择岗位</option>"
                		+"<option data-role-id='1' value='园长'>园长</option>"
                		+"<option data-role-id='2' value='教师'>教师</option>"
                		+"<option data-role-id='3' value='教工'>教工</option>";
				$("#zai2").html(zai2con);
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
					var addtime = res.data[i].addtime;
					addtime = addtime.substring(0,10);
					
					var status = null;
					var setstatus = null;
					if( res.data[i].dimissionstatus == 2 ){
						status = "在职";
						setstatus = "离职";
					}else if( res.data[i].dimissionstatus == 1 ){
						status = "离职";
						setstatus = "";
					}
					
					var rolename = null;
					if( res.data[i].role == 1 ){
						rolename = "园长";
						setstatus = " ";
					}else if( res.data[i].role == 2 ){
						rolename = "教师"
					}else if( res.data[i].role == 3 ){
						rolename = "教工"
					}
					
					str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
		        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
		        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
		        		+"<td class='sorting_disabled data-role-id='"+res.data[i].role+"'>"+rolename+"</td>"
		        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
		        		+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
		        		+"<td class='sorting_disabled'>"+addtime+"</td>"
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
				//考情卡没有不显示
				cardnone()
				
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
							besideswork(gartenId,current,shownum);
						}else if(current == totalnum){
							lastwork(gartenId,current,lsatshownum2);
						}
						
					}	
				});
				
			}
		})
		//ajax end
	})
//}
function besideswork(mongardenid,current,shownum){
	
	$.ajax({
		type:"post",
		url:""+url+"/meritpay/roster/get/"+current+"/"+shownum,
		data:data3,
		async:false,
		beforeSend: function(request) {
	 		request.setRequestHeader("User-Token",token);
	    },
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
			var addtime = res.data[i].addtime;
			addtime = addtime.substring(0,10);
			
			var status = null;
			var setstatus = null;
			if( res.data[i].dimissionstatus == 2 ){
				status = "在职";
				setstatus = "离职";
			}else if( res.data[i].dimissionstatus == 1 ){
				status = "离职";
				setstatus = "";
			}
			
			var rolename = null;
			if( res.data[i].role == 1 ){
				rolename = "园长";
				setstatus = " ";
			}else if( res.data[i].role == 2 ){
				rolename = "教师"
			}else if( res.data[i].role == 3 ){
				rolename = "教工"
			}
			
			str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
        		+"<td class='sorting_disabled data-role-id='"+res.data[i].role+"'>"+rolename+"</td>"
        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
        		+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
        		+"<td class='sorting_disabled'>"+addtime+"</td>"
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
			//考情卡没有不显示
			cardnone()
			function cardnone(){
			
				var eulistL = $(".eulist").length;
				for( var n = 0;n<eulistL;n++ ){
					//console.log($(".eulist").eq(n).find("td:nth-child(5)").html())
					if( $(".eulist").eq(n).find("td:nth-child(5)").html() == "undefined"){
						$(".eulist").eq(n).find("td:nth-child(5)").html(" ");;
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
						besideswork(gartenId,current,shownum);
					}else if(current == totalnum){
						lastwork(gartenId,current,lsatshownum);
					}
				}
			});
			
		}
	});
}

//是否在职
//sfzaizhi();
//function sfzaizhi(){
	var data4 = null;
	$("#zaizhi").click(function(){
		
		var stateid = $("#zaizhi").find("option:checked").attr("data-state-id");
		
		data4 = {
			"gartenid": parseInt( gartenId ),
			"dimissionstatus": parseInt( stateid )
		}
		
		if( $("#zaizhi").find("option:checked").val() == "全部" ){
			//处理样式
			return false;
//			data4 = {
//				"gartenid": parseInt( gartenId )
//			}
		}
		data4 = JSON.stringify(data4);
		
		var shownum2 = 10;
		$.ajax({
			type:"post",
			url:""+url+"/meritpay/roster/get/1/"+shownum2,
			data:data4,
			async:false,
			beforeSend: function(request) {
		 		request.setRequestHeader("User-Token",token);
		    },
		    contentType:"application/json",
			success:function(res){
				var zaizhicon = "<option data-state-id='0' value='全部'>全部</option>"
                        		+"<option data-state-id='2' value='在职'>在职</option>"
                        		+"<option data-state-id='1' value='离职'>离职</option>";
                    $("#zaizhi").html(zaizhicon);    		
				
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
					var addtime = res.data[i].addtime;
					addtime = addtime.substring(0,10);
					
					var status = null;
					var setstatus = null;
					if( res.data[i].dimissionstatus == 2 ){
						status = "在职";
						setstatus = "离职";
					}else if( res.data[i].dimissionstatus == 1 ){
						status = "离职";
						setstatus = "";
					}
					
					var rolename = null;
					if( res.data[i].role == 1 ){
						rolename = "园长";
						setstatus = " ";
					}else if( res.data[i].role == 2 ){
						rolename = "教师"
					}else if( res.data[i].role == 3 ){
						rolename = "教工"
					}
					
					str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
		        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
		        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
		        		+"<td class='sorting_disabled data-role-id='"+res.data[i].role+"'>"+rolename+"</td>"
		        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
		        		+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
		        		+"<td class='sorting_disabled'>"+addtime+"</td>"
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
				//考情卡没有不显示
				cardnone()
				
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
						//console.log(totalPage)
						//$("#current3").html(current);
						
						var lsatshownum2 = (totalnum%shownum);
						if( current != totalnum ){
							besideszaizhi(gartenId,current,shownum);
						}else if(current == totalnum){
							lastzaizhi(gartenId,current,lsatshownum2);
						}
						
					}	
				});
			}
		})
		//ajax end
		
//		$("#eucon tr td:nth-child(2)").each(function(){
//			if( $(this).html() == $("#zaizhi").find("option:checked").val() ){
//				$(this).parent().show();
//			}else{
//				$(this).parent().hide();
//			}
//		})		
	})
//}

function besideszaizhi(gartenId,current,shownum){
	$.ajax({
		type:"post",
		url:""+url+"/meritpay/roster/get/"+current+"/"+shownum,
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
			var addtime = res.data[i].addtime;
			addtime = addtime.substring(0,10);
			
			var status = null;
			var setstatus = null;
			if( res.data[i].dimissionstatus == 2 ){
				status = "在职";
				setstatus = "离职";
			}else if( res.data[i].dimissionstatus == 1 ){
				status = "离职";
				setstatus = "";
			}
			
			var rolename = null;
			if( res.data[i].role == 1 ){
				rolename = "园长";
				setstatus = " ";
			}else if( res.data[i].role == 2 ){
				rolename = "教师"
			}else if( res.data[i].role == 3 ){
				rolename = "教工"
			}
			
			str+="<tr role='row' class='eulist' data-user-id='"+res.data[i].userid+"'>"
        		+"<td class='sorting_disabled'>"+res.data[i].username+"</td>"
        		+"<td class='sorting_disabled' data-status-id='"+res.data[i].status+"' >"+status+"</td>"
        		+"<td class='sorting_disabled data-role-id='"+res.data[i].role+"'>"+rolename+"</td>"
        		+"<td class='sorting_disabled'>"+res.data[i].mobileno+"</td>"
        		+"<td class='sorting_disabled'>"+res.data[i].cardno+"</td>"
        		+"<td class='sorting_disabled'>"+addtime+"</td>"
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
			//考情卡没有不显示
			cardnone()
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
					//console.log(totalPage)
					//$("#current3").html(current)
					//
					var lsatshownum = (totalnum%shownum);			
			
					if( current != totalnum ){
						besideszaizhi(gartenId,current,shownum);
					}else if(current == totalnum){
						lastzaizhi(gartenId,current,lsatshownum);
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
		location.href = "eu2bj.html?userId="+userid+"&usercard="+usercard;
	})
}

//点击查看
function chakanclick(){
	var chakanL =  $(".chakanbtn").length;
	$(".chakanbtn").on('click',function(){
		var userid =  $(this).parent().parent().attr("data-user-id");
		var usercard = $(this).parent().parent().find("td:nth-child(5)").html();
		location.href = "eu2ck.html?userId="+userid+"&usercard="+usercard;
	})
}

//点击离职
function lizhiclick(){
	var lizhibtnL = $(".lizhibtn").length;
	$(".lizhibtn").on('click',function(){
		var userid =  $(this).parent().parent().attr("data-user-id");
		
		if(confirm("点击确认后无法回退，是否继续")){
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
			    	
			    	history.go(0);
			    }
			});
		}
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



//$结束
});