var testMode=true,
doesEncount=false,
IntervalTime=50;
window.onload=function(){
	var d=document;
	var preloadImages={"chara1/left":new Image(),"chara1/front":new Image(),"chara1/right":new Image(),"chara1/back":new Image(),"chara1/left_left":new Image(),"chara1/left_front":new Image(),"chara1/left_right":new Image(),"chara1/left_back":new Image(),"chara1/right_left":new Image(),"chara1/right_front":new Image(),"chara1/right_right":new Image(),"chara1/right_back":new Image(),"sand":new Image(),"grass":new Image(),"black":new Image()}
	for(var key in preloadImages){
		preloadImages[key].src=key+".png";
	}
	var charaCanvas=document.getElementById("chara").getContext("2d"),$map=document.getElementById("map"),mapCanvas=$map.getContext("2d"),mapStyle=$map.style;
	mapStyle.left=mapStyle.top="0px";
	var chara={
		x:0,
		y:0,
		direction:"front",
		doesWalk:0,
		doesRun:false,
		walk:function(direction){
			this.direction=direction;
			if(this.direction=="left"&&move(-1,0,false)) this.doesWalk=1;
			else if(this.direction=="front"&&move(0,1,false)) this.doesWalk=1;
			else if(this.direction=="right"&&move(1,0,false)) this.doesWalk=1;
			else if(this.direction=="back"&&move(0,-1,false)) this.doesWalk=1;
		},
		run:function(direction){
			if(this.doesRun===false){
				this.doesRun=1;
			}else this.doesRun++;
			this.direction=direction;
			if(this.direction=="left"&&move(-1,0,false)) this.doesWalk=2;
			else if(this.direction=="front"&&move(0,1,false)) this.doesWalk=2;
			else if(this.direction=="right"&&move(1,0,false)) this.doesWalk=2;
			else if(this.direction=="back"&&move(0,-1,false)) this.doesWalk=2;
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
	$map.width=world.width*screen.chipSize;
	$map.height=world.height*screen.chipSize;
	var mapData=[
		[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	];//マップのデータ。0が草、1が砂、-1は暗黒空間
	var livingMonster=[["まさる","ドドロノゴメス","アクサワー","ヂヴァザン","ブロロウ","ヘィローセ","ビョロボロ","ボボヌザウルス","イパサスコ","チュパンディ","スサイミ","ハンシー","サイコ","ジャネン","コムシ","ンバジョー","ヒネリ"],["まさる","ドドロノゴメス","アクサワー","ヂヴァザン","ブロロウ","ヘィローセ","ビョロボロ","ボボヌザウルス","イパサスコ","チュパンディ","スサイミ","ハンシー","サイコ","ジャネン","コムシ","ンバジョー","ヒネリ"]];
	var mapAttr=[{isNotBarrier:true,isEncountable:true},{isNotBarrier:true,isEncountable:false}];
	mapAttr["-1"]={isNotBarrier:false,isEncountable:false};
	var mapImg=["grass","sand"];
	mapImg["-1"]="black";
	var situation="title";
	var display=function(key){
		switch(key){
			case "title":
				display.show("title")
				break;
			case "chara":
				display.hide("title")
				//キャラの表示。
				if(chara.doesWalk!=0){
					if(chara.doesRun){
						chara.doesWalk+=2;
					}
					else chara.doesWalk+=1;
				}
				if(chara.doesRun>=0&&chara.doesRun!==false){
					chara.doesRun++;
					if(chara.doesRun%4==0||chara.doesRun%4==1) mapImageAdd("chara1/left_"+chara.direction,screen.width/2|0,screen.height/2|0);
					if(chara.doesRun%4==2||chara.doesRun%4==3) mapImageAdd("chara1/right_"+chara.direction,screen.width/2|0,screen.height/2|0);
				}else{
					if(chara.doesWalk==0||chara.doesWalk==2||chara.doesWalk==3) mapImageAdd("chara1/"+chara.direction,screen.width/2|0,screen.height/2|0);
					if(chara.doesWalk==4||chara.doesWalk==5) mapImageAdd("chara1/left_"+chara.direction,screen.width/2|0,screen.height/2|0);
					if(chara.doesWalk==6||chara.doesWalk==7) mapImageAdd("chara1/right_"+chara.direction,screen.width/2|0,screen.height/2|0);
				}
				mapStyle.left=-(chara.x-(screen.width/2|0))*screen.chipSize+"px";
				mapStyle.top=-(chara.y-(screen.height/2|0))*screen.chipSize+"px";
				if(chara.doesRun===false){
					if(chara.direction=="left") mapStyle.left=parseInt(mapStyle.left,10)+screen.chipSize/8*chara.doesWalk+"px";
					else if(chara.direction=="front") mapStyle.top=parseInt(mapStyle.top,10)-screen.chipSize/8*chara.doesWalk+"px";
					else if(chara.direction=="right") mapStyle.left=parseInt(mapStyle.left,10)-screen.chipSize/8*chara.doesWalk+"px";
					else if(chara.direction=="back") mapStyle.top=parseInt(mapStyle.top,10)+screen.chipSize/8*chara.doesWalk+"px";
				}else{
					if(chara.direction=="left") mapStyle.left=parseInt(mapStyle.left,10)+screen.chipSize/4*(chara.doesRun%4)+"px";
					else if(chara.direction=="front") mapStyle.top=parseInt(mapStyle.top,10)-screen.chipSize/4*(chara.doesRun%4)+"px";
					else if(chara.direction=="right") mapStyle.left=parseInt(mapStyle.left,10)-screen.chipSize/4*(chara.doesRun%4)+"px";
					else if(chara.direction=="back") mapStyle.top=parseInt(mapStyle.top,10)+screen.chipSize/4*(chara.doesRun%4)+"px";
				}
				if(chara.doesWalk>=7||chara.doesWalk>=4&&chara.doesRun!==false){
					chara.doesWalk=0;
					if(isKeyPressed["d"]&&(isKeyPressed["left"]||isKeyPressed["up"]||isKeyPressed["right"]||isKeyPressed["down"])) chara.doesRun++;
					else chara.doesRun=false;
					if(chara.direction=="left") move(-1,0,true);
					else if(chara.direction=="front") move(0,1,true);
					else if(chara.direction=="right") move(1,0,true);
					else if(chara.direction=="back") move(0,-1,true);
				}
				break;
			case "map":
				
				break;
			case "battle":
				display.hide("title")
				break;
			case "talk":
				display.hide("title")
				break;
			case "menu":
				display.hide("title")
				cursorStyle.left=cursor.x+"px";
				cursorStyle.top=cursor.y*20+30+"px";
				break;
		}
	};
	display.show=function(target){
		//targetを表示する
		switch(target){
			case "screen":
				break;
			case "charaScreen":
				break;
			case "menu":
				break;
			case "sayBox":
				break;
			case "title":
				charaCanvas.fillStyle = "#fff";
				charaCanvas.fillRect(0,0,480,480)
				charaCanvas.font = "18px 'MS Pゴシック'";
				charaCanvas.fillStyle = "#000";
				charaCanvas.fillText("ポケ☆モン", (480-charaCanvas.measureText("ポケ☆モン").width)/2, 200);
				break;
			case "mes":
				break;
		}
		return display
	}
	display.hide=function(target){
		switch(target){
			case "screen":
				break;
			case "charaScreen":
				break;
			case "menu":
				break;
			case "sayBox":
				break;
			case "title":
				break;
			case "mes":
				break;
		}
		return display;
	}
	var isKeyPressed={};
	var paint=function(data,x,y){
		//マップ1チップの描写
		mapCanvas.drawImage(preloadImages[mapImg[data]], x*screen.chipSize, y*screen.chipSize,screen.chipSize,screen.chipSize);
	},
	move=function(dx,dy,doesMove){
		//dx=xの移動量 dy=(略)
		if (chara.x + dx<= world.width-1 && chara.x + dx >= 0 && chara.y + dy <= world.height-1 && chara.y + dy >= 0 && mapAttr[mapData[chara.y+dy][chara.x+dx]].isNotBarrier) {
			if(doesMove){
				chara.x += dx;
				chara.y += dy;
			}
			doesEncount&&encount();
			return true;
		}
		return false;
	},
	encount=function(test){
		if(mapAttr[mapData[chara.y][chara.x]].isEncountable){
			if(test=="test"||(Math.random()*30|0)==0){
				switchMode("battle");
				startBattle(livingMonster[mapData[chara.y][chara.x]]);
			}
		}
	},
	startBattle=function(monster){
		var enemy=new POKEMON(monster[Math.random()*monster.length|0]);
		d.getElementById("mesbox").innerText=enemy.name+" が現れた!どうする?";
		d.getElementById("enemy").style.backgroundImage="url("+enemy.img.src+")";
	},
	mapImageAdd=function(url,x,y){
		//マップのdiv要素のbackgroundImageのurlをたす。
		charaCanvas.drawImage(preloadImages[url],x*screen.chipSize,y*screen.chipSize);
	}
	var switchMode=(function(){
		var nowScene=situation;
		return function(scene){
			switch(nowScene){
				//切り替えでOFFにする方
				case "menu":
					display.hide("screen").hide("charaScreen").hide("menu")
					break;
				case "talk":
					display.hide("screen").hide("charaScreen").hide("sayBox")
					break;
				case "map":
					display.hide("screen").hide("charaScreen")
					break;
				case "title":
					display.hide("title")
					break;
				case "battle":
					display.hide("mes")
					break;
			}
			switch(scene){
				case "menu":
					situation="menu";
					cursor.maxX=0;
					cursor.maxY=d.getElementById("menu").innerHTML.match(/<div[\s\S]*?>/g).length-3;
					display.show("menu").show("screen").show("charaScreen")
					break;
				case "talk":
					display.show("sayBox").show("screen").show("charaScreen")
					break;
				case "map":
					situation="map";
					display.show("screen").show("charaScreen")
					break;
				case "title":
					situation="title";
					display.show("title")
					break;
				case "battle":
					situation="battle";
					display.show("mes")
					break;
			}
			nowScene=scene
		}
	})();
	var keyAction=function(key){
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
			case "leave left":
			case "leave right":
			case "leave up":
			case "leave down":
				chara.doesRun=false;
				break;
		}
	};
	window.onkeyup=function(e){
		if(e.keyCode==32){isKeyPressed["space"]=false;return false;}//space
		if(e.keyCode==37){isKeyPressed["left"]=false;keyAction("leave left");return false;}//left
		if(e.keyCode==38){isKeyPressed["up"]=false;keyAction("leave up");return false;}//up
		if(e.keyCode==39){isKeyPressed["right"]=false;keyAction("leave right");return false;}//right
		if(e.keyCode==40){isKeyPressed["down"]=false;keyAction("leave down");return false;}//down
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
	setTimeout(function(){
	for(var j=0;j<world.height;j++){
		//マップの描写
		for(var i=0;i<world.width;i++){
			if(mapData[j]!==undefined&&mapData[j][i]!==undefined) paint(mapData[j][i],i,j);
			else paint(-1,i*screen.chipSize,j*screen.chipSize);
		}
	}},300);
	setInterval(function(){
		charaCanvas.clearRect(0,0,480,480);
		for(var key in isKeyPressed){
			if(isKeyPressed[key]&&key!="m"&&key!="space"&&key!="e") keyAction(key);
		}
		switch(situation){
			case "title":
				display("title");
				break;
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
	},IntervalTime);
}