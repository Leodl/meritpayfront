(function ($) {
    $.fn.select2.defaults.set("language", "zh-CN");
    $.fn.select2.defaults.set("minimumResultsForSearch", 10);
    $.fn.select2.defaults.set("tags", false);
    $.fn.dataTable.ext.errMode = 'none';
    $.fn.initDataTable = function (options) {
        var columns = options.columns;
        var columnsArr = [];
        if (columns) {
            for (var i = 0; i < columns.length; i++) {
                columnsArr.push({"data": columns[i]});
            }
        }
        var paging = options.paging == null ? true : options.paging;
        var info = options.info == null ? true : options.info;
        var table = this.DataTable({
            language: {
                "sProcessing": "处理中...",
                "sLengthMenu": "每页 _MENU_ 项结果",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项。",
                "sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix": "",
                "sSearch": "搜索:",
                "sUrl": "",
                "sEmptyTable": "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页",
                    "sJump": "跳转"
                },
                "oAria": {
                    "sSortAscending": ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            },  //提示信息
            ordering: options.ordering == null ? false : options.ordering,
            paging: paging,
            info: info,
            autoWidth: true,  //禁用自动调整列宽
            stripeClasses: ["odd", "even"],  //为奇偶行加上样式，兼容不支持CSS伪类的场合
            processing: true,  //隐藏加载提示,自行处理
            serverSide: true,  //启用服务器端分页
            searching: false,  //禁用原生搜索
            orderMulti: false,  //启用多列排序
            order: options.order,  //取消默认排序查询,否则复选框一列会出现小箭头
            renderer: "bootstrap",  //渲染样式：Bootstrap和jquery-ui
            pagingType: "simple_numbers",  //分页样式：simple,simple_numbers,full,full_numbers
            //scrollY: 500,//设置高
            scrollCollapse: false, //是否开启DataTables的高度自适应，当数据条数不够分页数据条数的时候，插件高度是否随数据条数而改变
            columnDefs: options.columnDefs,
            ajax: function (data, callback, settings) {
                var param = options.ajax.data();
                var url = options.ajax.url;
                if (paging && info) {
                    param.pagesize = data.length;
                    param.curpage = (data.start / data.length) + 1;
                }
                if (options.ajax.urltype == 'attendance'){
                    Common.attendanceAjax({
                        url: url,
                        data: param,
                        success: function (result) {
                            if (options.ajax.success) {
                                options.ajax.success(data, callback, result);
                            } else {
                                var returnData = {};
                                returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                                returnData.recordsTotal = result.total;//返回数据全部记录
                                returnData.recordsFiltered = result.total;//后台不实现过滤功能，每次查询均视作全部结果
                                returnData.data = result.data;//返回的数据列表
                                callback(returnData);
                            }
                        }
                    })
                }else{
                    Common.ajax({
                        url: url,
                        data: param,
                        success: function (result) {
                            if (options.ajax.success) {
                                options.ajax.success(data, callback, result);
                            } else {
                                var returnData = {};
                                returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                                returnData.recordsTotal = result.total;//返回数据全部记录
                                returnData.recordsFiltered = result.total;//后台不实现过滤功能，每次查询均视作全部结果
                                returnData.data = result.data;//返回的数据列表
                                callback(returnData);
                            }
                        }
                    })
                }
            },
            dom: "tip",
            columns: columnsArr,
            createdRow: options.createdRow
        });
        return table;
    };
})(jQuery);

$.validator.addMethod("mobile", function (value, element, param) {
    var length = value.length;
    //return this.optional(element) || ( length == 11  && !isNaN(value));
    return this.optional(element) || ( length == 11 && /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value));
}, $.validator.format("请输入正确的手机号码"));
$.validator.addMethod("chrnum", function (value, element) {
    var chrnum = /^([a-zA-Z0-9]+)$/;
    return this.optional(element) || (chrnum.test(value));
}, "只能输入数字和字母");

$(document).ajaxError(function (xhr, status, errMsg) {
    App.unblockUI();
    if (status.status == 11111) {
        alert('您的登录已过期,请重新登录！');
        window.location = "login.html";

    } else if (status.status == 33333) {
        alert('您没有权限！');

    } else if (status.status == 404) {
        alert('您访问的资源不存在！');

    } else if (status.status == 454) {
        window.location = "login.html"

    }
    // else {
    //     sweetAlert('系统错误:' + status.status + status.responseText);
    // }
});
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


function comparedate(a, b) {
    var arr = a.split("-");
    var starttime = new Date(arr[0], arr[1], arr[2]);
    var starttimes = starttime.getTime();

    var arrs = b.split("-");
    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
    var lktimes = lktime.getTime();

    if (starttimes >= lktimes) {
        return false;
    }
    else
        return true;
}
var Common = function () {
    var obj = {};
    obj.deepCopy = function(source) {
        var result={};
        for (var key in source) {
            result[key] = typeof source[key]==='object'? deepCoyp(source[key]): source[key];
        }
        return result;
    }
    obj.removeArr = function(arr,val) {
        var index = arr.indexOf(val);
        if (index > -1) {
            arr.splice(index, 1);
        }
    };
    obj.copyArr = function(arr) {
        var res = []
        for (var i = 0; i < arr.length; i++) {
            res.push(obj.deepCopy(arr[i]));
        }
        return res;
    }
    obj.split = function (str) {
        if (!str) {
            return [];
        }
        var arr = str.split(',');
        var a = [];
        $.each(arr, function (i, v) {
            var data = $.trim(v);//$.trim()函数来自jQuery
            if ('' != data) {
                a.push(data);
            }
        });
        return a;
    }
    obj.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
        var url = window.location.toString();
        var search = url.substring(url.indexOf("?") + 1);
        var r = search.match(reg);  // 匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; // 返回参数值
    }
    obj.ajax = function (params) {
        App.blockUI({
            animate: true
        });
        var token = Constants.user.token;
        var data;
        var type = params.type ? params.type : "POST";
        var url = Constants.ROOT_URL + params.url;

        if (type.toLowerCase() == 'post') {
            data = JSON.stringify(params.data);
        } else {
            data = params.data;
        }
        $.ajax({
            type: type,
            url: url,
            data: data,
            headers: {'User-Token': token},
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            async: params.async == null ? true : params.async,
            cache: false,
            success: function (data) {
                App.unblockUI();
                params.success(data);
            }
        });
    }


    obj.attendanceAjax = function (params) {
        App.blockUI({
            animate: true
        });
        var token = Constants.user.token;
        var data;
        var type = params.type ? params.type : "POST";
        var url = Constants.ATTENDANCE_URL + params.url;

        if (type.toLowerCase() == 'post') {
            data = JSON.stringify(params.data);
        } else {
            data = params.data;
        }
        $.ajax({
            type: type,
            url: url,
            data: data,
            headers: {'User-Token': token},
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            async: params.async == null ? true : params.async,
            cache: false,
            success: function (data) {
                App.unblockUI();
                params.success(data);
            }
        });
    }

    obj.ajaxForm = function (params) {
        App.blockUI({
            animate: true
        });
        var token = Constants.user.token;
        $.ajax({
            url: params.url,
            type: 'POST',
            data: params.data,
            cache: false,
            headers: {'User-Token': token},
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (data) {
                App.unblockUI();
                params.success(data);
            },
            error: function (data) {
                App.unblockUI();
                params.error(data);
            }
        })
    }
    obj.alertSuccess = function (title, text) {
        swal({
            title: title,
            text: text,
            timer: 1000,
            showConfirmButton: false,
            type: "success"
        });
    }
    obj.alertError = function (title, text) {
        swal({
            title: title,
            text: text,
            type: "error"
        });
    }

    obj.deleteConfirm = function (successCallback) {
        sweetAlert({
                title: "您确定要删除这条信息吗",
                text: "删除后将无法恢复，请谨慎操作！",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    successCallback();
                }
            })
    }

    obj.groupConfirm = function(successCallback){
        sweetAlert({
                title: "您确定要关闭分组吗",
                text: "考核分组已启用考核模板，若关闭考核分组，请去模板管理中心重新启用一套模板，用于全员考核！",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    successCallback();
                }
            })
    }

    obj.generateUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
   
    obj.getQiniuToken = function () {
    	var url = window.location.href.split("/");
    	var urltype = window.location.host.split(".");
    	var buckname = ""
    		if(urltype[0]=="127"){
    			for(var i = 0;i<url.length;i++){
    	    		
    	    		 if(url[i]=="contributedetail"){
    	                 buckname = "forchild-user-dev"
    	             }
    	             if(url[i]=="subjectadd"){
    	                 buckname = "forchild-user-dev"
    	             }
    	             if(url[i]=="subjectupdate"){
    	                 buckname = "forchild-user-dev"
    	             }
    	     		if(url[i]=="admin"){
    	     			buckname = "forchild-resource-dev"
    	     		}
    	     		if(url[i]=="client"){
    	     			buckname = "forchild-user-dev"
    	     		}
    	    		
    	    	}
    		}
    	if(urltype[0]=="106"){
    		for(var i = 0;i<url.length;i++){
        		
       		 if(url[i]=="contributedetail"){
                    buckname = "forchild-user-dev"
                }
                if(url[i]=="subjectadd"){
                    buckname = "forchild-user-dev"
                }
                if(url[i]=="subjectupdate"){
                    buckname = "forchild-user-dev"
                }
        		if(url[i]=="admin"){
        			buckname = "forchild-resource-dev"
        		}
        		if(url[i]=="client"){
        			buckname = "forchild-user-dev"
        		}
       		
       	}
    	}
    	if(urltype[0]=="forchild"){
    		for(var i = 0;i<url.length;i++){
        		
       		 if(url[i]=="contributedetail"){
                    buckname = "forchild-user"
                }
                if(url[i]=="subjectadd"){
                    buckname = "forchild-user"
                }
                if(url[i]=="subjectupdate"){
                    buckname = "forchild-user"
                }
        		if(url[i]=="admin"){
        			buckname = "forchild-resource"
        		}
        		if(url[i]=="client"){
        			buckname = "forchild-user"
        		}  
       	}
    	}
    	
    	console.log(buckname)
        var token;
        Common.ajax({
            url: '/service/qiniu/getauth',
            data: {bucketname: buckname},
            async: false,
            success: function (res) {
                if (res.result == 0) {
                    token = res.data;
                }
            }
        });
        return token;
    }
    
   /* obj.getQiniuToken1 = function () {
        var token;
        Common.ajax({
            url: '/service/qiniu/getauth',
            data: {bucketname: "forchild-resource"},
            async: false,
            success: function (res) {
                if (res.result == 0) {
                    token = res.data;
                }
            }
        });
        return token;
    };*/

    obj.currentDate = function () {
        return new Date().Format("yyyy-MM-dd");
    }
    obj.getDateStr = function(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        return dd.Format("yyyy-MM-dd");
    }
    obj.currentMonth = function () {
        return new Date().Format("yyyy-MM");
    }
    obj.objToArr = function (obj) {
        var arr = [];
        for (var i in obj) {
            arr.push({"id": i, "text": obj[i]});
        }
        return arr;
    }


    obj.compress = function(file ,callback) {

        if (file < 1024*104){
            callback(file);
        }else{
            var image = new Image(),
                canvas = document.createElement("canvas"),
                ctx = canvas.getContext('2d');


            var reader = new FileReader();//读取客户端上的文件
            reader.onload = function () {
                var url = reader.result;//读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.所以必须使用reader.onload，
                image.src = url;//reader读取的文件内容是base64,利用这个url就能实现上传前预览图片
            };
            image.onload = function () {
                var afterWidth = '1024';
                var upImgWidth = image.width,
                    upImgHeight = image.height;
                var orientation = 1;
                //获取图像的方位信息
                EXIF.getData(image, function () {
                    orientation = parseInt(EXIF.getTag(image, "Orientation"));
                    orientation = orientation ? orientation : 1;
                });
                //压缩换算后的图片高度
                var afterHeight = afterWidth * upImgHeight / upImgWidth;

                if (orientation <= 4) {
                    // 设置压缩canvas区域高度及宽度
                    canvas.setAttribute("height", afterHeight);
                    canvas.setAttribute("width", afterWidth);
                    if (orientation == 3 || orientation == 4) {
                        hidCtx.translate(afterWidth, afterHeight);
                        hidCtx.rotate(180 * Math.PI / 180);
                    }
                } else {
                    // 设置压缩canvas区域高度及宽度
                    canvas.setAttribute("height", afterWidth);
                    canvas.setAttribute("width", afterHeight);

                    if (orientation == 5 || orientation == 6) {
                        canvas.translate(afterHeight, 0);
                        canvas.rotate(90 * Math.PI / 180);
                    } else if (orientation == 7 || orientation == 8) {
                        canvas.translate(0, afterWidth);
                        canvas.rotate(270 * Math.PI / 180);
                    }
                }

                // canvas绘制压缩后图片
                ctx.drawImage(image, 0, 0, upImgWidth, upImgHeight, 0, 0, afterWidth, afterHeight);

                var newImg = new Image();
                newImg.src = canvas.toDataURL('image/jpeg', 0.7); //d
                var b = obj.dataURLtoBlob(newImg.src);
                callback(b);
            };
            reader.readAsDataURL(file);
        }
    }
    obj.dataURLtoBlob = function (dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    }

    return obj;

}();

(function ($) {
    $.fn.extend({
        getFilesCount: function () {
            return $(this).fileinput('getFilesCount');
        },
        qiniu: function (options) {
            var settings = {
                language: 'zh', //设置语言
                uploadUrl: 'http://upload.qiniu.com/', //上传的地址
                showCaption: false,//是否显示被选文件的简介
                showBrowse: true,//是否显示浏览按钮,
                showPreview: true,//是否显示预览
                showRemove: false,//是否显示移除按钮
                showUpload: false, //是否显示上传按钮
                showCancel: false,//是否显示取消按钮
                showClose: true,//是否显示关闭按钮

                resizeImage:true,
                maxImageWidth: 1024,
                maxImageHeight: 768,
                resizePreference: 'width',
                resizeImageQuality:0.7,
                resizeIfSizeMoreThan: 1024,

                uploadAsync: true, //默认异步上传
                allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
                dropZoneEnabled: false,//是否显示拖拽区域
                maxFileCount: 10, //表示允许同时上传的最大文件个数
                uploadIcon: "",
                browseClass: "btn btn-primary", //按钮样式
                previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
                browseIcon: "",
                msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
                fileActionSettings: {
                    showZoom: false,
                    showUpload: false
                }
            }
            if (options && options.browseLabel) {
                settings.browseLabel = options.browseLabel;
            }
            if (options && options.browseClass != null) {
                settings.browseClass = options.browseClass;
            }
            if (options && options.maxFileCount) {
                settings.maxFileCount = options.maxFileCount;
            }
            if (options && options.showCaption) {
                settings.showCaption = true;
            }
            if (options && options.fileActionSettings) {
                settings.fileActionSettings = options.fileActionSettings;
            }
            if (options && options.initialPreviewAsData) {
                settings.initialPreviewAsData = true;
                settings.initialPreview = options.initialPreview;
            }
            if (options && options.showUpload) {
                settings.showUpload = true;
            }
            if (options && options.showPreview == false) {
                settings.showPreview = false;
            }
            if (options && options.allowedFileExtensions) {
                settings.allowedFileExtensions = options.allowedFileExtensions;
            }
            if (options && options.allowedFileTypes) {
                settings.allowedFileTypes = options.allowedFileTypes;
            }

            var fileObj = $(this).fileinput(settings).on('filepreupload', function (event, data, previewId, index) {
                var form = data.form;
                form.append('key', Common.generateUUID());
                form.append('accept', '');
                form.append('token', Common.getQiniuToken());
                

            })
            return fileObj;
        },
        initForm: function (options) {
            //默认参数
            var defaults = {
                formdata: "",
                isDebug: true   //是否需要调试，这个用于开发阶段，发布阶段请将设置为false，默认为false,true将会把name value打印出来
            }
            //如果传入的json字符串，将转为json对象
            var tempData = "";
            if ($.type(options) === "string") {
                defaults.formdata = JSON.parse(options);
            } else {
                defaults.formdata = options;
            }
            //设置参数
            // var setting = $.extend({}, defaults, tempData);
            var setting = defaults;
            var form = this;
            formdata = setting.formdata;

            //如果传入的json对象为空，则不做任何操作
            if (!$.isEmptyObject(formdata)) {
                var debugInfo = "";
                $.each(formdata, function (key, value) {
                    //是否开启调试，开启将会把name value打印出来
                    if (setting.isDebug) {
                        debugInfo += "name:" + key + "; value:" + value + "\r\n ";
                    }
                    //表单处理
                    var formField = form.find("[name='" + key + "']");
                    if ($.type(formField[0]) === "undefined") {
                        if (setting.isDebug) {
                            //console.warn("can not find name:[" + key + "] in form!!!"); //没找到指定name的表单
                        }
                    } else {
                        var fieldTagName = formField[0].tagName.toLowerCase();
                        if (fieldTagName == "input") {
                            if (formField.attr("type") == "radio") {
                                $("input:radio[name='" + key + "'][value='" + value + "']").attr("checked", "checked");
                            } else if (formField.attr("type") == "checkbox") {
                                $("input:checkbox[name='" + key + "'][value='" + value + "']").attr("checked", "checked");
                            } else {
                                formField.val(value);
                            }
                        } else if (fieldTagName == "label") {
                            formField.html(value);
                        } else if (fieldTagName == "select") {
                            formField.val(value).trigger('change');
                        } else {
                            formField.val(value);
                        }
                    }
                    //图片链接处理form.find("img[fieldata=img_url]")
                    var formImage = form.find("img[fieldata=" + key + "]");
                    if ($.type(formImage[0]) != "undefined") {
                        formImage.attr("src", value);
                    }
                    //a链接处理
                    var formLink = form.find("a[fieldata=" + key + "]");
                    if ($.type(formLink[0]) != "undefined") {
                        formLink.attr("href", value);
                    }
                })

            }
            return form;    //返回对象，提供链式操作
        }
    });
})(jQuery);



