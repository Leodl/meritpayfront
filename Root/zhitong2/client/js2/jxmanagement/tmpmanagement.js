$(function(){
    var url = Constants.ROOT_URLJX

    //获取session
    var sessioninfo = sessionStorage.getItem("teacher");
    var data =  eval('(' + sessioninfo + ')');
    //var token = data.token;
    //var gartenId = data.gartenid;
    var gartenId = 4;

    var token ="eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDg1NzY5NjIsInVzZXJJZCI6MTAwNSwidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi572X5a-G5qynIn0.QcZzpG1xhaqRk3dHADS5acKSXZnG2VPntSipvc2mlgs"


    function owntmp(){
        var owndata = {};
        owndata.gartenId = 0;
        var owndatas = JSON.stringify(owndata)
        $.ajax({
            url:""+url+"/meritpay/template/get",
            type:'post',
            dataType: "json",
            async: false,
            headers:{"User-Token":token},
            contentType: 'application/json',
            data:owndatas,
            success:function(res){
                console.log(res)
                var data = res.data;
                var len = data.length;
                var html = "";
                var require = ""
                for(var i =0;i<len;i++){
                    if(data[i].status==0){
                        html+="<li class='tmp tmp"+i+"'><a href='looktmp.html?templateId="+data[i].templateId+"&flag=0'>"+data[i].templateName+"</a></li>"
                        require+="<li><a href='edittmp1.html?templateId="+data[i].templateId+"&flag=0'>"+data[i].templateName+"</a></li>"
                    }
                }

                $("#tmpmanagement .newtmp").before(html);
                $("#show1 ul").html(require);

                for(var i = 0;i<len;i++){
                    if(data[i].hasOwnProperty("groupName")){
                        var groupname = "<p><span>"+data[i].groupName+"</span></p>";
                        $(".tmp"+i+"").append(groupname);
                    }
                }
            }
        })
    }
    owntmp();


function othertmp(){
    var data = {};
    data.gartenId = gartenId;
    var datas = JSON.stringify(data)
    $.ajax({
        url:""+url+"/meritpay/template/get",
        type:'post',
        async: false,
        dataType: "json",
        headers:{"User-Token":token},
        contentType: 'application/json',
        data:datas,
        success:function(res){
            console.log(res)
            var data = res.data;
            var len = data.length;
            var lastdata = res.data.pop()
            var orderindex = sessionStorage.getItem("index");
            console.log(lastdata)
            var newdata = res.data;

            console.log(newdata)
            newdata.splice(orderindex,0,lastdata);
            //     newdata.splice(len-1,1);
            //     newdata.splice(orderindex,0,lastdata)
           
            var html = "";
            for(var i = 0 ;i<len;i++){
                html+="<li class='gradeTmp gradeTmp"+i+"'><a tmpid='"+data[i].templateId+"' href='looktmp.html?templateId="+data[i].templateId+"'>"+data[i].templateName+"</a><p><span style='display: inline-block;color:#C3C3C3;margin-right: 135px'>自定义模板</span></p></li>"

            }
            $("#tmpmanagement .newtmp").before(html);

                $(".gradeTmp").click(function(){
                    var tmpown = $(".tmp").length;
                    var index = $(this).index()-tmpown;
                    var tmpid = $(this).find("a").attr("tmpid")
                    $(this).find("a")[0].href = "looktmp.html?templateId="+tmpid+"&index="+index+""
                })


            
            for(var i =0;i<len;i++){
                if(data[i].status==0){
                    var onuse = "<span class='onuse'></span>";
                    $(".gradeTmp"+i+" p").append(onuse);
                }
                if(data[i].status==1){
                    $(".gradeTmp"+i+" .onuse").remove()
                }
            }


        }
    })
}
 othertmp();


})

