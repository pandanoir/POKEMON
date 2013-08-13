onloadEvent.add(function(){
	var mapStyle=document.getElementById("map").style;
	mapStyle.left=mapStyle.top="0px";
	var Canvas={
		chara	:document.getElementById("chara").getContext("2d"),
		map	:document.getElementById("map").getContext("2d"),
		menu	:document.getElementById("menu").getContext("2d"),
		enemy	:document.getElementById("enemy").getContext("2d"),
		battle	:document.getElementById("battle").getContext("2d"),
		mes		:document.getElementById("mes").getContext("2d"),
		width:480,
		height:480
	},screen={
		//見えている範囲の画面サイズ(ただしスムーズウォーキングのための画面外2マスを含む)とscreenの1マスのサイズ
		width:17,
		height:17,
		chipSize:32
	},
	menu={width:120,height:140},
	mainMenu=[{name:"メニュ"},{name:"レポートに書く"},{name:"設定"},{name:"手持ちのポケモン"},{name:"ゲームに戻る"},{name:"タイトル画面に戻る"}];
	screen.realWidth=(screen.width-2)*screen.chipSize;//見えない2マス分を引いた
	screen.realHeight=(screen.height-2)*screen.chipSize;//見えない2マス分を引いた
	//画面外も含めたマップのサイズ
	var preloadImages={"chara1/left":new Image(),"chara1/front":new Image(),"chara1/right":new Image(),"chara1/back":new Image(),"chara1/left_left":new Image(),"chara1/left_front":new Image(),"chara1/left_right":new Image(),"chara1/left_back":new Image(),"chara1/right_left":new Image(),"chara1/right_front":new Image(),"chara1/right_right":new Image(),"chara1/right_back":new Image(),"sand":new Image(),"grass":new Image(),"black":new Image(),"villager":new Image(),"farmer":new Image(),"blacksmith":new Image(),"butcher":new Image()}
	Canvas.map.drawImage(preloadImages["sand"],0,0)
	for(var key in preloadImages){
		preloadImages[key].src=key+".png";
	}
	var mapImageAdd=function(url,x,y){
		//マップのdiv要素のbackgroundImageのurlをたす。
		Canvas.chara.drawImage(preloadImages[url],x*screen.chipSize,y*screen.chipSize);
	};
	display=function(key){
		//keyの状態で表示する
		switch(key){
			case "title":
				display.show("title")
				break;
			case "chara":
				display.hide("title")
				for(var i=0,j=Base.villager.length;i<j;i++){
//					display.paint(Base.villager[i].job,Base.villager[i].x,Base.villager[i].y);//職業ごとに違う絵柄の予定。今はテストなので下の方
					display.paint("villager",Base.villager[i].x,Base.villager[i].y);
					if(Base.villager[i].move&&(Math.random()*10|0)==0){
						switch(Math.random()*4|0){
							case 0:
								move(-1,0,true,"villager["+i+"]");
								break;
							case 1:
								move(1,0,true,"villager["+i+"]");
								break;
							case 2:
								move(0,1,true,"villager["+i+"]");
								break;
							case 3:
								move(0,-1,true,"villager["+i+"]");
								break;
						}
					}
				}
				//キャラの表示。
				if(Base.chara.doesWalk!=0){
					if(Base.chara.doesRun!=0) Base.chara.doesWalk+=2;
					else Base.chara.doesWalk+=1;
				}
				if(Base.chara.doesRun>0){
					Base.chara.doesRun++;
					if(Base.chara.doesRun%4==0||Base.chara.doesRun%4==1) mapImageAdd("chara1/left_"+Base.chara.direction,screen.width/2|0,screen.height/2|0);
					if(Base.chara.doesRun%4==2||Base.chara.doesRun%4==3) mapImageAdd("chara1/right_"+Base.chara.direction,screen.width/2|0,screen.height/2|0);
				}else{
					if(Base.chara.doesWalk==0||Base.chara.doesWalk==2||Base.chara.doesWalk==3) mapImageAdd("chara1/"+Base.chara.direction,screen.width/2|0,screen.height/2|0);
					if(Base.chara.doesWalk==4||Base.chara.doesWalk==5) mapImageAdd("chara1/left_"+Base.chara.direction,screen.width/2|0,screen.height/2|0);
					if(Base.chara.doesWalk==6||Base.chara.doesWalk==7) mapImageAdd("chara1/right_"+Base.chara.direction,screen.width/2|0,screen.height/2|0);
				}
				mapStyle.left=-(Base.chara.x-(screen.width/2|0))*screen.chipSize+"px";
				mapStyle.top=-(Base.chara.y-(screen.height/2|0))*screen.chipSize+"px";
				if(Base.chara.doesRun==0){
					if(Base.chara.direction=="left") mapStyle.left=parseInt(mapStyle.left,10)+screen.chipSize/8*Base.chara.doesWalk+"px";
					else if(Base.chara.direction=="front") mapStyle.top=parseInt(mapStyle.top,10)-screen.chipSize/8*Base.chara.doesWalk+"px";
					else if(Base.chara.direction=="right") mapStyle.left=parseInt(mapStyle.left,10)-screen.chipSize/8*Base.chara.doesWalk+"px";
					else if(Base.chara.direction=="back") mapStyle.top=parseInt(mapStyle.top,10)+screen.chipSize/8*Base.chara.doesWalk+"px";
				}else{
					if(Base.chara.direction=="left") mapStyle.left=parseInt(mapStyle.left,10)+screen.chipSize/4*(Base.chara.doesRun%4)+"px";
					else if(Base.chara.direction=="front") mapStyle.top=parseInt(mapStyle.top,10)-screen.chipSize/4*(Base.chara.doesRun%4)+"px";
					else if(Base.chara.direction=="right") mapStyle.left=parseInt(mapStyle.left,10)-screen.chipSize/4*(Base.chara.doesRun%4)+"px";
					else if(Base.chara.direction=="back") mapStyle.top=parseInt(mapStyle.top,10)+screen.chipSize/4*(Base.chara.doesRun%4)+"px";
				}
				if(Base.chara.doesWalk>=7||Base.chara.doesWalk>=4&&Base.chara.doesRun!=0){
					Base.chara.doesWalk=0;
					if(Base.isKeyPressed["d"]&&(Base.isKeyPressed["left"]&&move(-1,0,false)||Base.isKeyPressed["up"]&&move(0,1,false)||Base.isKeyPressed["right"]&&move(1,0,false)||Base.isKeyPressed["down"]&&move(0,-1,false)))Base.chara.doesRun++;
					else Base.chara.doesRun=0;
					if(Base.chara.direction=="left") move(-1,0,true);
					else if(Base.chara.direction=="front") move(0,1,true);
					else if(Base.chara.direction=="right") move(1,0,true);
					else if(Base.chara.direction=="back") move(0,-1,true);
				}
				break;
			case "map":
				break;
			case "battle":
				display.hide("title").show("enemy");
				Canvas.battle.fillStyle="#fff";
				Canvas.battle.fillRect(0,0,screen.realWidth,screen.realHeight);
				break;
			case "talk":
				display.hide("title")
				break;
			case "menu":
				display.hide("title");
				Base.cursor.maxX=0;
				Base.cursor.maxY=mainMenu.length-2;
				Canvas.menu.clearRect(0,0,Canvas.width,Canvas.height);
				Canvas.menu.rect((screen.realWidth-menu.width)/2,(screen.realHeight-menu.height)/2,menu.width,menu.height);
				Canvas.menu.fillStyle="rgba(255,255,255,0.7)";
				Canvas.menu.fill();
				Canvas.menu.stroke();
				Canvas.menu.fillStyle="#000";
				Canvas.menu.fillText(">",Base.cursor.x+(screen.realWidth-menu.width)/2+2,Base.cursor.y*20+(screen.realHeight-menu.height)/2+20+20);
				var cursorWidth=Canvas.menu.measureText("> ").width;
				for(var i=0,j=mainMenu.length;i<j;i++){
					Canvas.menu.fillText(mainMenu[i].name,(screen.realWidth-menu.width)/2+cursorWidth,i*20+(screen.realHeight-menu.height)/2+20);
				}
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
			case "title":
				Canvas.chara.fillStyle = "#fff";
				Canvas.chara.fillRect(0,0,Canvas.width,Canvas.height)
				Canvas.chara.font = "18px 'MS Pゴシック'";
				Canvas.chara.fillStyle = "#000";
				Canvas.chara.fillText("ポケ☆モン", (Canvas.width-Canvas.chara.measureText("ポケ☆モン").width)/2, 200);
				break;
			case "mes":
				break;
			case "enemy":
				Canvas.enemy.drawImage(Base.enemy.img,(screen.realWidth-320)/2,0,320,320);
				break;
		}
		return display
	}
	display.hide=function(target){
		//targetを消す
		switch(target){
			case "screen":
				break;
			case "charaScreen":
				break;
			case "menu":
				Canvas.menu.clearRect(0,0,Canvas.width,Canvas.height);
				Base.cursor.y=0;
				break;
			case "title":
				break;
			case "mes":
				Canvas.mes.clearRect(0,0,screen.realWidth,screen.realHeight);
				break;
		}
		return display;
	}
	display.paint=function(data,x,y){
		//マップ1チップの描写
		Canvas.map.drawImage(preloadImages[data], x*screen.chipSize, y*screen.chipSize,screen.chipSize,screen.chipSize);
	}
	display.mes=(function(){
		var messages=[];
		return function(option){
			//メッセージを表示する
			var message=option.message;//表示内容
			var mesBoxHeight=80;//表示するボックスのサイズ(幅はめいいっぱい)
			var x=option.x||20;//表示内容のx座標
			if(x<0) x=screen.realWidth+x;
			var y=option.y?option.y+screen.realHeight-mesBoxHeight+20:screen.realHeight-mesBoxHeight+20;//表示内容のy座標。表示ボックスからはみ出ないように調整した。
			if(y<0) x=screen.realHeight+y;
			if(option.overwrite===undefined) overwrite=false;
			else overwrite=option.overwrite;
			
			if(!overwrite) messages=[];
			
			if(option.move){
				for(var i=messages.length-1,found=false;i>-1;i--){
					if(messages[i].message==message){
						messages[i].x=x;
						messages[i].y=y;
						found=true;
						break;
					}
				}
				if(found==false) messages.push({message:message,x:x,y:y})
			}else{
				messages.push({message:message,x:x,y:y})
			}
			
			Canvas.mes.clearRect(0,screen.realHeight-mesBoxHeight,screen.realWidth,screen.realHeight);
			Canvas.mes.fillStyle="rgba(0,0,0,0.8)";
			Canvas.mes.strokeStyle="#fff";
			Canvas.mes.rect(0,screen.realHeight-mesBoxHeight,screen.realWidth,mesBoxHeight);
			Canvas.mes.stroke();
			Canvas.mes.strokeStyle="#000";
			Canvas.mes.rect(2,screen.realHeight-mesBoxHeight+2,screen.realWidth-4,mesBoxHeight-4);
			Canvas.mes.fill();
			Canvas.mes.stroke();
			Canvas.mes.shadowOffsetX=1;
			Canvas.mes.shadowOffsetY=1;
			Canvas.mes.shadowColor="rgba(0,0,0,0.3)";
			Canvas.mes.fillStyle="#fff";
			for(var i=0,j=messages.length;i<j;i++){
				if(messages[i].message.indexOf("\n")!=-1) for(var i=0,j=messages[i].message.split("\n").length;i<j;i++) Canvas.mes.fillText(messages[i].message.split("\n")[i],messages[i].x,messages[i].y+i*20);//改行ありメッセージ
				else Canvas.mes.fillText(messages[i].message,messages[i].x,messages[i].y);//普通のメッセージ
			}
		}
	})()
	display.textWidth=function(str){
		return Canvas.menu.measureText(str).width
	}
	display.clear=function(canvas){
		Canvas[canvas].clearRect(0,0,Canvas.width,Canvas.height);
	}
	display.world={
		//見えない範囲つまりマップ全体のサイズ
		width:36,
		height:36
	};
	document.getElementById("map").width=display.world.width*screen.chipSize;
	document.getElementById("map").height=display.world.height*screen.chipSize;
	setTimeout(function(){
		for(var j=0;j<display.world.height;j++){
			//マップの描写
			for(var i=0;i<display.world.width;i++){
				if(Base.mapData[j]!==undefined&&Base.mapData[j][i]!==undefined) display.paint(Base.mapAttr[Base.mapData[j][i]].img,i,j);
				else display.paint(Base.mapAttr[-1].img,i*screen.chipSize,j*screen.chipSize);
			}
		}
		document.getElementById("screen").style.background="#000";//黒くする
	},100);
})