Bmob.initialize("3c1d9bdb4698443b", "10086", "12af5658d30f0016a69d61e1468f4c69");
Bmob.debug(true)
const query = Bmob.Query('_User'); //获取表

let user = Bmob.User.current() //获取缓存
var obj = user.objectId,
    mz = user.username,
    egg = user.egg,
    egg2 = user.egg2,
    sjh = user.phone,
    sj1 = user.sj,
    lxts = user.lxts,
    csj = user.createdAt.substr(0, 10),
    zt = user.zt,
    qqh = user.qqh;
var ts = DateDiff(csj, cur()),
    ts2 = DateDiff(sj1, cur());

var time = new Date().getHours(); //获取时间
var i = 0, //点击签到次数
    d = 0, //可领蛋个数
    jdjg = 0, //鸡蛋价格
    cdjg = 0, //彩蛋价格
    lx = '', //判断蛋的类型
    jg = 0, //赋值价格
    sl = 0; //赋值彩数量
function xx() {
    if (ts2 > 1) { //判断连续签到
        query.get(obj).then(res => {
            console.log(res)
            res.set('lxts', 0)
            res.save()
        });
        lxts = 0;
    }
    if (zt != 'max') { //判断小鸡是否成年
        if (lxts >= 2 && lxts < 9) {
            query.get(obj).then(res => {
                console.log(res)
                res.set('zt', 'min')
                res.save()
                document.getElementById("jmm").backgroundImage = "url('./images/xjj.gif')";
            });
        } else if (lxts >= 9) {
            query.get(obj).then(res => {
                console.log(res)
                res.set('zt', 'max')
                res.save()
                document.getElementById("jmm").backgroundImage = "url('./images/jmm.png')";
            });
        }
        Bmob.User.updateStorage(obj) //更新缓存
    }

    if (lxts <= 10 && zt == 'max') { //判断连续<10天数后
        if (ts % 2 == 0) {
            d = 1;
        }
    } else if (lxts >= 10 && lxts <= 29 && zt == 'max') { //判断连续10到30的天数
        d = 1;
    } else if (lxts >= 30 && zt == 'max') { //判断连续30以上的天数
        d = 2;
    }
}
xx();

function qd() {
    if (i == 0) { //判断是否已经签到
        if (ts2 != 0) { //判断当天是否第一次签到
            if (ts2 == 1) { //判断是否连续签到
                query.get(obj).then(res => {
                    console.log(res)
                    res.set('lxts', lxts + 1)
                    res.save()
                    document.getElementById('ddr').innerHTML = lxts + 1;
                    i++;
                }).catch(err => {
                    alert('网络错误,请刷新重试！')
                });
            }
            if (d == 1) {
                query.get(obj).then(res => {
                    console.log(res)
                    res.set('egg', egg + 1)
                    res.save()
                    document.getElementById('d1').style.animationName = 'd1';
                    setTimeout("document.getElementById('ds').innerHTML = egg + 1;", "2000");
                    document.getElementById('ww').innerHTML = '已收取';
                    i++;
                });
            } else if (d == 2) {
                query.get(obj).then(res => {
                    console.log(res)
                    res.set('egg', egg + 2)
                    res.save()
                    document.getElementById('d1').style.animationName = 'd1';
                    document.getElementById('d2').style.animationName = 'd2';
                    setTimeout("document.getElementById('ds').innerHTML = egg + 1;", "2000");
                    setTimeout("document.getElementById('ds').innerHTML = egg + 2;", "4000");
                    document.getElementById('ww').innerHTML = '已收取';
                    i++;
                });
            }
            query.get(obj).then(res => { //设置今天签到日期
                console.log(res)
                res.set('sj', cur())
                res.save()
            });
            Bmob.User.updateStorage(obj) //更新数据
            if (zt == "max" && d != 0) {
                document.getElementById('ww').innerHTML = '已收取';
            } else if (zt == "min") {
                document.getElementById('ww').innerHTML = '成长中';
            } else if (zt != "min" && zt != "max") {
                document.getElementById('ww').innerHTML = '孵化中';
            } else {
                document.getElementById('ww').innerHTML = '已签到';
            }
            document.getElementById("qd").style.animationName = 'no';
        } else {
            alert("还没有下蛋哦！")
        }
    } else {
        alert("还没有下蛋哦！")
    }
}

function mjd() {
    lx = "egg"
    jd = jdjg;
    sl = egg;
    document.getElementById("jg").innerHTML = jdjg;
    document.getElementById("sl").innerHTML = egg;
}

function mcd() {
    lx = "egg2"
    jd = cdjg;
    sl = egg2;
    document.getElementById("jg").innerHTML = cdjg;
    document.getElementById("sl").innerHTML = egg2;
}

function ydy() {
    var txsl = document.getElementById("txsl").value;
    document.getElementById("ydy").innerHTML = txsl * jg;
}

function zz() {
    var a = document.getElementById("zh").value,
        b = Number(document.getElementById("txsl").value),
        j;
    if (b <= sl && sl != 0) {
        if (lx == "egg") {
            query.get(a).then(res => {
                console.log(res)
                j = res.egg;
                res.set('egg', j + b)
                alert("成功！")
            }).catch(err => {
                alert("失败")
            })
            query.get(obj).then(res => {
                console.log(res)
                j = res.egg;
                res.set('egg', egg - b)
                res.save()
                document.getElementById("sl").innerHTML = egg - b;
                document.getElementById("ds").innerHTML = egg - b;
                Bmob.User.updateStorage(obj)
            }).catch(err => {
                alert("失败")
            })
        }
    } else {
        alert("余额不足！")
    }

}

function cur() {
    var d = new Date(),
        str = '';
    str += d.getFullYear() + '-'; //获取当前年份 
    str += d.getMonth() + 1 + '-'; //获取当前月份（0——11） 
    str += d.getDate();
    return str;
}

function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式
    var aDate, oDate1, oDate2, iDays
    aDate = sDate1.split("-")
    oDate1 = new Date(aDate[0], aDate[1] - 1, aDate[2]); //调用Date的构造函数
    aDate = sDate2.split("-");
    oDate2 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数
    return iDays
}

function sign2() {
    //判断用户已登录
    if (obj != undefined) {
        document.getElementById("reg").style.display = "none";
        document.getElementById("jmm").style.display = "block";
        document.getElementById("ds").innerHTML = egg;
        document.getElementById("ddr").innerHTML = lxts;
        //判断蛋的个数
        if (ts2 != 0) {
            if (d == 1) {
                document.getElementById("d1").style.display = "block";
            } else if (d == 2) {
                document.getElementById("d1").style.display = "block";
                document.getElementById("d2").style.display = "block";
            }
            document.getElementById("qd").style.animationName = 'dd';
        }
        //判断鸡的大小
        if (zt == 'min') {
            document.getElementById("jmm").style.backgroundImage = "url('./images/xjj.gif')";
        } else if (zt == 'max') {
            document.getElementById("jmm").style.backgroundImage = "url('./images/jmm.png')";
        }
        //判断背景黑夜
        if (time >= 20 || time <= 6) {
            document.getElementById("yw").style.display = "block";
            if (zt == 'max') {
                document.getElementById("jmm").style.backgroundImage = "url('./images/jmm2.png')";
            }
        }
        if (zt == 'max' && d != 0) {
            document.getElementById('ww').innerHTML = '收取';
        }
        if (qqh != undefined) {
            document.getElementById("bd").style.display = "none";
            document.getElementById("jybox").style.display = "block";
            document.getElementById("zzm").innerHTML = obj;
            mjd()
        }
    }

}

function bd() {
    var a = document.getElementById("qqh").value;
    var b = document.getElementById("sjh").value;
    if (a != "" && b != "") {
        query.get(obj).then(res => {
            console.log(res)
            res.set('qqh', a)
            res.set('phone', b)
            res.save()
            Bmob.User.updateStorage(obj) //更新数据
            alert('提交成功')
            document.getElementById("bd").style.display = "none";
        }).catch(err => {
            alert('网络错误,请刷新重试！')
        });
        document.getElementById("bd").style.display = "none";
        document.getElementById("jybox").style.display = "block";
        document.getElementById("zzm").innerHTML = obj;
        mjd()
    } else {
        alert("不能有空哦")
    }
}
window.onload = function() {
    sign2()
    if (ts2 == 0) {
        if (zt == "max") {
            document.getElementById('ww').innerHTML = '已收取';
        } else if (zt == "min") {
            document.getElementById('ww').innerHTML = '成长中';
        } else if (zt != "min" && zt != "max") {
            document.getElementById('ww').innerHTML = '孵化中';
        }
    }
    var zbc = "2020-12-12"
    var bee = "2020-12-11"
    var bhdex = "2021-5-7"
    var vgc = "2021-6-17"
    var bi = "2021-6-24"
    var gmn = "2021-8-13"
    var yb = "2021-8-9"
    var bg = "2021-9-17"
    s = cur(); // 获取当前时间
    document.getElementById("zbc").innerHTML = DateDiff(zbc, s); //计算天数差的函数
    document.getElementById("bee").innerHTML = DateDiff(bee, s);
    document.getElementById("bhdex").innerHTML = DateDiff(bhdex, s);
    document.getElementById("vgc").innerHTML = DateDiff(vgc, s);
    document.getElementById("bi").innerHTML = DateDiff(bi, s);
    document.getElementById("gmn").innerHTML = DateDiff(gmn, s);
    document.getElementById("yb").innerHTML = DateDiff(yb, s);
    document.getElementById("bg").innerHTML = DateDiff(bg, s);
}

function register() {
    var a = document.getElementById("mz").value;
    var b = document.getElementById("mm").value;
    if (a != "" && b != "") {
        let params = {
            username: document.getElementById("mz").value,
            password: document.getElementById("mm").value,
            egg: 0,
            lxts: 0,
            sj: cur(),
        }

        Bmob.User.register(params).then(res => {
            alert("注册成功,点击登录");
        }).catch(err => {
            alert("该账户已注册！");
        });
    } else {
        alert("不能有空哦")
    }
}

function sign() {
    var a = document.getElementById("mz").value;
    var b = document.getElementById("mm").value;
    if (a != "" && b != "") {
        Bmob.User.login(document.getElementById("mz").value,
            document.getElementById("mm").value).then(res => {
            alert("你好：" + a);
            location.reload();
        }).catch(err => {
            alert("名字或密码错误！");
        });
    } else {
        alert("不能有空哦")
    }
}
Bmob.User.updateStorage(obj) //更新数据