//init
//获取session
//var url = "http://forchild.zhitong.group";
var url = "http://106.15.137.203";
var sessioninfo = sessionStorage.getItem("teacher");
var data =  eval('(' + sessioninfo + ')');
var userId = data.userid;
var token = data.token;

var gardenid = data.gartenid;

//var token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDg1NzY5NjIsInVzZXJJZCI6MTAwNSwidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi572X5a-G5qynIn0.QcZzpG1xhaqRk3dHADS5acKSXZnG2VPntSipvc2mlgs";
//var gardenid = 5;
var listid = location.search;
var thisid =parseInt( GetQueryString("id") );
console.log( thisid ) ;

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
		sedtoken = sedtoken.replace(/^\"|\"$/g,'');
   		console.log(sedtoken);
 		request.setRequestHeader("Second-Token",sedtoken);
    },
	data:showdata,
	contentType:"application/json",
	success:function(res){
		console.log(res);
		var ttL = res.data[thisid].tables.length;
		console.log(res.data[thisid].tables[1]);
		
		var mdetail = "";
		for( var k = 0;k<ttL;k++ ){
			var aaa = res.data[thisid].tables[k].other;
			var al = getJsonLength(aaa);//other length
			///aaa = JSON.parse(aaa); 
			var othercon = [];
			for(var js2 in aaa){ 
				//console.log( js2+"="+aaa[js2]);
				var bbb = js2+":"+aaa[js2] ;
				bbb = bbb.split(":");
				othercon.push( bbb )
			}
			//console.log(othercon);
			//console.log(ttL)
			
			//theadcon
			var liheadcon1 = "<tr role='row'>"
				+"<th class='' rowspan='1' colspan='1' style='width: 60px;'> 姓名 </th>"
				+"<th class='' rowspan='1' colspan='1' style='width: 60px;'> 岗位 </th>"
				+"<th class='' rowspan='1' colspan='1' style='width: 60px;'> 基本工资</th>"
				+"<th class='' rowspan='1' colspan='1' style='width: 60px;'> 岗位工资</th>"
				+"<th class='' rowspan='1' colspan='1' style='width: 60px;'> 绩效工资</th>"
				+"<th class='' rowspan='1' colspan='1' style='width: 60px;'> 五险</th>"
				+"<th class='' rowspan='1' colspan='1' style='width: 60px;'> 公积金</th>"
				+"<th class='' rowspan='1' colspan='1' style='width: 60px;'> 奖励</th>"
			var liheadcon2 = "";
			for ( var c = 0;c < al; c++) {
				liheadcon2+= "<th class='' rowspan='1' colspan='1' style='width: 60px;'> "+othercon[c][0]+"</th>"
			}	
			var liheadcon3 ="<th class=' relabox' rowspan='1' colspan='1' style='width: 60px;'> 个税"
					+"<div id='circletip' class='circletip'>?</div>"//<!--个税弹窗-->
					+"<div id='ctipbox' class='ctipbox'>"
						+"<span id='ctipdele' class='ctipdele'>X</span>"
						//<!--...-->
					+"</div>"
				+"</th>"
				+"<th class='' rowspan='1' colspan='1' style='width: 60px;'> 实发</th>"
			+"</tr>"
			var liheadcon = liheadcon1.concat( liheadcon2,liheadcon3 );
			$("#mlisthead").html( liheadcon );
			
			
			var mdetail1 = "";
			var mdetail2 = "";
			
			mdetail1="<tr role='row' class='mdetailcon' data-id='"+res.data[thisid].tables[k].id+"' data-user-id='"+res.data[thisid].tables[k].userId+"'>"
				+"<td class='username' rowspan='1' colspan='1' style='width: 60px;'>"+res.data[thisid].tables[k].username+"</td>"
				+"<td class='workname' rowspan='1' colspan='1' style='width: 60px;'> "+res.data[thisid].tables[k].stationsName+" </td>"
				+"<td class='basem' rowspan='1' colspan='1' style='width: 60px;'> "+res.data[thisid].tables[k].basePay+"</td>"
				+"<td class='workm' rowspan='1' colspan='1' style='width: 60px;'> "+res.data[thisid].tables[k].stationsPay+"</td>"
				+"<td class='jxm' rowspan='1' colspan='1' style='width: 60px;'> "+res.data[thisid].tables[k].performancePay+"</td>"
				+"<td class='fivem' rowspan='1' colspan='1' style='width: 60px;'> "+res.data[thisid].tables[k].fiveInsurance+"</td>"
				+"<td class='homem' rowspan='1' colspan='1' style='width: 60px;'> "+res.data[thisid].tables[k].accumulationFund+"</td>"
			
			var mdetail2 = "";
			for( var sm = 0;sm< al;sm++){
				mdetail2 +="<td class='jlm' rowspan='1' colspan='1' style='width: 60px;'>"
					+"<input class='otherpay' type='number' name='"+othercon[sm][0]+"' id='' value='"+othercon[sm][1]+"' placeholder='0' />"
				+"</td>"
			}
			
				mdetail3="<td class='falseget' rowspan='1' colspan='1' style='width: 60px;'> "+res.data[thisid].tables[k].shouldMade+"</td>"
				+"<td class='shuicon' rowspan='1' colspan='1' style='width: 60px;'> "+res.data[thisid].tables[k].individualIncomeTax+"</td>"
				+"<td class='trueget' rowspan='1' colspan='1' style='width: 60px;'> "+res.data[thisid].tables[k].actualSalary+"</td>"
				+"</tr>";
				
			var mdetail4 = mdetail1.concat( mdetail2,mdetail3 );
			mdetail +=mdetail4
		}
		$("#mlistB").html(mdetail);
		
		//点击保存
		var otherL = $(".table").find(".otherpay").length/4;
		console.log(otherL);//table-center
		$("#mlistsave").click(function(){
			
			var decon = [];
			for ( var m = 0;m<ttL;m++ ) {
				var obj = {};
				obj.otherPayInfo = {};
				
				var textInputs = $(".table tr").eq(m+1).find('input.otherpay');
				var ll = textInputs.length;
				var name = null;
				for ( var n = 0; n < ll; n++) {  
					name = $(textInputs[n]).attr("name");
					obj.otherPayInfo[name]  = parseFloat( $(".table tr").eq(m+1).find(".otherpay").eq(n).val() ) ;
				}
				//console.log( obj.otherPayInfo )
				
				obj.tableId = parseFloat( $(".table tr")[m+1].getAttribute("data-id") );
				obj.userId = parseFloat( $(".table tr")[m+1].getAttribute("data-user-id") );
				decon.push(obj);
			}
			
			decon = JSON.stringify(decon);
			console.log(decon);
			
			$.ajax({
				type:"post",
				url:""+url+"/meritpay/salaryOther/update",
				async:true,
				beforeSend: function(request) {
			 		request.setRequestHeader("User-Token",token);
			   		var sedtoken = window.sessionStorage.getItem("sedtoken");
					sedtoken = sedtoken.replace(/^\"|\"$/g,'');
			   		console.log(sedtoken);
			 		request.setRequestHeader("Second-Token",sedtoken);
			    },
				contentType:"application/json",
				data:decon,
				success:function(res){
					$("#savemood").css({"display":"none"});
					//console.log(res);
					Common.alertSuccess("保存成功");
				}
			});
		})
		//点击生成工资条 确认  判断余额  #ccc  5sd
		var jxzero = 0;
		for ( var h = 0;h<ttL;h++ ) {
			jxzero += parseFloat( $(".table tr").eq(h+1).find(".jxm").html() );
		}
		
		if( jxzero == 0 ){
			$("#listtophone").css({"background":"#ccc","disabled":"disabled"});
			//$("#listtophone").click() == false;
			return false;
		}
		var allactualSalary = 0;
		$("#listtophone").click(function(){
			
			if( jxzero == 0 ){
				return false;
			}
			
			$("#savemood").css({"display":"block"});
			
			var phonecon = [];
			for ( var h = 0;h<ttL;h++ ) {
				var ccc = parseFloat( $(".table tr").eq(h+1).find(".trueget").html() );
				allactualSalary+=ccc;
			}
			
			for ( var h = 0;h<ttL;h++ ) {
				jxzero += parseFloat( $(".table tr").eq(h+1).find(".jxm").html() );
				
				var username = $(".table tr").eq(h+1).find(".username").html();
				var stationsName = $(".table tr").eq(h+1).find(".workname").html();
				var basePay = $(".table tr").eq(h+1).find(".basem").html();
				var stationsPay = $(".table tr").eq(h+1).find(".workm").html();
				var performancePay = $(".table tr").eq(h+1).find(".jxm").html();
				var fiveInsurance = $(".table tr").eq(h+1).find(".fivem").html();
				var accumulationFund = $(".table tr").eq(h+1).find(".homem").html();
				var shouldMade = $(".table tr").eq(h+1).find(".falseget").html();
				var individualIncomeTax = $(".table tr").eq(h+1).find(".shuicon").html();
				var actualSalary = $(".table tr").eq(h+1).find(".trueget").html();
				
				var obj2 = {};
				obj2.gartenId = parseFloat( gardenid );
				obj2.userId = parseFloat( $(".table tr")[h+1].getAttribute("data-user-id") );
				obj2.userName = $(".table tr")[h+1].firstChild.innerHTML;
				obj2.total = allactualSalary;

				obj2.createDate = "2017-09";
				
				obj2.info = {};
				obj2.info.username = username;
				
				obj2.info.allactualSalary = allactualSalary;
				
				obj2.info.stationsName = stationsName;
				obj2.info.basePay = basePay;
				obj2.info.stationsPay = stationsPay;
				obj2.info.performancePay = performancePay;
				obj2.info.fiveInsurance = fiveInsurance;
				obj2.info.accumulationFund = accumulationFund;
				obj2.info.shouldMade = shouldMade;
				obj2.info.individualIncomeTax = individualIncomeTax;
				obj2.info.actualSalary = actualSalary;
				obj2.info.other = {};
				
				var textInputs = $(".table tr").eq(h+1).find('input.otherpay');
				var ll = textInputs.length;
				var name = null;
				for ( var n = 0; n < ll; n++) {  
					name = $(textInputs[n]).attr("name");
					obj2.info.other[name]  = parseFloat( $(".table tr").eq(h+1).find(".otherpay").eq(n).val() ) ;
				}
				
				phonecon.push(obj2);
				//总工资清除
			}
			console.log(phonecon);
			phonecon = JSON.stringify(phonecon);
			console.log(phonecon);
			
			$.ajax({
				type:"post",
				url:""+url+"/meritpay/salaryTable/createPayRoll",
				async:true,
				beforeSend: function(request) {
			 		request.setRequestHeader("User-Token",token);
			   		var sedtoken = window.sessionStorage.getItem("sedtoken");
					sedtoken = sedtoken.replace(/^\"|\"$/g,'');
			   		console.log(sedtoken);
			 		request.setRequestHeader("Second-Token",sedtoken);
			    },
				data:phonecon,
				contentType:"application/json",
				success:function(res){
					console.log(res)
				}
			});
			
		})
		
	//success end
	}
})

//获取地址栏参数
function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null){
		return unescape(r[2]);
	}
	return null;
}
//
var listl = $(".sallcon tr td:first-child").length;
$("#allman")[0].innerHTML = listl;
///返回上次

$("#backlist").click(function(){
	location.href ="moneyshow.html";
})

var allmoney = null;
for( var manL = 0;manL< listl ;manL++){
	allmoney += parseFloat( $(".sallcon tr td:last-child").eq(manL)[0].innerHTML );
}
$("#allrmb").html(allmoney.toFixed(2));
//

$("#circletip").click(function(){
	$("#ctipbox").css({"display":"block"});
})

$("#ctipdele").click(function(){
	$(this).parent().hide();
})

//true getdolar
$(document).ready(function(){
////loadstart

////问号弹窗get
$.ajax({
	type:"get",
	url:""+url+"/meritpay/individual/get",
	async:true,
	beforeSend: function(request) {
 		request.setRequestHeader("User-Token",token);
   		var sedtoken = window.sessionStorage.getItem("sedtoken");
		sedtoken = sedtoken.replace(/^\"|\"$/g,'');
   		console.log(sedtoken);
 		request.setRequestHeader("Second-Token",sedtoken);
    },
	success:function(res){
		//console.log(res)
		var  ctipboxcon="";
		ctipboxcon+="<p>IF(应税-3500<0,0,</p>"
			+"<p>IF(应税-3500<"+res.data[0].endNu+",( 应税-3500)*"+res.data[0].taxRate*100+"%,</p>"
			+"<p>IF(应税-3500<"+res.data[1].endNu+",( 应税-3500)*"+res.data[1].taxRate*100+"%-"+res.data[1].deduction+",</p>"
			+"<p>IF(应税-3500<"+res.data[2].endNu+",( 应税-3500)*"+res.data[2].taxRate*100+"%-"+res.data[2].deduction+",</p>"
			+"<p>IF(应税-3500<"+res.data[3].endNu+",( 应税-3500)*"+res.data[3].taxRate*100+"%-"+res.data[3].deduction+",</p>"
			+"<p>IF(应税-3500<"+res.data[4].endNu+",( 应税-3500)*"+res.data[4].taxRate*100+"%-"+res.data[4].deduction+",</p>"
			+"<p>IF(应税-3500<"+res.data[5].endNu+",( 应税-3500)*"+res.data[5].taxRate*100+"%-"+res.data[5].deduction+",</p>"
			+"<p>IF(应税-3500>"+res.data[6].startNu+",( 应税-3500)*"+res.data[6].taxRate*100+"%-"+res.data[6].deduction+"</p>";
    	
    	$("#ctipbox").append(ctipboxcon);
		
		//个税
function persm(pnum,basenum,applyshui,quickdele,that){
	//个税=应纳税所得额(应发-五险一金-起征点)×适用税率-速算扣除数
	if( pnum-basenum<=0){
		that.parent().parent().find(".shuicon")[0].innerHTML = parseFloat( (pnum - basenum)*0-0 ).toFixed(2);
	}else if(pnum-basenum<=res.data[0].endNu &&  pnum-basenum>res.data[0].startNu){
		that.parent().parent().find(".shuicon")[0].innerHTML = parseFloat( (pnum - basenum)*res.data[0].taxRate-res.data[0].deduction ).toFixed(2);
	}else if(pnum-basenum<=res.data[1].endNu &&  pnum-basenum>res.data[1].startNu){
		that.parent().parent().find(".shuicon")[0].innerHTML = parseFloat( (pnum - basenum)*res.data[1].taxRate-res.data[1].deduction ).toFixed(2);
	}else if(pnum-basenum<=res.data[2].endNu &&  pnum-basenum>res.data[2].startNu){
		that.parent().parent().find(".shuicon")[0].innerHTML = parseFloat( (pnum - basenum)*res.data[2].taxRate-res.data[2].deduction ).toFixed(2);
	}else if(pnum-basenum<=res.data[3].endNu &&  pnum-basenum>res.data[3].startNu){
		that.parent().parent().find(".shuicon")[0].innerHTML = parseFloat( (pnum - basenum)*res.data[3].taxRate-res.data[3].deduction ).toFixed(2);
	}else if(pnum-basenum<=res.data[4].endNu &&  pnum-basenum>res.data[4].startNu){
		that.parent().parent().find(".shuicon")[0].innerHTML = parseFloat( (pnum - basenum)*res.data[4].taxRate-res.data[4].deduction ).toFixed(2);
	}else if(pnum-basenum<=res.data[5].endNu &&  pnum-basenum>res.data[5].startNu){
		that.parent().parent().find(".shuicon")[0].innerHTML = parseFloat( (pnum - basenum)*res.data[5].taxRate-res.data[5].deduction ).toFixed(2);
	}else if(pnum-basenum>=res.data[6].startNu){
		that.parent().parent().find(".shuicon")[0].innerHTML = parseFloat( (pnum - basenum)*res.data[6].taxRate-res.data[6].deduction ).toFixed(2);
	}
	
}
/////
	}
	
});

/////生成工资条弹窗判断
if( $("#chengNu")[0].innerHTML >= $("#xuNu")[0].innerHTML ){
	$("#tiptip").css({"display":"none"})
}

///点击生成   判断 ->  #ccc

$("#queren").click(function(){
	$("#savemood").css({"display":"none"})
})

$("#qrcancel").click(function(){
	$("#savemood").css({"display":"none"})
})

///loadend	
})

//应发算法
function getfalsem(that){
	that.parent().parent().find(".falseget")[0].innerHTML =
	Number( that.parent().parent().find(".basem")[0].innerHTML )
	+ Number( that.parent().parent().find(".workm")[0].innerHTML )
	+ Number( that.parent().parent().find(".jxm")[0].innerHTML )
	- Number( that.parent().parent().find(".fivem")[0].innerHTML )
	- Number( that.parent().parent().find(".homem")[0].innerHTML )
	+ Number( that.parent().parent().find(".jlm input")[0].value )
	- Number( that.parent().parent().find(".detem input")[0].value );
}

//保存animate
$("#mlistsave").click(function(){
	$(".saveanimate").css({"display":"block"}).animate({"opacity":"1"},1000,function(){
		$(".saveanimate").animate({"opacity":"0"},1000,function(){
			$(".saveanimate").css({"display":"none"})
		})
	});
})

//获取json对象l
function getJsonLength(jsonData){
	var jsonLength = 0;
	for(var item in jsonData){
		jsonLength++; 
	} 
	return jsonLength; 
}


