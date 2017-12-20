'use strict';

(function($){

//init
//获取session
//var url = "http://forchild.zhitong.group";
var url = "http://106.15.137.203";
var url2 = "http://106.15.226.229";
var sessioninfo = sessionStorage.getItem("teacher");
var data =  eval('(' + sessioninfo + ')');
var token = data.token;
var gartenId = data.gartenid;

/////////////////////////////////get  树状结构

	var datascource = null;
	var data = null;
	var posobj = null;
	var that = this;
	var nameL = null;

	$.ajax({
		type:"get",
		url:""+url+"/meritpay/stations/get/"+gartenId,
		async:false,
		beforeSend: function(request) {
		 		request.setRequestHeader("User-Token",token);
		},
		success:function(res){
				console.log(res);
				data = res.data;
				var aaaa = JSON.stringify(data);
				//console.log(JSON.parse(aaaa));
				
				var dataL = data.length;
				for ( var k = 0;k<dataL;k++ ) {
					data[k].users = JSON.stringify(data[k].users);
				}
				
				
		}
	});

	
var tree = new treeUtil(data,'stationsId','parentStationsId');
				var aaa = tree.toTree();
    		//console.log( aaa );
    		
				var bbb = JSON.stringify(aaa);
				//console.log(bbb);
				
				String.prototype.trim2 = function(){
					// 用正则表达式将前后中括号 // 用空字符串替代。 
					return this.replace(/(^\[)|(\]$)/g, "");
				}
				
				if (typeof bbb === 'string') {
					var ccc = bbb.trim2();
					//console.log(ccc);
					try{
						datascource = JSON.parse(ccc);
					}catch(e){
					}
				}

				if( datascource == null ){
					
					datascource = {
					    'stationsName':'园长',
					    'relationship': '001'
					  };
					  
				}
				console.log( datascource );
/////////////////////////////////////////////init获取数据  确定关系渲染
//savelist();
//、、、、、、、、、、、、、、、、、、、、、、、、
    $('#chart-container').orgchart({
      'data' : datascource,
      'nodeTitle':'stationsName',
			'chartClass':'chartname',
      'exportButton': true, 
     	'nodeContent': 'users', //title职位姓名部分
     	
      'exportFilename': 'SportsChart',
      'parentNodeSymbol': 'fa-th-large',
      
      'nodeId': 'id',
 
			//
      'createNode': function($node, data) {
      	
      	
        $node.on('click',function(event) {
          if (!$(event.target).is('.edge')) {
          
            $('#selected-node').val(data.name).data('node', $node);
            $('#selected-node').val($(this).find('.title').text())
          }
        });
      }
    })
    .on('click', '.orgchart', function(event) {
      if (!$(event.target).closest('.node').length) {
        $('#selected-node').val('');
      }
    });
	
	//下方点击
    $('input[name="chart-state"]').on('click', function() {
      $('#edit-panel, .orgchart').toggleClass('view-state');
      if ($(this).val() === 'edit') {
        $('.orgchart').find('tr').removeClass('hidden')
          .find('td').removeClass('hidden')
          .find('.node').removeClass('slide-up slide-down slide-right slide-left');
      } else {
        $('#btn-reset').trigger('click');
      }
    });

	$('#edit-panel, .orgchart').toggleClass('view-state');
	if ($(this).val() === 'edit') {
		$('.orgchart').find('tr').removeClass('hidden')
			.find('td').removeClass('hidden')
			.find('.node').removeClass('slide-up slide-down slide-right slide-left');
	} else {
		$('#btn-reset').trigger('click');
	}
	//新增岗位
    $('input[name="node-type"]').on('click', function() {
      var $this = $(this);
      if ($this.val() === 'parent') {
        $('#edit-panel').addClass('edit-parent-node');
        $('#new-nodelist').children(':gt(0)').remove();
      } else {
        $('#edit-panel').removeClass('edit-parent-node');
      }
    });

    $('#btn-add-input').on('click', function() {
      $('#new-nodelist').append('<li><input type="text" class="new-node"></li>');
    });

    $('#btn-remove-input').on('click', function() {
      var inputs = $('#new-nodelist').children('li');
      if (inputs.length > 1) {
        inputs.last().remove();
      }
    });
		
		//删除
	$('#btn-delete-nodes').on('click', function() {
      var $node = $('#selected-node').data('node');
      if (!$node) {
        alert('请点击选择要删除的组织结构');//Please select one node
        return;
      }
      
      //第一个不能删除
      if( $node.attr("level-id") == 0 ){
      	alert('第一位不能删除');
      	return false;
      }
      
      $('#chart-container').orgchart('removeNodes', $node);
      $('#selected-node').data('node', null);
      	adddataid();
	    getbtntip();
	    setfuziid();
	    //controlcontent()
	    
	    savelist();
    });
		
		//点击添加
    $('#btn-add-nodes').on('click', function() {
      var $chartContainer = $('#chart-container');
      var nodeVals = [];
      $('#new-nodelist').find('.new-node').each(function(index, item) {
        var validVal = item.value.trim();
        if (validVal.length) {
          nodeVals.push(validVal);
        }
      });
      var $node = $('#selected-node').data('node');
      if (!nodeVals.length) {
        alert('请填写新增岗位名称');//Please input value for new node
        return;
      }
      var nodeType = $('input[name="node-type"]:checked');
      if (nodeType.val() !== 'parent' && !$node) {
        alert('请选择岗位名称');//Please select one node in orgchart
        return;
      }
      if (!nodeType.length) {
        alert('请选择上级，下级或同级');//Please select a node type
        return;
      }
      //添加父级
      if (nodeType.val() === 'parent') {
        $chartContainer.orgchart('addParent', $chartContainer.find('.node:first'), { 'stationsName': nodeVals[0] });
        
      //添加同级
      } else if (nodeType.val() === 'siblings') {
        $chartContainer.orgchart('addSiblings', $node,
          { 'siblings': nodeVals.map(function(item) { return { 'stationsName': item, 'relationship': '110'}; })
        });
        adddataid();
        getbtntip();
        setfuziid();
        //controlcontent()
        
        savelist();
      //添加子级
      } else {
        var hasChild = $node.parent().attr('colspan') > 0 ? true : false;
        ///////
        if (!hasChild) {
          var rel = nodeVals.length > 1 ? '110' : '100';
          $chartContainer.orgchart('addChildren', $node, {
              'children': nodeVals.map(function(item) {
                return { 'stationsName': item, 'relationship': rel };
              })
            }, $.extend({}, $chartContainer.find('.orgchart').data('options'), { depth: 0 }));
            adddataid();
            getbtntip();
            setfuziid();
            //controlcontent()
            
            savelist();
        } else {
          $chartContainer.orgchart('addSiblings', $node.closest('tr').siblings('.nodes').find('.node:first'),
            { 'siblings': nodeVals.map(function(item) { return { 'stationsName': item, 'relationship': '110' }; })
          });
          adddataid();
          getbtntip();
          setfuziid();
          //controlcontent()
          
          savelist();
        }
        
        ////////
        
      }
    });

  	///////////for添加id

adddataid();
function adddataid(){
	var idL = $(".node").length;
	var dataid = 1;
	
	$(".node")[0].setAttribute("data-id",1);
	
	for ( var jj = 0; jj<idL ;jj++ ) {
		$(".node")[jj].setAttribute("data-id",dataid);
		dataid++;
	}
}
	//挂载fuzi_id数据
setfuziid();
function setfuziid(){
	$(".node").each(function(){
		$(".node")[0].setAttribute("level-id",0);
		$(".node")[0].setAttribute("data-id",1);
		$(".node")[0].setAttribute("pid",0);
		var ccc = parseInt( $(this).parents(".nodes:first").parent().find(".node:first").attr("level-id") )+1;
		//层级id
		$(this).attr("level-id", ccc )
		//console.log(aaa);
		//pid
		var pid = parseInt( $(this).parents(".nodes:first").parent().find(".node:first").attr("data-id") );
		$(this).attr("pid",pid);
	})
}

///////for处理content数据
try{
	controlcontent();
}catch(e){
	// handle the exception
}

function controlcontent(){
	var idL = $(".node").length;
	String.prototype.trim2 = function(){
		return this.replace(/(^\[)|(\]$)/g, "");
	}
	String.prototype.trim3 = function(){
		return this.replace(/(\"*)/g, "");
	}
	var arr = [];
	for ( var jj = 0; jj<idL ; jj++ ) {
		if( typeof $(".content")[jj].innerHTML.trim2()== 'string' ){
		 	var aaa = $(".content")[jj].innerHTML.trim2();
		 	//console.log(aaa);
		 	var bbb = JSON.parse($(".content")[jj].innerHTML);
		 	//console.log(bbb);
		 	var bbbL = bbb.length;
		 	var arr = "";
		 	for ( var i = 0;i<bbbL;i++ ) {
		 		arr+="<p data-username-id='"+bbb[i].userid+"'>"+bbb[i].username+"</p>";//+",";
//		 		var con = JSON.stringify(arr);
//		 		con = con.trim2();
//		 		con = con.trim3();
		 	}
		 	//console.log(arr)
		 	$(".content")[jj].innerHTML = arr;
		 	$(".content")[jj].style.overflowY = "auto";
		 	
		}
		
	}
	
}

  	//点击底部TXT
    $(document).on("dblclick",".title",function(){
    	
		console.log( $(this).text() );
		var input = $("<input class='edit-input' type='text' value='"+$(this).text()+"' placeholder=''>")
		$(this).text(" ");
	  
	    $(this).append(input);
	    $(this).find(".edit-input").css("text-align","center");
	    $(".edit-input").focus()
    })

    $(document).on('blur','.edit-input',function(event) {
      if($.trim($(this).val())==""){
       $(".edit-input").remove()
       return
      }else{
         var str = $.trim($(this).val());
         $(this).parent(".title").text(str)
         //console.log($(".title").text())
      }
  
    });

	//循环添加提示
getbtntip();
function getbtntip(){
	var contentL = $(".content").length;
	for ( var cl = 0;cl<contentL;cl++ ) {
		if( $(".content")[cl].innerHTML == "" ){
			$(".content")[cl].innerHTML = "未选择";
		}
	}
}

//添加checked   添加人员
function getchecked(){
	
}

//、、、、、、、、、、人员弹窗
	$(document).on('click','.content',function(){
		
		var teacherlist = {
			"gartenid":gartenId,
			"curpage":1,
			"pagesize":10000,
			"dimissionstatus":2
		}
		teacherlist = JSON.stringify(teacherlist);
		//暂无园长问题 后台改中
		$.ajax({
			type:"get",
			//type:"post",
			//url:""+url2+"/zhitong/service/user/teacher/extendlist",
			url:""+url+"/meritpay/roster/getSimpleList/{gartenId}?gartenId="+gartenId,
			async:false,
			beforeSend: function(request) {
		 		request.setRequestHeader("User-Token",token);
			},
			//data:teacherlist,
			//contentType:'application/json',
			success:function(res){
				console.log(res);
				nameL = res.data.length;
				var sstr = "";
				for( var j = 0;j<nameL;j++ ){
					sstr+="<li data-user-id='"+res.data[j].userid+"'><input type='checkbox' ><span>"+res.data[j].username+"</span></li>"
				}
				$("#showname ul").html(sstr);
			}
		});

	//$("#showname,#mask").show();
	$("#showname,#mask").css({"opacity":"1","zIndex":"999"});
	//$("#showname input[type='checkbox']").attr("checked",false);

	//循环检测岗位人员
	//console.log($(this))
	//循环检测岗位人员
	var ppL = $(this).find("p").length;
	var spL = nameL;
	//console.log(spL);

	for( var v = 0;v<spL;v++ ){
		for( var m = 0;m<ppL;m++ ){
			var aaaa = $("#showname").find("li")[v].getAttribute("data-user-id");
			console.log(aaaa)
			var bbbb = $(this).find("p")[m].getAttribute("data-username-id");
			console.log(bbbb)
			if( $(this).find("p")[m].getAttribute("data-username-id") == $("#showname").find("li")[v].getAttribute("data-user-id") ){

				$("#showname").find("li")[v].firstChild.setAttribute("checked","checked");
			}

		}
	}

	var thiscontent = $(this).prev(".title").text();
	//console.log(thiscontent)
	$(".ensure,.close").click(function(event) {
		//$("#showname,#mask").hide()
		$("#showname,#mask").css({"opacity":"0","zIndex":"-999"});

		//获取userlist
		savelist();

	});
	//
	var that = $(this);
	//console.log(that);
	var l = $("#showname").find("input").length;

	for ( var k = 0;k<l;k++ ) {
		$("#showname input")[k].onclick = function(event){
			//console.log(that)
			if( that[0].innerHTML == "未选择" ){
				that[0].innerHTML = "";
			}

//添加删除
			if($(this).prop("checked")){

				that[0].innerHTML += "<p data-username-id='"+$(this).parent().attr("data-user-id")+"'>"+$(this).next().html()+"</p>";
				$(this).attr("checked","checked");


			}else{
				var that2 = $(this);
				that.find("p").each(function(){
					if( that2.parent().attr("data-user-id") == $(this).attr("data-username-id") ){
						that2.attr("checked",false);
						$(this).remove();
					}
				})
			}




      	}
      }

  });







//删除节点
function removeElement(_element){
	 var _parentElement = _element.parentNode;
	 if(_parentElement){
	        _parentElement.removeChild(_element); 
	 }
}

//待定样式
//  $(document).on('mouseenter','.content',function(){
//  	
//  	
//  	
//  })

//////////////////////post传值
		

	//post  数据\
savelist();
function savelist(){
	var idL = $(".node").length;
	var obj ={};
	
	obj.requests=[];
	
	for( var k = 0; k<idL;k++ ){
		var sonobj = {};
		sonobj.gartenId = gartenId;
		sonobj.parentId = $(".node")[k].getAttribute("pid");
		sonobj.stationsId = $(".node")[k].getAttribute("data-id");
		sonobj.stationsLevel = $(".node")[k].getAttribute("level-id");
		sonobj.stationsName = $(".node")[k].firstChild.innerText;
		sonobj.users = [];
		var pL = $(".node")[k].getElementsByTagName("p").length;
		for ( var n=0 ; n<pL ; n++) {
			var pobj = {};
			pobj.gartenid = gartenId;
			pobj.rosterId = $(".node")[k].getElementsByTagName("p")[n].getAttribute("data-username-id");
			sonobj.users.push(pobj);
		}
		obj.requests.push(sonobj);
		
	}
	
	//console.log(obj)
	posobj = JSON.stringify(obj);
	//上传数据
	//console.log(posobj)
}


var saveurl = ""+url+"/meritpay/stations/save";
var savetype = "post";
$("#btn-save").click(posobj,function(){
	saveclick();
	function saveclick(){
	
		$.ajax({
			type:savetype,
			url:saveurl,
			async:false,
			beforeSend: function(request) {
			 		request.setRequestHeader("User-Token",token);
			},
			data:posobj,
			contentType:"application/json",
			success:function(res){
				//console.log(res,gartenId);
				if( res.result == -1 ){

					$.ajax({
						type:"put",
						url:""+url+"/meritpay/stations/updateMain/"+gartenId,
						data:posobj,
						contentType:"application/json",
						async:true,
						beforeSend: function(request) {
						 		request.setRequestHeader("User-Token",token);
						},
						success:function(res){
							console.log(posobj)
							console.log(res)
							if(res.result == 0){
								alert("保存成功");
							}else{
								alert(res.message);
							}
						}
					});
					//saveclick();
				}
			}
		});
	}
	
})
        /*
     *函数定义
     *入口参数data,平行数组
     *key，id字段
     *parentKey，父字段
     *map,需要将原始属性名称转换为什么名称
     */
    function treeUtil(data,key,parentKey,map) {
        this.data=data;
        this.key=key;
        this.parentKey=parentKey;
        this.treeParentKey=parentKey;   //parentKey要转换成什么属性名称
        this.treeKey=key;           //key要转换成什么属性名称
        this.map=map;
        if(map){
            if(map[key])this.treeKey=map[key];
        }
        this.toTree=function () {
            var data=this.data;
            var pos={};
            var tree=[];
            var i=0;
            while(data.length!=0){
                if(data[i][this.parentKey]==0){
                    var _temp = this.copy(data[i]);
                    tree.push(_temp);
                    pos[data[i][this.key]]=[tree.length-1]; 
                    data.splice(i,1);
                    i--;
                }else{
                    var posArr=pos[data[i][this.parentKey]];
                    if(posArr!=undefined){                      
                        var obj=tree[posArr[0]];
                        for(var j=1;j<posArr.length;j++){
                            obj=obj.children[posArr[j]];
                        }
                        var _temp=this.copy(data[i]);
                        obj.children.push(_temp);
                        pos[data[i][this.key]]=posArr.concat([obj.children.length-1]);
                        data.splice(i,1);
                        i--;
                    }
                }
                i++;
                if(i>data.length-1){
                    i=0;
                }
            }
            return tree;
        }
        this.copy=function (item) {
            var _temp={
                children:[]
            };
            _temp[this.treeKey]=item[this.key];
            for(var _index in item){
                if(_index!=this.key && _index!=this.parentKey){
                    var _property = item[_index];
                    if((!!this.map) && this.map[_index])
                        _temp[this.map[_index]]=_property;
                    else
                        _temp[_index]=_property;
                }
            }
            return _temp;
        }
    }



})(jQuery);