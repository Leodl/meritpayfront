/**
 * Created by Leo on 2017/11/15.
 */
$(function(){
    var sessioninfo = sessionStorage.getItem("teacher");
    var data =  eval('(' + sessioninfo + ')');
    //var token = data.token;
    //var gartenId =data.gartenid;
    var gartenId =5;
    var url = Constants.ROOT_URLJX
    var token ="eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTI1NDg0MTYsInVzZXJJZCI6MTAwMywidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi5ZC05aSn5Li9In0.-ewx0nluvNflyX93FuvHOT0eUbvBi47PWGTHzqxUGiM"




    //获取人员
    var userlen = Number();
    function getusers(){
        var data = {
            "gartenid":gartenId
        }
        var datas = JSON.stringify(data)
        $.ajax({
            url:'http://106.15.137.203/meritpay/roster/get/1/1000000',
            type:'post',
            dataType: "json",
            headers:{"User-Token":token},
            contentType: 'application/json',
            data:datas,
            async: false,
            success:function(res){
                console.log(res)
                var data = [];
                var len = res.data.length;
                userlen = res.data.length;
                for(var i = 0;i<len;i++){
                    if(datas[i].dimissionstatus==2){
                        data.push(datas[i])
                    }
                }
                var len3 = data.length;
                var html = ""
                for(var i = 1;i<len3;i++){
                  html +="<li>" +
                      "<p><span class='byname num"+data[i].userid+"' byuserid="+data[i].userid+">"+data[i].username+"</span></p>" +
                      "<select  class='tmpsel'><option>请选择</option><option class='nojoin num0' value='0' >不参与考核</option></select>" +
                      "<select  class='selsearch'><option class='user0' value='0'>请选择</option></select>"+
                      "</li>"
                }
                $(".jxcheck-setting ul").append(html);
                var htmloption = "";
                var len1 = $(".byname").length;
                for(var i = 0;i<len1;i++){
                   for(var j = 0;j<len3;j++){
                       htmloption ="<option class='user"+data[j].userid+"' value="+data[j].userid+">"+data[j].username+"</option>";
                       $(".selsearch:eq("+i+")").append(htmloption);
                   }
                }
            }
       })
    }
    getusers();

    //获取模板
    function getTmp(){
        var data = {
            "gartenId":gartenId,
            "status":0
        }
        var datas = JSON.stringify(data)
        $.ajax({
            url:''+url+'/meritpay/template/get',
            type:'post',
            data:datas,
            contentType: 'application/json',
            headers:{"User-Token":token},
            success:function(res){
                console.log(res)
                if(res.data.length==0){

                }else{
                    var data = res.data;
                    var len = res.data.length;
                    var tmpoption = "";
                    var len1 = $(".byname").length;
                    for(var i = 0;i<len1;i++){
                        for(var j = 0;j<len;j++){
                            tmpoption ="<option class='num"+data[j].templateId+"' value="+data[j].templateId+">"+data[j].templateName+"</option>";
                            $(".tmpsel:eq("+i+")").append(tmpoption);
                        }
                    }
                }
                $('.selsearch').searchableSelect();
                $('.tmpsel').nosearchableSelect();

            }

        })
    }
    getTmp();


    //获取人员模板关系
    function usertmp(){
        $.ajax({
            url:''+url+'/meritpay/usertemplate/get/'+gartenId+'',
            type:'get',
            headers:{"User-Token":token},
            success:function(res){
                console.log(res)
                if(res.data.length !==0){
                    var data = res.data;
                    var len = data.length;

                    for(var i = 0;i<len;i++){
                        var thisli = $(".checkul .num"+data[i].forUserId+"").parent().parent()
                        thisli.find(".tmpsel").find(".num"+data[i].templateId+"").attr("selected","selected");
                        var tmptext = thisli.find(".tmpsel").find(".num"+data[i].templateId+"").text();
                        var tmpdiv = thisli.find(".searchable-select").first(".searchable-select").find(".searchable-select-holder");
                        thisli.find(".searchable-select").first(".searchable-select").find(".searchable-select-holder").text(tmptext);

                        thisli.find(".selsearch").find(".user"+data[i].gradeUserId+"").attr("selected","selected");
                        var usertext = thisli.find(".selsearch").find(".user"+data[i].gradeUserId+"").text()
                        thisli.find(".searchable-select").last(".searchable-select").find(".searchable-select-holder").text(usertext);


                        var userdiv = $(".checkul li:eq("+i+")").find(".searchable-select").last(".searchable-select").find(".searchable-select-holder");
                        var tmp = $(".checkul li:eq("+i+")").find(".searchable-select").first(".searchable-select").find(".searchable-select-holder");
                        var dropdomndiv = $(".checkul li:eq("+i+")").find(".searchable-select").last(".searchable-select").find(".searchable-select-dropdown");
                        if(tmpdiv.text()==""){
                            tmpdiv.text("请选择");
                            thisli.find(".searchable-select").last(".searchable-select").find(".searchable-select-holder").text("请选择");
                            thisli.find(".selsearch").find(".user0").attr("selected","selected");
                        }

                        if(tmp.text()=="不参与考核"&&userdiv.text()=="请选择"){
                            console.log(1)
                            userdiv.css("background","#c3c3c3");
                            dropdomndiv.hide();
                        }

                    }
                    var lasttmp = $(".checkul").find("li").last("li").find(".searchable-select").first(".searchable-select").find(".searchable-select-holder");
                    var lastuser = $(".checkul").find("li").last("li").find(".searchable-select").last(".searchable-select").find(".searchable-select-holder");
                    if(lasttmp.text()=="不参与考核"&&lastuser.text()=="请选择"){
                        console.log(1)
                        lastuser.css("background","#c3c3c3");
                        dropdomndiv.hide();
                    }

                   if(userlen>len){
                       $(".jxsetting-save button").show()
                   }else{
                       $(".jxsetting-save button").hide()
                   }
                }


            }

        })
    }
    usertmp()

    //保存
    function save(){
        var jxsettingArr = [];
     var len = $(".byname").length;
        for(var i =0;i<len;i++){
            var jxlist = {};
            var byuserid = Number( $(".checkul .byname:eq("+i+")").attr("byuserid"));
            var tmpid = $(".checkul .tmpsel:eq("+i+")").find("option:selected").val();
            var userid = Number($(".checkul .selsearch:eq("+i+")").find("option:selected").val());

            if(tmpid !=="0"){
                if(tmpid==undefined){
                    Common.alertError("请选择模板");
                    return;
                }
                if(userid==0){
                    Common.alertError("请选择评分人");
                    return;
                }
            }
            jxlist.forUserId = byuserid;
            jxlist.gradeUserId = userid;
            jxlist.templateId = tmpid;
            jxsettingArr.push(jxlist);


        }

        console.log(jxsettingArr)
        var datas = JSON.stringify(jxsettingArr);
        $.ajax({
            url:''+url+'/meritpay/usertemplate/save',
            type:'post',
            data:datas,
            contentType:'application/json',
            headers:{"User-Token":token},
            success:function(res){
                if(res.result==0){
                    Common.alertSuccess(res.message);
                    $(".jxsetting-save button").hide()
                }else{
                    Common.alertError("保存失败")
                }
            }

        })

    }



    $(".saveAll").click(function(){
         save();
    });

    //收起
    $(".jxcheck-setting .shouqi").click(function(){
        $(".jxcheck-setting .checkul").stop().toggle(300);
    })



    //功能设置

    var ispublic = Number(1);
    var isself = Number(1);

    function getsetting(){
        $.ajax({
            url:''+url+'/meritpay/achconfig/get',
            type:'get',
            async:false,
            headers:{"User-Token":token},
            success:function(res){
                if(res.data.length !==0){
                    var isSelf = res.data[0].isSelf;
                    var isPublic = res.data[0].isPublic;

                    if(isPublic==0){
                        $(".jxsetting-checkbox .bootstrap-switch-container").css("margin-left","0px")
                        ispublic = 0;
                    }
                    if(isSelf==0){
                        $(".jxsetting-btn .bootstrap-switch-container").css("margin-left","0px")
                        isself =0;
                    }
                }

            }
        })
    }
    getsetting();


    function onoff(){
        var data = {
            "gartenId":gartenId,
            "isPublic":ispublic,
            "isSelf":isself
        }
        console.log(data)
        var datas = JSON.stringify(data);
        $.ajax({
            url:''+url+'/meritpay/achconfig/save',
            type:'post',
            data:datas,
            contentType:'application/json',
            headers:{"User-Token":token},
            success:function(res){
                if(res.result==0){
                    Common.alertSuccess("操作成功")
                }else{
                    Common.alertError("操作失败")
                }
            }

        })
    }

   //是否公开
    $(".jxsetting-checkbox .bootstrap-switch .bootstrap-switch-container").click(function(){

        if($(".jxsetting-checkbox .bootstrap-switch").hasClass("bootstrap-switch-on")){
            ispublic = Number(0)
            onoff();
        }else{
            ispublic = Number(1)
            onoff();
        }
    })

    $(".jxsetting-checkbox .bootstrap-switch .bootstrap-switch-handle-off").click(function(){
        ispublic = Number(0)
        onoff()
    })

    $(".jxsetting-checkbox .bootstrap-switch .bootstrap-switch-handle-on").click(function(){
        ispublic = Number(1)
        onoff()
    })


    //绩效是否自评

    $(".jxsetting-btn .bootstrap-switch .bootstrap-switch-container").click(function(){

        if($(".jxsetting-btn .bootstrap-switch").hasClass("bootstrap-switch-on")){
            isself = Number(0)
            onoff()
        }else{
            isself = Number(1)
            onoff()
        }
    })

    $(".jxsetting-btn .bootstrap-switch .bootstrap-switch-handle-off").click(function(){
        isself = Number(0)
        onoff()
    })

    $(".jxsetting-btn .bootstrap-switch .bootstrap-switch-handle-on").click(function(){
        isself = Number(1)
        onoff()
    })








})
