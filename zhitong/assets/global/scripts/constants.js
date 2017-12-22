var Constants = function() {
    var obj = {};
    obj.menuList = [];
    obj.ASSETS_PATH = '../assets';

    var url = window.location.host.split(".");
    console.log(url)
    if(url[0]=="localhost:63342"){
        obj.ATTENDANCE_URL = 'http://106.15.137.203/zhitong';
        // obj.ROOT_URL = 'http://localhost/zhitong';
        obj.ROOT_URLJX = 'http://106.15.137.203/';
        obj.QINIU_USER_URL = 'http://os4skw475.bkt.clouddn.com/'; // client测试服务器
        obj.QINIU_USER_URL_USER = 'http://os70jnmwy.bkt.clouddn.com/';// admin测试服务器空间
        obj.QINIU_USER_URL = 'http://os4skw475.bkt.clouddn.com/'; // 测试
    }
    if (url[0] == "127") {
        obj.ATTENDANCE_URL = 'http://127.0.0.1:8080/';
        //obj.ROOT_URL = 'http://localhost/zhitong';
        obj.ROOT_URL = 'http://127.0.0.1:8080/zhitong';
        obj.QINIU_USER_URL = 'http://os4skw475.bkt.clouddn.com/'; // client测试服务器
        obj.QINIU_USER_URL_USER = 'http://os70jnmwy.bkt.clouddn.com/';// admin测试服务器空间
        obj.QINIU_USER_URL = 'http://os4skw475.bkt.clouddn.com/'; // 测试
    }
    if (url[0] == "forchild") {
        obj.ATTENDANCE_URL = 'http://forchild.zhitong.group/zhitong';
        // obj.ROOT_URL = 'http://localhost/zhitong';
        obj.ROOT_URL = 'http://forchild.zhitong.group/zhitong';

        obj.QINIU_USER_URL = 'http://oxpfj3y0x.bkt.clouddn.com/'; // client生产服务器空间
        obj.QINIU_USER_URL_USER = 'http://oxpfjakmu.bkt.clouddn.com/'; // admin生产服务器空间
        obj.QINIU_ATTENDANCE_URL = 'http://ougln0lzz.bkt.clouddn.com/'; // 刷卡数据
    }
    if (url[0] == "106") {
        obj.ATTENDANCE_URL = 'http://106.15.137.203/zhitong';
        // obj.ROOT_URL = 'http://localhost/zhitong';
        obj.ROOT_URL = 'http://106.15.137.203/zhitong';
        obj.QINIU_USER_URL = 'http://os4skw475.bkt.clouddn.com/'; // client测试服务器
        obj.QINIU_USER_URL_USER = 'http://os70jnmwy.bkt.clouddn.com/';// admin测试服务器空间
        obj.QINIU_USER_URL = 'http://os4skw475.bkt.clouddn.com/'; // 测试
    }

    if (url[0] == "test") {
        obj.ATTENDANCE_URL = 'http://test.zhitong.group/zhitong';
        //obj.ROOT_URL = 'http://localhost/zhitong';
        obj.ROOT_URL = 'http://test.zhitong.group/zhitong';
        obj.QINIU_USER_URL = 'http://os4skw475.bkt.clouddn.com/'; // client测试服务器
        obj.QINIU_USER_URL_USER = 'http://os70jnmwy.bkt.clouddn.com/';// admin测试服务器空间
        obj.QINIU_USER_URL = 'http://os4skw475.bkt.clouddn.com/'; // 测试
    }

    obj.user = window.sessionStorage.getItem('user');

    if (obj.user) {
        obj.user = JSON.parse(obj.user);
    } else {
        obj.user = window.sessionStorage.getItem('teacher');
        if (obj.user) {
            obj.user = JSON.parse(obj.user);
        } else {
            obj.user = {};
        }
    }
    console.log(obj.user)
    // obj.QINIU_USER_URL='http://oxpfj3y0x.bkt.clouddn.com/'; //client生产服务器空间
    // obj.QINIU_USER_URL_USER='http://oxpfjakmu.bkt.clouddn.com/';
    // //admin生产服务器空间

    // obj.QINIU_USER_URL='http://os4skw475.bkt.clouddn.com/'; //client测试服务器
    // obj.QINIU_USER_URL_USER='http://os70jnmwy.bkt.clouddn.com/';//admin测试服务器空间

    // obj.QINIU_USER_URL = 'http://os4skw475.bkt.clouddn.com/'; //测试
    // obj.QINIU_ATTENDANCE_URL = 'http://ougln0lzz.bkt.clouddn.com/'; //刷卡数据

    obj.categoryObj = {
        "1" : "公办",
        "2" : "民办"
    };
    obj.genderObj = {
        "1" : "男",
        "2" : "女"
    };
    obj.degreeObj = {
        "1" : "大专",
        "2" : "本科",
        "3" : "硕士",
        "4" : "博士",
        "5" : "博士后",
        "6" : "其他"
    };
    obj.schoolageObj = {
        "1" : "不足1年",
        "2" : "1至3年",
        "3" : "3至5年",
        "4" : "5年以上"
    };
    obj.certificateObj = {
        "1" : "有",
        "2" : "无"
    };
    obj.classGradeObj = {
        "1" : "托班",
        "2" : "小班",
        "3" : "中班",
        "4" : "大班"
    };

    obj.faqCategoryObj = {
        "1" : "考勤类",
        "2" : "运营类"
    };

    obj.subjectTaskStatusObj = {
        "1" : "进行中",
        "2" : "已结束"
    };
    obj.subjectTaskTypeObj = {
        "1" : "需要反馈",
        "2" : "不需要反馈"
    };

    obj.whetherObj = {
        "1" : "是",
        "2" : "否"
    };
    obj.answerObj = {
        "1" : "未回复",
        "2" : "已回复"
    };
    obj.articleStatus = {
        "0" : "状态",
        "1" : "草稿",
        "2" : "待审核",
        "3" : "通过",
        "4" : "未通过"
    };
    obj.articleStatuss = {
        "0" : "状态",
        "2" : "待审核",
        "4" : "未通过"
    };

    obj.teachingStatusObj = {
        "1" : "进行中",
        "2" : "已结束"
    };

    obj.attendanceStatusObj = {
        "1" : "正常",
        "2" : "迟到",
        "3" : "早退",
        "4" : "缺勤",
        "5" : "迟到并早退",
        "6" : "上午缺卡",
        "7" : "下午缺卡",
        "8" : "上午缺卡早退",
        "9" : "迟到缺卡"
    };

    // obj.attendanceStatusObj = {"1": "正常","2":"病假","3":"事假","4": "缺勤" };

    obj.babyStatusObj = {
        "1" : "正常",
        "2" : "病假",
        "3" : "事假",
        "4" : "缺勤"
    };

    obj.leaveTypeObj = {
        "1" : "无",
        "2" : "病假",
        "3" : "事假"
    };

    obj.deviceStatusObj = {
        "1" : "在线",
        "2" : "离线"
    };
    obj.publisheridentityObj = {
        "1" : "致童小秘书",
        "2" : "致童教育",
        "3" : "致童优幼联盟"
    };
    obj.userTypeObj = {
        "1" : "全部",
        "2" : "园长",
        "3" : "老师",
        "4" : "家长"
    };

    obj.visibleObj = {
        "1" : "园长",
        "2" : "老师",
        "3" : "内部"
    };
    obj.osTypeObj = {
        "1" : "考勤机",
        "2" : "安卓"
        // "3" : "安卓老师"
    };
    obj.appTypeObj = {
        "1" : "老师端",
        "2" : "家长端"
    };

    obj.adTypeObj = {
        "1" : "APP启动页",
        "2" : "首页Banner",
        "3" : "考勤机屏保"
    };
    return obj;
}();