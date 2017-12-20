$(function(){

   // var url = 'http://forchild.zhitong.group';
    var url = 'http://106.15.137.203';

    var host = window.location.host;
    var test = window.location.protocol;
   //var url = test+"//"+host;

    //获取session
    var sessioninfo = sessionStorage.getItem("teacher");
    var data =  eval('(' + sessioninfo + ')');
    //var userId = data.userid;
    //var token = data.token;
    var userId = 1423;
    var token ="eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTU1NjMyNTQsInVzZXJJZCI6MTAwMTc4LCJ1c2VyVHlwZSI6MSwidXNlck5hbWUiOiLpmYjlsI_lsI8ifQ.GohIzONbllxIqo9PntdzRjwsK7eLVn-B1TDJkAn9MxA"


    var comletedlen = "";
    $.ajax({
        url:''+url+'/meritpay/rostercriterion/getChildListByDate/{rosterId}?rosterId='+userId+'',
        type:'get',
        headers:{"User-Token":token},
        success:function(res){
            //给那些人打分
                comletedlen =1;
                //$.ajax({
                //    url:''+url+'/meritpay/roster/getGraderForUsers/'+userId+'',
                //    type:'get',
                //    async: false,
                //    headers:{"User-Token":token},
                //    success:function(res){
                //       completedlen = res.data.length;
                //    }
                //})



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

            //计算剩余天数
            var now = date.getDate();
            var year = date.getYear();
            if (year < 2000) year += 1900;
            var month = date.getMonth();
            var monarr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
            if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) monarr[1] = "29";
            var shenyu = (monarr[month]-now)


            var data = res.data;
            var len = data.length;
            var yearsArr6 = [];
            var yearsArr7 = [];
            var yearsArr8 = [];
            var yearsArr9 = [];
            var yearsArr10 =[];
            var yearsArr11 =[];
            var yearsArr12 =[];
            var allYear = [];

            var completed = [];
            for(var i = 0;i<len;i++){
                //当月是否全部打完分
                if(data[i].date==time){
                   var userinfo = data[i].usersInfo;
                    for(var k in userinfo){
                        completed.push(userinfo[k].userId)
                    }
                }



                if(len !==0){
                    var years = data[i].date.substring(0,4);
                    if(years==2016){
                        yearsArr6.push(data[i])
                    }
                    if(years==2017){
                        yearsArr7.push(data[i]);
                    }
                    if(years==2018){
                        yearsArr8.push(data[i])
                    }
                    if(years==2019){
                        yearsArr9.push(data[i])
                    }
                    if(years==2020){
                        yearsArr10.push(data[i])
                    }
                    if(years==2021){
                        yearsArr11.push(data[i])
                    }
                    if(years==2022){
                        yearsArr12.push(data[i])
                    }
                }

            }



         //   if(len ==0){
                var date = new Date();
                var nowyear = date.getFullYear()
            console.log(nowyear)
             if(nowyear==2016){
                allYear.unshift(yearsArr6);
               }
                if(nowyear==2017){
                    allYear.unshift(yearsArr7);
                }
                if(nowyear==2018){
                    allYear.unshift(yearsArr8);
                }
                if(nowyear==2019){
                    allYear.unshift(yearsArr9);
                }
                if(nowyear==2020){
                    allYear.unshift(yearsArr10);
                }
                if(nowyear==2021){
                    allYear.unshift(yearsArr11);
                }
                if(nowyear==2022){
                    allYear.unshift(yearsArr12);
                }

         //   }

            if(nowyear !==2022){
                allYear.push(yearsArr12);
            }
            if(nowyear !==2021){
                allYear.push(yearsArr11);
            }
            if(nowyear !==2020){
                allYear.push(yearsArr10);
            }
            if(nowyear !==2019){
                allYear.push(yearsArr9);
            }
            if(nowyear !==2018){
                allYear.push(yearsArr8);
            }
            if(nowyear !==2017){
                allYear.push(yearsArr7);
            }
            if(nowyear !==2016){
                allYear.push(yearsArr6);
            }


            console.log(allYear)
            console.log(allYear.length)


            //跳转
            $(document).on('click','.month',function(){
                var dateText = $(this).text().substring(0,7)
                $(this)[0].href = "jxcheckshowleader.html?userId="+userId+"&date="+dateText+"";
            })


            var allYearlen = allYear.length;
            //去掉allyear中未空的
            var newallYear = [];
            for(var i = 0;i<allYearlen;i++){
                 if(allYear[i].length !==0){
                   newallYear.push(allYear[i])
                 }
            }



            var newallYearlen = newallYear.length;
            console.log(newallYear)

            console.log(completed)
            console.log(comletedlen)
            if(completed.length==comletedlen+1){
                var isOk = "glyphicon-ok"
            }

            if(newallYearlen>=1){
                if(newallYear[0].length !==0){

                    for(var i = 0;i<newallYearlen;i++){
                        var secondlen = newallYear[i].length;
                        var yearshtml="<ul class='jxcheck-Year yearnum"+i+"'><h3>"+newallYear[i][0].date.substring(0,4)+"<i class='glyphicon glyphicon-chevron-down jxcheck-down'></h3></ul>"
                        $("#jxcheck-content").append(yearshtml);
                        for(var j = 0;j<secondlen;j++){
                            var monthshtml ="<li><p><a class='month'>"+newallYear[i][j].date+"月绩效</a></p><i class='glyphicon "+isOk+"'></i></li>";
                            $("#jxcheck-content .yearnum"+i+"").append(monthshtml)
                        }

                    }

                }

            }




            //  如果没有打分新建年份
            for(var i =0;i<=len;i++){
                if(len==0 || len !==0){

                    if(allYear[0].length ==0){
                        var newYear = "<ul class='jxcheck-Year yearnum'><h3>"+time.substring(0,4)+"<i class='glyphicon glyphicon-chevron-down jxcheck-down'></h3></ul>";
                        var noscroe ="<li><p><a class='month'>"+time+"月绩效</a></p><span>待提交</span></li>"
                    }
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


            //新建月份
            if(newallYearlen !==0){
                console.log(newallYear[0][0].date.substring(0,4))
                console.log(time.substring(0,4))
                if(newallYear[0][0].date.substring(0,4)==time.substring(0,4)){
                    if(newallYear[0][0].date !==time){
                        var monthshtml ="<li><p><a class='month'>"+time+"月绩效</a></p><span>待提交</span></li>";
                        $("#jxcheck-content .yearnum0").find("li").first("li").before(monthshtml);
                    }
                }
                //if(newallYear[0][0].date !==time){
                //    var monthshtml ="<li><p><a class='month'>"+time+"月绩效</a></p><span>待提交</span></li>";
                //    $("#jxcheck-content .yearnum0").find("li").first("li").before(monthshtml);
                //}
            }

            //年份绩效展示
            $(".jxcheck-down").click(function(){
                $(this).parent("h3").nextAll().toggle('.activeshow');
            })



        }
    })



})
