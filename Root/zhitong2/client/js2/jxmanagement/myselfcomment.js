   $(function(){

       var url = Constants.ROOT_URLJX

       var token ="eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTM0MDg0NzgsInVzZXJJZCI6MTAwMywidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi5ZC05aSn5Li9In0.F41vN3fneSAVU6fcDQA1c25xvgC9pwokpvlHWwohi-0"

       //获取session
       var sessioninfo = sessionStorage.getItem("teacher");
       var data =  eval('(' + sessioninfo + ')');
       //var userId = data.userid;
       var userId = 100186;
       //var token = data.token;


        //年份展示
       var data = {};
       data.gradeRosterId=userId;
       data.gradeType = 0;
       var datas = JSON.stringify(data);

        $.ajax({
            url:''+url+'/meritpay/rostercriterion/getGradeResultByWhere',
            type:'post',
            dataType: "json",
            headers:{"User-Token":token},
            contentType: 'application/json',
            data:datas,
            success:function(res){

                console.log(res)

                var date = new Date();
                var ys = date.getFullYear();
                var y = ys.toString()
                var m = date.getMonth()+1;
                if(m<10){
                    m = "0"+m;
                }
                var ms = m.toString();
                var time = y+"-"+ms;
                console.log(ms)

                //计算剩余天数
                var now = date.getDate();
                var year = date.getYear();
                if (year < 2000) year += 1900;
                var month = date.getMonth();
                var monarr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
                if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) monarr[1] = "29";
                var shenyu = (monarr[month]-now)




                var data = res.data;
              //  var len = data.length;
                var newarr6 = [];
                var newarr7 = [];
                var newarr8 = [];
                var newarr9 = [];
                var newarr10 = [];
                var newarr11 = [];
                var newarr12 = [];
                var allYear =[];



                var arr = [];
                for(var k in data){
                    arr.push(data[k])
                }
                for(var i = 0;i<arr.length;i++){
                    var years = arr[i][0].createDate.substring(0,4);
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

                for(var i =0;i<allY.length;i++){
                    var secondlen = allY[i].length;
                    var yearshtml="<ul class='jxcheck-Year yearnum"+i+"'><h3>"+allY[i][0].createDate.substring(0,4)+"<i class='glyphicon glyphicon-chevron-down jxcheck-down'></h3></ul>";
                    $("#jxcheck-content").append(yearshtml);
                    for(var j = 0;j<secondlen;j++){
                        var monthshtml ="<li><p><a class='month'>"+allY[i][j].createDate+"绩效</a></p><i class='glyphicon glyphicon-ok'></li>";
                        $("#jxcheck-content .yearnum"+i+"").append(monthshtml)
                    }
                }

                //点击跳转
                $(document).on('click','.month',function(){
                    var dateText = $(this).text().substring(0,7)
                    $(this)[0].href = "myselfcommentshow.html?userId="+userId+"&date="+dateText+"";
                    console.log(dateText)

                })

                console.log(allY)
                //新建月份
                if(allY.length !==0){

                    if(allY[0][0].createDate.substring(0,4)==time.substring(0,4)){
                        if(allY[0][0].createDate !==time){
                            var monthshtml ="<li><p><a class='month'>"+time+"月绩效</a></p><span>剩余"+shenyu+"天</span></li>";
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
                            var noscroe ="<li><p><a class='month'>"+time+"月绩效</a></p><span>剩余"+shenyu+"天</span></li>"
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
                    var noscroe ="<li><p><a class='month'>"+time+"月绩效</a></p><span>剩余"+shenyu+"天</span></li>";
                    $("#jxcheck-content").append(newYear);
                    $(".yearnum").append(noscroe)
                }


                //年份绩效展示
                $(".jxcheck-down").click(function(){
                    $(this).parent("h3").nextAll().toggle('.activeshow');
                })



            }
        })




        //点击人员
        $(".jxcheckshow-name ul li").click(function(){
            $(this).siblings("li").removeClass("jxcheckshow-active");
            $(this).addClass("jxcheckshow-active")


        })



    })


















    $(".jxcheck-down").click(function(){
        $(this).parent().next("ul").toggle('.activeshow');
    })



    $(".jxcheckshow-name ul li").click(function(){
        $(this).siblings("li").removeClass("jxcheckshow-active");
        $(this).addClass("jxcheckshow-active")




    })


