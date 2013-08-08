window.onload=function(){
	var d=document;
	var preloadImages={"chara1/left":new Image(),"chara1/front":new Image(),"chara1/right":new Image(),"chara1/back":new Image(),"chara1/left_left":new Image(),"chara1/left_front":new Image(),"chara1/left_right":new Image(),"chara1/left_back":new Image(),"chara1/right_left":new Image(),"chara1/right_front":new Image(),"chara1/right_right":new Image(),"chara1/right_back":new Image(),"sand":new Image(),"grass":new Image(),"black":new Image()}
	for(var key in preloadImages){
		preloadImages[key].src=key+".png";
	}
	var chara={
		x:0,
		y:0,
		direction:"front",
		doesWalk:0,
		walk:function(direction){
			this.direction=direction;
			this.doesWalk=1;
			if(this.direction=="left") move(-1,0);
			if(this.direction=="front") move(0,-1);
			if(this.direction=="right") move(1,0);
			if(this.direction=="back") move(0,1);
		},
		img:"chara1"
	}
	var screen={
		width:17,
		height:17,
		chipSize:32
	};
	var world={
		width:36,
		height:36
	};
	var mapData=[
		[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	];
	var mapImg=["grass","sand"];
	var situation="map";
	var screenChildStyle=[],charaChildStyle=[];
	var menuStyle=d.getElementById("menu").style,sayBoxStyle=d.getElementById("saybox").style;
	sayBoxStyle.display="none";
	var isKeyPressed={};
	for(var i=0,j=screen.width*screen.height,k=0;i<j;i++){
		while(document.getElementById("screen").childNodes[k].tagName=="BR") k++
		screenChildStyle[i]=document.getElementById("screen").childNodes[k].style;
		charaChildStyle[i]=document.getElementById("chara").childNodes[k].style;
		k++;
	}
	var display=function(key){
		switch(key){
			case "chara":
				//キャラの表示。
				mapImageClear(charaChildStyle[(screen.width/2|0)+screen.width*(screen.height/2|0)]);
				if(chara.doesWalk==0||chara.doesWalk==2) mapImageAdd(charaChildStyle[(screen.width/2|0)+screen.width*(screen.height/2|0)],"chara1/"+chara.direction);
				if(chara.doesWalk==1) mapImageAdd(charaChildStyle[(screen.width/2|0)+screen.width*(screen.height/2|0)],"chara1/left_"+chara.direction);
				if(chara.doesWalk==3) mapImageAdd(charaChildStyle[(screen.width/2|0)+screen.width*(screen.height/2|0)],"chara1/right_"+chara.direction);
				if(chara.doesWalk!=0){
					chara.doesWalk+=1;
					for(var i=0,j=screen.width*screen.height,k=0;i<j;i++){
						if(chara.direction=="left") screenChildStyle[i].margin="-32px "+(64-screen.chipSize/4*chara.doesWalk)+"px 32px "+(-64+screen.chipSize/4*chara.doesWalk)+"px";
						else if(chara.direction=="front") screenChildStyle[i].margin=(-screen.chipSize/4*chara.doesWalk)+"px 32px "+(screen.chipSize/4*chara.doesWalk)+"px -32px";
						else if(chara.direction=="right") screenChildStyle[i].margin="-32px "+(screen.chipSize/4*chara.doesWalk)+"px 32px "+(-screen.chipSize/4*chara.doesWalk)+"px";
						else if(chara.direction=="back") screenChildStyle[i].margin=(-64+screen.chipSize/4*chara.doesWalk)+"px 32px "+(64-screen.chipSize/4*chara.doesWalk)+"px -32px";
					}
					if(chara.doesWalk==4) chara.doesWalk=0;
				}
				break;
			case "map":
				for(var j=0;j<screen.height;j++){
					for(var i=0;i<screen.width;i++){
						if(mapData[j-chara.y]!==undefined&&mapData[j-chara.y][chara.x+i]!==undefined) paint(mapData[j-chara.y][chara.x+i],i,j);
						else paint(-1,i,j);
					}
				}
				break;
			case "battle":
				break;
			case "talk":
				break;
			case "menu":
				break;
		}
	},
	paint=function(data,x,y){
		mapImageClear(screenChildStyle[x+y*screen.width]);
		if(data!=-1) mapImageAdd(screenChildStyle[x+y*screen.width],mapImg[data]);
		else mapImageAdd(screenChildStyle[x+y*screen.width],"black");
	},
	move=function(dx,dy){
		//dx=xの移動量 dy=(略)
		chara.x+=dx;
		chara.y+=dy;
		if(chara.x+chara.x<-screen.width) chara.x=Math.ceil(-screen.width/2);
		else if(chara.x>world.width) chara.x=world.width;
		else encount();
		if(chara.y+chara.y>screen.height) chara.y=Math.floor(screen.height/2);
		else if(chara.y<-world.height+screen.width/2) chara.y=-world.height+Math.ceil(screen.width/2);
		else encount();
	},
	encount=function(){
		if(isEncountable[mapData[chara.x+chara.y*world.width]]){
			if(Math.random()*30|0==0){
				situation="battle";
				startBattle(monster[mapData[chara.x+chara.y*world.width]]);
			}
		}
	},
	startBattle=function(monster){
		console.log(monster);
	},
	mapImageAdd=function(screen,url){
		//マップのdiv要素のbackgroundImageのurlをたす。
		if(!screen.backgroundImage) screen.backgroundImage="url("+preloadImages[url].src+")";
		else screen.backgroundImage="url("+preloadImages[url].src+"),"+screen.backgroundImage;
	},
	mapImageClear=function(screen,url){
		//マップのdiv要素のbackgroundImageを消す。urlがあればそれのみ消す。
		if(!url) screen.backgroundImage="";
	},
	keyAction=function(key){
		switch(key){
			case "left":
				if(situation=="map"&&chara.doesWalk==0) chara.walk(key)
				if(situation=="menu") cursor.move(key)
				break;
			case "up":
				if(situation=="map"&&chara.doesWalk==0) chara.walk("back")
				if(situation=="menu") cursor.move(key)
				break;
			case "right":
				if(situation=="map"&&chara.doesWalk==0) chara.walk(key)
				if(situation=="menu") cursor.move(key)
				break;
			case "down":
				if(situation=="map"&&chara.doesWalk==0) chara.walk("front")
				if(situation=="menu") cursor.move(key)
				break;
			case "m":
				if(situation=="map"){
					situation="menu";
					menuStyle.display="block";
				}else if(situation=="menu"){
					situation="map";
					menuStyle.display="none";
				}
				break;
			case "space":
				if(situation=="map"){
					if(sayBoxStyle.display=="none") sayBoxStyle.display="block";
					else sayBoxStyle.display="none";
				}else if(situation=="menu"){
				}
				break;
		}
	};
	window.onkeyup=function(e){
		if(e.keyCode==32){isKeyPressed["space"]=false;return false;}
		if(e.keyCode==37){isKeyPressed["left"]=false;return false;}//left
		if(e.keyCode==38){isKeyPressed["up"]=false;return false;}//up
		if(e.keyCode==39){isKeyPressed["right"]=false;return false;}//right
		if(e.keyCode==40){isKeyPressed["down"]=false;return false;}//down
		if(e.keyCode==77){isKeyPressed["m"]=false;return false;}
	};
	window.onkeydown=function(e){
		if(e.keyCode==32){
			if(!isKeyPressed["space"]){
				keyAction("space");
				isKeyPressed["space"]=true;
			}
			return false;
		}//space
		if(e.keyCode==37){isKeyPressed["left"]=true;return false;}//left
		if(e.keyCode==38){isKeyPressed["up"]=true;return false;}//up
		if(e.keyCode==39){isKeyPressed["right"]=true;return false;}//right
		if(e.keyCode==40){isKeyPressed["down"]=true;return false;}//down
		if(e.keyCode==77){
			if(!isKeyPressed["m"]){
				keyAction("m");
				isKeyPressed["m"]=true;
			}
			return false;
		}//M
	};
	setInterval(function(){
		for(var key in isKeyPressed){
			if(isKeyPressed[key]&&key!="m"&&key!="space") keyAction(key);
		}
		switch(situation){
			case "map":
				display("map");
				display("chara");
				break;
			case "battle":
				display("battle");
				break;
			case "talk":
				display("map");
				display("chara");
				display("talk");
				break;
			case "menu":
				display("menu");
				break;
		}
	},100);
}