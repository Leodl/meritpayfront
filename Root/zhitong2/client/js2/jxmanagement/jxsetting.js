$(function(){

    (function(){

        //获取地址栏地址
        function getUrlParam(key) {
            // 获取参数
            var url = window.location.search;
            // 正则筛选地址栏
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            // 匹配目标参数
            var result = url.substr(1).match(reg);
            //返回参数值
            return result ? decodeURIComponent(result[2]) : null;
        }

        var rosterId = getUrlParam("user_id");

        var sessioninfo = sessionStorage.getItem("teacher");
        var data =  eval('(' + sessioninfo + ')');
        //var userId = 1003;
        //var token = data.token;
       // var gartenId =data.gartenid;
        var gartenId =4;
        var url = 'http://106.15.137.203';
        var host = window.location.host;
        var test = window.location.protocol;
        //var url = test+"//"+host;
        var token ="eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTI1NDg0MTYsInVzZXJJZCI6MTAwMywidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi5ZC05aSn5Li9In0.-ewx0nluvNflyX93FuvHOT0eUbvBi47PWGTHzqxUGiM"



        //var text = sessionStorage.getItem("names");
        //$(".setcontents").append(text)


       // var url = 'http://forchild.zhitong.group';
        var isGroups = 1;
        var isPublics = 1;
        var isSelfs = 1;



        //获取绩效设置的数据
        var isgroup1 =null;
        var isSetting = "";
        var stationsidarr = [];
       // var isgroupName = "";
        var achConfigIdarr=[];
        $.ajax({
            url:''+url+'/meritpay/achconfig/get',
            type:'get',
            async:false,
            headers:{"User-Token":token},
            success:function(res){
                isSetting = res.data.length;
               // isgroupName = res.data[0].groupName
                console.log(res)
                if(res.data.length !==0){
                    var isGroup = res.data[0].isGroup;
                    isgroup1 = res.data[0].isGroup;
                    var isSelf = res.data[0].isSelf;
                    var isPublic = res.data[0].isPublic;
                    if(isGroup==0){
                        $(".jxsetting-showbtn .bootstrap-switch-container").css("margin-left","0px");
                        isGroups = 0;
                        $(".jxsetting-groupbtn").show();
                    }else{
                        $(".groupactive").hide();
                        $(".jxsetting-groupbtn").hide();
                    }
                    if(isPublic==0){
                        $(".jxsetting-checkbox .bootstrap-switch-container").css("margin-left","0px")
                        isPublics = 0;
                    }
                    if(isSelf==0){
                        $(".jxsetting-btn .bootstrap-switch-container").css("margin-left","0px")
                        isSelfs = 0;
                    }



                    //渲染选定的岗位名称
                    var data = res.data;
                    var len = data.length;
                    var html = "";
                    for(var i =0;i<len;i++){
                        var len1 = data[i].stations.length;
                        var achConfigId = data[i].achConfigId;
                        var stationsid1 = [];
                        achConfigIdarr.push(achConfigId);
                        for(var j = 0;j<len1;j++){
                            var stationsName = data[i].stations[j].stationsName;
                            var stationsid = data[i].stations[j].stationsId;
                            stationsid1.push(stationsid);
                            html+="<span stationsid="+stationsid+" class='num"+stationsid+"'>"+stationsName+"</span>";
                        }
                        stationsidarr.push(stationsid1)

                    }
                    $(".setcontents").html(html)


                    //渲染分组
                    var grouplistarr = [];
                    for(var i = 0;i<len;i++){
                        var grouplist = {};
                        var names = data[i].groupName;
                        var groupArray =[];
                        var len1 = data[i].stations.length;

                        for(var j = 0;j<len1;j++){
                            groupArray.push(data[i].stations[j].stationsName)
                        }

                        grouplist[names] = groupArray;
                        grouplistarr.push(grouplist)
                        console.log(names)
                        console.log(groupArray)

                        for(var k in grouplist){
                            if(grouplist[k].length==0){
                                delete grouplist[k];
                            }
                        }

                    }



                    //显示页面
                    var html = "";
                    if(res.data[0].groupName !==""){
                        for(var i = 0;i<grouplistarr.length;i++){
                            for(var k in grouplistarr[i]){
                                len1 = grouplistarr[i][k].length;
                                html +="<h4><span>"+k+"</span><em class='num"+i+"'>:</em></h4>";

                            }
                        }

                        $(".grouplistshow").html(html)

                        for(var i = 0;i<grouplistarr.length;i++){
                            var html1 = "";
                            for(var k in grouplistarr[i]){
                                var len3 = grouplistarr[i][k].length
                               for(var j = 0;j<len3;j++){
                                   html1 += "<a class='station"+j+"' style='margin-left: 10px;color:black;text-decoration: none'>"+grouplistarr[i][k][j]+"</a>";
                               }
                            }

                            $(".grouplistshow .num"+i+"").after(html1);
                        }
                        $(".grouptip").show();

                        }

                    //綁定頁面id;
                    var len1 = stationsidarr.length;
                     for(var i = 0;i<len1;i++){
                         $(".grouplistshow h4:eq("+i+")").find("span").first("span").attr("achConfigId",achConfigIdarr[i])
                     }
                    var len2 = stationsidarr.length;
                    for(var i = 0;i<len2;i++){
                        var len3 = stationsidarr[i].length;
                        for(var j =0;j<len3;j++){
                            $(".grouplistshow h4:eq("+i+")").find(".station"+j+"").attr("stationid",stationsidarr[i][j])
                        }
                    }


                }



            }

        })


        $.ajax({
            url:''+url+'/meritpay/stations/get/'+gartenId+'',
            type:'get',
            headers:{"User-Token":token},
            success:function(res){
                var len = res.data.length;
                console.log(len)
                var data = res.data;
                console.log(res)
                var html ="";
                for(var i =0;i<len;i++){
                    html += "<li><input type='checkbox' value=''><span  class='num"+data[i].stationsId+" ' stationsId='"+data[i].stationsId+"'>"+data[i].stationsName+"</span></li>"
                }
                $(".jxsetting-left ul").html(html);



                //分组管理弹出
                $(".jxsetting-groupbtn").click(function(){

                    if($(".setcontents").find("span").length==0){
                        Common.alertError("请选择参与考核的岗位");
                        return;
                    }
                    $("#show1,#mask").show();

                    $.ajax({
                        url:''+url+'/meritpay/achconfig/getHistory',
                        type:'get',
                        async:false,
                        headers:{"User-Token":token},
                        success:function(res){
                            console.log(res)

                                var len = $(".setcontents span").length;
                                var html = "";
                                var stationidarr = [];
                                var stationnamearr = [];
                                for(var i = 0;i<len;i++){
                                    stationidarr.push($(".setcontents span:eq("+i+")").attr("stationsid"));
                                    stationnamearr.push($(".setcontents span:eq("+i+")").text());
                                    html +="<li class='num"+i+"' staid='"+stationidarr[i]+"'>"+stationnamearr[i]+"</li>";
                                }
                                $(".station").html(html);

                                var len1 = $(".groupnames").length;
                                for(var i=0;i<len1;i++){
                                    var len2 =$(".station li").length;
                                    var html = ""
                                    for(var j = 0 ;j<len2;j++){
                                        html +="<li><input class='num"+j+"' staid='"+stationidarr[j]+"' type='radio' name='radio"+j+"'></li>";
                                    }
                                    $(".box-info .groupnames:eq("+i+") div").html(html)
                                }

                            //點擊渲染分組
                            if(res.data.length !==0){
                              var len = res.data.length;
                                var html = "";
                                for(var i = 0;i<len;i++){
                                    var len2 =$(".station li").length;
                                    html = "<ul class='groupnames'><li><input type='text' placeholder='分组名称'></li></ul>"
                                }
                            }














                            //管理分组的数据
                            //var data = res.data;
                            //if(res.data.length !=0){
                            //    $(".name0").remove();
                            //    $(".name1").remove();
                            //    var len =res.data.length;
                            //    var html = "";
                            //    for(var i = 0;i<len;i++){
                            //        html+="<input class='name"+i+"' type='text'>"
                            //
                            //    }
                            //    $(".groupname .addgroup").before(html);
                            //
                            //
                            //    for(var i = 0;i<len;i++){
                            //        var jobName =res.data[i].groupName;
                            //        var achConfigId =res.data[i].achConfigId;
                            //        $(".box-content .groupname .name"+i+"").val(jobName);
                            //        $(".box-content .groupname .name"+i+"").attr("achConfigId",achConfigId)
                            //
                            //    }
                            //
                            //    var len = $(".groupname input").length-2
                            //    var width = 371+(len*105);
                            //    $(".groupname").css("text-align","left")
                            //    $("#show1 .box-info").width(width)
                            //
                            //
                            //}
                            //
                            //
                            //
                            ////渲染分组
                            //var len = data.length;
                            //for(var i = 0;i<len;i++){
                            //    var names = data[i].groupName;
                            //    var groupArray =[];
                            //    var len1 = data[i].stations.length
                            //
                            //    for(var j = 0;j<len1;j++){
                            //        groupArray.push(data[i].stations[j].stationsId)
                            //    }
                            //
                            //    grouplist[names] = groupArray;
                            //
                            //    for(var k in grouplist){
                            //        if(grouplist[k].length==0){
                            //            delete grouplist[k];
                            //        }
                            //    }
                            //    for(var k in grouplistshow1){
                            //        if(grouplistshow1[k].length==0){
                            //            delete grouplistshow1[k];
                            //        }
                            //    }
                            //}
                            //console.log(grouplist)


                        }
                    })



                    //获取缓存
                    if(sessionStorage.getItem("groupname") !==null){
                        var len = $(".groupname input").length-2
                        var width = 371+(len*105);
                        $(".groupname").css("text-align","left")
                        $("#show1 .box-info").width(width)

                        $(".groupname input").remove();
                        var groupname = sessionStorage.getItem("groupname").split(",");
                        console.log(groupname)
                        var len = groupname.length;
                        var namehtml = "";
                        for(var i =0;i<len;i++){
                            namehtml+="<input class='name"+i+"' type='text'>";
                        }
                        $(".groupname .addgroup").before(namehtml);
                        for(var i =0;i<len;i++){
                            var jobName =groupname[i];
                            console.log(jobName)
                            $(".box-content .groupname .name"+i+"").val(jobName)
                        }


                        var len = $(".groupname input").length-2
                        var width = 371+(len*105);
                        $(".groupname").css("text-align","left")
                        $("#show1 .box-info").width(width)
                        $("#show1,#mask").show();
                    }

                    var textlist = $(".setcontents")[0].getElementsByTagName("span");
                    var html = "";
                    for(var i=0;i<textlist.length;i++){
                        var stationsId = $(".setcontents span:eq("+i+")").attr("stationsid");
                        html+="<li class='li"+i+"'><span stationsId='"+stationsId+"'>"+textlist[i].innerText+"</span>" +
                            "<div class='jxsetting-radio jxradio"+i+"' name='radio"+i+"'>" +
                             "<input id='flag"+i+"0' class='checkradio0' type='radio' name='radio"+i+"' >" +
                                //"<input class='checkradio1' type='radio' name='radio"+i+"'>" +
                            "</div>" +
                            "</li>"
                    }
                    $(".jxsetting-grop ul").html(html)


                    var len = $(".jxsetting-radio").length
                    var len1 = $(".groupname input").length
                    for(var i = 0;i<len;i++){
                        var radios =""
                        for(var j=1;j<len1;j++){
                            radios += "<input id='flag"+i+""+j+"' class='checkradio"+j+"' type='radio' name='radio"+i+"' value='' style='margin-left:90px;'>"
                        }

                        $(".jxradio"+i+"").append(radios)

                    }

                    //显示单选框
                    if(sessionStorage.getItem("radio")!==null){
                        var flagArr = sessionStorage.getItem("radio").split(",")
                        var len = flagArr.length;
                        console.log(flagArr)
                        for(var i =0;i<len;i++){
                            $("#"+flagArr[i]+"").attr("checked","true")
                        }
                    }



                })

            }
        })


       $(".jxsetting-setbox").click(function(){

           var arr = [];
           $(".setcontents span").each(function(){
               var num = $(this).attr("class");
               arr.push(num)
           })

           for(var i = 0;i<arr.length;i++){
               $(".jxsetting-left ."+arr[i]+"").prev("input").attr("checked",true);
           }


           if($(".setcontents span").attr("class")==undefined){
               //$(".setcontents span").remove();
           }

            $("#show,#mask").show();
            $(".jxsetting-close").click(function(){



                $("#show,#mask").hide();
            })



       })



       //设置保存
        $(".jxsetting-sub").click(function () {
            if($(".box-info input[type='checkbox']").is(':checked')){
                $("#show,#mask").hide();
            }else{
                $("#show,#mask").hide();
            }
        })


        //点击复选框选择
        $(document).on('click',".box-info input[type='checkbox']",function(){

            var data_value = $(this).next("span").clone()
            var val = data_value.text();

            var len = $(".setcontents").find("span").length;
            var txt = $(".setcontents")[0].getElementsByTagName("span");


            if($(this).prop("checked")){

                for(var i = 0;i<len;i++){
                    if(txt[i].getAttribute("class")==$(this).attr("class")){ //有
                        return;
                    }
                }
            }else {
                for(var i = 0;i<len;i++){
                    if(txt[i].innerText.indexOf(val) !==-1){ //有
                        var del = $(this).next("span").attr("class")
                        $(".setcontents ."+del+"").remove()
                        return;
                    }
                }
            }

            $(".setcontents").append(data_value)

        });



        //点击增加分组和单选按钮
        $(".box-info").on("click",".addgroup",function(){
            $(".addgroup").remove();
            var html="<ul style='float:left' class='groupnames'><li><input type='text' placeholder='分组名称'></li><a href='javascript:;' class='addgroup'>+</a></ul>"
            $(".box-info .groupnames").last(".groupnames").after(html);
            console.log(html)
            console.log($(".groupnames").length)

            var staidsarr = [];
            var len = $(".station li").length;
            for(var i = 0;i<len;i++){
                staidsarr.push($(".station li:eq("+i+")").attr("staid"))
            }
            var html1 = ""
            for(var i = 0;i<len;i++){
                html1 +="<li><input class='num"+i+"' type='radio' name='radio"+i+"' staid='"+staidsarr[i]+"'></li>"
            }

            $(".box-info").find(".groupnames").last(".groupnames").append(html1)

        })


        //删除分组

        $("#show1").on("click",".del",function(){

             var index = $(this).attr("num")
            console.log(index)
           $(this).prev("input").remove();
           $(this).remove();
            var len1 = $(".jxsetting-grop li").length;



            for(var i =0;i<len1;i++){
               // $(".jxsetting-radio").find("input").removeClass();

               $(".jxsetting-radio:eq("+i+")").find(".checkradio"+index+"").remove();
                $(".jxsetting-radio:eq("+i+")").find(".checkradio"+index+"").nextAll("input").attr("id","checkradio"+i+"")
                console.log($(".jxradio"+i+"").find(".checkradio"+index+""))

               //$(".jxradio"+i+" input:eq("+index+")").remove();
               //$(".jxsetting-radio").find("input").removeClass();
               //$(".jxsetting-radio").find("input").addClass("checkradio"+i+"");
               //  $(".jxsetting-radio:eq("+i+")").find(".checkradio"+index+"").addClass("checkradio"+i+"");

                $(".jxsetting-radio:eq("+i+") input:eq(0)").css("margin-left","0px")

            }
            //for(var i =0;i<len1;i++){
            //    var len2 = $(".jxradio0 input").length;
            //    console.log(len2)
            //    for(var j = 0;j<len2;j++){
            //        $(".jxradio"+i+"").find("input").addClass("checkradio"+j+"");
            //    }
            //
            //
            //
            //}


           var len =  $(".groupname input").length;
            for(var i = 0;i<len;i++){
             $(".groupname input:eq("+i+")").removeClass();
             $(".groupname input:eq("+i+")").addClass("name"+i+"");

            }


        })



        $(".jxsetting-close1").click(function(){
            $(".groupname .name1").nextAll("input").remove();
            $(".groupname input").val("")
            $("#show1,#mask").hide();
            $(".groupname span").remove();

        })



        //保存考核分组
        var stationGroup = {};
        var stationGroupname = {};
        var configgrouparr = [];
        $(".jxsetting-sub1").click(function(){
            var len1 = $(".box-info .groupnames").length;
                stationGroup = {};
                stationGroupname = {};
                configgrouparr = [];
            var configarr = [];
            for(var i = 0 ;i<len1;i++){
                var configgroup = {};
                var name = $.trim($(".groupnames:eq("+i+")").find("li").first("li").find("input").val());
                var stainarr = [];
                var gwnamearr = [];

                var d = $(".box-info .groupnames:eq("+i+") li").find("input").first("input").attr("achid")
                configarr.push(d)


                var len3 = $(".station li").length;
                for(var j = 0;j<len3;j++){
                    var a =  $(".box-info .groupnames:eq("+i+")").find(".num"+j+":checked").attr("staid");
                    var b =  $(".box-info .groupnames:eq("+i+")").find(".num"+j+":checked").attr("class");
                    var c = $(".station ."+b+"").text();

                    if(a !==undefined){
                        stainarr.push(a)
                    }
                    if(c !==""){
                        gwnamearr.push(c)
                    }

                }
                stationGroup[name] = stainarr;
                stationGroupname[name] = gwnamearr;

                configgroup[configarr[i]] = stainarr;
                configgrouparr.push(configgroup)
            }


            //如果有空的删除
            for(var k in stationGroup){
                if(stationGroup[k].length==0){
                    delete stationGroup[k];
                }
            }
            //如果有空的删除
            for(var k in stationGroupname){
                if(stationGroupname[k].length==0){
                    delete stationGroupname[k];
                }
            }
            console.log(configgrouparr.length)

            for(var i =0;i<len1;i++){
                for(var k in configgrouparr[i]){
                    if(configgrouparr[i][k].length==0){
                        delete configgrouparr[i][k];
                        configgrouparr.splice(i,1)
                        console.log(i)
                    }
                }
            }

            console.log(stationGroupname)
            console.log(stationGroup)
            console.log(configgrouparr)

            //显示页面
            var html = "";
            var  i = -1
            for(var k in stationGroupname ){
                i++;
                html +="<h4><span>"+k+"</span><em class='num"+i+"'>:</em></h4>";
            }
            $(".grouplistshow").html(html)

            var z = -1;
            for(var k in stationGroupname ){
                z++
                var html1 = "";
                var len = stationGroupname[k].length;
                for(var j = 0;j<len;j++){
                    html1 += "<a class='gwid"+j+"' style='margin-left: 10px;color:black;text-decoration: none'>"+stationGroupname[k][j]+"</a>";
                }
                $(".grouplistshow .num"+z+"").after(html1);
            }
            $(".grouptip").hide();


            //绑定id
            var len3 = $(".grouplistshow h4").length;
            for(var i =0;i<len3;i++){
                var z = -1
                for(var k in configgrouparr[i] ){
                    z++;
                    $(".grouplistshow h4:eq("+i+") span").attr("configid",k);
                    var len4 = configgrouparr[i][k].length;
                    for(var j = 0;j<len4;j++){
                        $(".grouplistshow h4:eq("+i+")").find(".gwid"+j+"").attr("stationid",configgrouparr[i][k][j])

                    }
                }
            }

        })






        //是否考核分组
        $(".jxsetting-showbtn .bootstrap-switch .bootstrap-switch-container").click(function(){
            if($(".jxsetting-showbtn .bootstrap-switch").hasClass("bootstrap-switch-on")){
               $(".jxsetting-groupbtn").show();
                isGroups = 0;
                $(".groupactive").show()
            }else{
                if(isgroup1==0){
                    Common.groupConfirm(function(){
                        Common.alertSuccess("操作成功，请保存")

                    })
                    $(".cancel").click(function(){
                        isGroups ==0;
                        $(".jxsetting-showbtn .bootstrap-switch-container").css("margin-left","0px");
                        $(".groupactive").show();
                        $(".jxsetting-groupbtn").show();
                        return;
                    })
                }
                $(".jxsetting-groupbtn").hide();
                isGroups = 1 ;
                $(".groupactive").hide()

            }
        })


        $(".jxsetting-showbtn .bootstrap-switch .bootstrap-switch-handle-off").click(function(){
            $(".jxsetting-groupbtn").show();
             isGroups = 0;
            $(".groupactive").show()
        })

        $(".jxsetting-showbtn .bootstrap-switch .bootstrap-switch-handle-on").click(function(){

            if(isgroup1==0){
               Common.groupConfirm(function(){
                   Common.alertSuccess("操作成功，请保存")
               })
                $(".cancel").click(function(){
                    isGroups=0;
                    $(".jxsetting-showbtn .bootstrap-switch-container").css("margin-left","0px");
                    $(".groupactive").show();
                    $(".jxsetting-groupbtn").show()
                    return;
                })
            }
            $(".jxsetting-groupbtn").hide();
            isGroups = 1 ;

            $(".groupactive").hide()

        })




        //绩效是否公开

        $(".jxsetting-checkbox .bootstrap-switch .bootstrap-switch-container").click(function(){

            if($(".jxsetting-checkbox .bootstrap-switch").hasClass("bootstrap-switch-on")){
                isPublics = 0;
            }else{
                isPublics = 1;
            }
        })

        $(".jxsetting-checkbox .bootstrap-switch .bootstrap-switch-handle-off").click(function(){
            isPublics = 0;
        })

        $(".jxsetting-checkbox .bootstrap-switch .bootstrap-switch-handle-on").click(function(){
            isPublics = 1 ;
        })


        //绩效是否自评

        $(".jxsetting-btn .bootstrap-switch .bootstrap-switch-container").click(function(){

            if($(".jxsetting-btn .bootstrap-switch").hasClass("bootstrap-switch-on")){
                isSelfs = 0;
            }else{
                isSelfs = 1;
            }
        })

        $(".jxsetting-btn .bootstrap-switch .bootstrap-switch-handle-off").click(function(){
            isSelfs = 0;
        })

        $(".jxsetting-btn .bootstrap-switch .bootstrap-switch-handle-on").click(function(){
            isSelfs = 1;
        })






        $(".saveAll").click(function(){
            console.log(isSetting)
            if(isSetting==0){
                if(isGroups==1){
                    var groupnull = {};
                    var arr = [];
                    var len = $(".setcontents span").length
                    for(var i =0;i<len;i++){
                        var stationsid = $(".setcontents span:eq("+i+")").attr("stationsid")
                        arr.push(stationsid)
                    }
                    groupnull.default = arr;

                    console.log(groupnull)


                    var datas = {
                        "gartenId":gartenId,
                        "isGroup":isGroups,
                        "isPublic":isPublics,
                        "isSelf":isSelfs,
                        stationGroup:groupnull

                    }
                    console.log(datas)
                    var data = JSON.stringify(datas)
                }else{

                    for(var k in stationGroup){
                        if(stationGroup[k].length==0){
                            delete stationGroup[k];
                        }
                    }

                    var datas = {
                        "gartenId":gartenId,
                        "isGroup":isGroups,
                        "isPublic":isPublics,
                        "isSelf":isSelfs,
                        "stationGroup":stationGroup
                    }
                    console.log(datas)

                    var data = JSON.stringify(datas)
                }

                $.ajax({
                    url:''+url+'/meritpay/achconfig/save',
                    type:'post',
                    dataType: "json",
                    contentType: 'application/json',
                    headers:{"User-Token":token},
                    data:data,
                    success:function(res){
                        if(res.result==0){
                            Common.alertSuccess(res.message)
                            //setTimeout(function(){
                            //    location.reload()
                            //},800)
                        }else{
                            Common.alertError("请设置考核分组")
                        }
                    }

                })
            }else{
                if(isGroups==1){
                    var groupnull = {};
                    var arr = [];
                    var len = $(".setcontents span").length
                    for(var i =0;i<len;i++){
                        var stationsid = $(".setcontents span:eq("+i+")").attr("stationsid")
                        arr.push(stationsid)
                    }
                    groupnull.default = arr;

                    console.log(groupnull)


                    var datas = {
                        "gartenId":gartenId,
                        "isGroup":isGroups,
                        "isPublic":isPublics,
                        "isSelf":isSelfs,
                        "configs":[
                            {
                                "stationsIds":arr
                            }
                        ]

                    }
                    console.log(datas)
                    var data = JSON.stringify(datas)
                }else{

                    var configsarr = [];

                    var len = $(".grouplistshow h4").length;
                    for(var i = 0;i<len;i++){
                        var configsobj = {};
                        var stationsidarr = [];
                        var len1 = $(".grouplistshow h4:eq("+i+")").find("a").length;
                        var achcon = $(".grouplistshow h4:eq("+i+")").find("span").attr("achconfigid");
                        if(achcon==undefined){

                        }else{
                            configsobj.achConfigId = achcon;
                        }
                        configsobj.configName = $(".grouplistshow h4:eq("+i+")").find("span").text();
                        configsarr.push(configsobj)

                       // console.log($(".grouplistshow h4:eq("+i+")").find("span").attr("achconfigid"));

                        for(var j=0;j<len1;j++){
                           var stations = $(".grouplistshow h4:eq("+i+")").find(".station"+j+"").attr("stationid");

                            stationsidarr.push(stations);
                        }


                        configsobj.stationsIds = stationsidarr;


                    }
                    console.log(configsarr)
                    if(configsarr.length==0){
                        Common.alertError("请设置考核分组");
                    }else{
                        var datas = {
                            "gartenId":gartenId,
                            "isGroup":isGroups,
                            "isPublic":isPublics,
                            "isSelf":isSelfs,
                            "configs":configsarr
                        }

                        var data = JSON.stringify(datas)
                        console.log(datas)
                    }


                }

                $.ajax({
                   url:''+url+'/meritpay/achconfig/update',
                    type:'post',
                    dataType: "json",
                    contentType: 'application/json',
                    headers:{"User-Token":token},
                    data:data,
                    success:function(res){
                        if(res.result==0){
                            Common.alertSuccess(res.message)
                        }else{
                            Common.alertError(res.message)
                        }
                    }
                })


            }




        })



    })()


})
