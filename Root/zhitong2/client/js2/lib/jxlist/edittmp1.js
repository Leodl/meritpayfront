$(function () {

    var url = 'http://106.15.137.203';
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

    //获取session
    var sessioninfo = sessionStorage.getItem("user");
    var data =  eval('(' + sessioninfo + ')');
    var token = data.token;




    var data = {
        "templateId":brandname,
    }
    var datas = JSON.stringify(data)

    $.ajax({
        url:''+url+'/meritpay/template/get',
        type:'post',
        dataType: "json",
        headers:{"User-Token":token},
        contentType: 'application/json',
        data:datas,
        success:function(res){
            console.log(res.data)
            var templateId ="";
            var achConfigId = "";
            var templateName = "";
            var status = "";

            //渲染列表
            var datalen = res.data.length;

            //渲染标题

            for(var k = 0;k<datalen;k++){

               // if(res.data[k].templateId=="803b62cba73249059fca0f2587e5f4f6"){ //模板的id
                    templateId = res.data[k].templateId;
                    achConfigId = res.data[k].achConfigId;
                    templateName = res.data[k].templateName;
                          status = res.data[k].status;

                    var title = "<p><span>"+res.data[k].templateName+"</span></p>";
                    $(".edittmp-top").html(title)

                    var typeNameslen =res.data[k].typeNames.length;
                    for(var i = 0;i<typeNameslen;i++){
                        var criterionslen = res.data[k].typeNames[i].criterions.length;
                        var typeName = res.data[k].typeNames[i].typeName

                        var html="<tbody class='num"+i+"' style='width:100%'>" +
                            "<tr><td rowspan='1000'><input type='text' value='"+typeName+"'>" +
                            "<div class='edittmp-per'><input type='text' value=''><span>%</span></div>"+
                            "</td>"+
                            "</tr>" +
                            "</tbody>"

                        $("#table1").append(html)

                        var score =0;
                        for(var j = 0;j<criterionslen;j++){
                            //渲染内容
                            var criterionContent = res.data[k].typeNames[i].criterions[j].criterionContent
                            var score = res.data[k].typeNames[i].criterions[j].score
                            var contents = "";
                            contents+="<tr><td><textarea>"+criterionContent+"</textarea><button>因子库</button></td>" +
                                "<td><input class='score' type='text' value='"+score+"'></td>"+
                                "<td class='delete'><i class='glyphicon glyphicon-remove'></i></td>"+
                                "</tr>"
                            $(".num"+i+"").append(contents);

                        }

                    }
                }

                //渲染百分数
                var len = $("#table1 tbody").length;
                var tbodys = document.getElementsByTagName("tbody")
                for(var i =0;i<len;i++){
                    var trslen = tbodys[i].getElementsByClassName("score").length;
                    var score =0;
                    for(var j = 0;j<trslen;j++){
                        var pernum= parseInt(tbodys[i].getElementsByClassName("score")[j].value);
                        score+=pernum;
                    }
                    tbodys[i].getElementsByClassName("edittmp-per")[0].getElementsByTagName("input")[0].value=score;

                }

          //  }


            //失去焦点计算百分比
            $(document).on('blur',".score",function(){
                percount();
                countTotal()
            })

            //计算百分比

            function percount(){
                $(".score").each(function(){
                    if($(this).val()==""){
                        //Common.alertError("请输入分值");
                        return;
                    }else{
                        //渲染百分数
                        var len = $("#table1 tbody").length;
                        var tbodys = document.getElementsByTagName("tbody")
                        for(var i =0;i<len;i++){
                            var trslen = tbodys[i].getElementsByClassName("score").length;
                            var score =0;
                            for(var j = 0;j<trslen;j++){
                                var pernum= Number(tbodys[i].getElementsByClassName("score")[j].value);
                                score+=pernum;
                                console.log(typeof pernum)
                            }
                            tbodys[i].getElementsByClassName("edittmp-per")[0].getElementsByTagName("input")[0].value=score;
                        }
                    }
                })
            }

            //计算总和和总分
           function countTotal(){
               var totalpernum =0;
               var totalscore = 0;
               $(".edittmp-per input").each(function(){
                   if($(this).val()==""){
                       return;
                   }else{
                       var perval = parseInt($(this).val());
                       totalpernum+=perval;
                   }
               })
               $(".score").each(function(){
                   if($(this).val()=="") {
                       return;
                   }else{
                       var scorval = parseInt($(this).val())
                       totalscore+=scorval;
                   }
               })
               $(".edittmp-total .left span").text(totalpernum+"%");
               $(".edittmp-total .right span").text(totalscore);
           }
            countTotal()




            //删除每一个指标
            $(document).on('click','.delete',function(){
                var len = $(this).parent("tr").parent("tbody").find("tr").length-1;
                $(this).parent("tr").parent("tbody").find("tr").first("tr").find("td").attr("rowspan",len)
                $(this).parent("tr").remove();
                percount();
                countTotal();
            })

            // 添加指标
            $("tbody").each(function(i,e){
                var lastTr = $(this).find("tr").last("tr");
                var add = "<tr><td><a href='javascript:;' class='add-target'>添加指标</a></td><td></td></tr>"
                lastTr.after(add)
            })

            $("#table1").on('click','.add-target',function(){
                var html = "<tr><td><textarea></textarea><button>因子库</button></td>" +
                    "<td><input class='score' type='text' value=''></td>"+
                    "<td class='delete'><i class='glyphicon glyphicon-remove'></i></td>"+
                    "</tr>"
                $(this).parent("td").parent("tr").before(html)
            })


            //添加项目
            $(document).on('click','.additem',function(){
                var html = "<tbody>"+
                    "<tr><td rowspan='6'><input type='text' value=''placeholder='项目名称'>" +
                    "<div class='edittmp-per'><input type='text' value=''>" +
                    "<span>%</span><i class='deleteitem  glyphicon glyphicon-remove' style='display: block;margin-top: 20px'></i>" +
                    "</div></td></tr>"+
                    "<tr><td><textarea></textarea><button>因子库</button></td>" +
                    "<td><input class='score' type='text' value=''></td>" +
                    "<td class='delete'><i class='glyphicon glyphicon-remove'></i></td>"+
                    "</tr>"+
                    "<tr><td><textarea></textarea><button>因子库</button></td>" +
                    "<td><input class='score' type='text' value='' ></td>" +
                    "<td class='delete'><i class='glyphicon glyphicon-remove'></i></td>"+
                    "</tr>"+
                    "<tr><td><textarea></textarea><button>因子库</button></td>" +
                    "<td><input class='score' type='text' value='' ></td>" +
                    "<td class='delete'><i class='glyphicon glyphicon-remove'></i></td>"+
                    "</tr>"+
                    "<tr><td><a href='javascript:;' class='add-target'>添加指标</a></td><td></td></tr>"
                "</tbody>"
                $("#table1").find("tbody").last("tbody").after(html)
                console.log(html)
            })

            //删除项目
            $(document).on("click",".deleteitem",function(){
                $(this).parent(".edittmp-per").parent("td").parent("tr").parent("tbody").remove();
                percount();
                countTotal();
            })



            //提交

            $(".edittmp-foot button").click(function(){

                var per = $("tr td:visible .edittmp-per input")
                var totalpernum=0;
                var totalscore = 0;

                per.each(function(){
                    var perval = parseInt($(this).val())
                    totalpernum+=perval;
                })

                $(".score").each(function(){
                    var scorval = parseInt($(this).val())
                    totalscore+=scorval
                })

                console.log(totalscore)

                console.log(totalpernum)
                if(totalpernum!==100 ){
                    Common.alertError("总和必须等于100%");
                    return;
                }else if(totalscore!==100){
                    Common.alertError("总分必须等于100");
                    return;
                }
                else {
                    var data = {};
                    var criterions = [];
                    var len = $("#table1 tbody").length
                    for(var i = 0;i<len;i++){
                        var typeName = $(".num"+i+"").find("tr").first("tr").find("td").find("input").val();
                        var trslen = $(".num"+i+"").find("tr").length-2;
                        console.log("haha"+trslen)
                        for(var j = 0;j<trslen;j++){
                            var list  ={};
                            var index = j+1
                            var criterionContent = $(".num"+i+" tr:eq("+index+")").find("td").find("textarea").val();
                            var score =parseInt($(".num"+i+" tr:eq("+index+")").find("td").find(".score").val())

                            list.typeName=typeName;
                            list.criterionContent = criterionContent;
                            list.score = score;
                            list.templateId = templateId;
                            criterions.push(list)

                        }
                    }

                    if(status==0){
                        data.status = Number(status);
                    }else{
                        data.status = Number(status);
                    }
                    data.criterions = criterions;
                   // data.gartenId = 5;
                    data.templateName = templateName;
                    data.achConfigId = achConfigId;
                    data.templateId = templateId;

                    console.log(data)


                    var datas = JSON.stringify(data)

                    $.ajax({
                        url:''+url+'/meritpay/template/update',
                        type:'put',
                        contentType: 'application/json',
                        headers:{"User-Token":token},
                        data:datas,
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



        }
    })




    //点击因子库
    var buttons = {};
    $("#table1").on('click','button',function(){
        buttons.thisbutton = $(this)  //保存第一次点击的当前button

        $.ajax({
            url: ''+url+'/meritpay/factor/getByType/0',
            type: 'get',
            headers:{"User-Token":token},
            success: function (res) {
                var len = res.data.length;
                var html = ""
                for (var i = 0; i < len; i++) {
                    html += "<li factortype_id=" + res.data[i].factors[0].factorTypeId + "><a href='javascript:;'>" + res.data[i].typeName + "</a></li>";
                    $(".left ul").html(html)
                }

                var factors = res.data[0].factors;
                var factorshtml = ""
                for (var j = 0; j < factors.length; j++) {
                    factorshtml += "<li number=" + j + "><span>" + factors[j].content + "</span></li>"
                    $(".right ul").html(factorshtml)
                }
                $(".left ul").find("li").first("li").addClass("edittmp-active")
                $("#show,#mask").show()
            }
        })


        $(".left ul").on('click','li',function(){
            var id =  $(this).attr("factortype_id");
            $(this).siblings("li").css("background","white").children("a").css("color","#3c3c3c")
            $(this).css("background","rgba(51, 153, 255, 1)").children("a").css("color","#ffffff")

            $.ajax({
                url:''+url+'/meritpay/factor/getByType/'+id+'',
                type:'get',
                headers:{"User-Token":token},
                success:function(res){
                    var len = res.data[0].factors.length;
                    var factorshtml = ""
                    for(var i =0;i<len;i++){
                        factorshtml += "<li number="+i+"><span>"+res.data[0].factors[i].content+"</span></li>"
                    }
                    $(".right ul").html(factorshtml)
                }
            })

        })



        $(".edittmp-content .right").on('click','li',function(){
            var thisSel = $(this);

            $(this).siblings("li").css("background","white");
            $(this).siblings("li").find("span").css("color","#3c3c3c");
            $(this).css("background","rgba(51, 153, 255, 1)");
            $(this).find("span").css("color","white")


            $(".edittmp-sel").click(function(){
                var str = thisSel.find("span").text()
                buttons.thisbutton.prev("textarea").text(str) //当前button所对应的文本
                $("#show,#mask").hide()


            })


        })


    })





    //弹出框操作

    $(".edittmp-close,.edittmp-cancel").click(function(){
        $("#show,#mask").hide()

    })













})
