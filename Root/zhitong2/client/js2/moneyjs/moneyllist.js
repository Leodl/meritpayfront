
//点击查看
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
var usertype = data.usertype;	
//	var token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDg1NzY5NjIsInVzZXJJZCI6MTAwNSwidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi572X5a-G5qynIn0.QcZzpG1xhaqRk3dHADS5acKSXZnG2VPntSipvc2mlgs";
//	var gardenid = 5;
	var that = $(this);
	var checkcon = $(".listshow").find(".showitem").length;
	
	//console.log(checkcon);
	
	//init
	var listL = null;
	var res = null;
	
	if( usertype == 1 ){
		var listdata = {
			"gartenId": gardenid
		}
	}else{
		var listdata = {
			"gartenId": gardenid,
			"userId": userId
		}
	}
	
	listdata = JSON.stringify(listdata);
	$.ajax({
		type:"post",
		url:""+url+"/meritpay/salaryTable/getPayRoll",//http://106.15.137.203/meritpay/salaryTable/getAll
		async:false,
		beforeSend: function(request) {
	 		request.setRequestHeader("User-Token",token);
	    },
		data:listdata,
		contentType:"application/json",
		success:function(res){
			console.log(res);
			
			res = res;
			listL = res.data.length;
			////////////////试改格式
			var shishi = {};
			shishi.data = [];
			shishi.data.push( res.data[0] );
			
			var shishi2 = {};
			shishi2.data = [];
			
			var tt = 0;
			for( var t = 0;t<listL;t++ ){
				try{
					if( res.data[t].createDate.substr(0,4) == res.data[t+1].createDate.substr(0,4) ){
						shishi.data[t+1] = res.data[t+1];
					}else{
						shishi2.data[tt] = res.data[t+1];
						tt++;
					};
				}catch(e){}
				
			}
			console.log(shishi);
			console.log(shishi2);
			///////end
			
			var yearcon = res.data[0].createDate;
			var yearshow = yearcon.substr(0,4);
			$("#mlisttop").html(yearshow);
			
			var sstr ="";
			var str4 = "";
			
			var listid = 0;
			
			for ( var i = 0;i<listL;i++ ) {
				
				var aaa = res.data[i].createDate;
				var bbb = aaa.substr(5,2);
				var datamoon = parseInt(bbb);
				//console.log(datamoon);
				
				var info = JSON.parse( res.data[i].datainfo[0].info );
				console.log(info);
				
				sstr +="<tr role='row' class='showitem' data-list-id='"+listid+"' >"
                	+"<td class='moon2' rowspan='1' colspan='4' style='width: 60px;'>"+datamoon+"月</td>"
                	+"<td class='allmany2' rowspan='1' colspan='4' style='width: 60px;'>"+res.data[i].datainfo[0].total+"</td>"
                	+"<td class='toset2' rowspan='1' colspan='4' style='width: 60px;'>"
                		+"<a class='clickbtn'>查看</a>"
                	+"</td>"
               	+"</tr>";
               	listid++;
               	
			}
			$("#listshow").html(sstr);
			
			for ( var j = 0;j<listL;j++ ) {
				$(".clickbtn")[j].onclick = function(event){
					
				var aaa = info.other;
				var al = getJsonLength(aaa);//other length
				var othercon = [];
				for(var js2 in aaa){ 
					var bbb = js2+":"+aaa[js2] ;
					bbb = bbb.split(":");
					othercon.push( bbb )
				}
				//console.log(othercon)
				var str1 ="<tr role='row' class='listshowi fade-in-up'>"
						+"<td class='btn-primary fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> 姓名 </td>"
						+"<td class='btn-primary fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> 角色 </td>"
						+"<td class='btn-primary fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> 基本工资</td>"
						+"<td class='btn-primary fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> 岗位工资</td>"
						+"<td class='btn-primary fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> 绩效工资</td>"
						+"<td class='btn-primary fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> 五险</td>"
						+"<td class='btn-primary fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> 公积金</td>"
						
				var str2 = "";
					for ( var sm = 0;sm<al;sm++ ) {
						str2 +="<td class='btn-primary fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> "+othercon[sm][0]+"</td>"
					}
//						+"<td class='btn-primary fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> 奖励</td>"
//						+"<td class='btn-primary fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> 扣款</td>"
						
				var str3 = "<td class='btn-primary fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> 应发</td>"
						+"<td class='btn-primary fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> 个税</td>"
						+"<td class='btn-primary fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> 实发</td>"
					+"</tr>";
				
				str4 = str1.concat( str2,str3 )
					
					var str = "";
					var strr = "";
//					var str2 = "";
//					var str5 = "";
//					var str6 = "";
					var m = parseInt( $(this).parent().parent().attr("data-list-id") ) ;
					//console.log(m);
				var listconL = res.data[m].datainfo.length;
				//console.log(listconL)
					for( var k = 0;k< listconL;k++ ){
						var info2 = JSON.parse(res.data[m].datainfo[k].info);
						//console.log(info2);
						var str2 = "<tr role='row' class='listshowi fade-in-up' data-id='' data-user-id='"+res.data[m].userId+"'>"
							+"<td class='moon2 fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> "+info2.username+" </td>"
							+"<td class='moon2 fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> "+info2.stationsName+" </td>"
							+"<td class='moon2 fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> "+info2.basePay+"</td>"
							+"<td class='moon2 fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> "+info2.stationsPay+"</td>"
							+"<td class='moon2 fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> "+info2.performancePay+"</td>"
							+"<td class='moon2 fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> "+info2.fiveInsurance+"</td>"
							+"<td class='moon2 fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> "+info2.accumulationFund+"</td>"
//							+"<td class='moon2 fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> "+info2.other.奖励+"</td>"
//							+"<td class='moon2 fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> "+info2.other.扣款+"</td>"
							//
							
//							var textInputs = $(".table tr").eq(h+1).find('input.otherpay');
//							var ll = textInputs.length;
						var aaa = info2.other;
						var al = getJsonLength(aaa);//other length
						var othercon = [];
						for(var js2 in aaa){ 
							var bbb = js2+":"+aaa[js2] ;
							bbb = bbb.split(":");
							othercon.push( bbb )
						}
						//console.log(othercon)
						//动态tr
						var str5 = "";
						for( var ms = 0;ms<al;ms++ ){
							str5 += "<td class='moon2 fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> "+othercon[ms][1]+"</td>"
						}
						//console.log(str5)	
							
							//
						var str6 = "<td class='moon2 fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> "+info2.shouldMade+"</td>"
							+"<td class='moon2 fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> "+info2.individualIncomeTax+"</td>"
							+"<td class='moon2 fade-in-up' rowspan='1' colspan='1' style='width: 60px;'> "+info2.actualSalary+"</td>"
						+"</tr>"
						strr+=str2.concat(str5,str6)
					}
					str += str4.concat(strr);
					
					if($(this).html() == "查看"){
						$(this).parent().parent().after(str);
						$(this).html("收起");
						return false;
					}else if($(this).html() == "收起"){
						for(var n = 0;n<listconL+1;n++){
							$(this).parent().parent().nextAll().eq(0).remove();
						}
						$(this).html("查看");
						return false;
					}
					
					str2 = "";
				
				}
			}
			
		////success  end	
		}
		
	});

//获取json对象l
function getJsonLength(jsonData){
	var jsonLength = 0;
	for(var item in jsonData){
		jsonLength++;
	}
	return jsonLength; 
}	
	

})




