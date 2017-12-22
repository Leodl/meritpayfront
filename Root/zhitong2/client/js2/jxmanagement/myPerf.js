$(function(){

    var url = Constants.ROOT_URLJX

    //var url = 'http://forchild.zhitong.group';


    var token ="eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTM0MDg0NzgsInVzZXJJZCI6MTAwMywidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi5ZC05aSn5Li9In0.F41vN3fneSAVU6fcDQA1c25xvgC9pwokpvlHWwohi-0"


    //获取session
    var sessioninfo = sessionStorage.getItem("teacher");
    var data =  eval('(' + sessioninfo + ')');
    //var userId = data.userid;
    var userId =100186;
    //var userId = 1011;
    //var token = data.token;

    var data = {};
    data.forRosterId=userId;
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
           console.log(res)
            var data = res.data;

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
                var year = arr[i][0].createDate.substring(0,4);
                if(year==2016){
                    newarr6 = newarr6.concat(arr[i]);
                }
                if(year==2017){
                    newarr7 = newarr7.concat(arr[i]);
                }
                if(year==2018){
                    newarr8 = newarr8.concat(arr[i]);
                }
                if(year==2019){
                    newarr9 = newarr9.concat(arr[i]);
                }
                if(year==2020){
                    newarr10 = newarr10.concat(arr[i]);
                }
                if(year==2021){
                    newarr11 = newarr11.concat(arr[i]);
                }
                if(year==2022){
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
                    var monthshtml ="<li><p><a class='month'>"+allY[i][j].createDate+"月绩效</a></p><span>"+allY[i][j].totalScore+"</span></li>";
                    $("#jxcheck-content .yearnum"+i+"").append(monthshtml)
                }
            }

            //点击跳转
            $(document).on('click','.month',function(){
                var dateText = $(this).text().substring(0,7)
                $(this)[0].href = "myperfShow.html?userId="+userId+"&date="+dateText+"";
                console.log(dateText)

            })


        }
    })
































    $(".jxcheck-down").click(function(){
        $(this).parent().next("ul").toggle('.activeshow');
    })



    $(".jxcheckshow-name ul li").click(function(){
        $(this).siblings("li").removeClass("jxcheckshow-active");
        $(this).addClass("jxcheckshow-active")



    })
})


