/**
 * Created by Administrator on 2017/5/18.
 */

function Palette(obj,ctx,mask){
    this.obj=obj;
    this.ctx=ctx;
    this.mask=mask;
    this.width=obj.width;
    this.height=obj.height;

    //样式
    this.lineWidth=2;
    this.lineCap='square';
    //填充样式
    this.fillStyle='#000';
    this.strokeStyle='#000';
    this.type='stroke';
    this.bian=5;
    this.jiao=5;
    //文字样式
    this.font='20px sans-serif';
    this.textAlign='center';
    this.textBaseline='middle'
    //历史记录
    this.history=[];

}
Palette.prototype={
    //样式初始化
    init:function(){
        this.ctx.lineWidth=this.lineWidth;
        this.ctx.lineCap=this.lineCap;
        this.ctx.strokeStyle=this.strokeStyle;
        this.ctx.fillStyle=this.fillStyle;
    },
    //线条
    line:function(){
        let self=this;
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.mask.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                };
                self.init();
                self.ctx.beginPath();
                self.ctx.moveTo(ox,oy);
                self.ctx.lineTo(mx,my);
                self.ctx.stroke();

            };
            self.mask.onmouseup=function(){
                 self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;


            }
        };
        //撤销
        document.body.onkeydown=function(e){
            if(e.ctrlKey&&e.keyCode==90){
                let last=self.history.pop();
                self.ctx.putImageData(last,0,0);
            }
        }
    },
    //铅笔
    Pencil:function(){
        let self=this;
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.ctx.clearRect(0,0,self.width,self.height);
            if(self.history.length>0){
                self.ctx.putImageData(self.history[self.history.length-1],0,0);
            };
            self.init();
            self.ctx.beginPath();
            self.ctx.moveTo(ox,oy);
            self.mask.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                self.ctx.lineTo(mx,my);
                self.ctx.stroke();
            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        }
        //撤销
        document.body.onkeydown=function(e){
            if(e.ctrlKey&&e.keyCode==90){
                let last=self.history.pop();
                self.ctx.putImageData(last,0,0);
            }
        };
    },
    //矩形
    Rectangular:function(){
        let self=this;
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.mask.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.init();
                self.ctx.beginPath();
                self.ctx.rect(ox,oy,mx-ox,my-oy);
                self.ctx[self.type]();

            };
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmouseup=null;
                self.mask.onmousemove=null;

            }
        };
        //撤销
        document.body.onkeydown=function(e){
            if(e.ctrlKey&&e.keyCode==90){
                let last=self.history.pop();
                self.ctx.putImageData(last,0,0);
            }
        }
    },
    //圆
    Circle:function(){
        let self=this;
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.mask.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.ctx.beginPath();
                self.init();
                let radius=Math.sqrt((mx-ox)*(mx-ox)+(my-oy)*(my-oy));
                self.ctx.arc(ox,oy,radius,0,2*Math.PI);
                self.ctx[self.type]();
            };
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        };
        //撤销
        document.body.onkeydown=function(e){
            if(e.ctrlKey&&e.keyCode==90){
                let last=self.history.pop();
                self.ctx.putImageData(last,0,0);
            }
        }
    },
    //多变形
    Polygon:function(bian){
        let self=this;
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.mask.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                let angle=(360/bian)/180*Math.PI;
                let radius=Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2));
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.init();
                self.ctx.beginPath();
                self.ctx.moveTo(ox+radius,oy);
                for(let i=0;i<bian;i++){
                    self.ctx.lineTo(ox+radius*Math.cos(angle*i),oy+radius*Math.sin(angle*i));
                }
                self.ctx.closePath();
                // self.ctx.stroke();
                self.ctx[self.type]();
            };
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;

            }
        };
        //撤销
        document.body.onkeydown=function(e){
            if(e.ctrlKey&&e.keyCode==90){
                let last=self.history.pop();
                self.ctx.putImageData(last,0,0);
            }
        }
    },
    //橡皮擦
    Eraser:function(w,h,eraserBtn){
        let self=this;
        self.mask.onmousedown=function(){
            eraserBtn.style.display='block';
            eraserBtn.style.width= `${w}px`;
            eraserBtn.style.height=`${w}px`;
            self.mask.onmousemove=function(e){
                let mx=e.offsetX-w/2,my=e.offsetY-h/2;
                // if(self.history.length>0){
                //     self.ctx.putImageData(self.history[self.history.length-1],0,0);
                // }
                if(mx>=self.width-w){
                    mx==self.width-w;
                }if(mx<=0){
                    mx==0;
                }
                if(my>=self.height-h){
                    my==self.height-h;
                }if(my<=0){
                    my==0;
                }
                self.ctx.clearRect(mx,my,w,h);
                eraserBtn.style.left=mx+'px';
                eraserBtn.style.top=my+'px';
            };
            self.mask.onmouseup=function(e){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                eraserBtn.style.display='none';
                 self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        };
        //撤销
        document.body.onkeydown=function(e){
            if(e.ctrlKey&&e.keyCode==90){
                let last=self.history.pop();
                self.ctx.putImageData(last,0,0);
            }
        }
    },
    //文字工具
   Text:function(){
        let self=this;
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            //创建一个元素
            let div=document.createElement('div');
            //div的样式
            div.style.cssText=`min-width:50px;height:30px;position:absolute;
            left:${ox}px;top:${oy}px;background:#fff`;
            //将div设置成可编辑属性
            div.contentEditable=true;
            //将div插入到mask中
            self.mask.appendChild(div);
            self.mask.onmousedown=null;
            self.area=div;
            self.area.onmousedown=function(e){
                let ox=e.clientX-this.offsetLeft;
                let oy=e.clientY-this.offsetTop;
                self.mask.onmousemove=function(e){
                    if(self.history.length>0){
                        self.ctx.putImageData(self.history[self.history.length-1],0,0);
                    }
                    let mx=e.clientX,my=e.clientY;
                    let lefts=mx-ox;
                    let tops=my-oy;
                    self.area.style.left=`${lefts}px`;
                    self.area.style.top=`${tops}px`;
                }
                self.area.onmouseup=function(){
                    self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                    self.area.onmouseup=null;
                    self.mask.onmousemove=null;
                }
            }

            self.area.onblur=function(){
                self.ctx.font=self.text;
                self.ctx.textAlign=self.textAlign;
                self.ctx.textBaseline=self.textBaseline;
                self.ctx.fillText(this.innerText,this.offsetLeft,this.offsetTop);
                this.parentNode.removeChild(this);
                self.area=null;
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
            }
        };

    },
    //虚线
    Dashed:function(){
        let self=this;
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.mask.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                self.ctx.save();
                self.ctx.setLineDash([10,5]);
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.ctx.beginPath();
                self.ctx.moveTo(ox,oy);
                self.ctx.lineTo(mx,my);
                self.ctx[self.type]();
                self.ctx.restore();
            };
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        };
        document.body.onkeydown=function(e){
            if(e.ctrlKey&&e.keyCode==90){
                let last=self.history.pop();
                self.ctx.putImageData(last,0,0);
            }
        }
    },
    //多角形
    polyJ:function(bian){
        let self=this;
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.mask.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                let radius=Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2));
                let radius1=radius/3;
                let angle=360/(bian*2)/180*Math.PI;//角度

                self.ctx.clearRect(0,0,self.width,self.height);
                self.ctx.beginPath();
                self.ctx.moveTo(ox+radius,oy);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                for(let i=0;i<bian*2;i++){
                    if(i%2==0){
                        self.ctx.lineTo(ox+radius*Math.cos(angle*i),oy+radius*Math.sin(angle*i));
                    }
                    else{
                        self.ctx.lineTo(ox+radius1*Math.cos(angle*i),oy+radius1*Math.sin(angle*i));
                    }
                }
                self.ctx.closePath();
                self.ctx[self.type]();
            };
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        }
        document.body.onkeydown=function(e){
            if(e.ctrlKey&&e.keyCode==90){
                let last=self.history.pop();
                self.ctx.putImageData(last,0,0);
            }
        }
    },
    //圆角矩形
    radiusRect:function(jiao){
       /* /!*w=mx-ox
        h=my-oy
        r
        1 (mx-w+r,oy-n)
        2 (mx-r,oy-h)*!/
        let self=this;
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.mask.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                let r=10;
                let w=mx-ox,h=my-oy;
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.ctx.beginPath();
                //1
                self.ctx.moveTo(ox-w+r,oy-h);
                //2
                self.ctx.lineTo(mx-r,oy-h);
                self.ctx.quadraticCurveTo(mx,oy-h,mx,oy-h+r);
                //3
                self.ctx.lineTo(mx,my-r);
                self.ctx.quadraticCurveTo(mx,my,mx-r,my);
                //4
                self.ctx.lineTo(ox-w+r,my);
                self.ctx.quadraticCurveTo(ox-w,my,ox-w,my-r);
                //5
                self.ctx.lineTo(ox-w,oy-h+r);
                self.ctx.quadraticCurveTo(ox-w,oy-h,ox-w+r,oy-h);
                self.ctx[self.type]();
            };
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        };*/

         let self=this;
         self.mask.onmousedown=function(e){
         let ox=e.offsetX,oy=e.offsetY;
         self.mask.onmousemove=function(e){
         let mx=e.offsetX,my=e.offsetY;

         self.ctx.clearRect(0,0,self.width,self.height);
         if(self.history.length>0){
         self.ctx.putImageData(self.history[self.history.length-1],0,0);
         }
         self.init()
             self.ctx.beginPath();
             if(mx>ox&&my>oy){
                 jiao=Math.abs(jiao);
                 self.ctx.moveTo(ox+jiao,oy);
                 self.ctx.lineTo(mx-jiao,oy);
                 self.ctx.quadraticCurveTo(mx,oy,mx,oy+jiao);
                 self.ctx.lineTo(mx,my-jiao);
                 self.ctx.quadraticCurveTo(mx,my,mx-jiao,my);
                 self.ctx.lineTo(ox+jiao,my);
                 self.ctx.quadraticCurveTo(ox,my,ox,my-jiao);
                 self.ctx.lineTo(ox,oy+jiao);
                 self.ctx.quadraticCurveTo(ox,oy,ox+jiao,oy);
                 self.ctx.closePath();
             }
             if(mx<ox&&my<oy){
                 jiao=-Math.abs(jiao)
                 self.ctx.moveTo(ox+jiao,oy);
                 self.ctx.lineTo(mx-jiao,oy);
                 self.ctx.quadraticCurveTo(mx,oy,mx,oy+jiao);
                 self.ctx.lineTo(mx,my-jiao);
                 self.ctx.quadraticCurveTo(mx,my,mx-jiao,my);
                 self.ctx.lineTo(ox+jiao,my);
                 self.ctx.quadraticCurveTo(ox,my,ox,my-jiao);
                 self.ctx.lineTo(ox,oy+jiao);
                 self.ctx.quadraticCurveTo(ox,oy,ox+jiao,oy);
                 self.ctx.closePath();
             }
             if(mx>ox&&my<oy){
                 jiao=Math.abs(jiao);
                 self.ctx.moveTo(ox+jiao,oy);
                 self.ctx.lineTo(mx-jiao,oy);
                 self.ctx.quadraticCurveTo(mx,oy,mx,oy-jiao);
                 self.ctx.lineTo(mx,my+jiao);
                 self.ctx.quadraticCurveTo(mx,my,mx-jiao,my);
                 self.ctx.lineTo(ox+jiao,my);
                 self.ctx.quadraticCurveTo(ox,my,ox,my+jiao);
                 self.ctx.lineTo(ox,oy-jiao);
                 self.ctx.quadraticCurveTo(ox,oy,ox+jiao,oy);
                 self.ctx.closePath();
             }
             if(mx<ox&&my>oy){
                 jiao=-Math.abs(jiao);
                 self.ctx.moveTo(ox+jiao,oy);
                 self.ctx.lineTo(mx-jiao,oy);
                 self.ctx.quadraticCurveTo(mx,oy,mx,oy-jiao);
                 self.ctx.lineTo(mx,my+jiao);
                 self.ctx.quadraticCurveTo(mx,my,mx-jiao,my);
                 self.ctx.lineTo(ox+jiao,my);
                 self.ctx.quadraticCurveTo(ox,my,ox,my+jiao);
                 self.ctx.lineTo(ox,oy-jiao);
                 self.ctx.quadraticCurveTo(ox,oy,ox+jiao,oy);
                 self.ctx.closePath();
             }
         self.ctx[self.type]();
         };
         self.mask.onmouseup=function(){
         self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
         self.mask.onmousemove=null;
         self.mask.onmouseup=null;
         }
         };

        document.body.onkeydown=function(e){
            if(e.ctrlKey&&e.keyCode==90){
                let last=self.history.pop();
                self.ctx.putImageData(last,0,0);
            }
        }
    },
    //裁切
    clip:function(clipBtn){
        let self=this;
        self.init();
        self.clipBtn=clipBtn;
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            let minx,miny,w,h;
            self.mask.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                minx=ox > mx ? mx:ox;
                miny=oy > my ? my:oy;
                w=Math.abs(mx-ox);
                h=Math.abs(my-oy);
                clipBtn.style.cssText=`
                width:${w}px;
                height:${h}px;
                position:absolute;
                top:${miny}px;
                left:${minx}px;
                border:2px dashed #000`;
            };

            self.mask.onmouseup=function(){
                self.mask.onmouseup=null;
                self.mask.onmousemove=null;
                self.temp=self.ctx.getImageData(minx,miny,w,h);
                self.ctx.clearRect(minx,miny,w,h);
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.ctx.putImageData(self.temp,minx,miny);
                self.drag(minx,miny,w,h,clipBtn);
            }
        }
    },
   /* select:function(selectAreaobj){
     var that=this;
     that.init();
     that.copy.onmousedown=function(e){
     var startx=e.offsetX;
     var starty=e.offsetY;
     var minx,miny,w,h;
     that.init();
     that.copy.onmousemove=function(e){
     that.init();
     var endx=e.offsetX;
     var endy=e.offsetY;
     minx=startx>endx?endx:startx;
     miny=starty>endy?endy:starty;
     w=Math.abs(endx-startx);
     h=Math.abs(endy-starty);
     selectAreaobj.style.display='block';
     selectAreaobj.style.left=minx+'px';
     selectAreaobj.style.top=miny+'px';
     selectAreaobj.style.width=w+'px';
     selectAreaobj.style.height=h+'px';
     that.drag(min,miny,w,h,selectAreaobj);
     }
     that.copy.onmouseup=function(e){
     that.copy.onmouseup=null;
     that.copy.onmousemove=null;
     that.temp=that.cobj.getImageData(minx,miny,w,h);
     that.cobj.clearRect(minx,miny,w,h);
     that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
     that.cobj.putImageData(that.temp,minx,miny);
     that.drag(minx,miny,w,h,selectAreaobj);
     }
     }
     },*/
    drag:function(x,y,w,h,clipBtn){
        let  self=this;
        self.mask.onmousemove=function(e){
            let ox=e.offsetX;
            let oy=e.offsetY;
            if(ox>x && ox<w+x && oy>y && oy<h+y){
                self.mask.style.cursor='move';
            }else{
                self.mask.style.cursor='default';
            }
        }
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            //鼠标相对于div左上角的位置
            let mx=ox-x;
            let my=oy-y;
            if(ox>x && ox<w+x && oy>y && oy<h+y){
                self.mask.style.cursor='move';
            }else{
                self.mask.style.cursor='default';
                return;
            }
            self.mask.onmousemove=function(e){
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length!=0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                let endx=e.offsetX;
                let endy=e.offsetY;
                let left=endx-mx;
                let top=endy-my;
                if(left<0){
                    left=0;
                }
                if(left>self.width-w){
                    left=self.width-w;
                }
                if(top<0){
                    top=0;
                }
                if(top>self.height-h){
                    top=self.height-h;
                }
                clipBtn.style.left=left+'px';
                clipBtn.style.top=top+'px';
                x=left;
                y=top;
                self.ctx.putImageData(self.temp,left,top);
            }
            self.mask.onmouseup=function(){
                self.mask.onmouseup=null;
                self.mask.onmousemove=null;
                self.drag(x,y,w,h,clipBtn);
            }
        }
    },
    //撤销
    Last:function(){
        let self=this;
        self.history.pop();
        if(self.history.length==0){
            self.ctx.clearRect(0,0,self.width,self.height);
             alert('画布已清空');
        }else{
            self.ctx.putImageData(self.history[self.history.length-1],0,0);
        }

    },
    //保存
    Save:function(){
        let self=this;
        let data=self.obj.toDataURL('image/png').replace('data:image/png','data:stream/octet');
        location.href=data;
    },
    //填充
    Fill:function(){
        this.type='fill';
    },
    //描边
    Stroke:function(){
        this.type='stroke';
    },
    //新建
    New:function(){
        let self=this;
        self.ctx.clearRect(0,0,self.width,self.height);
        self.history=[];
        self.init();
    }

}
