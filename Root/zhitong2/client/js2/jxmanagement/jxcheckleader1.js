/**
 * Created by Leo on 2017/12/5.
 */
$(function(){
    var jxobj = {};

    var url = Constants.ROOT_URLJX
    // var url = 'http://forchild.zhitong.group';
    var url = 'http://106.15.137.203';
    var token ="eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTYyMzcwNDksInVzZXJJZCI6MTAwMTc4LCJ1c2VyVHlwZSI6MSwidXNlck5hbWUiOiLpmYjlsI_mnpcifQ._xkWVROSTMzLhtGWhI5DTj5blUx_GeJp0-PCEqZr7Ag"

    //获取session
    var sessioninfo = sessionStorage.getItem("teacher");
    var data =  eval('(' + sessioninfo + ')');
    //var userId = data.userid;
    var userId = 100178;
    //var token = data.token;


    //年份展示
    jxobj.shenyuYear = function(){
        //计算剩余天数
        var now = date.getDate();
        var year = date.getYear();
        if (year < 2000) year += 1900;
        var month = date.getMonth();
        var monarr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) monarr[1] = "29";
        var shenyu = (monarr[month]-now)
    }

    jxobj.yearShow = function(){
        var data = {};
        data.gradeRosterId=userId;
        data.gradeType = 1;
        var datas = JSON.stringify(data);

        $.ajax({
            url:''+url+'/meritpay/rostercriterion/getGradeResultByWhere',
            type:'post',
            dataType: "json",
            headers:{"User-Token":token},
            contentType: 'application/json',
            data:datas,
            success:function(res){

                console.log(res.data)

                var date = new Date();
                var ys = date.getFullYear();
                var y = ys.toString()
                var m = date.getMonth()+1;
                if(m<10){
                    m = "0"+m;
                }
                var ms = m.toString();
                var time = y+"-"+ms;
                console.log(time)

                var data = res.data;
                //  var len = data.length;
                var newarr6 = [];var newarr7 = [];var newarr8 = [];var newarr9 = [];var newarr10 = [];var newarr11 = [];var newarr12 = [];var allYear =[];
                var arr = [];

                for(var k in data){
                    arr.push(data[k][0])
                }
                console.log(arr)
                for(var i = 0;i<arr.length;i++){
                    var years = arr[i].createDate.substring(0,4);
                    if(years==2016){
                        newarr6 = newarr6.concat(arr[i]);
                    }
                    if(years==2017){
                        newarr7 = newarr7.concat(arr[i]);
                    }
                    if(years==2018){
                        newarr8 = newarr8.concat(arr[i]);
                    }
                    if(years==2019){
                        newarr9 = newarr9.concat(arr[i]);
                    }
                    if(years==2020){
                        newarr10 = newarr10.concat(arr[i]);
                    }
                    if(years==2021){
                        newarr11 = newarr11.concat(arr[i]);
                    }
                    if(years==2022){
                        newarr12 = newarr12.concat(arr[i]);
                    }

                }
                allYear.push(newarr6)
                allYear.push(newarr7)
                allYear.push(newarr8)
                allYear.push(newarr9)
                allYear.push(newarr10)
                allYear.push(newarr11)
                allYear.push(newarr12)



                var allY = []
                for(var i = 0;i<allYear.length;i++){
                    if(allYear[i].length !==0){
                        allY.unshift(allYear[i])
                    }
                }

                var isOk = ""
                for(var i =0;i<allY.length;i++){
                    var secondlen = allY[i].length;
                    var yearshtml="<ul class='jxcheck-Year yearnum"+i+"'><h3>"+allY[i][0].createDate.substring(0,4)+"<i class='glyphicon glyphicon-chevron-down jxcheck-down'></h3></ul>";
                    $("#jxcheck-content").append(yearshtml);
                    for(var j = 0;j<secondlen;j++){
                        console.log(allY[i][j].createDate)
                        var data = {
                            createDate:allY[i][j].createDate,
                            gradeRosterId:userId,
                            gradeType:1
                        }
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
                                console.log(res)
                                if(res.hasOwnProperty("data")){
                                    var historyid = [];
                                    var historyarr = res.data[allY[i][j].createDate]
                                    for(var k = 0;k<historyarr.length;k++){
                                        historyid.push(historyarr[k].forRosterId)
                                    }
                                    console.log(historyid)
                                    $.ajax({
                                        url:''+url+'/meritpay/roster/getGraderForUsers/'+userId+'',
                                        type:'get',
                                        async: false,
                                        headers:{"User-Token":token},
                                        contentType: 'application/json',
                                        success:function(res){
                                            console.log(res)

                                            if(res.data.length!==0){
                                                var len = res.data.length;
                                                var isokArr = [];
                                                var len1 = historyid.length;
                                                var newid = [];
                                                var foruserId = [];

                                                for(var k = 0;k<len;k++){
                                                    if(allY[i][j].createDate.substring(0,4)+allY[i][j].createDate.substring(5,7)>=res.data[k].addtime.substring(0,4)+res.data[k].addtime.substring(5,7)){
                                                        foruserId.push(res.data[k].userid)
                                                    }
                                                    //foruserId.push(res.data[k].userid)
                                                    // var foruserId = res.data[k].userid;
                                                    console.log(foruserId)
                                                    for(var d = 0;d<len1;d++){
                                                        console.log(historyid[d])
                                                        if(foruserId[k] == historyid[d]){
                                                            newid.push(foruserId[d])
                                                        }
                                                    }

                                                    var data ={
                                                        "createDate":allY[i][j].createDate,
                                                        "userid":res.data[k].userid
                                                    }
                                                    var datas = JSON.stringify(data)

                                                    $.ajax({
                                                        url:""+url+"/meritpay/salaryTable/getPayRoll",
                                                        type:"post",
                                                        data:datas,
                                                        async: false,
                                                        headers:{"User-Token":token},
                                                        contentType: 'application/json',
                                                        success:function(res){
                                                            console.log(res)
                                                            if(res.data.length ==0){
                                                                isokArr.push("no")

                                                            }else{
                                                                isokArr.push("yes")
                                                            }
                                                        }

                                                    })
                                                }
                                                console.log(isokArr)
                                                console.log(newid)
                                                console.log(foruserId)
                                                if(newid.length !==foruserId.length){
                                                    //isOk = "no"
                                                    var len1 = isokArr.length;
                                                    var isokYes = "";
                                                    var isokNo = "";
                                                    for(var x = 0;x<len1;x++){
                                                        if(isokArr[x]=="yes"){ //生成
                                                            isokYes = "no"
                                                        }
                                                        if(isokArr[x]=="no"){
                                                            isokNo = "dai"
                                                        }
                                                    }
                                                    if(isokYes=="no"){
                                                        isOk = "no";
                                                    }
                                                    if(isokNo=="dai"){
                                                        isOk = "dai";
                                                    }
                                                }else{
                                                    isOk="yes"
                                                }


                                            }
                                        }
                                    })
                                }
                            }
                        })

                        if(isOk=="no"){
                            var monthshtml ="<li><p><a class='month'>"+allY[i][j].createDate+"绩效</a></p><span>未提交</span>";
                            $("#jxcheck-content .yearnum"+i+"").append(monthshtml)
                        }else if(isOk=="dai"){
                            var monthshtml ="<li><p><a class='month'>"+allY[i][j].createDate+"绩效</a></p><span>待提交</span>";
                            $("#jxcheck-content .yearnum"+i+"").append(monthshtml)
                        }else{
                            var monthshtml ="<li><p><a class='month'>"+allY[i][j].createDate+"绩效</a></p><i class='glyphicon glyphicon-ok'></li>";
                            $("#jxcheck-content .yearnum"+i+"").append(monthshtml)
                        }

                    }
                }

                //点击跳转
                $(document).on('click','.month',function(){
                    var dateText = $(this).text().substring(0,7)
                    $(this)[0].href = "jxcheckshowleader.html?userId="+userId+"&date="+dateText+"";
                    console.log(dateText)

                })

                console.log(allY)

                //新建月份
                if(allY.length !==0){

                    if(allY[0][0].createDate.substring(0,4)==time.substring(0,4)){
                        if(allY[0][0].createDate !==time){
                            var monthshtml ="<li><p><a class='month'>"+time+"月绩效</a></p><span>待提交</span></li>";
                            $("#jxcheck-content .yearnum0").find("li").first("li").before(monthshtml);
                        }
                    }
                }

                //  如果没有打分新建年份
                if(res.hasOwnProperty("data")){
                    for(var k in res.data){
                        console.log(res.data[k][0])
                        if(res.data[k][0].createDate.substring(0,4)==time.substring(0,4)){
                            return;
                        }else{
                            var newYear = "<ul class='jxcheck-Year yearnum'><h3>"+time.substring(0,4)+"<i class='glyphicon glyphicon-chevron-down jxcheck-down'></h3></ul>"
                        }
                        if(res.data[k][0].createDate==time){
                            return;
                        }else{
                            var noscroe ="<li><p><a class='month'>"+time+"月绩效</a></p><span>待提交</span></li>"
                        }
                    }
                    if($("#jxcheck-content ul").length==0){
                        $("#jxcheck-content").append(newYear);
                    }else{
                        $("#jxcheck-content .yearnum0").before(newYear);
                    }

                    if($(".yearnum li").length ==0){
                        $(".yearnum").append(noscroe)
                    }else {
                        $(".yearnum0").find("li").first("li").before(noscroe)
                    }

                }else{
                    var newYear = "<ul class='jxcheck-Year yearnum'><h3>"+time.substring(0,4)+"<i class='glyphicon glyphicon-chevron-down jxcheck-down'></h3></ul>";
                    var noscroe ="<li><p><a class='month'>"+time+"月绩效</a></p><span>待提交</span></li>";
                    $("#jxcheck-content").append(newYear);
                    $(".yearnum").append(noscroe)
                }




                //年份绩效展示
                $(".jxcheck-down").click(function(){
                    $(this).parent("h3").nextAll().toggle('.activeshow');
                })



            }
        })
    }()


       jxobj.click = function(){
           $("#jxcheck-content").on("click",".jxcheck-down",function(){
               $(this).parent().parent().find("li").toggle('.activeshow');
           })
       }()

})


