    // 获取当前时间
    function current() {
        var d = new Date(),
            str = '';
        str += d.getFullYear() + '-'; //获取当前年份 
        str += d.getMonth() + 1 + '-'; //获取当前月份（0——11） 
        str += d.getDate();
        return str;
    }


    //计算天数差的函数
    function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式
        var aDate, oDate1, oDate2, iDays
        aDate = sDate1.split("-")
        oDate1 = new Date(aDate[0], aDate[1] - 1, aDate[2]); //调用Date的构造函数
        aDate = sDate2.split("-");
        oDate2 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数
        return iDays
    }

    // 页面加载完成执行

    window.onload = function(a, b, c) {
        var swyz = "2021-8-20"
        var cmb = "2021-8-1"
        var mgxq = "2021-7-7"
        var zsdl = "2021-6-22"
        var mym = "2021-6-22"
        var jmkj = "2021-5-9"
        var ep = "2021-8-26"
        var enft = "2021-8-29"
        var cto = "2021-8-30"
        var star = "2021-9-3"
        var cc = "2021-9-22"
        s = current(); // 获取当前时间
        document.getElementById("swyz").innerHTML = DateDiff(swyz, s); //计算天数差的函数
        document.getElementById("cmb").innerHTML = DateDiff(cmb, s);
        document.getElementById("mgxq").innerHTML = DateDiff(mgxq, s);
        document.getElementById("zsdl").innerHTML = DateDiff(zsdl, s);
        document.getElementById("mym").innerHTML = DateDiff(mym, s);
        document.getElementById("jmkj").innerHTML = DateDiff(jmkj, s);
        document.getElementById("ep").innerHTML = DateDiff(ep, s);
        document.getElementById("enft").innerHTML = DateDiff(enft, s);
        document.getElementById("cto").innerHTML = DateDiff(cto, s);
        document.getElementById("star").innerHTML = DateDiff(star, s);
        document.getElementById("cc").innerHTML = DateDiff(cc, s);
    }