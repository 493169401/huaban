
/*
 线    铅笔   矩形   多边形   多角形   圆    虚线    圆角矩形

 填充 input  type=color  描边    填充样式

 描边    橡皮   文字    裁切

 撤销   保存     新建   */
window.onload=function() {
    let labels = document.querySelectorAll(".tool label");
    let changes=document.querySelectorAll('.sss');
    let n = 0;
    let canvas = document.querySelector('canvas');
    let mask=document.querySelector('.mask');

    let eraserBtn=document.querySelector('.eraser');
    let ctx = canvas.getContext('2d');

    let platette = new Palette(canvas,ctx,mask);

    //线
    let line = document.querySelector('.icon-xiantiao2');
    line.onclick = function () {
        platette.line();
    };

    //铅笔
    let pencil = document.querySelector(".icon-iconupload");
    pencil.onclick = function () {
        platette.Pencil();
    };

    //虚线
    let dashed=document.querySelector('.icon-xiantiao3');
    dashed.onclick=function(){
        platette.Dashed();
    };

    //矩形
    let juxing = document.querySelector('.icon-juxing');
    juxing.onclick = function () {
        platette.Rectangular();
    };

    //圆
    let circle = document.querySelector('.icon-yuan');
    circle.onclick = function () {
        platette.Circle();
    };

    //橡皮擦
    let eraser = document.querySelector('.icon-xiangpi');
    eraser.onclick = function () {
        let w=prompt('请输入橡皮尺寸',"10");
        platette.Eraser(w,w,eraserBtn);
    };

    //多边形
    let polygon = document.querySelector('.icon-duobianxing');
    polygon.onclick = function () {
        let bian = prompt('请输入边数', '5');
        platette.Polygon(bian);
    };

    //多角形
    let duojiaoxing=document.querySelector('.icon-wujiaoxing');
        duojiaoxing.onclick=function(){
            let bian=prompt('请输入角数','5');
            platette.polyJ(bian);
        };

    //圆角矩形
    let yuanjiao=document.querySelector('.icon-rounded-corners-stroke1-s40-r10');
        yuanjiao.onclick=function(){
             let jiao=prompt('请输入圆角半径','10');
            platette.radiusRect(jiao);
        };


    //选中状态
    for (let i = 0; i < changes.length; i++) {
        changes[i].addEventListener("click", function () {
            changes[n].style.background= '#D2DCEA';
            changes[i].style.background = '#FFCD70';
            n = i;
        }, false)
    }


    //后退

    //填充 描边切换
    let tianchong=document.querySelector('.icon-tianchong');
    let miaobian=document.querySelector('.icon-miaobian');
    let TC=document.querySelector('.TC');
    let MB=document.querySelector('.MB');
    tianchong.onclick=function(){
        platette.Fill();
    };
    miaobian.onclick=function(){
        platette.Stroke();
    };
    TC.onchange=function(){
        platette.fillStyle=TC.value;
    };
    MB.onchange=function(){
        platette.strokeStyle=MB.value;
    };
       // tianchong.onclick=function(){
       //      platette.Fill();
       //  };

    //文字工具
    let text=document.querySelector('.icon-wenzi');
    // console.log(text);
    text.onclick=function(){
        platette.Text();
    };

    //裁切工具
    let cutting=document.querySelector('.icon-caiqie');
    let clipBtn=document.querySelector('.clip');
    cutting.onclick=function(){
        platette.clip(clipBtn);
    };

    //撤销
     let chexiao=document.querySelector('.icon-chexiao');
     // console.log(chexiao);
      chexiao.onclick=function(){
          platette.Last();
      };

      //保存
    let save=document.querySelector('.icon-baocun');
      // console.log(save);
      save.onclick=function(){
          platette.Save();
      };

      //新建
    let xinjian=document.querySelector('.icon-iconfontxinjian');
    xinjian.onclick=function(){
        platette.New();
    }
};

