$(function(){

    var url = 'http://106.15.137.203';


    //获取session
    var sessioninfo = sessionStorage.getItem("user");
    var data =  eval('(' + sessioninfo + ')');
    var token = data.token;


    //渲染列表
    var data = {};
    data.gartenId = 0;
    var datas = JSON.stringify(data);
    $.ajax({
        url:''+url+'/meritpay/template/get',
        type:'post',
        dataType: "json",
        headers:{"User-Token":token},
        contentType: 'application/json',
        data:datas,
        success:function(res){

            var newArr = [];
            var len = res.data.length;
            for(var i =0;i<len;i++){
              newArr.unshift(res.data[i])
            }

            var html = ""
            for(var i = 0;i<len;i++){
                    html+="<tr role='row'><td rowspan='1' colspan='2' style='width: 60px;height: 30px'>"+newArr[i].templateName+"</td>" +
                        "<td class='state"+i+" state' rowspan='1' colspan='2' style='width: 60px;height: 30px'></td>"+
                        "<td rowspan='1' colspan='2' style='width: 60px;height: 30px'>" +
                        "<a class='downline margin-left-10 line"+i+"' templateId="+newArr[i].templateId+" status="+newArr[i].status+"></a>"+
                        "<a class='demobj margin-left-10' templateId="+newArr[i].templateId+">编辑</a>"+
                        "<a class='font-red margin-left-10 demodele' templateId="+newArr[i].templateId+">删除</a>"+
                       "</td>"+
                    "</tr>"

            }
            $(".democon").html(html)

            for(var i = 0;i<len;i++){
                var status = newArr[i].status;
                if(status==0){
                    $(".state"+i+"").text("已上线");
                    $(".line"+i+"").text("下线")
                }else{
                    $(".state"+i+"").text("未上线");
                    $(".line"+i+"").text("上线")
                }
            }


            //点击编辑
            $(".democon").on("click",".demobj",function(){
                var templateId = $(this).attr("templateId");
                $(this)[0].href ="edittmp1.html?templateId="+templateId+"";

            });


            //上线下线

            $(".democon").on("click",".downline",function(){
                var templateId = $(this).attr("templateId");
                var state = $(this).attr("status");
                var status=Number();
                if(state==0){
                    status = 1;
                    $(this).text("上线").parent("td").prev("td").text("未上线");

                }else{
                    status = 0;
                    $(this).text("下线").parent("td").prev("td").text("已上线");
                }


                $.ajax({
                    url:''+url+'/meritpay/template/updateStatus/'+templateId+'/'+status+'',
                    type:'put',
                    contentType: 'application/json',
                    headers:{"User-Token":token},
                    success:function(res){
                        if(res.result==0){
                            Common.alertSuccess("操作成功");
                            setTimeout(function(){
                                window.location.reload();
                            },800);
                        }else{
                            Common.alertError("操作失败")
                        }
                    }
                })
            })


            //删除模板

            $(".democon").on('click','.demodele',function(){
                var templateId = $(this).attr("templateId");
                $.ajax({
                    url:''+url+'/meritpay/template/delete/'+templateId+'',
                    type:'delete',
                    headers:{"User-Token":token},
                    contentType: 'application/json',
                    success:function(res){
                        if(res.result==0){
                            Common.alertSuccess("删除成功");
                            setTimeout(function(){
                                window.location.reload();
                            },800);
                        }else{
                            Common.alertError("删除失败")
                        }
                    }
                })
            })

            //选择状态
            $(".sel").change(function(){
                var selstatus = $(this).val();
                var status = Number();
                if(selstatus=="已上线"){
                    status = 0;
                }else if(selstatus=="未上线"){
                    status = 1;
                }else{
                    return;
                }

                var seldata = {};
                seldata.gartenId = 0;
                var seldatas = JSON.stringify(seldata);
                $.ajax({
                    url:''+url+'/meritpay/template/get',
                    type:'post',
                    dataType: "json",
                    headers:{"User-Token":token},
                    contentType: 'application/json',
                    data:seldatas,
                    success:function(res){

                        var newArr = [];
                        var len = res.data.length;
                        for(var i =0;i<len;i++){
                            newArr.unshift(res.data[i])
                        }

                        var html = "";
                        for(var i = 0;i<len;i++){
                            if(newArr[i].status==status){
                                 html+="<tr role='row'><td rowspan='1' colspan='2' style='width: 60px;height: 30px'>"+newArr[i].templateName+"</td>" +
                                    "<td class='state"+i+" state' rowspan='1' colspan='2' style='width: 60px;height: 30px'></td>"+
                                    "<td rowspan='1' colspan='2' style='width: 60px;height: 30px'>" +
                                    "<a class='downline margin-left-10 line"+i+"' templateId="+newArr[i].templateId+" status="+newArr[i].status+"></a>"+
                                    "<a class='demobj margin-left-10' templateId="+newArr[i].templateId+">编辑</a>"+
                                    "<a class='font-red margin-left-10 demodele' templateId="+newArr[i].templateId+">删除</a>"+
                                    "</td>"+
                                    "</tr>"

                            }
                        }
                        $(".democon").html(html);


                        for(var i=0;i<len;i++){
                            if(newArr[i].status==0){
                                $(".state").text("已上线");
                                $(".downline").text("下线")
                            }else{
                                $(".state").text("未上线");
                                $(".downline").text("上线")
                            }
                        }


                    }
                })

            })


        }

    })
})
