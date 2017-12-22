$(function(){
    var url = Constants.ROOT_URLJX

    //var url = 'http://forchild.zhitong.group';
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
    var rosterId = getUrlParam("userId");
    var dateText = getUrlParam("date");


    //获取session
    var sessioninfo = sessionStorage.getItem("teacher");
    var data =  eval('(' + sessioninfo + ')');
    //var token = data.token;
    //var name = data.username;
    //var userId = data.userid;
     var userId = 100186;
     var name = "老师"

    var token ="eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTM0MDg0NzgsInVzZXJJZCI6MTAwMywidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi5ZC05aSn5Li9In0.F41vN3fneSAVU6fcDQA1c25xvgC9pwokpvlHWwohi-0"


    //月份标题
    var titleYear = dateText.substring(0,4);
    var titleMonths = dateText.substring(5,6);
    var titleMonth =dateText.substring(5,7);
    if(titleMonths==0){
        titleMonth = dateText.substring(6,7);
    }
    console.log(titleYear,titleMonth)
    var titledate = titleYear+"年"+titleMonth+"月绩效"
    $(".caption .caption-subject").text(titledate);
    $(".jxcheckshow-title").find("span").first("span").text(titledate);
    $(".jxcheckshow-title").find("span").last("span").text(name);


    var data = {};
    data.createDate = dateText;
    data.gradeRosterId = rosterId;
    data.gradeType = 0;
    var datas = JSON.stringify(data)
    
$.ajax({
    url:''+url+'/meritpay/rostercriterion/getGradeResultByWhere',
    type:'post',
    dataType: "json",
    headers:{"User-Token":token},
    contentType: 'application/json',
    data:datas,
    success:function(res){
        console.log(res)
        if(res.hasOwnProperty("data")){
            var infohtml = res.data[dateText][0].info;
            $("#table1").html(infohtml);
            $(".save").remove();

            //计算总和和总分
            function countTotal(){
                var totalscore = 0;

                $(".td").each(function(){
                    if($(this).text()=="") {
                        return;
                    }else{
                        var scorval = parseInt($(this).text())
                        totalscore+=scorval;
                    }
                })
                $(".total .right span").text(totalscore);
            }
            countTotal()
        }else{
            $.ajax({
                url:''+url+'/meritpay/template/getByUserId/'+rosterId+'',
                type:'get',
                dataType: "json",
                success:function(res){
                     console.log(res)
                    if(res.result==-1){
                        Common.alertError(res.message);
                        return;
                    }
                    var title = "<p><span>"+res.data.templateName+"</span></p>"; //渲染标题
                    $(".looktmp-top p").before(title)

                    var typeNameslen =res.data.typeNames.length;
                    for(var i = 0;i<typeNameslen;i++){
                        var criterionslen = res.data.typeNames[i].criterions.length;
                        var typeName = res.data.typeNames[i].typeName

                        var html="<tbody class='num"+i+"' style='width:100%'>" +
                            "<tr><td rowspan='1000'><span class='typename'>"+typeName+"</span>" +
                            "<em class='per per"+i+"'></em><i>%</i>"+
                            "</td>"+
                            "</tr>" +
                            "</tbody>"

                        $("#table1").append(html);
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
                            $("#table1 .num"+i+"").find("tr").first("tr").find("td").attr("rowspan",1000)
                        }
//Opera
                        else if(explorer.indexOf("Opera") >= 0){

                        }
//Safari
                        else if(explorer.indexOf("Safari") >= 0){
                            $("#table1 .num"+i+"").find("tr").first("tr").find("td").attr("rowspan",1000)
                        }
//Netscape


                        for(var j = 0;j<criterionslen;j++){
                            var criterionContent = res.data.typeNames[i].criterions[j].criterionContent;
                            var score = res.data.typeNames[i].criterions[j].score
                            var contents = "";
                            contents+="<tr><td class='content'>"+criterionContent+"</td>" +
                                "<td class='score'>"+score+"</td>"+
                                "<td class='td"+j+" td'><input class='hitscore self"+j+"' type='text' placeholder='请打分'></td>"
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



                    //计算和
                    $(".hitscore").blur(function(){
                        var totalscore = 0;
                        $(".hitscore").each(function(){
                            if($(this).val()=="") {
                                return;
                            }else{
                                var scorval = parseInt($(this).val())
                                totalscore+=scorval;
                            }
                        })
                        $(".total .right span").text(totalscore);
                    })

                    $("#table1 .hitscore").keyup(function(){
                        var biaoscore = Number($(this).parent().parent().find(".score").text());
                        var score = Number($(this).val())
                        console.log(score)
                        if(score>biaoscore){
                            Common.alertError("分值不能大于标准分");
                        }

                    })



                    //提交
                    $(".save button").click(function(){
                        var info = {};
                        var typeNameslen =res.data.typeNames.length;
                        for(var i = 0;i<typeNameslen;i++){
                            var criterionslen = res.data.typeNames[i].criterions.length;

                            // $("#table").append(html)
                            for(var j = 0;j<criterionslen;j++){
                                var selfscore =$(".num"+i+" .self"+j+"").val();
                                $(".num"+i+" .td"+j+"").text(selfscore);

                                var criterionId = res.data.typeNames[i].criterions[j].criterionId;
                                info[criterionId] = Number( $(".num"+i+" .td"+j+"").text());
                            }

                        }

                        var data = {};
                        var jsonhtml = $("#table1").html();
                        var totalscore = Number($(".right span").text());
                        data.addRosterId =userId;
                        data.createDate = dateText;
                        data.forRosterId =userId;
                        data.gradeUser =userId;
                        data.info = info;
                        data.isSelf = 0;
                        data.resultJson = jsonhtml;
                        data.totalscore = totalscore;

                        console.log(data)
                        console.log(jsonhtml)

                        var datas = JSON.stringify(data)

                        $.ajax({
                            url:''+url+'/meritpay/rostercriterion/save',
                            type:'post',
                            dataType: "json",
                            headers:{"User-Token":token},
                            contentType: 'application/json',
                            data:datas,
                            success:function(res){
                                console.log(res)
                                if(res.result==0){
                                    Common.alertSuccess("保存成功")

                                }else{
                                    Common.alertError(res.message)

                                }
                            }

                        })



                    })


                }


            })
        }
    }

})







})