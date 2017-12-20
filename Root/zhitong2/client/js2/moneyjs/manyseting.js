
//init
//获取session
//var url = "http://forchild.zhitong.group";
var url = "http://106.15.137.203";
var sessioninfo = sessionStorage.getItem("teacher");
var data =  eval('(' + sessioninfo + ')');
var userId = data.userid;
var token = data.token;
var gartenId = data.gartenid;

//var token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDg1NzY5NjIsInVzZXJJZCI6MTAwNSwidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi572X5a-G5qynIn0.QcZzpG1xhaqRk3dHADS5acKSXZnG2VPntSipvc2mlgs";
//var sedtoken = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTAxMjg0NTEsInVzZXJJZCI6MTAwNSwicGFzc3dvcmQiOiJFMTBBREMzOTQ5QkE1OUFCQkU1NkUwNTdGMjBGODgzRSIsImdhcnRlbklkIjo1fQ.PW8HE9cKXDGmwSlltQmvgZlPFYm9JLPUa52aCEIYyMo";
//var gartenId = 5;

//init

var str1 = "<tr role='row' my_idx='1' class='msetitem'>"
	        	+"<td class='' rowspan='1' colspan='3' style='width: 60px;height:30px'>基本工资</td>"
	        	+"<td class='' rowspan='1' colspan='3' style='width: 60px;height:30px'>"
	        	+"</td>"
	       	+"</tr>"
	        +"<tr role='row' my_idx='2' class='msetitem'>"
	        	+"<td class='' rowspan='1' colspan='3' style='width: 60px;height:30px'>岗位工资</td>"
	        	+"<td class='' rowspan='1' colspan='3' style='width: 60px;height:30px'>"
	        	+"</td>"
	        +"</tr>"
	        +"<tr role='row' my_idx='3' class='msetitem'>"
	        	+"<td class='' rowspan='1' colspan='3' style='width: 60px;height:30px'>绩效工资</td>"
	        	+"<td class='' rowspan='1' colspan='3' style='width: 60px;height:30px'>"
	        	+"</td>"
	        +"</tr>"
	        +"<tr role='row' my_idx='4' class='msetitem'>"
	        	+"<td class='' rowspan='1' colspan='3' style='width: 60px;height:30px'>五险</td>"
	        	+"<td class='' rowspan='1' colspan='3' style='width: 60px;height:30px'>"
	        	+"</td>"
	        +"</tr>"
	        +"<tr role='row' my_idx='5' class='msetitem'>"
	        	+"<td class='' rowspan='1' colspan='3' style='width: 60px;height:30px'>公积金</td>"
	        	+"<td class='' rowspan='1' colspan='3' style='width: 60px;height:30px'>"
	        	+"</td>"
	        +"</tr>"

//去除第六个上移，最后一个下移按钮
function detasix(){
	//全部显示
	var detasixL = $("#msetcon tr").length;
	for ( var dl = 0; dl<detasixL;dl++) {
		$("#msetcon tr").eq(dl).find("td:nth-child(2)").find("a:nth-child(1)").siblings().show();
		$("#msetcon tr:last-child").find("td:nth-child(2)").find("a").show();
	}
	//隐藏
	$("#msetcon tr").eq(5).find("td:nth-child(2)").find("a:nth-child(1)").hide();
	$("#msetcon tr:last-child").find("td:nth-child(2)").find("a:nth-child(2)").hide();
	
}

$.ajax({
	type:"get",
	url:""+url+"/meritpay/salaryConfig/get/"+gartenId,
	async:false,
	beforeSend: function(request) {
 		request.setRequestHeader("User-Token",token);
   		var sedtoken = window.sessionStorage.getItem("sedtoken");
		//sedtoken = sedtoken.replace(/^\"|\"$/g,'');
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
    //  "+",
	success:function(res){
		console.log(res);
		var info = res.data[0].configInfo;
		info = info.replace(/(\"\+\"\,)|(\"\-\"\,)/g,'');
		info = info.replace(/(\"基本工资\"\,\"岗位工资\"\,\"绩效工资\"\,\"五险\"\,\"公积金\"\,)/g,'')
		info = JSON.parse(info);
		var str2 = "";
		
		for( var i = 0;i<info.length;i++ ){
			str2+="<tr role='row' my_idx='6' class='msetitem'>"
                	+"<td class='' rowspan='1' colspan='3' style='width: 60px;height:30px'>"+info[i]+"</td>"
                	+"<td class='' rowspan='1' colspan='3' style='width: 60px;height:30px'>"
                		+"<a class='beup margin-left-10'> 上移 </a>"
                		+"<a class='bedown margin-left-10'> 下移 </a>"
                		+"<a class='mmbj margin-left-10'> 编辑 </a>"
        				+"<a class='font-red margin-left-10 mmdete'>删除</a>"
                	+"</td>"
               	+"</tr>"
		}
		
		var str = str1.concat(str2);
		$("#msetcon").html(str);
		
		//第六行干掉上移最后干掉下移
		detasix();
	}
});


//
$("#addrow").click(function(){
	$("#setmood")[0].style.display = "block";
})

$("#setmood .moodbox span").click(function(){
	$("#setmood")[0].style.display = "none";
})

$("#setbjmood .moodbox span").click(function(){
	$("#setbjmood")[0].style.display = "none";
})


//底部
btomget();
//添加
$("#setbtn").click(function(){
	
	var str = "";
	str +="<tr role='row' my_idx='"+($(".msetcon tr").length+1)+"'class='msetitem'>"
	        	+"<td class='' rowspan='1' colspan='3' style='width: 60px;height:30px'>"+$("#msetadd").val()+"</td>"
	        	+"<td class='' rowspan='1' colspan='3' style='width: 60px;height:30px'>"
	        		+"<a class='beup margin-left-10'> 上移 </a>"
					+"<a class='bedown margin-left-10'> 下移 </a>"
	        		+"<a class='mmbj margin-left-10'> 编辑 </a>"
					+"<a class='font-red margin-left-10 mmdete'>删除</a>"
	        	+"</td>"
	        +"</tr>"
	
	$(".msetcon").append(str);
	
	var addstr = "";
	
	addstr+="<select name=''>"
    			+"<option value='+'>+</option>"
    			+"<option value='-'>-</option>"
    		+"</select>"
    		+"<span>"+$("#msetadd").val()+"</span>";
    		
    $(".moneysum").find("p:first-child").append(addstr);
	
	$("#setmood")[0].style.display = "none";
	
	//第六行干掉上移最后干掉下移
	detasix();
})

//删除
//var mmdete = $(".mmdete");
//for( var i = 0; i<mmdete.index(); i++ ){	
	$(".msetcon").on("click",".mmdete",function(){
		if (confirm("删除无法恢复，确认删除？")) {
			$(this).parent().parent().remove();
			//第六行干掉上移最后干掉下移
			detasix();
			
			btomget();
       	}
	})
//}

//编辑

	$(".msetcon").on("click",".mmbj",function(){
		$("#setbjmood").show();
		var msetindex = $(this).parent().parent().attr("my_idx"); 
		
		var that = $(this);
		setmbtn(that,msetindex);
		
	})
	
	function setmbtn(that,msetindex){
		$("#setbjbtn").click(function(){
			that.parent().parent().find("td:first-child")[0].innerHTML = $("#msetbjV").val();
			
			$("#setbjmood").hide();
			//第六行干掉上移最后干掉下移
			detasix();
			///////////////////////////对应修改
			btomget();
		})
	}



//底部


function btomget(){
	
	var bottomhtml = "";
	bottomhtml+="<span>"+$('.msetcon tr td:first-child')[0].innerHTML+"</span>"
	        		+"<select name=''>"
	        			+"<option value='+'>+</option>"
	        		+"</select>"
	        	+"<span>"+$('.msetcon tr td:first-child')[1].innerHTML+"</span>"
	        		+"<select name=''>"
	        			+"<option value='+'>+</option>"
	        		+"</select>"
	        	+"<span>"+$('.msetcon tr td:first-child')[2].innerHTML+"</span>"
	        		+"<select name=''>"
	        			+"<option value='+'>+</option>"
	        		+"</select>"
	        	+"<span>"+$('.msetcon tr td:first-child')[3].innerHTML+"</span>"
	        		+"<select name=''>"
	        			+"<option value='-'>-</option>"
	        		+"</select>"
	        	+"<span>"+$('.msetcon tr td:first-child')[4].innerHTML+"</span>"
	        		+"<select name=''>"
	        			+"<option value='-'>-</option>"
	        			+"<option value='+'>+</option>"
	        		+"</select>"
	
	var botml = $(".msetcon tr").length;
	
	if( botml <=0){
		return false;
	}
	
	for ( var i = 5; i < botml-1 ; i++) {
		bottomhtml+="<span>"+$('.msetcon tr td:first-child')[i].innerHTML+"</span>"
	        		+"<select name=''>"
	        			+"<option value='-'>-</option>"
	        			+"<option value='+'>+</option>"
	        		+"</select>"
	}
	bottomhtml = bottomhtml +"<span>"+$('.msetcon tr:last-child td:first-child')[0].innerHTML+"</span>";
	$(".moneysum p:nth-child(1)").html(bottomhtml)
}




//保存
$("#msetbtn").click(function(){
	var str = "";
	//str+=
	var l = $(".moneysum").find("span").length;
	//console.log(l)
	for ( var i = 0; i<l-1 ; i++ ) {
		str+=$(".moneysum").find("span")[i].innerHTML+","+$(".moneysum").find("select option:checked")[i].innerHTML+",";
	}
	str = str+$(".moneysum").find("span:last-child")[0].innerHTML;
	console.log(str);
	
	var arr = str.split(",");
	console.log(arr);
	var mdata ={
		  "config": arr,
		  "gartenId": gartenId,
		  "rosterId": 3
		}
	console.log(mdata.config);
	mdata = JSON.stringify(mdata);
	console.log(mdata)
	
	//提交
	var purl = ""+url+"/meritpay/salaryConfig/save";
	
	postdata();
	function postdata(){
		
		$.ajax({
			type:"post",
			url:purl,
			async:true,
			beforeSend: function(request) {
		 		request.setRequestHeader("User-Token",token);
		 		var sedtoken = window.sessionStorage.getItem("sedtoken");
				sedtoken = sedtoken.replace(/^\"|\"$/g,'');
		 		console.log(sedtoken);
		 		request.setRequestHeader("Second-Token",sedtoken);
		    },
			data:mdata,
			contentType:"application/json",
			success:function(res){
				//console.log(purl)
				console.log(res);
				if(res.result == -3){
					purl = ""+url+"/meritpay/salaryConfig/update";
					postdata();
					console.log("update");
					Common.alertSuccess("修改成功");
					detasix();
					return false; 
				}
				Common.alertSuccess("保存成功");
				
				detasix();
			},
			error:function(){
			
			}
		});
			
	}
	
	
})



detasix();
//上移下移
//var beup = $(".beup");
$(".msetcon ").on("click",".beup",function(){
	//alert()
	//console.log($(this).parent().parent())
	var $tr = $(this).parent().parent();
	if($tr.length!=0){
		$tr.fadeOut().fadeIn();
		$tr.prev().before($tr);
		btomget();
	}
	
	detasix();
})

$(".msetcon ").on("click",".bedown",function(){
		var bedown = $(".bedown");
		var downl = bedown.length;
		var $tr = $(this).parent().parent();
		console.log(downl)
	if($tr.index()!= downl-1){
		$tr.fadeOut().fadeIn();
		$tr.next().after($tr);
		btomget();
	}
	
	detasix();
})








