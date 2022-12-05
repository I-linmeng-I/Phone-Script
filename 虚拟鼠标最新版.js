auto();
events.observeKey();//开启按键监听
events.setKeyInterceptionEnabled(true);//屏蔽所有按键功能


//生成悬浮鼠标（下列参数可以根据情况自行更改）
mousesize=75;//数字越大，鼠标尺寸越大
mousespeed=5;//数字越大，鼠标点击移动幅度越大
mousetime=20;//默认50毫秒，时间越小，鼠标移动越快
pingmuX=device.width;//屏幕宽度像素（自动获取），可手动更改
pingmuY=device.height;//屏幕高度像素（自动获取），可手动更改
huadongX=pingmuX*0.1;//左右滑动屏幕的距离
huadongY=pingmuY*0.1;//上下滑动屏幕的距离
huadongT=200;//滑动操作的时间（默认300毫秒）
speed=15;//长按方向键加速后最大速度
longpress=1000;//模拟长按时间（默认1000毫秒）
zx1=0;//自定义滑动参数
zy1=0;
zx2=0;
zy2=0;
hided=false;


var w = floaty.rawWindow(
    <frame gravity="center">
        <img src="file://mouse.png"/>//鼠标图片，可以更改成你喜欢的图片
    </frame>
);
ui.run(setsize);
function setsize() {
     w.setSize(mousesize, mousesize)
}


w.setTouchable(false);
x=pingmuX/2;
y=pingmuY/2;

function setPos() {
    w.setPosition(x,y)
}

ui.run(setPos);


events.on("key_down", function(keyCode, event){
    if(keyCode==19&&hided==false){//按下上键（键值：19）向上移动鼠标
		i=0;
		threads.start(function(){
			while(true){
				x=w.getX();
				y=w.getY()-mousespeed-i;
				if(y<0){y=0;}
				ui.run(setPos);
				sleep(mousetime);
				i++;
				if(i>speed){i=speed;}
			}
		});
	}else if(keyCode==20&&hided==false){//按下下键（键值：20）向下移动鼠标
		i=0;
		threads.start(function(){
			while(true){
				x=w.getX();
				y=w.getY()+mousespeed+i;
				if(y>pingmuY){y=pingmuY;}
				ui.run(setPos);
				sleep(mousetime);
				i++;
				if(i>speed){i=speed;}
			}
		});
	}else if(keyCode==21&&hided==false){//按下左键（键值：21）向左移动鼠标
		i=0;
		threads.start(function(){
			while(true){
				x=w.getX()-mousespeed-i;
				if(x<0){x=0;}
				y=w.getY();
				ui.run(setPos);
				sleep(mousetime);
				i++;
				if(i>speed){i=speed;}
			}
		});
	}else if(keyCode==22&&hided==false){//按下右键（键值：22）向右移动鼠标
		i=0;
		threads.start(function(){
			while(true){
				x=w.getX()+mousespeed+i;
				if(x>pingmuX){x=pingmuX;}
				y=w.getY();
				ui.run(setPos);
				sleep(mousetime);
				i++;
				if(i>speed){i=speed;}
			}
		});
	}else if(keyCode==23&&hided==false){//按下确定键（键值：23）模拟点击
		x=w.getX();
		y=w.getY();
		press(x, y, 100);
	}else if(keyCode==15&&hided==false){//按下数字2键（键值：9）模拟下滑
		i=0;
		threads.start(function(){
		    while(true){
		    	x=w.getX();
		        y=w.getY();
		        y2=y-huadongY-i;
		        i=i++;
				if(i>200){i=200;}
	    	    if(y2<0){y2=0;}
	    	    swipe(x,y,x,y2, huadongT-i);
			}
		});
	}else if(keyCode==9&&hided==false){//按下数字8键（键值：15）模拟上滑
		i=0;
		threads.start(function(){
		    while(true){
		    x=w.getX();
		y=w.getY();
		y2=y+huadongY+i;
		i++;
				if(i>200){i=200;}
		if(y2>pingmuY){y2=pingmuY;}
		swipe(x,y,x,y2, huadongT-i);
			}
		});
	}else if(keyCode==11&&hided==false){//按下数字6键（键值：15）模拟左滑
		i=0;
		threads.start(function(){
		    while(true){
		x=w.getX();
		y=w.getY();
		x2=x+huadongX+i;
		i++;
				if(i>200){i=200;}
		if(x2>pingmuX){x2=pingmuX;}
		swipe(x,y,x2,y, huadongT-i);
			}
		});
	}else if(keyCode==13&&hided==false){//按下数字4键（键值：15）模拟右滑
		i=0;
		threads.start(function(){
		    while(true){
		x=w.getX();
		y=w.getY();
		x2=x-huadongX-i;
		i++;
				if(i>200){i=200;}
		if(x2<0){x2=0;}
		swipe(x,y,x2,y, huadongT-i);
			}
		});
	}else if(keyCode==12&&hided==false){//按下数字5键（键值：12）模拟长按
		x=w.getX();
		y=w.getY();
		press(x, y, longpress)
	}else if(keyCode==8&&hided==false){//按下数字1键（键值：8）自定义滑动起点
		zx1=w.getX();
		zy1=w.getY();
		toast("滑动起点为："+zx1+","+zy1);
	}else if(keyCode==10&&hided==false){//按下数字3键（键值：10）自定义滑动终点
		zx2=w.getX();
		zy2=w.getY();
		toast("滑动终点为："+zx2+","+zy2);
	}else if(keyCode==16&&hided==false){//按下数字9键（键值：16）开始自定义滑动
		swipe(zx1,zy1,zx2,zy2, huadongT);
		toast("滑动完成");
	}else if(keyCode==4&&hided==false){//按下返回键返回
		back();
	}else if(keyCode==7&&hided==false){//按下数字0键（键值：7）退出鼠标模式
  		
	}else if(keyCode==3&&hided==false){
	    home();
	}else if(keyCode==187&&hided==false){
	    recents();
	}else if(keyCode==1047){
	    if(hided==false){
	        events.setKeyInterceptionEnabled(false);//屏蔽所有按键功能
	        hided=true;
	        x=pingmuX;
            y=pingmuY;
            ui.run(setPos);
	    }
	    else{
	        events.setKeyInterceptionEnabled(true);//屏蔽所有按键功能
	        hided=false;
	        x=pingmuX/2;
            y=pingmuY/2;
            ui.run(setPos);
	    }
	}
	else{
	    console.info(keyCode);
	}
});

events.on("key_up", function(keyCode, event){
	threads.shutDownAll();
});