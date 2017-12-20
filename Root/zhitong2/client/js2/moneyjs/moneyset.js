$(document).ready(function(){
/////////////////////	
//init
//获取session
//var url = "http://forchild.zhitong.group";
var url = "http://106.15.137.203";
var sessioninfo = sessionStorage.getItem("teacher");
var data =  eval('(' + sessioninfo + ')');
var userId = data.userid;
var token = data.token;

var mongardenid = data.gartenid;
//	var token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDg1NzY5NjIsInVzZXJJZCI6MTAwNSwidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi572X5a-G5qynIn0.QcZzpG1xhaqRk3dHADS5acKSXZnG2VPntSipvc2mlgs";
//	var mongardenid = 5;

	$("#shebaoSet").click(function(){
		$("#mood2")[0].style.display = "block";
		
		//////////
		
	})
	
	$("#detesbBox").click(function(){
		$("#mood2")[0].style.display = "none";
	})
	
	//get  社保
	var newflag = false;
	var that = this;
	
	$.ajax({
		type:"get",
		url:""+url+"/meritpay/jinpoProvi/get/"+mongardenid,
		async:true,
		beforeSend: function(request) {
	 		request.setRequestHeader("User-Token",token);
	    },
		success:function(res){
			console.log(res)
			$("#mood2").find("input").eq(0).val(res.data.jinpoCardinalNu) ;
			$("#mood2").find("input").eq(1).val(  (res.data.aged*100).toFixed(2) ) ;
			$("#mood2").find("input").eq(2).val(  (res.data.medical*100).toFixed(2) ) ;
			$("#mood2").find("input").eq(3).val(  (res.data.unemployment*100).toFixed(2) ) ;
			$("#mood2").find("input").eq(4).val(res.data.illness) ;
			$("#mood2").find("input").eq(5).val(res.data.maternity) ;
			$("#mood2").find("input").eq(6).val(res.data.providentFundNu) ;
			$("#mood2").find("input").eq(7).val(  (res.data.providentFund*100).toFixed(2) ) ;
			
			if( res.result == -2 ){	
				newflag = true;
			}
			//console.log(newflag)
			//点击新建
			$("#addshebao").click(function(){
				//开关
				if(newflag){
					console.log(newflag)
					Common.alertError("请先设置社保、公积金信息");
					return false;
				}
				
				$("#mood4")[0].style.display = "block";	
			})		
		}
	});
	
	//社保
	$("#shebaosave").click(function(){
			var jinpoCardinalNu = parseFloat( $("#mood2").find("input").eq(0).val() );
			var aged = parseFloat( $("#mood2").find("input").eq(1).val() );
			var medical =parseFloat( $("#mood2").find("input").eq(2).val() ) ;
			var unemployment = parseFloat( $("#mood2").find("input").eq(3).val() );
			var illness = parseFloat( $("#mood2").find("input").eq(4).val() );
			var maternity = parseFloat( $("#mood2").find("input").eq(5).val() );
			var providentFundNu = parseFloat( $("#mood2").find("input").eq(6).val() );
			var providentFund = parseFloat( $("#mood2").find("input").eq(7).val() );
		
		
		var shebaocon = {
			  "aged": aged/100,//个人养老保险缴费比例
			  "createTime": "2017-09-11T09:54:28.822Z",
			  "gartenId": mongardenid,//mongardenid,
			  "illness": illness,//大病保险个人缴费
			  "jinpoCardinalNu": jinpoCardinalNu,//社保基数
			  "maternity": maternity,//生育保险
			  "medical": medical/100,//医疗保险个人缴费比例
			  "providentFund": providentFund/100,//公积金个人缴费比例
			  "providentFundNu": providentFundNu,//公积金缴费基数
			  "unemployment": unemployment/100,//失业保险个人缴费比例
			  "updateTime": "2017-09-11T09:54:28.822Z"
			}
		
		shebaocon = JSON.stringify(shebaocon);
		console.log(shebaocon);
		
		var shebaourl = ""+url+"/meritpay/jinpoProvi/save";
		var shebaotype = "post";
		getsbcon();
		function getsbcon(){
			$.ajax({
				type:shebaotype,
				url:shebaourl,
				async:true,
				beforeSend: function(request) {
			 		request.setRequestHeader("User-Token",token);
			 		var sedtoken = window.sessionStorage.getItem("sedtoken");
					sedtoken = sedtoken.replace(/^\"|\"$/g,'');
			 		console.log(sedtoken);
			 		request.setRequestHeader("Second-Token",sedtoken);
			    },
				contentType:"application/json",
				data:shebaocon,
				success:function(res){
					$("#mood2").hide();
					console.log(res)
					if( res.result == -1 ){
						shebaourl = ""+url+"/meritpay/jinpoProvi/update";
						shebaotype = "put";
						getsbcon();
						//alert("修改成功")
						Common.alertSuccess("修改成功");
						return false;
					}
					Common.alertSuccess("保存成功");
					
				}
				
			})
			
		}
		
		
	})
	
	//
	$("#detebianji").click(function(){
		$("#mood3")[0].style.display = "none";
	})

	
	$("#detenew").click(function(){
		$("#mood4")[0].style.display = "none";
	})
	
	//删除
	
	$(document).ready(function(){
		var shebaodete = $(".shebaodete");
		//for( var i = 0; i<shebaodete.index(); i++ ){	
			$("#shebaoContent").on("click",".shebaodete",function(){
				if (confirm("确认删除？")) {
					var deleid = $(this).parent().parent().attr("id");
					
					$.ajax({
						type:"get",
						url:""+url+"/meritpay/salarymanage/delete/"+deleid,
						async:true,
						beforeSend: function(request) {
					 		request.setRequestHeader("User-Token",token);
					 		var sedtoken = window.sessionStorage.getItem("sedtoken");
							sedtoken = sedtoken.replace(/^\"|\"$/g,'');
					 		console.log(sedtoken);
					 		request.setRequestHeader("Second-Token",sedtoken);
					    },
						success:function(res){
							console.log(res)
						}
					});
					
					
					$(this).parent().parent().remove();
					$("#mood5")[0].style.display = "none";
		        }  
		        else {  
		        	$("#mood5")[0].style.display = "none";
		        }
			})
		//}
		
	})
	
	//框
	
	//function detehtis(){
	//	var that = $(this);
	//	$("#dbdelate").click(function(){
	//		console.log(that);
	//		that.parent().parent().remove();
	//	})
	//}
	
	//$("#nodete").click(function(){
	//	$("#mood5")[0].style.display = "none";
	//})
	
	/////////////////////
	
	
	var that = $(this);
	//总条数
	var totalnum = null;
	//总页数
	
	//显示条数
	var shownum = 3;
	////////////////////获取
	$.ajax({
		type:"get",
		url:""+url+"/meritpay/salarymanage/getAllByPage/"+mongardenid+"/1/"+shownum,
		async:true,
		beforeSend: function(request) {
	 		request.setRequestHeader("User-Token",token);
	 		var sedtoken = window.sessionStorage.getItem("sedtoken");
			sedtoken = sedtoken.replace(/^\"|\"$/g,'');
	 		console.log(sedtoken);
	 		request.setRequestHeader("Second-Token",sedtoken);
	    },
		success:function(res){
			console.log(res)
			//console.log(res);
			var datal = res.data.length;
			//console.log(datal);
			var str = "";
			
			totalnum = res.total;
			//条数
			var shownum = 3;
			//总页数
			var allPage = Math.ceil(totalnum/shownum);
			
			//console.log(totalnum)
			for ( var i = 0;i<datal;i++ ) {
				str+="<tr class='shebBjCon' role='row' id='"+res.data[i].id+"' data-id='"+res.data[i].stationId+"'>"
	                	+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+res.data[i].stationsName+"</td>"
	                	+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+res.data[i].basePay+"</td>"
						+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+res.data[i].stationsPay+"</td>"
						+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+res.data[i].performance+"</td>"
	                	+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>" 
	                		+"<a class='shebBanji margin-left-10'> 编辑 </a>"
	        				+"<a class='font-red margin-left-10 shebaodete'>删除</a>"
	                	+"</td>"
	                +"</tr>"
			}
			
			$("#shebaoContent").html(str);
			//getworkname(datal);
			//分页
			var that = this;
			$("#pagination3").pagination({
				
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
					$("#current3").html(current)
					
					var lsatshownum = (totalnum%shownum);			
			
					if( current != totalnum ){
						besideslast(mongardenid,current,shownum)
					}else if(current == totalnum){
						lastshow(mongardenid,current,lsatshownum);
					}
					
					getworkname(datal);
				}
			});
			
			//职位
			getworkname(datal);
			//编辑
			bjmset();
			
		}
	});		
	
	////////////
	function besideslast(mongardenid,current,shownum){
		
		$.ajax({
			type:"get",
			url:""+url+"/meritpay/salarymanage/getAllByPage/"+mongardenid+"/"+current+"/"+shownum,
			async:true,
			beforeSend: function(request) {
		 		request.setRequestHeader("User-Token",token);
		 		var sedtoken = window.sessionStorage.getItem("sedtoken");
				sedtoken = sedtoken.replace(/^\"|\"$/g,'');
		 		console.log(sedtoken);
		 		request.setRequestHeader("Second-Token",sedtoken);
		    },
			success:function(res){
				//console.log(res);
				var datal = res.data.length;
				//console.log(datal);
				var str = "";
				totalnum = res.total;
				//条数
				var shownum = 3;
				//总页数
				var allPage = Math.ceil(totalnum/shownum);
				for ( var i = 0;i<datal;i++ ) {
					str+="<tr class='shebBjCon' role='row' id='"+res.data[i].id+"' data-id='"+res.data[i].stationId+"'>"
		                	+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+res.data[i].stationsName+"</td>"
		                	+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+res.data[i].basePay+"</td>"
							+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+res.data[i].stationsPay+"</td>"
							+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+res.data[i].performance+"</td>"
		                	+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>" 
		                		+"<a class='shebBanji margin-left-10'> 编辑 </a>"
		        				+"<a class='font-red margin-left-10 shebaodete'>删除</a>"
		                	+"</td>"
		                +"</tr>"
				}
				
				$("#shebaoContent").html(str);
				
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
						$("#current3").html(current)
						
						var lsatshownum = (totalnum%shownum);			
				
						if( current != totalnum ){
							besideslast(mongardenid,current,shownum)
						}else if(current == totalnum){
							lastshow(mongardenid,current,lsatshownum);
						}
						
						getworkname(datal);
					}
				});
				
			}
		});	
		
	}
	//////////
	function lastshow(mongardenid,current,lsatshownum){
		
		$.ajax({
			type:"get",
			url:""+url+"/meritpay/salarymanage/getAllByPage/"+mongardenid+"/"+current+"/"+lsatshownum,
			async:true,
			beforeSend: function(request) {
		 		request.setRequestHeader("User-Token",token);
		 		var sedtoken = window.sessionStorage.getItem("sedtoken");
				sedtoken = sedtoken.replace(/^\"|\"$/g,'');
		 		console.log(sedtoken);
		 		request.setRequestHeader("Second-Token",sedtoken);
		    },
			success:function(res){
				console.log(res);
				var datal = res.data.length;
				console.log(datal);
				var str = "";
				totalnum = res.total;
				//条数
				var shownum = 3;
				//总页数
				var allPage = Math.ceil(totalnum/shownum);
				for ( var i = 0;i<datal;i++ ) {
					str+="<tr class='shebBjCon' role='row' id='"+res.data[i].id+"' data-id='"+res.data[i].stationId+"'>"
		                	+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+res.data[i].stationsName+"</td>"
		                	+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+res.data[i].basePay+"</td>"
							+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+res.data[i].stationsPay+"</td>"
							+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+res.data[i].performance+"</td>"
		                	+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>" 
		                		+"<a class='shebBanji margin-left-10'> 编辑 </a>"
		        				+"<a class='font-red margin-left-10 shebaodete'>删除</a>"
		                	+"</td>"
		                +"</tr>"
				}
				
				$("#shebaoContent").html(str);
				
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
						$("#current3").html(current)
						
						var lsatshownum = (totalnum%shownum);			
				
						if( current != totalnum ){
							besideslast(mongardenid,current,shownum)
						}else if(current == totalnum){
							lastshow(mongardenid,current,lsatshownum);
						}
						
						getworkname(datal);
					}
				});
			}
		});	
		
	}
	
	
	//社保
//	function(){
//		
//	}
	
	
	//新建 保存tr
	
		//保存中职位获取
	//getworkname();
	function getworkname(datal){		
		$.ajax({
			type:"get",
			url:""+url+"/meritpay/stations/getStations/"+mongardenid,
			async:true,
			beforeSend: function(request) {
		 		request.setRequestHeader("User-Token",token);
		 		var sedtoken = window.sessionStorage.getItem("sedtoken");
				sedtoken = sedtoken.replace(/^\"|\"$/g,'');
		 		console.log(sedtoken);
		 		request.setRequestHeader("Second-Token",sedtoken);
		    },
			success:function(res){
				//console.log(res.total);
				var workname = "";
				for ( var jj = 0; jj < res.total ; jj++) {
					workname +="<option data-id='"+res.data[jj].stationsId+"' value='"+res.data[jj].stationsName+"'>"+res.data[jj].stationsName+"</option>";

				}
				
				$("#shebaobjBox select").html(workname);
				$("#shebaobjBox1 select").html(workname);
				
				//保存
				addmonset()
			}
		})
	}	

		
function addmonset(){
	$("#addshebao2").click(function(){
		//alert()
		
		var str = "";
		var aa = $("#shebaobjBox select").val();
		var aadataid = $("#shebaobjBox").find("option:checked").attr("data-id");
		console.log(aadataid)
		var bb = $("#shebaobjBox .basedolar").val();
		var cc = $("#shebaobjBox .gwdolar").val();
		var dd = $("#shebaobjBox .jxdolar").val();
		str +="<tr class='shebBjCon' role='row' data-id='"+aadataid+"'>"
		        	+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+aa+"</td>"
		        	+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+bb+"</td>"
					+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+cc+"</td>"
					+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+dd+"</td>"
		        	+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>" 
		        		+"<a class='shebBanji margin-left-10'> 编辑 </a>"
						+"<a class='font-red margin-left-10 shebaodete'>删除</a>"
		        	+"</td>"
		        +"</tr>";
		   	  
		$("#shebaoContent").append(str);
		
		//保存
		
		var adddata = {
			  "basePay": bb,
			  "gartenId": mongardenid,
			  "performance": dd,
			  "stationId": aadataid,
			  "stationsPay": cc
			}
		adddata = JSON.stringify(adddata);
		console.log(adddata);
		$.ajax({
			type:"post",
			url:""+url+"/meritpay/salarymanage/save",
			async:true,
			beforeSend: function(request) {
		 		request.setRequestHeader("User-Token",token);
		 		var sedtoken = window.sessionStorage.getItem("sedtoken");
				sedtoken = sedtoken.replace(/^\"|\"$/g,'');
		 		console.log(sedtoken);
		 		request.setRequestHeader("Second-Token",sedtoken);
		    },
			contentType:"application/json",
			data:adddata,
			success:function(res){
				console.log(res);
				if(res.result == 0){
					Common.alertSuccess("保存成功");
				}else{
					Common.alertError(res.message);
				}
				//alert("success")
				window.setTimeout("history.go(0)",1100)
			}
		});
		
		
		$("#mood4").hide();
	})
	
}
	
	
	//编辑tr
	function bjmset(){
		
		var shebaodete = $(".shebaodete");
		//for( var i = 0; i<shebaodete.index(); i++ ){	
			$("#shebaoContent").on("click",".shebBanji",function(){
				$("#mood3")[0].style.display = "block";
				//
				var that = $(this);
			
				$("#shebianset").click(function(){
				
					//console.log(that);
					
					var aa = $("#shebaobjBox1 select").val();
					var bjdataid = $("#shebaobjBox1").find("option:checked").attr("data-id");
					var bjid = that.parent().parent().attr("id");
					
					console.log(bjdataid);
					var bb = $("#shebaobjBox1 .basedolar").val();
					var cc = $("#shebaobjBox1 .gwdolar").val();
					var dd = $("#shebaobjBox1 .jxdolar").val();
				
					//console.log( that.parent().parent().find("td:nth-child(1)")[0].innerHTML )
					that.parent().parent().attr("data-id",bjdataid);
					that.parent().parent().find("td:nth-child(1)")[0].innerHTML = aa;
					that.parent().parent().find("td:nth-child(2)")[0].innerHTML = bb;
					that.parent().parent().find("td:nth-child(3)")[0].innerHTML = cc;
					that.parent().parent().find("td:nth-child(4)")[0].innerHTML = dd;
					
					
					var bjdata = {
					  "basePay": parseInt(bb),
					  "gartenId": parseInt(mongardenid),
					  "performance": parseInt(dd),
					  "stationId": bjdataid,
					  "stationsPay": parseInt(cc)
					}
					
					bjdata = JSON.stringify(bjdata);
					console.log(bjdata);
					$.ajax({
						type:"post",
						url:""+url+"/meritpay/salarymanage/update/"+bjid,
						async:true,
						beforeSend: function(request) {
					 		request.setRequestHeader("User-Token",token);
					 		var sedtoken = window.sessionStorage.getItem("sedtoken");
							sedtoken = sedtoken.replace(/^\"|\"$/g,'');
					 		console.log(sedtoken);
					 		request.setRequestHeader("Second-Token",sedtoken);
					    },
						contentType:"application/json",
						data:bjdata,
						success:function(res){
							console.log(res)
							//alert("success");
							Common.alertSuccess("保存成功");
						}
					});
					
					$("#mood3").hide();
				})
			})
		//}
	}

///////////////	
})

	
	











