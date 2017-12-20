$(function () {

    var url = 'http://106.15.137.203';

    //获取session
    var sessioninfo = sessionStorage.getItem("user");
    var data =  eval('(' + sessioninfo + ')');
    var token = data.token;

    //删除每一个指标
    $(document).on('click','.delete',function(){
        var len = $(this).parent("tr").parent("tbody").find("tr").length-1;
        $(this).parent("tr").parent("tbody").find("tr").first("tr").find("td").attr("rowspan",len)
        $(this).parent("tr").remove();
        percount();
        countTotal();
    })

    //添加指标
        $(document).on('click','.edittmp-add',function(){
            var len = $(this).parent("td").parent("tr").parent("tbody").find("tr").length+1;
            $(this).parent("td").parent("tr").parent("tbody").find("tr").first("tr").find("td").attr("rowspan",len)
            var html = "<tr><td><textarea></textarea><button>因子库</button></td><td><input class='score' type='text' value='' placeholder='输入分数'></td><td class='delete'><i class='glyphicon glyphicon-remove'></i></td></tr>"
            $(this).parent("td").parent("tr").before(html)

        })


//添加项目
    var i = 0;
    $(document).on('click','.additem',function(){
        i++;
        var html = "<tbody class='num"+i+"'>"+
                   "<tr><td rowspan='1000'><input type='text' value=''placeholder='项目名称'><div class='edittmp-per'><input type='text' value=''><span>%</span><i class='deleteitem  glyphicon glyphicon-remove' style='display: block;margin-top: 20px'></i></div></td></tr>"+
                   "<tr><td><textarea></textarea><button>因子库</button></td>" +
                   "<td><input class='score' type='text' value='' placeholder='输入分值'></td>" +
                   "<td class='delete'><i class='glyphicon glyphicon-remove'></i></td>"+
                   "</tr>"+
                   "<tr><td><textarea></textarea><button>因子库</button></td>" +
                   "<td><input class='score' type='text' value='' placeholder='输入分值'></td>" +
                   "<td class='delete'><i class='glyphicon glyphicon-remove'></i></td>"+
                   "</tr>"+
                   "<tr><td><textarea></textarea><button>因子库</button></td>" +
                   "<td><input class='score' type='text' value='' placeholder='输入分值'></td>" +
                   "<td class='delete'><i class='glyphicon glyphicon-remove'></i></td>"+
                   "</tr>"+
                   "<tr><td><a href='javascript:;' class='edittmp-add'>添加指标</a></td><td></td></tr>"
                   "</tbody>"
        $("#table1").find("tbody").last("tbody").after(html)
         console.log(html)
    })

    //删除项目
    $(document).on("click",".deleteitem",function(){
        i--;
        $(this).parent(".edittmp-per").parent("td").parent("tr").parent("tbody").remove();
        percount();
        countTotal();
    })


    //失去焦点计算百分比
    $(document).on('blur',".score",function(){
        percount();
        countTotal();
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

    //计算总分
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
            if($(this).val()==""){
                return;
            }else{
                var scorval = parseInt($(this).val())
                totalscore+=scorval;
            }

        })
        $(".total .left span").text(totalpernum+"%");
        $(".total .right span").text(totalscore);
    }




    //弹出框操作
    //点击因子库
    var buttons = {};
    $("#table1").on('click','button',function(){
        buttons.thisbutton = $(this)  //保存第一次点击的当前button

        $.ajax({
            url: ''+url+'/meritpay/factor/getByType/0',
            type: 'get',
            headers:{"User-Token":token},
            success: function (res) {
                console.log(res)
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
                $(".left ul").find("li").first("li").addClass("newtmp-active")
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


        $(".newtmp-content .right").on('click','li',function(){
            var thisSel = $(this);

            $(this).siblings("li").css("background","white");
            $(this).siblings("li").find("span").css("color","#3c3c3c");
            $(this).css("background","rgba(51, 153, 255, 1)");
            $(this).find("span").css("color","white")


            $(".newtmp-select").click(function(){
                var str = thisSel.find("span").text()
                buttons.thisbutton.prev("textarea").text(str) //当前button所对应的文本
                $("#show,#mask").hide()

            })


        })

        //弹出框操作
        $(".newtmp-close,.edittmp-cancel").click(function(){
            $("#show,#mask").hide();
        })


    })




    //保存

    $(".newtmp-ensure #ensure").click(function(){

        var totalpernum =0;
        var totalscore = 0;
        $(".edittmp-per input").each(function(){
            var perval = parseInt($(this).val());
            totalpernum+=perval;
        })
        $(".score").each(function(){
            var scorval = parseInt($(this).val())
            totalscore+=scorval;
        })
        if(totalpernum!==100 ){
            Common.alertError("总和必须等于100%");
            return;
        }else if(totalscore!==100){
            Common.alertError("总分必须等于100");
            return;
        }else{
            var data = {};
            var criterions = [];
            var len = $("#table1 tbody").length
            for(var i = 0;i<len;i++){
                var typeName = $(".num"+i+"").find("tr").first("tr").find("td").find("input").val();
                var trslen = $(".num"+i+"").find("tr").length-2;

                for(var j = 0;j<trslen;j++){
                    var list  ={};
                    var index = j+1
                    var criterionContent = $(".num"+i+" tr:eq("+index+")").find("td").find("textarea").val();
                    var score =parseInt($(".num"+i+" tr:eq("+index+")").find("td").find(".score").val())
                    list.typeName=typeName;
                    list.criterionContent = criterionContent;
                    list.score = score;
                    criterions.push(list)

                }
            }

            var templateName = $(".newtmp-title input").val();
            data.criterions = criterions;
            data.gartenId = 0;
            data.templateName = templateName;

            var datas = JSON.stringify(data)
            console.log(data)
            var templateId="";
            $.ajax({
                url:'http://106.15.137.203/meritpay/template/save',
                type:'post',
                headers:{"User-Token":token},
                dataType: "json",
                contentType: 'application/json',
                data:datas,
                async: false,
                success:function(res){
                    if(res.result==0){
                        Common.alertSuccess("保存成功");
                    }else{
                        Common.alertError("保存失败")
                    }
                    templateId = res.data;
                }
            })


                $("#ensure")[0].href="jxmange.html?templateId="+templateId+"";
                console.log(templateId)

        }


    })







    //弹出引用层
    $(".newtmp-title a").click(function () {
        $("#show1,#mask").show()
    })
    $("#show1 .newtmp-close1").click(function(event){
        $("#show1,#mask").hide()
    })






})