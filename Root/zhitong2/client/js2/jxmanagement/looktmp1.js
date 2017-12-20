/**
 * Created by Leo on 2017/11/16.
 */
$(function(){
    // var url = 'http://forchild.zhitong.group';

    var host = window.location.host;
    var test = window.location.protocol;
    //var url = test+"//"+host;

    //获取session
    var sessioninfo = sessionStorage.getItem("teacher");
    var data =  eval('(' + sessioninfo + ')');
    //var token = data.token;
    //var gartenId = data.gartenid;
    var gartenId = 4;


    var url = 'http://106.15.137.203';
    var token ="eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTI1NDg0MTYsInVzZXJJZCI6MTAwMywidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi5ZC05aSn5Li9In0.-ewx0nluvNflyX93FuvHOT0eUbvBi47PWGTHzqxUGiM"

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
    var brandname = getUrlParam("templateId");
    var flag = getUrlParam("flag");
    var index = getUrlParam("index")
    console.log(brandname)

    var data = {
        "templateId":brandname
    }
    var datas = JSON.stringify(data)

    //开启后编辑
    if(flag=="0"){
        $("#edit").remove()
    }

    $.ajax({
        url:''+url+'/meritpay/template/get',
        type:'post',
        dataType: "json",
        headers:{"User-Token":token},
        contentType: 'application/json',
        data:datas,
        success:function(res){

            var templateId ="";
            var status = "";
            console.log(res);
            var achConfigId = "";
            var templateName = "";
            var datalen = res.data.length;
            for(var k = 0;k<datalen;k++){

                templateId = res.data[k].templateId;
                achConfigId = res.data[k].achConfigId;
                templateName = res.data[k].templateName;
                status = res.data[k].status;

                var title = "<p><span class='tmpName'>"+res.data[k].templateName+"</span></p>"; //渲染标题
                if(res.data[k].status ==1){
                    $(".looktmp-top .start").text("启用");
                }


                //停用
                if(res.data[k].status==0){
                    if(flag==0){

                    }else{
                        $(".looktmp-top .start").text("停用");
                        $(".looktmp-top a").addClass("stop").removeClass("start");
                        $(".looktmp-top .stop").click(function(){

                            Common.stopConfirm(function(){

                                var status = Number(1)
                                $.ajax({
                                    url: '' + url + '/meritpay/template/updateStatus/' + brandname + '/' + status + '',
                                    type: 'put',
                                    contentType: 'application/json',
                                    headers: { "User-Token": token },
                                    success: function(res) {
                                        if (res.result == 0) {
                                            Common.alertSuccess("已停用");
                                            $(".looktmp-top .tip").text("");
                                            $(".looktmp-top .stop").text("启用");
                                            $(".looktmp-top a").addClass("start").removeClass("stop");
                                            setTimeout(function(){
                                                location.reload()
                                            },800)
                                        } else {
                                            Common.alertError(res.message)
                                        }
                                    }
                                })

                            })

                        })
                    }

                    }else{
                        $(".looktmp-top a").addClass("start").removeClass("stop");
                        $(".looktmp-top .tip").text("");
                        $(".looktmp-top .start").text("启用");
                    }






               //渲染页面
                $(".looktmp-top p").before(title)

                var typeNameslen =res.data[k].typeNames.length;

                for(var i = 0;i<typeNameslen;i++){
                    var criterionslen = res.data[k].typeNames[i].criterions.length;
                    var typeName = res.data[k].typeNames[i].typeName

                    var html="<tbody class='num"+i+"' style='width:100%'>" +
                        "<tr><td rowspan='1000'><span class='typename'>"+typeName+"</span>" +
                        "<em class='per'></em><i>%</i>"+
                        "</td>"+
                        "</tr>" +
                        "</tbody>"

                    $("#table1").append(html);
                    console.log(html)
                    var explorer =navigator.userAgent ;
//ie
                    if (explorer.indexOf("MSIE") >= 0) {
                        var len = $(".num"+i+"")[0].getElementsByTagName("tr").length-1;
                        $("#table1 .num"+i+"").find("tr").first("tr").find("td").attr("rowspan",len)
                    }
//firefox
                    else if (explorer.indexOf("Firefox") >= 0) {
                        var len = $(".num"+i+"")[0].getElementsByTagName("tr").length-1;
                        $("#table1 .num"+i+"").find("tr").first("tr").find("td").attr("rowspan",len)
                    }
//Chrome
                    else if(explorer.indexOf("Chrome") >= 0){

                    }
//Opera
                    else if(explorer.indexOf("Opera") >= 0){

                    }
//Safari
                    else if(explorer.indexOf("Safari") >= 0){

                    }
//Netscape


                    for(var j = 0;j<criterionslen;j++){
                        var criterionContent = res.data[k].typeNames[i].criterions[j].criterionContent;
                        var score = res.data[k].typeNames[i].criterions[j].score
                        var contents = "";
                        contents+="<tr><td class='content'>"+criterionContent+"</td>" +
                            "<td class='score'>"+score+"</td>"+
                            "</tr>"
                        $(".num"+i+"").append(contents);

                    }
                }

                //渲染百分数
                var len = $("#table1 tbody").length;
                var tbodys = document.getElementsByTagName("tbody")
                for(var i =0;i<len;i++){
                    var trslen = tbodys[i].getElementsByClassName("score").length;
                    var score =0;
                    for(var j = 0;j<trslen;j++){
                        var pernum = parseInt(tbodys[i].getElementsByClassName("score")[j].innerText);
                        score+=pernum;
                    }
                    tbodys[i].getElementsByClassName("per")[0].innerText=score
                }

            }


            //计算和
            var totalpernum =0;
            var totalscore = 0;
            $(".per").each(function(){
                var perval = parseInt($(this).text());
                totalpernum+=perval;
            })
            $(".score").each(function(){
                if($(this).text()=="") {
                    return;
                }else{
                    var scorval = parseInt($(this).text())
                    totalscore+=scorval;
                }
            })
            $(".looktmp-foot .left span").text(totalpernum+"%");
            $(".looktmp-foot .right span").text(totalscore);



            //保存为自己
            function saveown(){
                var templateName = $(".looktmp-top p span").text();
                var data1 = {};
                var criterions1 = [];
                var len = $("#table1 tbody").length
                for(var i = 0;i<len;i++){
                    var typeName = $(".num"+i+"").find("tr").first("tr").find("td").find("span").text();
                    var trslen = $(".num"+i+"").find("tr").length-1;

                    for(var j = 0;j<trslen;j++){
                        var list  ={};
                        var index = j+1
                        var criterionContent = $(".num"+i+" tr:eq("+index+")").find("td").first("td").text();
                        var score =parseInt($(".num"+i+" tr:eq("+index+")").find("td").last("td").text())

                        list.typeName=typeName;
                        list.criterionContent = criterionContent;
                        list.score = score;
                        list.templateId = templateId;
                        criterions1.push(list)

                    }
                }


                data1.criterions = criterions1;
                data1.gartenId = gartenId;
                data1.templateName = templateName;
                data1.templateId = templateId;


                console.log(data1)

                var datas = JSON.stringify(data1)

                $.ajax({
                    url:''+url+'/meritpay/template/save',
                    type:'post',
                    contentType: 'application/json',
                    dataType: "json",
                    headers:{"User-Token":token},
                    data:datas,
                    success:function(res){
                        console.log(res)
                        if(res.result==0){
                            Common.alertSuccess(res.message);
                            setTimeout(function(){
                                window.history.go(-1)
                            },800)

                        }

                    }
                })
            }




            //开启操作
            $(".start").click(function(){
                var totalscore = 0;
                $(".score").each(function(){
                    var scorval = parseInt($(this).text())
                    totalscore+=scorval
                })
                if(totalscore!==100){
                    Common.alertError("总分必须等于100%才能启用");
                    return;
                }else{
                    var status = Number(0);
                    $.ajax({
                        url: '' + url + '/meritpay/template/updateStatus/' + brandname + '/' + status + '',
                        type: 'put',
                        contentType: 'application/json',
                        headers: { "User-Token": token },
                        success:function(res){
                            console.log(res)

                            if(res.result==0){
                                Common.alertSuccess("启用成功");

                                if(flag==0){
                                    saveown()
                                }else{
                                    $(".start").text("停用");
                                    $(".looktmp-top a").addClass("stop").removeClass("start");
                                    setTimeout(function(){
                                        location.reload()
                                    },800)

                                }


                            }else{
                                Common.alertError("操作失败")
                            }

                        }
                    })
                }

            })



            //点击编辑
            $("#edit").click(function(){
                if(flag==0){
                    $(this)[0].href="edittmp1.html?templateId="+templateId+"&flag=0";
                }else{
                        $(this)[0].href="edittmp1.html?templateId="+templateId+"&index="+index+"";
                }

            })


        }

    })







})
