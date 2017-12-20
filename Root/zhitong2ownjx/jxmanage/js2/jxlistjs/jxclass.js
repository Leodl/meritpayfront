


$(document).ready(function(){
	//\
//var url = "http://forchild.zhitong.group";
var url = "http://106.15.137.203";
//var sessioninfo = sessionStorage.getItem("user");
//var data =  eval('(' + sessioninfo + ')');
//var userId = data.userid;
//var token = data.token;
//console.log(token);
//console.log(userId);
//var gartenId = data.gartenid;
//	var token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDg1NzY5NjIsInVzZXJJZCI6MTAwNSwidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi572X5a-G5qynIn0.QcZzpG1xhaqRk3dHADS5acKSXZnG2VPntSipvc2mlgs";
	//显示隐藏
	$("#addclassfy").click(function(){
		$("#classfybox").show();
		$("#bjcV").val() == "";
	})
	
	$("#classfydele").click(function(){
		$("#classfybox").hide();
	})
	
	$.ajax({
		type:"get",
		url:""+url+"/meritpay/factorType/get",
		async:false,
		success:function(res){
			console.log(res)
			var str = "";
			for( var i = 0;i<res.data.length ; i++ ){
			str +="<tr role='row' data-id='"+res.data[i].factorTypeId+"'>"
	            	+"<td class='' rowspan='1' colspan='3' style='width: 60px;height:30px'>"+res.data[i].typeName+"</td>"
	            	+"<td class='' rowspan='1' colspan='3' style='width: 60px;height:30px'>" 
	            		+"<a class='classbj margin-left-10'> 编辑 </a>"
	    				+"<a class='classfydele font-red margin-left-10'>删除</a>"
	            	+"</td>"
	           +"</tr>"
			}
			$("#classcon").html(str);
			
			classdelete();
			
			classbianj();
			
			/*点击添加*/
			$("#classtipbtn").click(function(){
				
				$("#addcV").val() == "";
				
				var l = $("#classcon tr").length;
				for( var i = 0;i<l;i++ ){
					
					var addVcon = $("#classcon tr td:nth-child(1)").eq(i).html();
					console.log(addVcon);
					
					if( $("#addcV").val() == addVcon ){
						
						Common.alertError("已有分类");
						
						//history.go(0)
						return false;
					}
				}
				
				console.log(l)
				if( $("#addcV").val() == '' ){
					Common.alertError("不能为空");
					return false;
				}
				
				var data = {
				  	"typeName": [
				    	$("#addcV").val()
				  	]
				};
				
				data = JSON.stringify(data);
				
				$.ajax({
					type:"post",
					url:""+url+"/meritpay/factorType/save",
					async:false,
					contentType:"application/json",
					data:data,
					success:function(res){
						$("#classfybox").hide();
						if(res.result == 0){
							Common.alertSuccess("操作成功");
							window.setTimeout("history.go(0)",1100);
						}else{
							Common.alertError(res.message);
						}
					}
				});
				
				var str = "";
				str +="<tr role='row'>"
					    	+"<td class='' rowspan='1' colspan='3' style='width: 60px;height:30px'>"+$("#addcV").val()+"</td>"
					    	+"<td class='' rowspan='1' colspan='3' style='width: 60px;height:30px'>"
					    		+"<a class='classbj margin-left-10'> 编辑 </a>"
								+"<a class='classfydele font-red margin-left-10'>删除</a>"
					    	+"</td>"
					    +"</tr>"
				
				$(".classcon").insertBefore(str);
				
				$("#classfybox").hide();
				
			})
			//add end
		}
	});
	
	
	
	/*删除*/
	function classdelete(){
		var classfydele = $(".classfydele");
		
		//console.log(classfydele.length);
		
		//for( var i = 0; i<classfydele.length; i++ ){	
			$("#classcon").on("click",".classfydele",function(){
				console.log( $(this).parent().parent().attr("data-id") );
				if (confirm("删除无法恢复，确认删除？")) {
				
					var deleid = $(this).parent().parent().attr("data-id"); 
					
					console.log(deleid);
	/////////////////////接口
					$.ajax({
						type:"get",
						url:""+url+"/meritpay/factorType/del/"+deleid,
						async:true,
						success:function(res){
							if(res.result == 0){
								Common.alertSuccess("操作成功");
							}else{
								Common.alertError(res.message);
							}
						}
					})
				
					$(this).parent().parent().remove();
				
		       	}else{
		       		
		       	}
			})
		//}
		
	}
	
	/*编辑修改*/
	function classbianj(){
		
		
		
		$("#classbjdele").click(function(){
			$("#classbjbox").hide();
		})
	
		//for( var i = 0; i<classfydele.length; i++ ){	
			$(".classcon").on("click",".classbj",function(){
				$("#classbjbox").show();
				var that = $(this)
				var bjcVcon = $(this).parent().parent().find("td:first-child").html();
				$("#bjcV").val(bjcVcon);
				console.log(bjcVcon);
				//
				$("#classbjbtn").click(function(){
					
					if( $("#bjcV").val() == '' ){
						Common.alertError("不能为空");
						return false;
					}
					
					that.parent().parent().find("td:first-child")[0].innerHTML = $("#bjcV").val();
					
					var classgai = {
					  "factoTypeId": parseInt( that.parent().parent().attr("data-id") ),
					  "typeName": $("#bjcV").val()
					};
						
					classgai = JSON.stringify(classgai);
					
					$.ajax({
						type:"PUT",
						url:""+url+"/meritpay/factorType/update",
						contentType:"application/json",
						data:classgai,
						success:function(res){
							console.log(res);
							if(res.result == 0){
								$("#classbjbox").hide();
								Common.alertSuccess("操作成功");
							}else{
								Common.alertError(res.message);
							}
						}
					})
					
				})
		
			})
		
		//}
		
	}
//	
})

