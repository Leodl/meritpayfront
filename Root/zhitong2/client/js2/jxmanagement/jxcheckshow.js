
$(function(){
   // var url = 'http://forchild.zhitong.group';

    var host = window.location.host;
    var test = window.location.protocol;
    //var url = test+"//"+host;


    //获取session
    var sessioninfo = sessionStorage.getItem("teacher");
    var data = eval('(' + sessioninfo + ')');
   // var usertype = data.usertype;
    //var gartenId =data.gartenid;
    var gartenId =5;
    var usertype = 1;
    //var token = data.token;

    var url = 'http://106.15.137.203';
    var token ="eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTMyNDE2MzcsInVzZXJJZCI6MTAwMywidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi5ZC05aSn5Li9In0.Mw_RFT-J2f9rVZ-wnOJjJtV2KbL8jTWoJ2teEFWxXiQ"

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

    var rosterId = Number(getUrlParam("userId"));
    //var rosterId = 1057;
    var dateText = getUrlParam("date");

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




    //获取绩效设置
      var self = Number(1);
    $.ajax({
        url:''+url+'/meritpay/achconfig/get',
        type:'get',
        async: false,
        headers:{"User-Token":token},
        success:function(res){
            console.log(res)
            if(res.data.length !==0){
                console.log(res)
                self = res.data[0].isSelf;
            }
        }
    })


    //获取上下级关系




    //园长看到所有老师的绩效
    var childidarr1=[];
    var ids = Number();
    var userids = Number();
    var loweruserid = [];
    var childidarr = [];
    var firstchildId = Number();

    if(usertype==1){

        $.ajax({
            url:''+url+'/meritpay/stations/get/'+gartenId+'',
            type:'get',
            async: false,
            headers:{"User-Token":token},
            success:function(res){
                console.log(res)
                var datas = res.data;
                var len = datas.length;
                var html = "";
                for(var i = 0;i<len;i++){
                  var len1 = datas[i].users.length;
                   for(var j = 0;j<len1;j++){
                       var username = datas[i].users[j].username;
                       var childId = datas[i].users[j].userid;
                       childidarr1.push(childId)
                       userids = datas[1].users[0].userid;
                       html +="<li class='pernum"+i+"' childId="+childId+"><span>"+username+"</span></li>"
                   }
                }
                ids = datas[1].users[0].userid;
                console.log(html)
                $(".jxcheckshow-name ul").html(html);
                $(".jxcheckshow-name li:eq(0)").remove();
                $(".jxcheckshow-name li:eq(0)").addClass("jxcheckshow-active");
                firstchildId = $(".jxcheckshow-name li:eq(0)").attr("childid");
                var firstName = $(".jxcheckshow-name li:eq(0)").find("span").first("span").text();
                $(".jxcheckshow-title p").find("span").last("span").text(firstName)

            }
        })

        $.ajax({
            url:''+url+'/meritpay/roster/getUserStationsInfo/'+rosterId+'',
            type:'get',
            async: false,
            headers:{"User-Token":token},
            success:function(res){

                if(res.data=="{}"){
                    Common.alertError("请先设置组织架构");
                    return;
                }else{
                    var datajs = res.data;
                    var data =  eval('(' + datajs + ')');
                    var children = data.childUsers;
                    for(var k in children){
                        loweruserid.push(k);
                        childidarr.push(k)
                    }

                }

                ////每个人的分数
                if(usertype==1){
                    childidarr = childidarr1
                }
                console.log(childidarr)
                for(var i = 0;i<childidarr.length;i++){
                    var perdata = {};
                    perdata.createDate = dateText;
                    perdata.forRosterId=childidarr[i];
                    perdata.gradeType=1;

                    var perdatas = JSON.stringify(perdata)
                    $.ajax({
                        url:''+url+'/meritpay/rostercriterion/getGradeResultByWhere',
                        type:'post',
                        dataType: "json",
                        headers:{"User-Token":token},
                        contentType: 'application/json',
                        data:perdatas,
                        success:function(res){
                            console.log(res)
                            if(res.hasOwnProperty("data")){
                                var data = res.data[dateText];
                                var len = $(".jxcheckshow-name ul li").length;
                                console.log(len)
                                for(var i =0;i<data.length;i++){
                                    var forrostid = data[i].forRosterId;
                                    for(var j = 0;j<=len;j++){
                                        var childid= $(".pernum"+j+"").attr("childid")

                                        if(forrostid==childid){
                                            var spanscore = "<span>"+data[i].totalScore+"</span>"
                                            $(".pernum"+j+"").append(spanscore)
                                        }
                                    }
                                }
                            }

                        }

                    })
                }


            }
        })


    }else{

        var nameid = [];
        $.ajax({
            url:''+url+'/meritpay/roster/getUserStationsInfo/'+rosterId+'',
            type:'get',
            async: false,
            headers:{"User-Token":token},
            success:function(res){

                if(res.data=="{}"){
                    Common.alertError("请先设置组织架构");
                    return;
                }else{
                    var datajs = res.data;
                    var data =  eval('(' + datajs + ')');
                    var children = data.childUsers;
                    var childrenName = ""
                    console.log(children)
                    var i = -1;
                    for(var k in children){
                        i++;
                        childrenName +="<li class='pernum"+i+"' childId="+k+"><span>"+children[k]+"</span></li>";
                        nameid.push(k)
                        childidarr.push(k)
                    }

                    $(".jxcheckshow-name ul").html(childrenName);
                    $(".jxcheckshow-name li:eq(0)").addClass("jxcheckshow-active");
                    firstchildId = $(".jxcheckshow-name li:eq(0)").attr("childid");
                    var firstName = $(".jxcheckshow-name li:eq(0)").find("span").first("span").text();
                    $(".jxcheckshow-title p").find("span").last("span").text(firstName)
                }

            }
        })

        var nameid = nameid[0];
         ids = Number(nameid)


        //每个人的分数
        for(var i = 0;i<childidarr.length;i++){
            var perdata = {};
            perdata.createDate = dateText;
            perdata.forRosterId=childidarr[i];
            perdata.gradeType=1;

            var perdatas = JSON.stringify(perdata)
            $.ajax({
                url:''+url+'/meritpay/rostercriterion/getGradeResultByWhere',
                type:'post',
                dataType: "json",
                headers:{"User-Token":token},
                contentType: 'application/json',
                data:perdatas,
                success:function(res){
                    console.log(res)
                    if(res.hasOwnProperty("data")){
                        var data = res.data[dateText];
                        var len = $(".jxcheckshow-name ul li").length;
                        console.log(len)
                        for(var i =0;i<data.length;i++){
                            var forrostid = data[i].forRosterId;
                            for(var j = 0;j<=len;j++){
                                var childid= $(".pernum"+j+"").attr("childid")

                                if(forrostid==childid){
                                    var spanscore = "<span>"+data[i].totalScore+"</span>"
                                    $(".pernum"+j+"").append(spanscore)
                                }
                            }
                        }
                    }

                }

            })
        }


    }





    $.ajax({
        url:''+url+'/meritpay/template/getByUserId/'+ids+'',
        type:'get',
       //async: false,
        headers:{"User-Token":token},
        success:function(res){
            console.log(res)
            if(res.result ==-1){
                Common.alertError(res.message);
                $("#table1 tbody").remove();
                $(".total,.save").hide();
               // return;
            }else{

                $(".total,.save").show();
                var title = "<p><span>"+res.data.templateName+"</span></p>"; //渲染标题
                $(".looktmp-top p").before(title)


                function allhtml(){
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


                        function jianrong(){
                            var explorer =navigator.userAgent;
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
                        }
                        jianrong();



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

                    //判断是否自评了
                    if(self ==0){
                        $("#table1 .hitscore").click(function(){
                            var datascore = {};
                            datascore.createDate = dateText;
                            datascore.gradeType = 0;
                            datascore.rosterId =1004;
                            var datascores = JSON.stringify(datascore)
                            $.ajax({
                                url:''+url+'/meritpay/rostercriterion/getCriterionInfo',
                                type:'post',
                                dataType: "json",
                                headers:{"User-Token":token},
                                contentType: 'application/json',
                                data:datascores,
                                success:function(res){
                                    //显示自评
                                    var len = res.data.length
                                    if(len==0){
                                        Common.alertError("该老师没有自评，不能打分")
                                    }

                                }


                            })


                        })
                    }



                }
                allhtml();


                function ajaxnameshow(nameID){
                    var name = nameID;

                    var data = {};
                    data.createDate = dateText;
                    data.forRosterId = name;
                    var datas = JSON.stringify(data)
                    $.ajax({
                        url:''+url+'/meritpay/rostercriterion/getGradeResultByWhere',
                        type:'post',
                        dataType: "json",
                        headers:{"User-Token":token},
                        contentType: 'application/json',
                        data:datas,
                        success:function(res){

                            function selfscoreShow(){
                                var datascore = {};
                                datascore.createDate = dateText;
                                datascore.gradeType = 0;
                                datascore.rosterId =nameID;
                                var datascores = JSON.stringify(datascore)

                                $.ajax({
                                    url:''+url+'/meritpay/rostercriterion/getCriterionInfo',
                                    type:'post',
                                    dataType: "json",
                                    headers:{"User-Token":token},
                                    contentType: 'application/json',
                                    data:datascores,
                                    success:function(res){
                                        console.log(res)
                                        //显示自评


                                        var len = res.data.length
                                        if(len>1){
                                            var selfarr = [];
                                            for(var i = 0;i<len;i++){
                                                var theadself = "<td class='myself'>自评分数</td>"
                                                var selfscorehtml = "<td class='myselfscore'>"+res.data[i].selfScore+"</td>";
                                                selfarr.push(selfscorehtml);
                                                //console.log(selfscorehtml)
                                            }
                                            $(".titlescore").after(theadself)
                                            $(".td").each(function(i){
                                                $(this).before(selfarr[i]);
                                            })
                                        }

                                    }


                                })
                            }


                            if(res.hasOwnProperty("data")){
                                if(res.data[dateText].length==1){ //只有被打过分的
                                    if(res.data[dateText][0].gradeType==1){
                                        var other = res.data[dateText][0].info
                                        $("#table1").html(other);
                                        countTotal();
                                        var len = $("#table1 tbody").length;
                                        console.log(len)
                                        for(var i = 0;i<=len;i++){

                                            var explorer =navigator.userAgent;
//ie
                                            if (explorer.indexOf("MSIE") >= 0) {
                                                $("#table1 .num"+i+"").find("tr").first("tr").find("td").attr("rowspan",0)
                                            }
//firefox
                                            else if (explorer.indexOf("Firefox") >= 0) {
                                                $("#table1 .num"+i+"").find("tr").first("tr").find("td").attr("rowspan",0)
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

                                        }

                                    }else{   //只有自评显示自评
                                        if($(".myself").text()=="自评分数"){
                                            return;
                                        }else{
                                            $("#table1").find("tbody").remove();
                                            $(".total .right span").text("");
                                            allhtml();
                                            selfscoreShow();
                                        }

                                    }
                                }else {  //自评他评都有
                                    var other = res.data[dateText][1].info
                                    $("#table1").html(other);
                                    countTotal()

                                    if( !$("thead tr td:eq(3)").hasClass("myself")){
                                        selfscoreShow();
                                    }


                                    var len = $("#table1 tbody").length;
                                    for(var i = 0;i<=len;i++){

                                        var explorer =navigator.userAgent;
//ie
                                        if (explorer.indexOf("MSIE") >= 0) {
                                            $("#table1 .num"+i+"").find("tr").first("tr").find("td").attr("rowspan",0)
                                        }
//firefox
                                        else if (explorer.indexOf("Firefox") >= 0) {
                                            $("#table1 .num"+i+"").find("tr").first("tr").find("td").attr("rowspan",0)
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

                                    }

                                }

                            }else{

                                $(".myself").remove();
                                $(".myselfscore").remove();
                                $("#table1").find("tbody").remove();
                                $(".total .right span").text("");
                                if(ids==firstchildId){
                                    // $("#table1").find("tbody").remove();
                                    allhtml();

                                }

                            }

                        }


                    })
                }

                ajaxnameshow(firstchildId);

                var lowerlen = loweruserid.length;
                console.log(ids)
                console.log(loweruserid)
                for(var i =0;i<lowerlen;i++){
                    if(ids ==Number(loweruserid[i])){
                        $(".hitscore").attr("disabled",false)
                        return false;
                    }else{
                        $(".hitscore").attr("disabled","disabled")

                    }
                }


            }





        }



    })



    //点击人员
    $(".jxcheckshow-name ul").on('click','li',function(){

        var id = Number($(this).attr("childId"))
        console.log(id)
        userids = Number($(this).attr("childId"))
        $(this).siblings("li").removeClass("jxcheckshow-active");
        $(this).addClass("jxcheckshow-active")
        $(".jxcheckshow-title p").find("span").last("span").text($(this).find("span").first("span").text());

        $.ajax({
            url:''+url+'/meritpay/template/getByUserId/'+id+'',
            type:'get',
            headers:{"User-Token":token},
            success:function(res){
                console.log(res)
               if(res.result==-1){
                   Common.alertError(res.message);
                   $("#table1 tbody").remove();
                   $(".total,.save").hide();
                   return;
               }
                function allhtml(){
                    $(".total,.save").show();
                    $("#table1 tbody").remove();
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


                        function jianrong(){
                            var explorer =navigator.userAgent;
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
                        }
                        jianrong();


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

                    //判断是否自评了
                    if(self ==0){
                        $("#table1 .hitscore").click(function(){
                            var datascore = {};
                            datascore.createDate = dateText;
                            datascore.gradeType = 0;
                            datascore.rosterId =1004;
                            var datascores = JSON.stringify(datascore)
                            $.ajax({
                                url:''+url+'/meritpay/rostercriterion/getCriterionInfo',
                                type:'post',
                                dataType: "json",
                                headers:{"User-Token":token},
                                contentType: 'application/json',
                                data:datascores,
                                success:function(res){
                                    //显示自评
                                    var len = res.data.length
                                    if(len==0){
                                        Common.alertError("该老师没有自评，不能打分")
                                    }

                                }

                            })

                        })
                    }


                }
               // allhtml();

                function ajaxnameshow(nameID){
                    $(".total,.save").show();

                    var name = nameID;
                    var data = {};
                    data.createDate = dateText;
                    data.forRosterId = name;
                    var datas = JSON.stringify(data)
                    $.ajax({
                        url:''+url+'/meritpay/rostercriterion/getGradeResultByWhere',
                        type:'post',
                        async: false,
                        dataType: "json",
                        headers:{"User-Token":token},
                        contentType: 'application/json',
                        data:datas,
                        success:function(res){

                            function selfscoreShow(){
                                var datascore = {};
                                datascore.createDate = dateText;
                                datascore.gradeType = 0;
                                datascore.rosterId =nameID;
                                var datascores = JSON.stringify(datascore)

                                $.ajax({
                                    url:''+url+'/meritpay/rostercriterion/getCriterionInfo',
                                    type:'post',
                                    dataType: "json",
                                    headers:{"User-Token":token},
                                    contentType: 'application/json',
                                    data:datascores,
                                    success:function(res){
                                        console.log(res)
                                        //显示自评
                                        var len = res.data.length
                                        if(len>1){
                                            var selfarr = [];
                                            for(var i = 0;i<len;i++){
                                                var theadself = "<td class='myself'>自评分数</td>"
                                                var selfscorehtml = "<td class='myselfscore'>"+res.data[i].selfScore+"</td>";
                                                selfarr.push(selfscorehtml);
                                                //console.log(selfscorehtml)
                                            }
                                            $(".titlescore").after(theadself)
                                            $(".td").each(function(i){
                                                $(this).before(selfarr[i]);
                                            })
                                        }

                                    }


                                })
                            }


                            if(res.hasOwnProperty("data")){
                                if(res.data[dateText].length==1){ //只有被打过分的
                                    if(res.data[dateText][0].gradeType==1){
                                        var other = res.data[dateText][0].info
                                        $("#table1").html(other);
                                        countTotal();
                                        var len = $("#table1 tbody").length;
                                        console.log(len)
                                        for(var i = 0;i<=len;i++){

                                            var explorer =navigator.userAgent;
//ie
                                            if (explorer.indexOf("MSIE") >= 0) {
                                                $("#table1 .num"+i+"").find("tr").first("tr").find("td").attr("rowspan",0)
                                            }
//firefox
                                            else if (explorer.indexOf("Firefox") >= 0) {
                                                $("#table1 .num"+i+"").find("tr").first("tr").find("td").attr("rowspan",0)
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

                                        }

                                    }else{   //只有自评显示自评
                                        if($(".myself").text()=="自评分数"){
                                            return;
                                        }else{
                                            $("#table1").find("tbody").remove();
                                            $(".total .right span").text("");
                                            allhtml();
                                            selfscoreShow();

                                        }

                                    }
                                }else {  //自评他评都有
                                    var other = res.data[dateText][1].info
                                    $("#table1").html(other);
                                    countTotal()

                                    if( !$("thead tr td:eq(3)").hasClass("myself")){
                                        selfscoreShow();
                                    }


                                    var len = $("#table1 tbody").length;
                                    for(var i = 0;i<=len;i++){

                                        var explorer =navigator.userAgent;
//ie
                                        if (explorer.indexOf("MSIE") >= 0) {
                                            $("#table1 .num"+i+"").find("tr").first("tr").find("td").attr("rowspan",0)
                                        }
//firefox
                                        else if (explorer.indexOf("Firefox") >= 0) {
                                            $("#table1 .num"+i+"").find("tr").first("tr").find("td").attr("rowspan",0)
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

                                    }

                                }

                            }else{
                                $(".myself").remove();
                                $(".myselfscore").remove();
                                $("#table1").find("tbody").remove();
                                $(".total .right span").text("");
                                allhtml();

                            }


                        }


                    })
                }
                ajaxnameshow(id)


                var lowerlen = loweruserid.length;
                console.log(id)
                console.log(loweruserid)
                for(var i =0;i<lowerlen;i++){
                    if(id ==Number(loweruserid[i])){
                        $(".hitscore").attr("disabled",false)
                        return false;
                    }else{
                        $(".hitscore").attr("disabled","disabled")

                    }
                }

            }
        })




    })




    ////提交
    $(".save button").click(function(){
        $.ajax({
            url:''+url+'/meritpay/template/getByUserId/'+userids+'',
            type:'get',
            headers:{"User-Token":token},
            success:function(res){
                console.log(res)
                var lenarr = [];
                $(".hitscore").each(function(){
                    if($(this).val()==""){
                        Common.alertError("分数不能为空");
                        return;
                    } else{
                        lenarr.push($(this).val());
                        var tdlen = $(".td").length
                    }
                    if(lenarr.length==tdlen){
                        var info = {};
                        var typeNameslen =res.data.typeNames.length;
                        for(var i = 0;i<typeNameslen;i++){
                            var criterionslen = res.data.typeNames[i].criterions.length;

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
                        data.addRosterId =rosterId; //上级
                        data.createDate = dateText;
                        data.forRosterId =userids;
                        data.gradeUser = rosterId; //上级
                        data.info = info;
                        data.isSelf = 1;
                        data.resultJson = jsonhtml;
                        data.totalscore = totalscore;


                        var datas = JSON.stringify(data)
                        console.log(data)

                        $.ajax({
                            url:''+url+'/meritpay/rostercriterion/save',
                            type:'post',
                            dataType: "json",
                            headers:{"User-Token":token},
                            contentType: 'application/json',
                            data:datas,
                            success:function(res){
                                if(res.result==0){
                                    Common.alertSuccess("保存成功")
                                    //setTimeout(function() {
                                    //    window.location.reload();
                                    //}, 800);
                                }else{
                                    Common.alertError("保存失败")
                                }
                            }

                        })

                    }else{
                        return;
                    }


                })
            }
        })






    })




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











})




