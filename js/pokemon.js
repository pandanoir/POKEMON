var testMode=false,
doesEncount=true,
logMode=false,
IntervalTime=50;
window.addEventListener("load",function(){
	var logs,log,inc=0;
	if(logMode){
		var r = new XMLHttpRequest();
		r.open("GET", "js/log.txt", true);
		r.send(null)
		r.onreadystatechange = function () {
			if (r.readyState != 4) return;
			log=r.responseText;
			logs=log.split("\n");
			for(var i=0;i<logs.length;i++){
				logs[i]={
					body:logs[i].substring(0,logs[i].lastIndexOf(":")),
					time:parseInt(logs[i].substring(logs[i].lastIndexOf(":")+1))
				}
				if(logs[i].body.indexOf("loaded")!=-1) logs[i].type="load";
				if(logs[i].body.indexOf("key")!=-1){
					logs[i].type="keyAction";
					logs[i].key=logs[i].body.split(" ")[1];
				}
			}
			preloadImageLoad();
			r.onreadystatechange=void 0;
		};
	}
	App.noConsole();
	// クッキー保存　setCookie(クッキー名, クッキーの値, クッキーの有効日数); //
	var isSmartPhone="ontouchstart" in window;
	function setCookie(b,e,d){var c=location.pathname,a=[],a=c.split("/");""!=a[a.length-1]&&(a[a.length-1]="",c=a.join("/"));a=(new Date).getTime();a=(new Date(a+864E5*d)).toUTCString();b=""+(b+"="+escape(e));b+="; path="+c;document.cookie=d?b+("; expires="+a+"; "):b+"; "};
	var mapStyle=document.getElementById("map").style,frontMapStyle=document.getElementById("frontMap").style,villagerStyle=document.getElementById("villager").style;
	frontMapStyle.display="none";
	var situation="title";
	var now=0;
	var Canvas={
		//Canvas関係
		chara		:document.getElementById("chara").getContext("2d"),
		map		:document.getElementById("map").getContext("2d"),
		frontMap	:document.getElementById("frontMap").getContext("2d"),
		battle		:document.getElementById("battle").getContext("2d"),
		menu		:document.getElementById("menu").getContext("2d"),
		shop		:document.getElementById("shop").getContext("2d"),
		mes			:document.getElementById("mes").getContext("2d"),
		villager		:document.getElementById("villager").getContext("2d"),
		clear:function(canvas){
			Canvas[canvas].clearRect(0,0,Canvas.width,Canvas.height);
		},
		width		:480,
		height		:480
	},screen={
		//見えている範囲の画面サイズ(ただしスムーズウォーキングのための画面外2マスを含む)とscreenの1マスのサイズ
		width:17,
		height:17,
		chipSize:32
	},
	switchMode=(function(){
		var nowScene=situation;
		return function(scene){
			var hides=[],shows=[];
			switch(nowScene){
				//切り替えでOFFにする方
				case "menu":hides=["map","charaScreen","menu"];break;
				case "talk":hides=["map","charaScreen","mes"];break;
				case "map":if(scene!="talk") hides=["map","charaScreen"];break;
				case "title":hides=["title"];break;
				case "battle":hides=["mes","battle"];break;
				case "setting":hides=["menu"];break;
			}
			switch(scene){
				case "menu":
					situation="menu";
					shows=["map","charaScreen","menu"];
					break;
				case "talk":
					situation="talk";
					shows=["map","charaScreen","mes"];
					break;
				case "map":
					situation="map";
					view.display("chara");
					shows=["map","charaScreen"];
					view.charaDraw("none");
					break;
				case "title":
					situation="title";
					shows=["title"];
					break;
				case "battle":
					situation="battle";
					shows=["mes","battle"];
					break;
				case "setting":
					situation="setting";
					shows=["map","charaScreen","menu"];
					break;
			}
			nowScene=scene;
			var hides2=_.difference(hides,shows);//消すものの中から表示予定のものをhidesから消してエコロジー化
			var shows2=_.difference(shows,hides);//表示予定のものからすでに表示されているものをshowsから消してエコロジー化
			for(var i=0;i<hides2.length;i++) view.hide(hides2[i]);
			for(var i=0;i<shows2.length;i++) view.show(shows2[i]);
		}
	})(),
	antiKeyAction=false,
	encount=function(test){
		if(Model.get("mapAttr").get(Model.get("mapData").get(Model.get("chara").get("y"))[Model.get("chara").get("x")]).isEncountable){
			if(test||(Math.random()*100|0)==0){
				App.log("encount "+test);
				switchMode("battle");
				if(test!==undefined&&test!="test") battle({start:true,monster:[test]});
				else battle({start:true,monster:Model.get("mapAttr").get(Model.get("mapData").get(Model.get("chara").get("y"))[Model.get("chara").get("x")]).livingMonster});
			}
		}
	},
	battle=function(option){
		if(option.start){
			App.log("battle start")
			//バトルをスタートする時
			Model.get("cursor").set({
				"maxX":1,
				"maxY":1,
				"x":0,
				"y":0
			});
			enemy=new Pokemon({name:option.monster[Math.random()*option.monster.length|0],lv:5});
			enemy.set("img",new Image());
			enemy.get("img").src=enemy.get("src");
			battle({turnStart:true});
		}
		if(option.turnStart){
			//ターンのはじめ
			view.mes({message:enemy.get("name")+" が現れた!どうする?",dontWait:true});
			view.mes({message:"戦う",x:-120,overwrite:true,dontWait:true});
			view.mes({message:"アイテム",x:-60,overwrite:true,dontWait:true});
			view.mes({message:"ポケモン",x:-120,y:20,overwrite:true,dontWait:true});
			view.mes({message:"逃げる",x:-60,y:20,overwrite:true,dontWait:true});
			view.mes({message:">",x:-140+Model.get("cursor").get("x")*60,y:Model.get("cursor").get("y")*20,overwrite:true,move:true,dontWait:true});
			battle({hpGauge:true});
		}
		if(option.decide){
			//選択肢を決定した時
			switch(Model.get("cursor").num()){
				case 0:
					//攻撃を選んだ時
					if (enemy.get("speed") <= friend.at(now).get("speed")) battle({attack: [enemy, friend.at(now), friend.at(now).get("technique")[Model.get("cursor").get("x") + Model.get("cursor").get("y") * 2]],next: function () {battle({attack: [friend.at(now), enemy, enemy.get("technique")[Math.random() * 4 | 0]]})}}); //自分の攻撃が先//バトルが終わってるかもしれないから
					else battle({attack: [friend.at(now), enemy, enemy.get("technique")[Math.random() * 4 | 0]],next: function () {if (situation == "battle") battle({attack: [enemy, friend.at(now), friend.at(now).get("technique")[Model.get("cursor").get("x") + Model.get("cursor").get("y") * 2]]})}})
					break;
				case 1:view.mes({message:"アイテム!"});break;
				case 2:view.mes({message:"交代!"});break;
				case 3:
					view.mes({message:"プレイヤーは逃げだした!"});
					if ((Math.random() * (enemy.get("speed") - friend.at(now).get("speed")) | 0) == 1) view.mes({message: "しかし逃げきれなかった!",callback: function () {battle({attack: [friend.at(now), enemy, enemy.get("technique")[Math.random() * 4 | 0]]})}})
					else view.mes({message: "逃げきれた!",callback: function () {switchMode("map");situation = "map"}});
					break;
			}
		}else if(option.attack){
			//option.attack[1]が攻撃側、option.attack[0]が防御側、option.attack[2]が技
			var beforeHP=option.attack[0].get("hp");
			var technique=new Technique(option.attack[2]);
			var damage=Math.floor((option.attack[1].get("lv")*2/5+2)*technique.get("damage")*option.attack[1].attack()/option.attack[0].defence()/50 + 2)*(Math.random()*16|0+85)/100;
			if (option.attack[1].get("item") && option.attack[1].get
			("item").effect){
				//持ち物による付与効果
				if(Model.get("Func").searchArray(option.attack[1].get("item").effect.split(","), "attack") != -1) {
					//効果にattackがあったら
					damage=Math.floor(damage*Model.get("Func").parseInt(option.attack[1].get("item").effect.split(",")[Model.get("Func").searchArray(option.attack[1].get("item").effect.split(","), "attack")].split(" ")[1]));
				} else if (Model.get("Func").searchArray(option.attack[1].get("item").effect.split(","), "all") != -1) {
					//効果にallがあったら
					damage=Math.floor(damage*option.attack[1].get("attack") * Model.get("Func").parseInt(option.attack[1].get("item").effect.split(",")[Model.get("Func").searchArray(option.attack[1].get("item").effect.split(","), "all")].split(" ")[1]));
				}
			}
			if(damage<0) damage=0;
			damage=Math.floor(damage);
			option.attack[0].set("hp",option.attack[0].get("hp")-damage);

			view.mes({message: option.attack[1].get("name") + " の攻撃!",callback:function(){battle({hpGauge:true})}});
			if (option.attack[0].get("hp") <= 0){
				//倒した時
				view.mes({message:option.attack[0].get("name") + " に" + (beforeHP-option.attack[0].get("hp")) + " のダメージ!"});
				view.mes({message: option.attack[0].get("name") + "を倒した!",callback:function(){
					option.attack[0].set("hp",option.attack[0].get("maxHp"));
					battle({end:true});
				}});
			}else{
				view.mes({message:option.attack[0].get("name") + " に" + (beforeHP-option.attack[0].get("hp")) + " のダメージ!",callback:function(){option.next?option.next():battle({turnStart:true})}});
			}
		}else if(option.end){
			App.log("battle end");
			switchMode("map");
			situation="map";
		}else if(option.hpGauge){
			Canvas.battle.beginPath();
			Canvas.battle.fillStyle="#FFF";
			Canvas.battle.fillRect(0,screen.realHeight-mesBox.height-hpGauge.height,screen.realWidth,screen.realHeight);

			var ratio=enemy.get("hp")/enemy.get("maxHp");
			if(ratio<0) ratio=0;
			Canvas.battle.fillStyle="#F00";
			Canvas.battle.rect(0,screen.realHeight-mesBox.height-hpGauge.height,hpGauge.width,hpGauge.height);
			Canvas.battle.fillRect(0,screen.realHeight-mesBox.height-hpGauge.height,hpGauge.width*ratio,hpGauge.height);

			var ratio=friend.at(now).get("hp")/friend.at(now).get("maxHp");
			if(ratio<0) ratio=0;
			Canvas.battle.fillStyle="#0F0";
			Canvas.battle.rect(screen.realWidth-hpGauge.width,screen.realHeight-mesBox.height-hpGauge.height,hpGauge.width,hpGauge.height);
			Canvas.battle.fillRect(screen.realWidth-hpGauge.width,screen.realHeight-mesBox.height-hpGauge.height,hpGauge.width*ratio,hpGauge.height);

			Canvas.battle.stroke();
			Canvas.battle.closePath();
		}
	},
	talk=function(){
		App.log("talk")
		var dx=0,dy=0;
		switch(Model.get("chara").get("direction")){
			case "left":dx=-1;break;
			case "front":dy=1;break;
			case "right":dx=1;break;
			case "back":dy=-1;break;
		}
		var i=Model.get("Func").doesVillagerExist(Model.get("chara").get("x")+dx,Model.get("chara").get("y")+dy);
		if(i!=-1){
			var i=Model.get("Func").doesVillagerExist(Model.get("chara").get("x")+dx,Model.get("chara").get("y")+dy);
			switch(Model.get("chara").get("direction")){
				case "left":villagers.at(i).set("direction","right");break;
				case "right":villagers.at(i).set("direction","left");break;
				case "back":villagers.at(i).set("direction","front");break;
				case "front":villagers.at(i).set("direction","back");break;
			}
			view.clear("villager",villagers.at(i).get("x"),villagers.at(i).get("y"));
			view.paintVillager(i);
			villagers.at(i).talk();
		}else if(Model.get("frontMapData").get(Model.get("chara").get("y")+dy)[Model.get("chara").get("x")+dx]==5&&Model.get("Func").doesVillagerExist(Model.get("chara").get("x")+dx*3,Model.get("chara").get("y")+dy*3)!=-1){
			//屋台の中のひとにはなしかけるとき
			var i=Model.get("Func").doesVillagerExist(Model.get("chara").get("x")+dx*3,Model.get("chara").get("y")+dy*3);
			switch(Model.get("chara").get("direction")){
				case "left":villagers.at(i).set("direction","right");break;
				case "right":villagers.at(i).set("direction","left");break;
				case "back":villagers.at(i).set("direction","front");break;
				case "front":villagers.at(i).set("direction","back");break;
			}
			view.clear("villager",villagers.at(i).get("x"),villagers.at(i).get("y"));
			view.paintVillager(i);
			villagers.at(i).talk();
		}else view.mes({message:"あやしいところは特になにもないようだ"});
	},
	talkTask=0,
	talking=false,
	menu={width:170,height:200},//メニュ画面の幅と高さ
	setting={width:200,height:250,nest:0},//セッティング画面の幅と高さ
	hpGauge={width:140,height:20},//HPゲージの幅と高さ
	mesBox={height:80},//表示するボックスのサイズ(幅はめいいっぱい)
	mainMenu=[{name:"図鑑"},{name:"レポートに書く"},{name:"設定"},{name:"手持ちのポケモン"},{name:"アイテム"},{name:"ゲームに戻る"},{name:"タイトル画面に戻る"},{name:"セーブデータを消す"},{name:"App"}],
	settingOption=[{name:"音量",option:["0%","50%","100%","戻る"]},{name:"キャラ画像",option:["石山","まじめ","戻る"]},{name:"戻る"}];//選択肢
	if(isSmartPhone){
		Canvas.height=320;
		for(var key in Canvas){
			if(document.getElementById(key)){
				document.getElementById(key).height=Canvas.height;
			}
		}
		document.getElementById("screen").style.height=Canvas.height+"px";
		screen.height=12;
	}
	screen.realWidth=(screen.width-2)*screen.chipSize;//見えない2マス分を引いた
	screen.realHeight=(screen.height-2)*screen.chipSize;//見えない2マス分を引いた
	//画面外も含めたマップのサイズ
	var preloadImages={"chara":new Image(),"chara1":new Image(),"black":new Image(),"villager/farmer":new Image(),"villager/blacksmith":new Image(),"villager/butcher":new Image(),"villager/citizen":new Image(),"villager/curioshop":new Image(),"villager/cure":new Image()}
	App.log("images began loading")
	var loadedImages=0;
	var imageLoad=function(){
		App.log(this.src.replace(/([\s\S]+?)([^\/]+?).(png|gif)/,"$2.$3")+" loaded")
		loadedImages++;
		document.getElementById("loading").innerText=loadedImages/(preloadImages.Length)*100+"%"
		if(loadedImages==preloadImages.Length){
			//画像+BGMの数
			App.log("images loaded")
			main(_);
		}
	}
	function moveMap(){
		villagerStyle["left"]=mapStyle["left"]=frontMapStyle["left"]=-(Model.get("chara").get("x")-(screen.width/2|0))*screen.chipSize+"px";
		villagerStyle["top"]=mapStyle["top"]=frontMapStyle["top"]=-(Model.get("chara").get("y")-(screen.height/2|0))*screen.chipSize+"px";
		if(Model.get("chara").get("doesRun")==0){
			//doesRunが0 つまり 走ってない
			switch(Model.get("chara").get("direction")){
				case "left":villagerStyle["left"]=mapStyle["left"]=frontMapStyle["left"]=parseInt(mapStyle.left,10)+screen.chipSize/8*Model.get("chara").get("doesWalk")+"px";break;
				case "front":villagerStyle["top"]=mapStyle["top"]=frontMapStyle["top"]=parseInt(mapStyle.top,10)-screen.chipSize/8*Model.get("chara").get("doesWalk")+"px";break;
				case "right":villagerStyle["left"]=mapStyle["left"]=frontMapStyle["left"]=parseInt(mapStyle.left,10)-screen.chipSize/8*Model.get("chara").get("doesWalk")+"px";break;
				case "back":villagerStyle["top"]=mapStyle["top"]=frontMapStyle["top"]=parseInt(mapStyle.top,10)+screen.chipSize/8*Model.get("chara").get("doesWalk")+"px";break;
			}
		}else{
			//doesRunが0でない 走っている
			switch(Model.get("chara").get("direction")){
				case "left":villagerStyle["left"]=mapStyle["left"]=frontMapStyle["left"]=parseInt(mapStyle.left,10)+screen.chipSize/4*(Model.get("chara").get("doesRun")%4)+"px";break;
				case "front":villagerStyle["top"]=mapStyle["top"]=frontMapStyle["top"]=parseInt(mapStyle.top,10)-screen.chipSize/4*(Model.get("chara").get("doesRun")%4)+"px";break;
				case "right":villagerStyle["left"]=mapStyle["left"]=frontMapStyle["left"]=parseInt(mapStyle.left,10)-screen.chipSize/4*(Model.get("chara").get("doesRun")%4)+"px";break;
				case "back":villagerStyle["top"]=mapStyle["top"]=frontMapStyle["top"]=parseInt(mapStyle.top,10)+screen.chipSize/4*(Model.get("chara").get("doesRun")%4)+"px";break;
			}
		}
	}
	function preloadImageLoad(){
		for(var key in preloadImages){
			preloadImages[key].src=key+".png";
		}
		preloadImages["map.png"]=new Image();preloadImages["map.png"].src="map/map.png";
		preloadImages["shops.gif"]=new Image();preloadImages["shops.gif"].src="map/shops.gif";
		var i=0;
		for(var key in preloadImages){
			preloadImages[key].onload=imageLoad;
			i++;
		}
		preloadImages.Length=i;
	}
	if(!logMode){
		preloadImageLoad();
	}

	function main(U){
		App.log("main called")
		moveMap();//スムースウォーキングのためにmapを動かす時に必要な設定。
		var Display=Backbone.View.extend({
			mes:(function(){
				var messages=[];
				var tasks=[];
				return function(option){
					//メッセージを表示する
					if(typeof option=="string"){
						option={
							message:option
						}
					}
					option.doesSwitchMode=option.doesSwitchMode!==undefined?option.doesSwitchMode:true;
					talkTask++;
					antiKeyAction=true;
					tasks.push(option);
					var wait=setInterval(function(){
					if(!talking||tasks[tasks.length-1].dontWait){
						//talkingがfalse つまり会話していない もしくはdontWaitつまりスルーする
						option=tasks.shift();
						talking=true;
						talkTask--;
						var message=option.message;//表示内容
						var x=option.x||20;//表示内容のx座標
						if(x<0) x=screen.realWidth+x;
						var y=option.y?option.y+screen.realHeight-mesBox.height+20:screen.realHeight-mesBox.height+20;//表示内容のy座標。表示ボックスからはみ出ないように調整した。
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
						}else messages.push({message:message,x:x,y:y})
						
						Canvas.mes.clearRect(0,screen.realHeight-mesBox.height,screen.realWidth,screen.realHeight);

						view.strokeMesBox()//ボックスの描写

						Canvas.mes.shadowOffsetX=Canvas.mes.shadowOffsetY=1;
						Canvas.mes.shadowColor="rgba(0,0,0,0.3)";
						Canvas.mes.fillStyle="#fff";
						for(var i=0,j=messages.length;i<j;i++){
							if(messages[i].message.indexOf("\n")!=-1) for(var i=0,j=messages[i].message.split("\n").length;i<j;i++) Canvas.mes.fillText(messages[i].message.split("\n")[i],messages[i].x,messages[i].y+i*20);//改行ありメッセージ
							else Canvas.mes.fillText(messages[i].message,messages[i].x,messages[i].y);//普通のメッセージ
						}
						if(option.dontWait){
							talking=false;
							antiKeyAction=false;
							option.callback&&option.callback();
						}else{
							var mesKeyDown=function(e){
								if(e.keyCode==32){
									talking=false;
									window.removeEventListener("keydown",mesKeyDown,false);
									window.removeEventListener("touchstart",mesTouch,false);
									mesTouch=void 0;
									option.callback&&option.callback();
									if(talkTask==0){
										antiKeyAction=false;
										view.hide("mes");
										if(option.doesSwitchMode) switchMode("map");
									}
								}
							}
							var mesTouch=function(e){
								e.preventDefault();
								mesKeyDown({keyCode:padKey[e.target.id]});
							}
							window.addEventListener("keydown",mesKeyDown,false);
							window.addEventListener("touchstart",mesTouch,false);
						}
						clearInterval(wait)
					}
					},20)
				}
			})(),//mes終わり
			strokeMesBox:function(){
				Canvas.mes.fillStyle="rgba(0,0,0,0.7)";
				Canvas.mes.strokeStyle="#fff";
				Canvas.mes.rect(0,screen.realHeight-mesBox.height,screen.realWidth,mesBox.height);
				Canvas.mes.stroke();

				Canvas.mes.strokeStyle="#000";
				Canvas.mes.rect(2,screen.realHeight-mesBox.height+2,screen.realWidth-4,mesBox.height-4);
				Canvas.mes.fill();
				Canvas.mes.stroke();
			},
			select:function(option){
				Canvas[option.canvas].fillStyle=option.color;
				if(!option.hideCursor) Canvas[option.canvas].fillText(">",Model.get("cursor").get("x")+option.x+2,Model.get("cursor").get("y")*20+option.y);
				var cursorWidth=Canvas[option.canvas].measureText("> ").width;
				for(var i=0;i<option.options.length;i++){
					Canvas[option.canvas].fillText(option.options[i],option.x+cursorWidth,option.y+i*20);
				}
				var mesKeyDown=function(e){
					e.preventDefault&&e.preventDefault();
					if(e.keyCode==32){
						talking=false;
						window.removeEventListener("keydown",mesKeyDown,false);
						window.removeEventListener("touchstart",mesTouch,false);
						mesKeyDown=void 0;
						option.callback&&option.callback(Model.get("cursor").num());
						if(talkTask==0){
							antiKeyAction=false;
							view.hide("mes");
							if(option.doesSwitchMode) switchMode("map");
						}
					}
				}
				var mesTouch=function(e){
					e.preventDefault();
					mesKeyDown({keyCode:padKey[e.target.id]});
				}
				window.addEventListener("keydown",mesKeyDown,false);
				window.addEventListener("touchstart",mesTouch,false);
			},
			charaDraw:(function(){
				//キャラの描写
				var beforeDirection="",beforeMotion="";
				return function(motion){
					//マップのdiv要素のbackgroundImageのurlをたす。
					var direction=Model.get("chara").get("direction");
					if(direction==beforeDirection&&motion==beforeMotion&&motion) return;
					beforeDirection=direction;
					beforeMotion=motion;
					Canvas.chara.clearRect((screen.width/2|0)*screen.chipSize,(screen.height/2|0)*screen.chipSize,screen.chipSize,screen.chipSize);
					if(direction=="front") direction=0;
					else if(direction=="left") direction=1;
					else if(direction=="right") direction=2;
					else if(direction=="back") direction=3;
					if(motion=="left"){
						//左足をだしているモーションの時
						Canvas.chara.drawImage(preloadImages[Model.get("chara").get("img")],0,direction*32,screen.chipSize,screen.chipSize,(screen.width/2|0)*screen.chipSize,(screen.height/2|0)*screen.chipSize,screen.chipSize,screen.chipSize);
					}else if(motion=="right"){
						//右足をだしているモーションの時
						Canvas.chara.drawImage(preloadImages[Model.get("chara").get("img")],screen.chipSize*2,direction*32,screen.chipSize,screen.chipSize,(screen.width/2|0)*screen.chipSize,(screen.height/2|0)*screen.chipSize,screen.chipSize,screen.chipSize);
					}else{
						//止まっている時
						Canvas.chara.drawImage(preloadImages[Model.get("chara").get("img")],screen.chipSize,direction*32,screen.chipSize,screen.chipSize,(screen.width/2|0)*screen.chipSize,(screen.height/2|0)*screen.chipSize,screen.chipSize,screen.chipSize);
					}
				}
			})(),
			display:function(key){
				//keyの状態で表示する
				switch(key){
					case "title":
						view.show("title")
						break;
					case "setting":
						//設定画面
						if(setting.nest==0) Model.get("cursor").set({"maxX":0,"maxY":settingOption.length-1});
						else Model.get("cursor").set({"maxX":0,"maxY":settingOption[setting.target].option.length-1});
						
						Canvas.menu.beginPath();
						Canvas.clear("menu");
						Canvas.menu.rect((screen.realWidth-setting.width)/2,(screen.realHeight-setting.height)/2,setting.width,setting.height);
						if(setting.nest==0) Canvas.menu.fillStyle="rgba(255,255,255,0.7)";
						else Canvas.menu.fillStyle="rgba(136,136,136,0.7)";
						Canvas.menu.fill();
						Canvas.menu.stroke();
						view.select({canvas:"menu",options:U.map(settingOption,function(a){return a.name}),x:(screen.realWidth-setting.width)/2+10,y:(screen.realHeight-setting.height)/2+20,color:"#000",hideCursor:setting.nest!=0});
						Canvas.menu.closePath();
						if(setting.nest>0){
							Canvas.menu.beginPath();
							Canvas.menu.rect((screen.realWidth-setting.width+40)/2+20,(screen.realHeight-setting.height)/2,setting.width-40,setting.height);
							Canvas.menu.fillStyle="rgba(255,255,255,0.7)";
							Canvas.menu.fill();
							Canvas.menu.stroke();
							view.select({canvas:"menu",options:settingOption[setting.target].option,x:(screen.realWidth-setting.width+40)/2+20,y:(screen.realHeight-setting.height)/2+20,color:"#000"});
							Canvas.menu.closePath();
						}
					case "chara":
						for(var i=0,j=villagers.length;i<j;i++){
							if(!villagers.at(i).get("isPainted")){
//								view.paint("villager","villager",villagers.at(i).get("x"),villagers.at(i).get("y"));//村人はすべて同じバージョン
								view.paintVillager(i);
								villagers.at(i).set("isPainted",true)
							}
							if(villagers.at(i).get("move")&&(Math.random()*100|0)==0&&situation!="talk"&&situation!="menu"){
								view.clear("villager",villagers.at(i).get("x"),villagers.at(i).get("y"));
								switch(Math.random()*4|0){
									//方向を決める
									case 0://左へ
									if(villagers.at(i).get("x")-1>=villagers.at(i).get("defaultX")-villagers.at(i).get("range")){move(-1,0,true,villagers.at(i));villagers.at(i).set("direction","left");}break;
									case 1://右へ
									if(villagers.at(i).get("x")+1<=villagers.at(i).get("defaultX")+villagers.at(i).get("range")){move(1,0,true,villagers.at(i));villagers.at(i).set("direction","right");}break;
									case 2://下へ
									if(villagers.at(i).get("y")+1<=villagers.at(i).get("defaultY")+villagers.at(i).get("range")){move(0,1,true,villagers.at(i));villagers.at(i).set("direction","front");}break;
									case 3://上へ
									if(villagers.at(i).get("y")-1>=villagers.at(i).get("defaultY")-villagers.at(i).get("range")){move(0,-1,true,villagers.at(i));villagers.at(i).set("direction","back");}break;
								}
								view.paintVillager(i);
							}
						}
						//キャラの表示。
						if(Model.get("chara").get("doesWalk")!=0){
							//歩くか走っていたら
							if(Model.get("chara").get("doesRun")!=0) Model.get("chara").incrementWalk(2);//走っている
							else Model.get("chara").incrementWalk();//歩いている
						}
						if(Model.get("chara").get("doesRun")>0){
							//走っていたら
							Model.get("chara").incrementRun();
							switch(Model.get("chara").get("doesRun")%4){
								case 0:
								case 1:
									view.charaDraw("left");
									 break;
								case 2:
								case 3:
									view.charaDraw("right");
									break;
							}
						}else{
							//走ってなかったら
							switch(Model.get("chara").get("doesWalk")){
								case 0:case 2:case 3:
									view.charaDraw("front");
									break;
								case 4:case 5:
									view.charaDraw("left");
									break;
								case 6:case 7:
									view.charaDraw("right");
									break;
							}
						}
						moveMap();//マップを動かす
						if(Model.get("chara").get("doesWalk")>=7||Model.get("chara").get("doesWalk")>=4&&Model.get("chara").get("doesRun")!=0){
							//doesWalkが7以上もしくはdoesWalkが4以上でdoesRunが0じゃないときに回す用
							Model.get("chara").resetWalk();
							if(Model.get("isKeyPressed").get("d")&&(Model.get("isKeyPressed").get("left")&&move(-1,0,false)||Model.get("isKeyPressed").get("up")&&move(0,1,false)||Model.get("isKeyPressed").get("right")&&move(1,0,false)||Model.get("isKeyPressed").get("down")&&move(0,-1,false))) Model.get("chara").incrementRun();
							else Model.get("chara").resetRun();
							switch(Model.get("chara").get("direction")){
								case "left":move(-1,0,true);break;
								case "front":move(0,1,true);break;
								case "right":move(1,0,true);break;
								case "back":move(0,-1,true);break;
							}
						}
						break;
					case "map":
						break;
					case "battle":
						if(isSmartPhone) Canvas.battle.drawImage(enemy.get("img"),(screen.realWidth-200)/2,0,200,200);
						else Canvas.battle.drawImage(enemy.get("img"),(screen.realWidth-320)/2,0,320,320);
						break;
					case "talk":
						break;
					case "menu":
						Model.get("cursor").set("maxX",0);
						Model.get("cursor").set("maxY",mainMenu.length-1);
						Canvas.menu.beginPath();
						Canvas.clear("menu");
						Canvas.menu.rect((screen.realWidth-menu.width)/2,(screen.realHeight-menu.height)/2,menu.width,menu.height);
						Canvas.menu.fillStyle="rgba(255,255,255,0.7)";
						Canvas.menu.fill();
						Canvas.menu.stroke();
						Canvas.menu.fillStyle="#000";
						view.select({canvas:"menu",options:U.map(mainMenu,function(a){return a.name}),x:(screen.realWidth-menu.width)/2+10,y:(screen.realHeight-menu.height)/2+20});
						Canvas.menu.closePath();
						break;
					case "friendPokemonView":
						Model.get("cursor").set("maxX",2);
						Model.get("cursor").set("maxY",3);
						Canvas.menu.beginPath();
						Canvas.menu.fillStyle="#9CF";
						Canvas.menu.fillRect(0,0,screen.realWidth,screen.realHeight);
						Canvas.menu.closePath();
						Canvas.menu.fillStyle="#000";
						Canvas.menu.beginPath();
						for(var i=0,j=friend.length;i<j;i++){
							Canvas.menu.fillText(friend.at(i).get("nickname"),screen.realWidth/2*(i%2)+6,screen.realHeight/3*(i/2|0)+20);
							Canvas.menu.fillText(friend.at(i).get("hp")+"/"+friend.at(i).get("maxHp"),screen.realWidth/2*(i%2)+6,screen.realHeight/3*(i/2|0)+40);
							Canvas.menu.rect(screen.realWidth/2*(i%2)+2,screen.realHeight/3*(i/2|0)+2,screen.realWidth/2-4,screen.realHeight/3-4);
						}
						Canvas.menu.stroke();
						Canvas.menu.beginPath();
						break;
						
				}
			},
			show:function(target){
				//targetを表示する
				switch(target){
					case "map":
						frontMapStyle.display=mapStyle.display=villagerStyle.display="block";
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
						Canvas.chara.fillText("ver "+Model.get("info").get("version"), (Canvas.width-Canvas.chara.measureText("ver "+Model.get("info").get("version")).width)/2, 230);
						break;
					case "mes":
						break;
					case "battle":
						Canvas.battle.fillStyle="#fff";
						Canvas.battle.fillRect(0,0,screen.realWidth,screen.realHeight);
						break;
				}
				return view;
			},
			hide:function(target){
				//targetを消す
				switch(target){
					case "map":
						frontMapStyle.display=mapStyle.display=villagerStyle.display="none";
						break;
					case "charaScreen":
						Canvas.clear("chara");
						break;
					case "menu":
						Canvas.clear("menu");
						Model.get("cursor").set("y",0);
						break;
					case "title":
						Canvas.clear("chara");
						break;
					case "mes":
					case "battle":
					case "enemy":
						Canvas[target].clearRect(0,0,screen.realWidth,screen.realHeight);
						break;
				}
				return view;
			},
			paint:function(target,data,sx,sy,sw,sh,dx,dy){
				if(sw===undefined){
					//data,dx,dyを想定
					dx=sx;
					sx=0;
					sw=screen.chipSize;
					dy=sy;
					sy=0;
					sh=screen.chipSize;
				}
				//マップ1チップの描写
				Canvas[target].drawImage(preloadImages[data], sx, sy,sw,sh, dx*screen.chipSize, dy*screen.chipSize,screen.chipSize,screen.chipSize);
			},
			paintVillager:function(i){
				switch(villagers.at(i).get("direction")){
					case "front":view.paint("villager","villager/"+villagers.at(i).get("job"),32,0,32,32,villagers.at(i).get("x"),villagers.at(i).get("y"));break;
					case "left":view.paint("villager","villager/"+villagers.at(i).get("job"),32,32,32,32,villagers.at(i).get("x"),villagers.at(i).get("y"));break;
					case "right":view.paint("villager","villager/"+villagers.at(i).get("job"),32,64,32,32,villagers.at(i).get("x"),villagers.at(i).get("y"));break;
					case "back":view.paint("villager","villager/"+villagers.at(i).get("job"),32,96,32,32,villagers.at(i).get("x"),villagers.at(i).get("y"));break;
				}
			},
			clear:function(target,dx,dy,dw,dh){
				if(dw===undefined){
					dw=screen.chipSize;
					dh=screen.chipSize;
				}
				//マップ1チップの描写
				Canvas[target].clearRect(dx*screen.chipSize, dy*screen.chipSize,dw,dh);
			},
			textWidth:function(str){
				return Canvas.menu.measureText(str).width
			},
			write:function(target,key,x,y){
				Canvas[target].fillText(key,x||0,y||0);
			},
			keyAction:function(key){
				if(antiKeyAction){return;}
				switch(key){
					case "left":
					case "right":
					case "up":
					case "down":
						switch(situation){
							case "map":
								//マップ上で矢印キーが押されたから移動する
								if(!Model.get("isKeyPressed").get("d")){
									//dが押されていない時
									if(Model.get("chara").get("doesWalk")==0){
										//歩いていない時
										if(key!="up"&&key!="down") Model.get("chara").walk(key);
										else if(key=="up") Model.get("chara").walk("back");
										else if(key=="down") Model.get("chara").walk("front");
									}
								}else{
									//走っている
									if(Model.get("chara").get("doesWalk")<=1){
										if(key!="up"&&key!="down") Model.get("chara").run(key);
										else if(key=="up") Model.get("chara").run("back");
										else if(key=="down") Model.get("chara").run("front");
									}
								}
								break;
							case "menu":
							case "setting":
								if(Model.get("isKeyPressed").get(key)===1) Model.get("cursor").move(key);//押された瞬間だけ移動
								break;
							case "battle":
								if(Model.get("isKeyPressed").get(key)===1){
									//押された瞬間だけ移動
									Model.get("cursor").move(key,false);
									view.mes({message:">",x:-140+Model.get("cursor").get("x")*60,y:Model.get("cursor").get("y")*20,overwrite:true,move:true,dontWait:true});
								}
								break;
						}
						break;
					case "m":
						if(situation=="menu"){
							//メニュが開かれている時にMを押した
							App.log("map close.");
							switchMode("map");
						}
						else if(situation=="map"){
							//マップでMを押した
							App.log("map open.");
							switchMode("menu");
						}
						break;
					case "e":
						if(testMode&&situation!="battle") encount("test");
						break;
					case "space":
						switch(situation){
							case "map":
								if(Model.get("chara").get("doesWalk")==0){
									switchMode("talk");
									talk();
								}
								break;
							case "menu":
								switch(mainMenu[Model.get("cursor").get("y")].name){
									case "図鑑":
										Model.get("pokedex").view();
										view.mes({message:"未実装だよ!いまやってるよ!",doesSwitchMode:false});
										break;
									case "レポートに書く":
										//レポートに書く。つまりセーブする
										setCookie("save_data",JSON.stringify(U.map(Model.models,function(model){if(model.id=="chara"||model.id=="setting"||model.id=="info") return model.toJSON()})),60)
										view.mes("レポートを書きました。");
										break;
									case "設定":
										switchMode("setting");
										break;
									case "手持ちのポケモン":
										situation="friendPokemonView";
										break;
									case "アイテム":
										Canvas.menu.beginPath();
										Canvas.clear("menu");
										Canvas.menu.rect((screen.realWidth-setting.width)/2,(screen.realHeight-setting.height)/2,setting.width,setting.height);
										if(setting.nest==0) Canvas.menu.fillStyle="rgba(255,255,255,0.7)";
										else Canvas.menu.fillStyle="rgba(136,136,136,0.7)";
										Canvas.menu.fill();
										Canvas.menu.stroke();
										view.select({canvas:"menu",options:U.flatten([U.map(Model.get("chara").get("item"),function(a){return a.get("name")}),"戻る"]),x:(screen.realWidth-setting.width)/2+10,y:(screen.realHeight-setting.height)/2+20,color:"#000"});
										Canvas.menu.closePath();
										break;
									case "ゲームに戻る":
										App.log("return to game");
										switchMode("map");
										break;
									case "タイトル画面に戻る":
										App.log("return to title");
										switchMode("title");
										break;
									case "セーブデータを消す":
										view.mes({message:"本当に消しますか?",callback:function(){
											view.strokeMesBox();
											view.select({canvas:"mes",options:["はい","いいえ"],x:0,y:440,callback:function(option){
												if(option==0){//はいの時
													setCookie("save_data","",60)//クッキーバージョン
													view.mes("セーブデータを消しました。");
												}else if(option==1){//いいえの時
													view.mes("キャンセルしました。");
												}
											}})
										},doesSwitchMode:false});
										break;
									case "App":
										document.write("<pre>"+App.show()+"</pre>これを<a href=\"mailto:sc1enth@gmail.com?subject=Log&amp;body="+App.show().replace(/\n/g,"%0d%0a")+"\">sc1enth@gmail.com</a>へ送信してください。下のメールフォームからも可能です。その場合はお問い合わせ内容は上のログ(変な数字や英語の書いてある文字列)を貼り付けて、メールアドレスは書きたくない方は sc1enth@gmail.com にして送信ください(返信が必要な場合などは私が送信できるメールアドレスを入力ください)。<script src=\"http://form1.fc2.com/parts/index.php?id=725872\"></script><noscript><a href=\"http://form1.fc2.com/form/?id=725872\" target=\"_blank\">[FC2メールフォーム]</a></noscript>")
										break;
								}
								break;
							case "setting":
								if(setting.nest==0){
									switch(settingOption[Model.get("cursor").get("y")].name){
										case "音量":
										case "キャラ画像":
											setting.nest=1;
											setting.target=Model.get("cursor").get("y");
											Model.get("cursor").set("y",0);
											break;
										case "戻る":
											switchMode("menu");
											break;
									}
								}else if(setting.nest==1){
									switch(settingOption[setting.target].name){
										case "音量":
											switch(settingOption[setting.target].option[Model.get("cursor").get("y")]){
												case "0%":
												case "50%":
												case "100%":
													Model.get("setting").set("volume",Model.get("Func").parseInt(settingOption[setting.target].option[Model.get("cursor").get("y")]));
													break;
												case "戻る":
													setting.nest=0;
													Model.get("cursor").set("y",0);
													break;
											}
											break;
										case "キャラ画像":
											switch(settingOption[setting.target].option[Model.get("cursor").get("y")]){
												case "石山":
													Model.get("setting").set("charaImage","chara");
													break;
												case "まじめ":
													Model.get("setting").set("charaImage","chara1");
													break;
												case "戻る":
													setting.nest=0;
													Model.get("cursor").set("y",0);
													break;
											}
											break;
										case "戻る":
											switchMode("menu");
											break;
									}
								}
								break;
							case "title":
								switchMode("map");
								audio.play();
								break;
							case "talk":
								break;
							case "battle":
								battle({decide:true});
								break;
							case "friendPokemonView":
								switchMode("map");
								break;
						}
						break;
					case "leave left":
					case "leave right":
					case "leave up":
					case "leave down":
						Model.get("chara").resetRun();
						break;
				}
			},
			routine:function(){
				for(var key in Model.get("isKeyPressed").attributes){
					if(Model.get("isKeyPressed").attributes[key]>0){
						view.keyAction(key);
						Model.get("isKeyPressed").increment(key);
					}
				}
				switch(situation){
					case "title":
						view.display("title");
						break;
					case "map":
						view.display("map");
						view.display("chara");
						break;
					case "battle":
						view.display("battle");
						break;
					case "talk":
						view.display("map");
						view.display("chara");
						view.display("talk");
						break;
					case "menu":
						view.display("map");
						view.display("chara");
						view.display("menu");
						break;
					case "setting":
						view.display("map");
						view.display("chara");
						view.display("setting");
						break;
					case "friendPokemonView":
						view.display("friendPokemonView");
						break;
				}
			}
		});
		view=new Display();
		document.getElementById("frontMap").width=document.getElementById("map").width=document.getElementById("villager").width=Model.get("world").get("width")*screen.chipSize;
		document.getElementById("frontMap").height=document.getElementById("map").height=document.getElementById("villager").height=Model.get("world").get("height")*screen.chipSize;
		setTimeout(function(){
			App.log("map drawing start")
			for(var j=0;j<Model.get("world").get("height");j++){
				//マップの描写
				for(var i=0;i<Model.get("world").get("width");i++){
					if(Model.get("mapData").get(j)!==undefined&&Model.get("mapData").get(j)[i]!==undefined){
						var mapData=Model.get("mapData").get(j)[i];
						var mapImg=Model.get("mapAttr").get(mapData).img;
						view.paint("map",mapImg[2], mapImg[0], mapImg[1], screen.chipSize, screen.chipSize, i, j);
					}else view.paint("map",Model.get("mapAttr").get("-1").img,i*screen.chipSize,j*screen.chipSize);
					
					if(Model.get("frontMapData").get(j)!==undefined&&Model.get("frontMapData").get(j)[i]!==undefined){
						var mapData=Model.get("frontMapData").get(j)[i];
						var mapImg=Model.get("mapAttr").get(mapData).img;
						if(mapData!=0){
							view.paint("frontMap",mapImg[2], mapImg[0], mapImg[1], screen.chipSize, screen.chipSize, i, j);
						}
					}
				}
			}
			document.getElementById("screen").style.background="#000";//黒くする
			App.log("map drawing end")
		},100);
		
		
		move=function(dx,dy,doesMove,chara){
			//dx=xの移動量 dy=(略)
			chara=chara||Model.get("chara");
			var charax=chara.get("x"),charay=chara.get("y")
			if ((charax + dx <= Model.get("world").get("width") - 1 && charax + dx >= 0) && (charay + dy <= Model.get("world").get("height") - 1 && charay + dy >= 0) && (Model.get("mapAttr").get(Model.get("mapData").get(charay+dy)[charax+dx]).isNotBarrier && Model.get("mapAttr").get(Model.get("frontMapData").get(charay+dy)[charax+dx]).isNotBarrier && Model.get("Func").doesVillagerExist(charax+dx,charay+dy)==-1)) {
				if(doesMove){
					chara.incrementX(dx);
					chara.incrementY(dy);
				}
				doesEncount&&encount();
				return true;
			}
			return false;
		}
		var keyUp=function(e){
			App.log("keyUp "+e.keyCode)
			if(e.keyCode==32){e.preventDefault&&e.preventDefault();Model.get("isKeyPressed").set("space",0);}//space
			if(e.keyCode>=37&&e.keyCode<=40){
				e.preventDefault&&e.preventDefault();
				Model.get("isKeyPressed").set({"left":0,"up":0,"right":0,"down":0});
				if(e.keyCode==37) view.keyAction("leave left");//left
				if(e.keyCode==38) view.keyAction("leave up");//up
				if(e.keyCode==39) view.keyAction("leave right");//right
				if(e.keyCode==40) view.keyAction("leave down");//down
			}
			if(e.keyCode==77){e.preventDefault&&e.preventDefault();Model.get("isKeyPressed").set("m",0);}//M key
			if(e.keyCode==69){e.preventDefault&&e.preventDefault();Model.get("isKeyPressed").set("e",0);}//E key
			if(e.keyCode==68){e.preventDefault&&e.preventDefault();Model.get("isKeyPressed").set("d",0);}//D key
		}
		var keyDown=function(e){
			if(e.keyCode===undefined) return;
			App.log("keyDown "+e.keyCode)
			if(e.keyCode==32){
				e.preventDefault&&e.preventDefault();
				if(Model.get("isKeyPressed").get("space")==0){
					view.keyAction("space");
					Model.get("isKeyPressed").get("space",-1);
				}
			}//space
			if(e.keyCode>=37&&e.keyCode<=40){
				e.preventDefault&&e.preventDefault();
				Model.get("isKeyPressed").set({"left":0,"up":0,"right":0,"down":0});
				if(e.keyCode==37&&Model.get("isKeyPressed").get("left")===0){Model.get("isKeyPressed").increment("left");}//left
				else if(e.keyCode==38&&Model.get("isKeyPressed").get("up")===0){Model.get("isKeyPressed").increment("up");}//up
				else if(e.keyCode==39&&Model.get("isKeyPressed").get("right")===0){Model.get("isKeyPressed").increment("right");}//right
				else if(e.keyCode==40&&Model.get("isKeyPressed").get("down")===0){Model.get("isKeyPressed").increment("down");}//down
			}
			if(e.keyCode==68){e.preventDefault&&e.preventDefault();if(Model.get("isKeyPressed").get("d")===0){Model.get("isKeyPressed").increment("d");}}//D key
			if(e.keyCode==77){
				e.preventDefault&&e.preventDefault();
				if(Model.get("isKeyPressed").get("m")==0){
					if(!Model.get("isKeyPressed").get("m")){
						view.keyAction("m");
						Model.get("isKeyPressed").set("m",-1);
					}
				}
			}//M key
			if(e.keyCode==69&&testMode){
				e.preventDefault&&e.preventDefault();
				if(Model.get("isKeyPressed").get("e")==0){
					view.keyAction("e");
					Model.get("isKeyPressed").set("e",-1);
				}
			}//E key
		};
		window.addEventListener("keyup",keyUp,false);
		window.addEventListener("keydown",keyDown,false);
		var isEffectiveType=function(a,b){
			switch(a){
				case "":
				break;
			}
		}
		var padKey={"pad_space":32,"pad_left":37,"pad_up":38,"pad_right":39,"pad_down":40,"pad_D":68,"pad_M":77};
		if(isSmartPhone){
			App.log("smart phone")
			document.getElementById("pad").style.display="block";
			window.addEventListener("touchstart",function(e){
				keyDown({keyCode:padKey[e.target.id]});
			},false);
			window.addEventListener("touchend",function(e){
				keyUp({keyCode:padKey[e.target.id]});
			},false);
			window.addEventListener("touchmove",function(e){
				for(var i=0;i<e.targetTouches.length;i++){
					if(e.targetTouches[i].target.id!=e.target.id){
						keyUp({keyCode:padKey[e.target.id]});
						break;
					}
				}
			},false);
		}
		if(logMode){
			var logStart=new Date();
			setInterval(function(){
				if(logMode){
					var rePadKey={32:"space",37:"left",38:"up",39:"right",40:"down",68:"d",77:"m"};
					if((new Date())-logStart>logs[inc].time){
						if(logs[inc].type=="keyAction"){
							if(logs[inc].body.indexOf("keyDown")!=-1) keyDown({keyCode:parseInt(logs[inc].key)});
							if(logs[inc].body.indexOf("keyUp")!=-1) keyUp({keyCode:parseInt(logs[inc].key)});
						}
						inc++;
					}
				}
			},1)
		}
		setInterval(view.routine,IntervalTime);
		App.log("interval setted");
	}
},false)