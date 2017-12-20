$(function () {

    var host = window.location.host;
    var test = window.location.protocol;
   // var url = test+"//"+host;
    //var url = 'http://forchild.zhitong.group';

    //获取session
    var sessioninfo = sessionStorage.getItem("teacher");
    var data =  eval('(' + sessioninfo + ')');
    //var gartenId = data.gartenid;
    var gartenId = 4;
    //var token = data.token;

    var url = 'http://106.15.137.203';
    var token ="eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTA0NDkwMDIsInVzZXJJZCI6MTAwNSwidXNlclR5cGUiOjEsInVzZXJOYW1lIjoi572X5a-G5qynIn0.SFizSY4da2qyU_HQlx92jFCgMHockT9JJpD6nnoiTZA"



    //循环因子库
    var len = $("#table1").find("button").length;
    for(var i = 0;i<len;i++){
        $("#table1 button:eq("+i+")").addClass("btn"+i+"")
    }

    //删除每一个指标
    $(document).on('click','.delete',function() {
        var dom = $(this)
        Common.deleteConfirm(function () {
            var len = dom.parent("tr").parent("tbody").find("tr").length - 1;
            dom.parent("tr").parent("tbody").find("tr").first("tr").find("td").attr("rowspan", len)
            dom.parent("tr").remove();
            percount();
            countTotal();
            Common.alertSuccess("删除成功");
            //循环因子库
            var len = $("#table1").find("button").length;
            for (var i = 0; i < len; i++) {
                $("#table1 button:eq(" + i + ")").removeClass()
                $("#table1 button:eq(" + i + ")").addClass("btn" + i + "")
            }

        })
    });


    //添加指标
        $(document).on('click','.edittmp-add',function(){
            var len = $(this).parent("td").parent("tr").parent("tbody").find("tr").length+1;
            $(this).parent("td").parent("tr").parent("tbody").find("tr").first("tr").find("td").attr("rowspan",len)
            var html = "<tr><td><textarea></textarea><button>因子库</button></td><td><input class='score' type='text' value='' placeholder=''></td><td class='delete'><span>删除</span></td></tr>"
            $(this).parent("td").parent("tr").before(html);

            //循环因子库
            var len = $("#table1").find("button").length;
            for(var i = 0;i<len;i++){
                $("#table1 button:eq("+i+")").removeClass()
                $("#table1 button:eq("+i+")").addClass("btn"+i+"")
            }

        })


//添加项目
    var k =0;
    $(document).on('click','.additem',function(){
       k++;
        var html = "<tbody class='num"+k+"'>"+
                   "<tr><td rowspan='5'><input class='typeName' type='text' value=''placeholder='项目名称'><div class='edittmp-per'><input type='text' value=''><span>%</span><i class='deleteitem  glyphicon glyphicon-remove' style='display: block;margin-top: 20px'></i></div></td></tr>"+
                   "<tr><td><textarea></textarea><button>因子库</button></td>" +
                   "<td><input class='score' type='text' value='' placeholder=''></td>" +
                   "<td class='delete'><span>删除</span></i></td>"+
                   "</tr>"+
                   "<tr><td><textarea></textarea><button>因子库</button></td>" +
                   "<td><input class='score' type='text' value='' placeholder=''></td>" +
                   "<td class='delete'><span>删除</span></td>"+
                   "</tr>"+
                   "<tr><td><textarea></textarea><button>因子库</button></td>" +
                   "<td><input class='score' type='text' value='' placeholder=''></td>" +
                   "<td class='delete'><span>删除</span></i></td>"+
                   "</tr>"+
                   "<tr><td colspan='3'><a href='javascript:;' class='edittmp-add  glyphicon glyphicon-plus-sign'></a></td></tr>"
                   "</tbody>"
        $("#table1").find("tbody").last("tbody").after(html)

        //循环因子库
        var len = $("#table1").find("button").length;
        for(var i = 0;i<len;i++){
            $("#table1 button:eq("+i+")").removeClass()
            $("#table1 button:eq("+i+")").addClass("btn"+i+"")
        }
    })


//删除项目
    $(document).on("click",".deleteitem",function(){
        k--;
        var dom = $(this)
        Common.deleteConfirm(function () {
            dom.parent(".edittmp-per").parent("td").parent("tr").parent("tbody").remove();
            percount();
            countTotal();
            Common.alertSuccess("删除成功")

            //循环因子库
            var len = $("#table1").find("button").length;
            for(var i = 0;i<len;i++){
                $("#table1 button:eq("+i+")").removeClass()
                $("#table1 button:eq("+i+")").addClass("btn"+i+"")
            }
        })

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
    var savestatus = {};
    $("#table1").on('click','button',function(){
        buttons.thisbutton = $(this)  //保存第一次点击的当前button

        buttons.btns = $(this).attr("class");

        $.ajax({
            url: ''+url+'/meritpay/factor/getType/0',
            type: 'get',
            headers:{"User-Token":token},
            success: function (res) {
                console.log(res)
                var len = res.data.length;
                var html = "";
                for (var i = 0; i < len; i++) {
                    html += "<li class =' leftactive left"+ res.data[i].factors[0].factorTypeId+"' factortype_id=" + res.data[i].factors[0].factorTypeId + "><a  href='javascript:;'>" + res.data[i].typeName + "</a></li>";
                    $(".left ul").html(html)
                }

                $(".left ul").find("li").find("a").css("color","black")
                $(".left ul").find("li").first("li").addClass("newtmp-active").find("a").css("color","white")

                var factors = res.data[0].factors;
                var factorshtml = "";
                for (var j = 0; j < factors.length; j++) {
                    factorshtml += "<li number=" + j + "><span>" + factors[j].content + "</span></li>"
                    $(".right ul").html(factorshtml)
                }


                if(savestatus.hasOwnProperty("thisbutton")){

                    var btn = buttons.btns;
                    if(savestatus.hasOwnProperty(btn)){

                        var leftid = Number(savestatus[btn][0])
                        var rightid = Number(savestatus[btn][1])

                        if(savestatus[btn][0]==undefined){
                            var id = $(".left ul").find("li").first("li").attr("factortype_id");

                            leftid = Number(id)
                        }



                        console.log(rightid)
                        $.ajax({
                            url:''+url+'/meritpay/factor/getType/'+leftid+'',
                            type:'get',
                            headers:{"User-Token":token},
                            success:function(res){
                                var len = res.data[0].factors.length;
                                var factorshtml = ""
                                for(var i =0;i<len;i++){
                                    factorshtml += "<li number="+i+"><span>"+res.data[0].factors[i].content+"</span></li>"
                                }
                                $(".right ul").html(factorshtml)


                                $(".left"+leftid+"").siblings("li").removeClass("newtmp-active").children("a").css("color","#3c3c3c")
                                $(".left"+leftid+"").addClass("newtmp-active").children("a").css("color","#ffffff")
                                $(".right li:eq("+rightid+")").css("background","#C8C8C8");
                            }
                        })
                    }


                }

                $("#show,#mask").show();
            }
        })


        $(".left ul").on('click','li',function(){
            savestatus.thisleft = $(this).attr("factortype_id");

            var id = $(this).attr("factortype_id");
            $(this).siblings("li").removeClass("newtmp-active").children("a").css("color","#3c3c3c").removeClass(".newtmp-active")
            $(this).addClass("newtmp-active").children("a").css("color","#ffffff")

            $.ajax({
                url:''+url+'/meritpay/factor/getType/'+id+'',
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
            savestatus.thisright = $(this).attr("number");

            var thisSel = $(this);

            $(this).siblings("li").css("background","#F1F1F1");
            $(this).siblings("li").find("span").css("color","#3c3c3c");
            $(this).css("background","rgba(51, 153, 255, 1)");
            $(this).find("span").css("color","white")


            $(".newtmp-select").click(function(){

                if( !$(".leftactive").hasClass("newtmp-active")){
                    Common.alertError("请选择项目名称");
                    return;
                }

                var str = thisSel.find("span").text()
                buttons.thisbutton.prev("textarea").val(str) //当前button所对应的文本

                savestatus.thisbutton =buttons.thisbutton;

                var btn = buttons.thisbutton.attr("class");
                savestatus[btn] = [savestatus.thisleft,savestatus.thisright];
                //savestatus[btn] = [savestatus.leftstatus,savestatus.thisright];
                savestatus.btns = buttons.thisbutton.attr("class");

                $("#show,#mask").hide()

            })


        })

        //弹出框操作
        $(".newtmp-close,.edittmp-cancel").click(function(){
            $("#show,#mask").hide();
        })



    })




    //保存
    $(".newtmp-ensure .sure").click(function(){

        var titleName = $(".newtmp-title input").val();
        var tbodylen = $("tbody").length;
        var textarr = [];
        for(var i = 0;i<tbodylen;i++){
            var text = $(".num"+i+" .typeName").val();
            console.log(text)
            if($.trim(text)==""){
                textarr.push(text)
            }

        }
        if($.trim(titleName)==""){
            Common.alertError("模板名称不能为空");
            return;
        }
        if(textarr[0]==""){
            Common.alertError("项目名称不能为空");
            return;
        }

        //标准为空
        //标准为空
        var textarealen = $("#table1").find("textarea").length;
        var arr = [];
        var textarea = document.getElementsByTagName("textarea");
        for(var i =0;i<textarealen;i++){
            var text = textarea[i].value;
            if($.trim(text)==""){
                arr.push(text)
            }
        }
        if(arr[0]==""){
            Common.alertError("标准不能为空");
            return;
        }



        //分数不能为空
        var scorearr = [];
        var scorelen = $(".score").length;
        var scores = document.getElementsByClassName("score")
        for(var i = 0;i<scorelen;i++){
            var text = scores[i].value;
            if($.trim(text)==""){
                scorearr.push(text)
            }
        }
        if(scorearr[0]==""){
            Common.alertError("分数不能为空");
            return;
        }


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
            data.gartenId = gartenId;
            data.templateName = templateName;
            data.status=1

            var datas = JSON.stringify(data)
            console.log(data)
            var templateId="";

            $.ajax({
              url:''+url+'/meritpay/template/save',
                type:'post',
                dataType: "json",
                headers:{"User-Token":token},
                contentType: 'application/json',
                data:datas,
                async: false,
                success:function(res){
                    console.log(res)
                    if(res.result==0){
                        Common.alertSuccess("保存成功");
                        setTimeout(function(){
                            window.history.go(-1)
                        },800)
                    }else{
                        Common.alertError("保存失败")
                    }
                    templateId = res.data;
                }
            })

    })

    

    //弹出引用层
    $(".newtmp-title a").click(function () {
        var len = $("#show1 ul").find("li").length;
        if(len==1){
            $("#show1 ul li").css("width","100%")
        }
        if(len==0){
            Common.alertError("没有模板可用");
            return;
        }
        $("#show1,#mask").show();
    })
    $("#show1 .newtmp-close1").click(function(event){
        $("#show1,#mask").hide()
    })






})