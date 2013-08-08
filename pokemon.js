testMode=true;
doesEncount=false;

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
		doesRun:false,
		walk:function(direction){
			this.direction=direction;
			if(this.direction=="left"&&move(-1,0)) this.doesWalk=1;
			else if(this.direction=="front"&&move(0,-1)) this.doesWalk=1;
			else if(this.direction=="right"&&move(1,0)) this.doesWalk=1;
			else if(this.direction=="back"&&move(0,1)) this.doesWalk=1;
		},
		run:function(direction){
			this.doesRun=true;
			this.walk(direction);
		},
		img:"chara1"
	}
	var cursor={
		x:0,
		y:0,
		maxX:0,
		maxY:2,
		move:function(key){
			switch(key){
				case "left":
					if(this.x-1>=0) this.x--;
					break;
				case "up":
					if(this.y-1>=0)this.y--;
					break;
				case "right":
					if(this.x+1<=this.maxX) this.x++;
					break;
				case "down":
					if(this.y+1<=this.maxY) this.y++;
					break;
			}
		}
	}
	var screen={
		width:17,
		height:17,
		chipSize:32
	};//見えている範囲の画面サイズ(ただしスムーズウォーキングのための画面外2マスを含む)とscreenの1マスのサイズ
	var world={
		width:36,
		height:36
	};//画面外も含めたマップのサイズ
	var mapData=[
		[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	];//マップのデータ。0が草、1が砂、-1は暗黒空間
	var livingMonster=[["まさる","ドドロノゴメス","アクサワー","ヂヴァザン","ブロロウ","ヘィローセ","ビョロボロ","ボボヌザウルス","イパサスコ","チュパンディ","スサイミ","ハンシー","サイコ","ジャネン","コムシ","ンバジョー","ヒネリ"],["まさる","ドドロノゴメス","アクサワー","ヂヴァザン","ブロロウ","ヘィローセ","ビョロボロ","ボボヌザウルス","イパサスコ","チュパンディ","スサイミ","ハンシー","サイコ","ジャネン","コムシ","ンバジョー","ヒネリ"]];
	
	console.log(livingMonster[0])
	var mapAttr=[{isNotBarrier:true,isEncountable:true},{isNotBarrier:true,isEncountable:false}]
	mapAttr["-1"]={isNotBarrier:false,isEncountable:false};
	var mapImg=["grass","sand"];
	var situation="title";
	var screenChildStyle=[],charaChildStyle=[];
	var menuStyle=d.getElementById("menu").style,sayBoxStyle=d.getElementById("saybox").style,mesStyle=d.getElementById("mesbox").style,cursorStyle=d.getElementById("cursor").style,titleStyle=d.getElementById("title").style,screenStyle=d.getElementById("screen").style,charaScreenStyle=d.getElementById("chara").style;
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
			case "title":
				titleStyle.display="block";
				break;
			case "chara":
				titleStyle.display="none";
				//キャラの表示。
				mapImageClear(charaChildStyle[(screen.width/2|0)+screen.width*(screen.height/2|0)]);
				if(chara.doesWalk==0||chara.doesWalk==2) mapImageAdd(charaChildStyle[(screen.width/2|0)+screen.width*(screen.height/2|0)],"chara1/"+chara.direction);
				if(chara.doesWalk==1) mapImageAdd(charaChildStyle[(screen.width/2|0)+screen.width*(screen.height/2|0)],"chara1/left_"+chara.direction);
				if(chara.doesWalk==3) mapImageAdd(charaChildStyle[(screen.width/2|0)+screen.width*(screen.height/2|0)],"chara1/right_"+chara.direction);
				if(chara.doesWalk!=0){
					console.log("start",chara.doesWalk)
					if(chara.doesRun) chara.doesWalk+=2;
					else chara.doesWalk+=1;
					for(var i=0,j=screen.width*screen.height,k=0;i<j;i++){
						if(chara.direction=="left") screenChildStyle[i].margin="-32px "+(64-screen.chipSize/4*chara.doesWalk)+"px 32px "+(-64+screen.chipSize/4*chara.doesWalk)+"px";
						else if(chara.direction=="front") screenChildStyle[i].margin=(-screen.chipSize/4*chara.doesWalk)+"px 32px "+(screen.chipSize/4*chara.doesWalk)+"px -32px";
						else if(chara.direction=="right") screenChildStyle[i].margin="-32px "+(screen.chipSize/4*chara.doesWalk)+"px 32px "+(-screen.chipSize/4*chara.doesWalk)+"px";
						else if(chara.direction=="back") screenChildStyle[i].margin=(-64+screen.chipSize/4*chara.doesWalk)+"px 32px "+(64-screen.chipSize/4*chara.doesWalk)+"px -32px";
					}
					if(chara.doesWalk>=4){
						chara.doesWalk=0;
						if(isKeyPressed["d"]&&(isKeyPressed["left"]||isKeyPressed["right"]||isKeyPressed["up"]||isKeyPressed["down"])) chara.doesWalk=1;
						else chara.doesRun=false;
					}
					console.log("end",chara.doesWalk)
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
				titleStyle.display="none";
				break;
			case "talk":
				titleStyle.display="none";
				break;
			case "menu":
				titleStyle.display="none";
				cursorStyle.left=cursor.x+"px";
				cursorStyle.top=cursor.y*20+30+"px";
				break;
		}
	},
	paint=function(data,x,y){
		mapImageClear(screenChildStyle[x+y*screen.width]);
		if(data!=-1) mapImageAdd(screenChildStyle[x+y*screen.width],mapImg[data]);
		else mapImageAdd(screenChildStyle[x+y*screen.width],"black");
	},
	charaPosX=function(x){
		return x+8;
	},
	charaPosY=function(y){
		return 8-y;
	},
	move=function(dx,dy){
		//dx=xの移動量 dy=(略)
		if (chara.x + dx +screen.width/2<= world.width && chara.x + chara.x + dx + dx >= -screen.width && chara.y + chara.y + dy + dy <= screen.height && chara.y + dy >= -world.height + screen.width / 2 && mapAttr[mapData[charaPosY(chara.y+dy)][charaPosX(chara.x+dx)]].isNotBarrier) {
			chara.x += dx;
			chara.y += dy;
			doesEncount&&encount();
			return true;
		}
		return false;
	},
	encount=function(test){
		if(mapAttr[mapData[charaPosY(chara.y)][charaPosX(chara.x)]].isEncountable){
			if(test=="test"||(Math.random()*30|0)==0){
				switchMode("battle");
				startBattle(livingMonster[mapData[charaPosY(chara.y)][charaPosX(chara.x)]]);
			}
		}
	},
	startBattle=function(monster){
		var enemy=new POKEMON(monster[Math.random()*monster.length|0]);
		console.log(enemy)
		d.getElementById("mesbox").innerText=enemy.name+" が現れた!どうする?";
		d.getElementById("enemy").style.backgroundImage="url("+enemy.img.src+")";
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
	switchMode=(function(){
		var nowScene=situation;
		return function(scene){
			switch(nowScene){
				//切り替えでOFFにする方
				case "menu":
					screenStyle.display="none";
					charaScreenStyle.display="none";
					menuStyle.display="none";
					break;
				case "talk":
					screenStyle.display="none";
					charaScreenStyle.display="none";
					sayBoxStyle.display="none";
					break;
				case "map":
					screenStyle.display="none";
					charaScreenStyle.display="none";
					break;
				case "title":
					titleStyle.display="none";
					break;
				case "battle":
					mesStyle.display="none";
					break;
			}
			switch(scene){
				case "menu":
					situation="menu";
					cursor.maxX=0;
					cursor.maxY=d.getElementById("menu").innerHTML.match(/<div[\s\S]*?>/g).length-3;
					menuStyle.display="block";
					screenStyle.display="block";
					charaScreenStyle.display="block";
					break;
				case "talk":
					sayBoxStyle.display="block";
					screenStyle.display="block";
					charaScreenStyle.display="block";
					break;
				case "map":
					situation="map";
					screenStyle.display="block";
					charaScreenStyle.display="block";
					break;
				case "title":
					situation="title";
					titleStyle.display="block";
					break;
				case "battle":
					situation="battle";
					mesStyle.display="block";
					break;
			}
			nowScene=scene
		}
	})()
	keyAction=function(key){
		switch(key){
			case "left":
			case "right":
			case "up":
			case "down":
				if(!isKeyPressed["d"]){
					if(situation=="map"&&chara.doesWalk==0&&key!="up"&&key!="down") chara.walk(key);
					else if(situation=="map"&&chara.doesWalk==0&&key=="up") chara.walk("back");
					else if(situation=="map"&&chara.doesWalk==0&&key=="down") chara.walk("front");
				}else{
					if(situation=="map"&&chara.doesWalk<=1&&key!="up"&&key!="down") chara.run(key);
					else if(situation=="map"&&chara.doesWalk<=1&&key=="up") chara.run("back");
					else if(situation=="map"&&chara.doesWalk<=1&&key=="down") chara.run("front");
				}
				if(situation=="menu") cursor.move(key)
				break;
			case "m":
				switchMode("menu")
				break;
			case "e":
				if(testMode&&situation!="battle"){
					encount("test");
				}
			case "space":
				if(situation=="map") switchMode("talk")
				else if(situation=="menu"){
					switch(cursor.y){
						case 0:
						case 1:
						case 2:
						case 3://ゲームに戻る
							switchMode("map");
							break;
						case 4://タイトル画面に戻る
							switchMode("title");
							break;
					}
				}else if(situation=="title") switchMode("map");
				break;
		}
	};
	window.onkeyup=function(e){
		if(e.keyCode==32){isKeyPressed["space"]=false;return false;}//space
		if(e.keyCode==37){isKeyPressed["left"]=false;return false;}//left
		if(e.keyCode==38){isKeyPressed["up"]=false;return false;}//up
		if(e.keyCode==39){isKeyPressed["right"]=false;return false;}//right
		if(e.keyCode==40){isKeyPressed["down"]=false;return false;}//down
		if(e.keyCode==77){isKeyPressed["m"]=false;return false;}//M key
		if(e.keyCode==69){isKeyPressed["e"]=false;return false;}//E key
		if(e.keyCode==68){isKeyPressed["d"]=false;return false;}//E key
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
		if(e.keyCode==68){isKeyPressed["d"]=true;return false;}//D key
		if(e.keyCode==77){
			if(!isKeyPressed["m"]){
				keyAction("m");
				isKeyPressed["m"]=true;
			}
			return false;
		}//M key
		if(e.keyCode==69&&testMode){
			if(!isKeyPressed["e"]){
				keyAction("e");
				isKeyPressed["e"]=true;
			}
		}
	};
	setInterval(function(){
		for(var key in isKeyPressed){
			if(isKeyPressed[key]&&key!="m"&&key!="space"&&key!="e") keyAction(key);
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