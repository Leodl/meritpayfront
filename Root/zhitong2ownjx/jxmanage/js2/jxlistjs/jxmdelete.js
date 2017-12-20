
$(document).ready(function(){
	
//var url = "http://admin.zhitong.group";
//var url = "http://forchild.zhitong.group";
var url = "http://106.15.137.203";
var sessioninfo = sessionStorage.getItem("user");
var data =  eval('(' + sessioninfo + ')');
//var userId = data.userid;
var token = data.token;

getjxm();
function getjxm(){
	$.ajax({
		type:"get",
		url:""+url+"/meritpay/individual/get",
		async:false,
		beforeSend: function(request) {
			console.log(token);
	 		request.setRequestHeader("User-Token",token);
	    },
		success:function(res){
			console.log(res);
			var dataL = res.data.length;
			//console.log(dataL);
			var jxstr = "";
			for ( var i = 0; i< dataL;i++) {
				jxstr+="<tr role='row' data-mdete-id='"+res.data[i].id+"'>"
	                    	+"<td class='' rowspan='1' colspan='3' style='width: 200px;height:30px'>"
	                    		+"<strong>(</strong>"
	                    		+"<input class='inpu1' type='text' name='' id='' value='"+res.data[i].startNu+"' />&nbsp;&nbsp;,&nbsp;&nbsp;"
	                    		+"<input class='inpu1' type='text' name='' id='' value='"+res.data[i].endNu+"' />"
	                    		+"<strong>]</strong>"
	                    	+"</td>"
	                    	+"<td class='' rowspan='1' colspan='3' style='width: 200px;height:30px'>"
	                    		+"<input class='inpu2' type='text' name='' id='' value='"+res.data[i].taxRate*100+"%' />"
	                    	+"</td>"
	                    	+"<td class='' rowspan='1' colspan='3' style='width: 200px;height:30px'> "
	                    		+"<input class='inpu2' type='number' min='0' max='80000' name='' id='' value='"+res.data[i].deduction+"' />"
	                    	+"</td>"
	                   +"</tr>"
			}
			
			$("#jxmdelecon").html(jxstr);
			
			if( $("#jxmdelecon tr:last-child").find("input:nth-child(3)").val() == -1 || $("#jxmdelecon tr:last-child").find("input:nth-child(3)").val() == NaN ){
				$("#jxmdelecon tr:last-child").find("input:nth-child(3)").val(' '); 
			}
			//console.log( $("#jxmdelecon tr:last-child").find("input:nth-child(2)").val()  )
			
			//保存
			taxcli();
			
		}
	});
}


	//console.log( toDecimal(10) )
	
	//taxcli();
	function taxcli(){
		$("#taxbtn2").click(function(){
			
			var kl = $("#jxmdelecon tr").length;
			for( var k = 0;k<kl;k++ ){
				
				try{
					var kcon = parseFloat( $("#jxmdelecon tr").eq(k).find("input")[2].value );
				}catch(e){}
				
				if( kcon>100 ){
					Common.alertError("税率不能超过100%");
					return false;
				}
			}
			
			for( var m = 0;m<kl;m++ ){
				try{
					var mcon = parseFloat( $("#jxmdelecon tr").eq(m).find("input")[3].value );
					var endcon = parseFloat( $("#jxmdelecon tr").eq(m).find("input")[1].value );
					//console.log(mcon,endcon);
				}catch(e){}
				
				if( mcon >= endcon){
					Common.alertError("速算扣除数不合理");
					return false;
				}
			}
			
			taxcon=[
				  {
				    "deduction": parseFloat( $("#jxmdelecon tr:nth-child(1)").find("input")[3].value ),
				    "endNu": parseFloat( $("#jxmdelecon tr:nth-child(1)").find("input")[1].value ),
				    "level": 0,
				    "origin":parseFloat( $("#detestart").val() ),
				    "startNu": parseFloat( $("#jxmdelecon tr:nth-child(1)").find("input")[0].value ),
				    "taxRate": parseFloat( $("#jxmdelecon tr:nth-child(1)").find("input")[2].value )/100
				  },{
				    "deduction": parseFloat( $("#jxmdelecon tr:nth-child(2)").find("input")[3].value ),
				    "endNu": parseFloat( $("#jxmdelecon tr:nth-child(2)").find("input")[1].value ),
				    "level": 1,
				    "origin":parseFloat( $("#detestart").val() ),
				    "startNu": parseFloat( $("#jxmdelecon tr:nth-child(2)").find("input")[0].value ),
				    "taxRate": parseFloat( $("#jxmdelecon tr:nth-child(2)").find("input")[2].value )/100
				  },{
				    "deduction": parseFloat( $("#jxmdelecon tr:nth-child(3)").find("input")[3].value ),
				    "endNu": parseFloat( $("#jxmdelecon tr:nth-child(3)").find("input")[1].value ),
				    "level": 2,
				    "origin":parseFloat( $("#detestart").val() ),
				    "startNu": parseFloat( $("#jxmdelecon tr:nth-child(3)").find("input")[0].value ),
				    "taxRate": parseFloat( $("#jxmdelecon tr:nth-child(3)").find("input")[2].value )/100
				  },{
				    "deduction": parseFloat( $("#jxmdelecon tr:nth-child(4)").find("input")[3].value ),
				    "endNu": parseFloat( $("#jxmdelecon tr:nth-child(4)").find("input")[1].value ),
				    "level": 3,
				    "origin":parseFloat( $("#detestart").val() ),
				    "startNu": parseFloat( $("#jxmdelecon tr:nth-child(4)").find("input")[0].value ),
				    "taxRate": parseFloat( $("#jxmdelecon tr:nth-child(4)").find("input")[2].value )/100
				  },{
				    "deduction": parseFloat( $("#jxmdelecon tr:nth-child(5)").find("input")[3].value ),
				    "endNu": parseFloat( $("#jxmdelecon tr:nth-child(5)").find("input")[1].value ),
				    "level": 4,
				    "origin":parseFloat( $("#detestart").val() ),
				    "startNu": parseFloat( $("#jxmdelecon tr:nth-child(5)").find("input")[0].value ),
				    "taxRate": parseFloat( $("#jxmdelecon tr:nth-child(5)").find("input")[2].value )/100
				  },{
				   "deduction": parseFloat( $("#jxmdelecon tr:nth-child(6)").find("input")[3].value ),
				    "endNu": parseFloat( $("#jxmdelecon tr:nth-child(6)").find("input")[1].value ),
				    "level": 5,
				    "origin":parseFloat( $("#detestart").val() ),
				    "startNu": parseFloat( $("#jxmdelecon tr:nth-child(6)").find("input")[0].value ),
				    "taxRate": parseFloat( $("#jxmdelecon tr:nth-child(6)").find("input")[2].value )/100
				  },{
				    "deduction": parseFloat( $("#jxmdelecon tr:nth-child(7)").find("input")[3].value ),
				    "endNu": parseFloat( -1 ),//$("#jxmdelecon tr:nth-child(7)").find("input")[1].value
				    "level": 6,
				    "origin":parseFloat( $("#detestart").val() ),
				    "startNu": parseFloat( $("#jxmdelecon tr:nth-child(7)").find("input")[0].value ),
				    "taxRate": parseFloat( $("#jxmdelecon tr:nth-child(7)").find("input")[2].value )/100
				  }
				  
				];
			
			var deleconL = $("#jxmdelecon tr").length;
			for( var k = deleconL-1;k>0;k-- ){
				if(  parseInt($("#jxmdelecon tr").eq(k).find("input")[0].value) != parseInt($("#jxmdelecon tr").eq(k-1).find("input")[1].value) ){
					alert("起始值应该等于上级的结束值");
					return false;
				}
			}
			
			taxcon = JSON.stringify(taxcon);
			console.log(taxcon);
			$.ajax({
				type:"post",
				url:""+url+"/meritpay/individual/update",
				async:false,
				beforeSend: function(request) {
					console.log(token);
			 		request.setRequestHeader("User-Token",token);
			    },
				contentType:"application/json",
				data:taxcon,
				success:function(res){
					console.log(res)
					if(res.result == -1){
						alert("起始值比结束值大");
						return false;
					}
					if(res.result == 0 ){
						Common.alertSuccess("保存成功");
						return false;
					}
				}
			});
		})
	}

////	
})







































