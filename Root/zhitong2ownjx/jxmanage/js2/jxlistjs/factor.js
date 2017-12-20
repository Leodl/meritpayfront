
//$(document).ready(function(){
//
//var url = "http://forchild.zhitong.group";
var url = "http://106.15.137.203";
//var sessioninfo = sessionStorage.getItem("user");
//var data =  eval('(' + sessioninfo + ')');
//console.log(data);
//var userId = data.userid;
//var token = data.token;
//console.log(token);
//console.log(userId);
//var gartenId = data.gartenid;
//var token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDg1NzY5NjIsInVzZXJJZCI6MTAwNSwidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi572X5a-G5qynIn0.QcZzpG1xhaqRk3dHADS5acKSXZnG2VPntSipvc2mlgs";

	
	
	$.ajax({
		type:"get",
		url:""+url+"/meritpay/factor/getByType/0",
		async:false,
		success:function(res){
			
			//点击添加弹窗
			$("#addclassfa").click(function(){
				$("#addfactbox").show();
				$("#factorV").val() == "";
			})
			
			$("#factdele").click(function(){
				$("#addfactbox").hide();
			})
			
			$("#bjfactdele").click(function(){
				$("#bjfactbox").hide();
			})
			
			//console.log(res);
			
			//var l = 0;
			var str = "";
			for( var j = 0;j<res.data.length;j++ ){
				//l += res.data[j].factors.length;
				for ( var i = 0;i< res.data[j].factors.length ;i++){
					
					str +="<tr role='row' class='faconitem' data-fa-id='"+res.data[j].factors[i].factorId+"' data-id='"+res.data[j].factors[i].factorTypeId+"'>"
			                	+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+res.data[j].factors[i].content+"</td>"
			                	+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+res.data[j].typeName+"</td>"
			                	+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>" 
			                		+"<a class='fabj margin-left-10'> 编辑 </a>"
			        				+"<a class='fadele font-red margin-left-10'>删除</a>"
			                	+"</td>"
			               +"</tr>";
			               
				}	
				$("#facon").html(str);
				
			}
			
			
				
			//类获取	
			$.ajax({
				type:"get",
				url:""+url+"/meritpay/factorType/get",
				async:false,
				success:function(res2){
					//console.log(res2)
					
					var fatyl = res2.data.length;
					var faclassVcon = "";
						for( var k = 0;k<fatyl;k++ ){
							
					        faclassVcon +="<option data-id='"+res2.data[k].factorTypeId+"' value='"+res2.data[k].typeName+"'>"+res2.data[k].typeName+"</option>"
					        //渲染第二列
					        
						}
					
					$("#factclassV").append(faclassVcon);
					//
					faclass(faclassVcon);
					//
					factordele();
					
					//
					addfactor();
				}
			});
			
			//tip
			bjfacclass();
			//classnone
			classnone()
		}
	});
	
	//分类none因子none
	function classnone(){
		var classL = $("#facon tr").length;
		for ( var j = 0;j<classL;j++ ) {
			//console.log( $("#facon tr").eq(j) );
			var classcon = $("#facon tr").eq(j).find("td:nth-child(2)").html();
			if( classcon == "undefined" ){
				$("#facon tr").eq(j).remove();
			}
		}
	}
	
	/*分类选项     tip */
	function faclass(fafafa){
		$("#classlist").append(fafafa);
	}
	
	/*删除*/
	function factordele(){
			$("#facon").on("click",".fadele",function(){
				if (confirm("无法恢复，确认删除？")) {
					
					$.ajax({
						type:"get",
						url:""+url+"/meritpay/factor/del/{factorId}?factorId="+$(this).parent().parent().attr("data-fa-id"),
						async:false,
						success:function(){
							Common.alertSuccess("删除成功")
							
						}
					});
					
					$(this).parent().parent().remove();
					
		       	}
			})
	}
	
	//编辑
	function bjfacclass(){
		
		var fabjL = $(".fabj").length;
		for( var k = 0;k<fabjL;k++ ){
			$(".fabj")[k].onclick = function(){
				//console.log(this);
				$("#bjfactbox").show();
			
				var that = $(this);
				//console.log( $(this) );
				//
				var faclassgai = null;
				$("#bjfactbtn").click(function(){
					$("#bjfactbox").hide();
					that.parent().parent().find("td:first-child")[0].innerHTML = $("#bjfactorV").val();
					
					faclassgai = {
					  "content": $("#bjfactorV").val(),
					  "factorId": parseInt( that.parent().parent().attr("data-fa-id") ),
					  "factorTypeId": parseInt( that.parent().parent().attr("data-id") )
					}
						
					faclassgai = JSON.stringify(faclassgai);
					console.log(faclassgai);
					
					$.ajax({
						type:"PUT",
						url:""+url+"/meritpay/factor/update",
						contentType:"application/json",
						data:faclassgai,
						success:function(res){
							console.log(res);
							Common.alertSuccess(res.message);
							faclassgai = null;
							
							window.setTimeout("history.go(0)",1100);
							
							return false;
						}
					})
				})
				//end
			}
		}	
	}
	
	//保存
 
	function addfactor(){
		
		//获取data-id
		
//		var classdataid = $("#factclassV option").eq(0).attr("data-id");
//		console.log(classdataid)
		var that = this;
		
		$("#factclassV").click(function(e){
			var e = e || window.event;
			
			if( $("#factclassV").find("option:selected").val() == "请选择所属分类" ){
				return false;
			}
			
			that.classdataid = $("#factclassV").find("option:selected").attr("data-id");
			console.log(that.classdataid)
		})
		//console.log(classdataid)
		/////
		$("#facttipbtn").click(function(){
			
			var cl = $("#facon tr").length;
			for( var j = 0;j<cl;j++ ){
				var factorVcon = $("#facon tr td:nth-child(1)").eq(j).html(); 
				if( $("#factorV").val() == factorVcon ){
					Common.alertError("已经存在因子");
					return false;
				}
			}
			
			if( $("#factorV").val() == "" ){
				Common.alertError("内容不能为空");
				return false;
			}
			
			if( $("#factclassV").find("option:selected").val() == "请选择所属分类" ){
				Common.alertError("请选择所属分类");
				return false;
			}
			
			var cdid = that.classdataid;
			console.log(cdid);
			
			var data = {
			  "content": $("#factorV").val(),
			  "factorTypeId": parseInt( cdid )
			};
			
			data = JSON.stringify(data);
			console.log(data);
//				beforeSend: function(request) {
//			 		request.setRequestHeader("User-Token",token);
//			 		var sedtoken = window.sessionStorage.getItem("sedtoken");
//					sedtoken = sedtoken.replace(/^\"|\"$/g,'');
//			 		console.log(sedtoken);
//			 		request.setRequestHeader("Second-Token",sedtoken);
//			    },
			
			$.ajax({
				type:"post",
				url:""+url+"/meritpay/factor/save",
				data:data,
				contentType:"application/json",
				async:false,
				success:function(){
					Common.alertSuccess("保存成功");
				}
			});
			var str = "";
			str +="<tr role='row' >"
	                	+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+$("#factorV").val()+"</td>"
	                	+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>"+$("#factclassV").val()+"</td>"
	                	+"<td class='' rowspan='1' colspan='2' style='width: 60px;height:30px'>" 
	                		+"<a class='fabj margin-left-10'> 编辑 </a>"
	        				+"<a class='fadele font-red margin-left-10'>删除</a>"
	                	+"</td>"
	               +" </tr>"
			
			$("#facon").insertBefore(str);
			
			$("#addfactbox").hide();
			
			window.setTimeout("history.go(0)",1100);
		})
	}
	
	//类功能
	classfaget();
	function classfaget(){
		$("#classlist").click(function(){
			var classV = $("#classlist").find("option:checked").attr("data-id");
			if( $("#classlist").find("option:checked").val() == "分类" ){
				$("#facon tr").show()
				return false;
			}
			//console.log(classV);
			var l = $("#facon tr").length;
			for ( var i = 0; i < l; i++ ) {
				if( $("#facon tr").eq(i).attr("data-id") == classV ){
					$("#facon tr").eq(i).show();
				}else{
					$("#facon tr").eq(i).hide();
				}
			}
						
		})
	}
	
	
	
	
//	
//})

