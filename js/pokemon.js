var testMode=false,
doesEncount=true,
IntervalTime=50;
window.addEventListener("load",function(){
	// クッキー保存　setCookie(クッキー名, クッキーの値, クッキーの有効日数); //
	var isSmartPhone="ontouchstart" in window;
	function setCookie(c_name,value,expiredays){
		// pathの指定
		var path = location.pathname;
		// pathをフォルダ毎に指定する場合のIE対策
		var paths = new Array();
		paths = path.split("/");
		if(paths[paths.length-1] != ""){
			paths[paths.length-1] = "";
			path = paths.join("/");
		}
		// 有効期限の日付
		var extime = new Date().getTime();
		var cltime = new Date(extime + (60*60*24*1000*expiredays));
		var exdate = cltime.toUTCString();
		// クッキーに保存する文字列を生成
		var s="";
		s += c_name +"="+ escape(value);// 値はエンコードしておく
		s += "; path="+ path;
		if(expiredays){
			s += "; expires=" +exdate+"; ";
		}else{
			s += "; ";
		}
		// クッキーに保存
		document.cookie=s;
	}
	var mapStyle=document.getElementById("map").style,frontMapStyle=document.getElementById("frontMap").style;
	frontMapStyle.display="none";
	mapStyle.left=frontMapStyle.top=mapStyle.top=frontMapStyle.left=frontMapStyle.top=mapStyle.top="0px";//スムースウォーキングのためにmapを動かす時に必要な設定。
	var situation="title";
	var now=0;
	var Canvas={
		//Canvas関係
		chara		:document.getElementById("chara").getContext("2d"),
		map		:document.getElementById("map").getContext("2d"),
		frontMap	:document.getElementById("frontMap").getContext("2d"),
		battle		:document.getElementById("battle").getContext("2d"),
		menu		:document.getElementById("menu").getContext("2d"),
		enemy		:document.getElementById("enemy").getContext("2d"),
		shop		:document.getElementById("shop").getContext("2d"),
		mes			:document.getElementById("mes").getContext("2d"),
		width		:480,
		height		:480
	},screen={
		//見えている範囲の画面サイズ(ただしスムーズウォーキングのための画面外2マスを含む)とscreenの1マスのサイズ
		width:17,
		height:17,
		chipSize:32
	},
	livingMonster=[
		["アクサワー", "ボボヌザウルス", "ブベツ", "ブロロウ", "ビョロボロ", "ヂヴァザン", "ドドロノゴメス", "ドフ", "フォッド", "ごんざれす", "ハンシー", "ヘィローセ", "ヒネリ", "イパサスコ", "ジャネン", "コムシ", "コロゾウ", "マクジョウ", "マムー", "まさる", "ンバジョー", "ラストダンケ", "サイコ", "スサイミ", "テカイン", "チュパンディ", "ウラミ"],
		["アクサワー", "ボボヌザウルス", "ブベツ", "ブロロウ", "ビョロボロ", "ヂヴァザン", "ドドロノゴメス", "ドフ", "フォッド", "ごんざれす", "ハンシー", "ヘィローセ", "ヒネリ", "イパサスコ", "ジャネン", "コムシ", "コロゾウ", "マクジョウ", "マムー", "まさる", "ンバジョー", "ラストダンケ", "サイコ", "スサイミ", "テカイン", "チュパンディ", "ウラミ"]
	],
	antiKeyAction=false,
	encount=function(test){
		if(Model.get("mapAttr").get(Model.get("mapData").get(Model.get("chara").get("y"))[Model.get("chara").get("x")]).isEncountable){
			if(test=="test"||(Math.random()*30|0)==0){
				switchMode("battle");
				battle({start:true,monster:livingMonster[Model.get("mapData").get(Model.get("chara").get("y"))[Model.get("chara").get("x")]]});
			}
		}
	},
	battle=function(option){
		if(option.start){
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
		}
		if(option.decide){
			//選択肢を決定した時
			switch(Model.get("cursor").num()){
				case 0:
					//攻撃を選んだ時
					if(enemy.get("speed")<=friend.at(now).get("speed")){
						//自分の攻撃が先
						battle({attack:[enemy,friend.at(now),friend.at(now).get("technique")[Model.get("cursor").get("x")+Model.get("cursor").get("y")*2]],next:function(){battle({attack:[friend.at(now),enemy,enemy.get("technique")[Math.random()*4|0]]})}});//バトルが終わってるかもしれないから
					}else{
						battle({attack:[friend.at(now),enemy,enemy.get("technique")[Math.random()*4|0]],next:function(){if(situation=="battle")battle({attack:[enemy,friend.at(now),friend.at(now).get("technique")[Model.get("cursor").get("x")+Model.get("cursor").get("y")*2]]})}})
					}
					break;
				case 1:
					view.mes({message:"アイテム!"})
					break;
				case 2:
					view.mes({message:"交代!"})
					break;
				case 3:
					view.mes({message:"プレイヤーは逃げだした!"});
					if((Math.random()*(enemy.get("speed")-friend.at(now).get("speed"))|0)==1){
						setTimeout(function(){view.mes({message:"しかし逃げきれなかった!",callback:function(){battle({attack:[friend.at(now),enemy,enemy.get("technique")[Math.random()*4|0]]})}})},2);
					}
					else setTimeout(function(){view.mes({message:"逃げきれた!",callback:function(){switchMode("map");situation="map"}})},2);
					break;
			}
		}
		if(option.attack){
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

			view.mes({message: option.attack[1].get("name") + " の攻撃!"});
			console.log(option.attack[1].get("name") + " の攻撃!")
			if (option.attack[0].get("hp") <= 0){
				//倒した時
				setTimeout(function(){view.mes({message:option.attack[0].get("name") + " に" + (beforeHP-option.attack[0].get("hp")) + " のダメージ!"})},1);
				setTimeout(function(){view.mes({message: option.attack[0].get("name") + "を倒した!",callback:function(){
					battle({end:true});
				}})},2);
			}else{
				setTimeout(function(){view.mes({message:option.attack[0].get("name") + " に" + (beforeHP-option.attack[0].get("hp")) + " のダメージ!",callback:function(){option.next?option.next():battle({turnStart:true})}})},1);
			}
		}
		if(option.end){
			switchMode("map");
			situation="map";
		}
	},
	talk=function(){
		var dx=0,dy=0;
		switch(Model.get("chara").get("direction")){
			case "left":
				dx=-1;
				break;
			case "front":
				dy=1;
				break;
			case "right":
				dx=1;
				break;
			case "back":
				dy=-1;
				break;
		}
		var i=Model.get("Func").villagerDoesExist(Model.get("chara").get("x")+dx,Model.get("chara").get("y")+dy);
		if(i!=-1) villagers.at(i).talk();
		else if(Model.get("frontMapData").get(Model.get("chara").get("y")+dy)[Model.get("chara").get("x")+dx]==5&&Model.get("Func").villagerDoesExist(Model.get("chara").get("x")+dx*3,Model.get("chara").get("y")+dy*3)!=-1){
			//屋台の中のひとにはなしかけるとき
			villagers.at(Model.get("Func").villagerDoesExist(Model.get("chara").get("x")+dx*3,Model.get("chara").get("y")+dy*3)).talk();
		}else view.mes({message:"あやしいところは特になにもないようだ"});
	},
	talkTask=0,
	talking=false,
	menu={width:170,height:160},//メニュ画面の幅と高さ
	setting={width:200,height:250,nest:0},//セッティング画面の幅と高さ
	mainMenu=[{name:"メニュ"},{name:"レポートに書く"},{name:"設定"},{name:"手持ちのポケモン"},{name:"アイテム"},{name:"ゲームに戻る"},{name:"タイトル画面に戻る"}],
	settingOption=[{name:"戻る"}];//選択肢
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
	var preloadImages={"chara1/left":new Image(),"chara1/front":new Image(),"chara1/right":new Image(),"chara1/back":new Image(),"chara1/left_left":new Image(),"chara1/left_front":new Image(),"chara1/left_right":new Image(),"chara1/left_back":new Image(),"chara1/right_left":new Image(),"chara1/right_front":new Image(),"chara1/right_right":new Image(),"chara1/right_back":new Image(),"sand":new Image(),"grass":new Image(),"black":new Image(),"villager":new Image(),"farmer":new Image(),"blacksmith":new Image(),"butcher":new Image()}

	Canvas.map.drawImage(preloadImages["sand"],0,0)
	for(var key in preloadImages){
		preloadImages[key].src=key+".png";
	}
	preloadImages["map.png"]=new Image();
	preloadImages["map.png"].src="map/map.png";
	preloadImages["shops.gif"]=new Image();
	preloadImages["shops.gif"].src="map/shops.gif";
	var loadedImages=0;
	var imageLoad=function(){
		loadedImages++;
		if(loadedImages==preloadImages.Length){
			App.log("images loaded")
			main();
		}
	}
	var i=0;
	for(var key in preloadImages){
		preloadImages[key].onload=imageLoad;
		i++;
	}
	preloadImages.Length=i;
	function main(){
		App.log("main called")
		var Display=Backbone.View.extend({
			mes:(function(){
				var messages=[];
				var tasks=[];
				return function(option){
					//メッセージを表示する
					talkTask++;
					antiKeyAction=true;
					tasks.push(option);
					var wait=setInterval(function(){
					if(!talking||tasks[tasks.length-1].dontWait){
						option=tasks.shift();
						talking=true;
						talkTask--;
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
						if(option.dontWait){
							talking=false;
							antiKeyAction=false;
							option.callback&&option.callback();
						}else{
							var mesKeyDown=function(e){
								e.preventDefault&&e.preventDefault();
								if(e.keyCode==32){
									talking=false;
									window.removeEventListener("keydown",mesKeyDown,false);
									for(var i=0;i<padKey.length;i++){
										document.getElementById("pad_"+padKey[i][0]).removeEventListener("touchstart",mesTouch[i],false);
									}
									option.callback&&option.callback();
									if(talkTask==0){
										antiKeyAction=false;
										view.hide("mes");
										switchMode("map");
									}
								}
							}
							var mesTouch=[];
							window.addEventListener("keydown",mesKeyDown,false);
							for(var i=0;i<padKey.length;i++){
								mesTouch.push((function(i){
									return function(e){
										e.preventDefault();
										mesKeyDown({keyCode:padKey[i][1]});
									}
								})(i))
								document.getElementById("pad_"+padKey[i][0]).addEventListener("touchstart",mesTouch[i],false)
							}
						}
						clearInterval(wait)
					}
					},20)
				}
			})(),
			mapImageAdd:function(url,x,y){
				//マップのdiv要素のbackgroundImageのurlをたす。
				Canvas.chara.drawImage(preloadImages[url],x*screen.chipSize,y*screen.chipSize);
			},
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
						Canvas.menu.clearRect(0,0,Canvas.width,Canvas.height);
						Canvas.menu.rect((screen.realWidth-setting.width)/2,(screen.realHeight-setting.height)/2,setting.width,setting.height);
						if(setting.nest==0) Canvas.menu.fillStyle="rgba(255,255,255,0.7)";
						else Canvas.menu.fillStyle="rgba(136,136,136,0.7)";
						Canvas.menu.fill();
						Canvas.menu.stroke();
						Canvas.menu.fillStyle="#000";
						if(setting.nest==0) Canvas.menu.fillText(">",Model.get("cursor").get("x")+(screen.realWidth-setting.width)/2+2+10,Model.get("cursor").get("y")*20+(screen.realHeight-setting.height)/2+20);
						var cursorWidth=Canvas.menu.measureText("> ").width;
						for(var i=0,j=settingOption.length;i<j;i++){
							Canvas.menu.fillText(settingOption[i].name,(screen.realWidth-setting.width)/2+cursorWidth+10,i*20+(screen.realHeight-setting.height)/2+20);
						}
						Canvas.menu.closePath();
						if(setting.nest>0){
							Canvas.menu.beginPath();
							Canvas.menu.rect((screen.realWidth-setting.width+40)/2+20,(screen.realHeight-setting.height)/2,setting.width-40,setting.height);
							Canvas.menu.fillStyle="rgba(255,255,255,0.7)";
							Canvas.menu.fill();
							Canvas.menu.stroke();
							Canvas.menu.fillStyle="#000";
							Canvas.menu.fillText(">",Model.get("cursor").get("x")+(screen.realWidth-setting.width+40)/2+22,Model.get("cursor").get("y")*20+(screen.realHeight-setting.height)/2+20);
							var cursorWidth=Canvas.menu.measureText("> ").width;
							for(var i=0,j=settingOption[setting.target].option.length;i<j;i++){
								Canvas.menu.fillText(settingOption[setting.target].option[i],(screen.realWidth-setting.width+40)/2+cursorWidth+20,i*20+(screen.realHeight-setting.height)/2+20);
							}
							Canvas.menu.closePath();
						}
					case "chara":
						view.hide("title")
						for(var i=0,j=villagers.length;i<j;i++){
		//					view.mapPaint(villagers.at(i).get("job"),villagers.at(i).get("x"),villagers.at(i).get("y"));//職業ごとに違う絵柄の予定。今はテストなので下の方
							if(!villagers.at(i).get("isPainted")){
								view.mapPaint("villager",villagers.at(i).get("x"),villagers.at(i).get("y"));
								villagers.at(i).set("isPainted",true)
							}
							if(villagers.at(i).get("move")&&(Math.random()*10|0)==0){
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
								view.mapPaint("villager",villagers.at(i).get("x"),villagers.at(i).get("y"));
							}
						}
						//キャラの表示。
						if(Model.get("chara").get("doesWalk")!=0){
							if(Model.get("chara").get("doesRun")!=0) Model.get("chara").incrementWalk(2);
							else Model.get("chara").incrementWalk();
						}
						if(Model.get("chara").get("doesRun")>0){
							Model.get("chara").incrementRun();
							switch(Model.get("chara").get("doesRun")%4){
								case 0:
								case 1:
									view.mapImageAdd("chara1/left_"+Model.get("chara").get("direction"),screen.width/2|0,screen.height/2|0);
									 break;
								case 2:
								case 3:
									view.mapImageAdd("chara1/right_"+Model.get("chara").get("direction"),screen.width/2|0,screen.height/2|0);
									break;
							}
						}else{
							switch(Model.get("chara").get("doesWalk")){
								case 0:case 2:case 3:
									view.mapImageAdd("chara1/"+Model.get("chara").get("direction"),screen.width/2|0,screen.height/2|0);
									break;
								case 4:case 5:
									view.mapImageAdd("chara1/left_"+Model.get("chara").get("direction"),screen.width/2|0,screen.height/2|0);
									break;
								case 6:case 7:
									view.mapImageAdd("chara1/right_"+Model.get("chara").get("direction"),screen.width/2|0,screen.height/2|0);
									break;
							}
						}
						frontMapStyle.left=mapStyle.left=-(Model.get("chara").get("x")-(screen.width/2|0))*screen.chipSize+"px";
						frontMapStyle.top=mapStyle.top=frontMapStyle.top=mapStyle.top=-(Model.get("chara").get("y")-(screen.height/2|0))*screen.chipSize+"px";
						if(Model.get("chara").get("doesRun")==0){
							switch(Model.get("chara").get("direction")){
								case "left":frontMapStyle.left=mapStyle.left=parseInt(mapStyle.left,10)+screen.chipSize/8*Model.get("chara").get("doesWalk")+"px";break;
								case "front":frontMapStyle.top=mapStyle.top=parseInt(mapStyle.top,10)-screen.chipSize/8*Model.get("chara").get("doesWalk")+"px";break;
								case "right":frontMapStyle.left=mapStyle.left=parseInt(mapStyle.left,10)-screen.chipSize/8*Model.get("chara").get("doesWalk")+"px";break;
								case "back":frontMapStyle.top=mapStyle.top=parseInt(mapStyle.top,10)+screen.chipSize/8*Model.get("chara").get("doesWalk")+"px";break;
							}
						}else{
							switch(Model.get("chara").get("direction")){
								case "left":frontMapStyle.left=mapStyle.left=parseInt(mapStyle.left,10)+screen.chipSize/4*(Model.get("chara").get("doesRun")%4)+"px";break;
								case "front":frontMapStyle.top=mapStyle.top=parseInt(mapStyle.top,10)-screen.chipSize/4*(Model.get("chara").get("doesRun")%4)+"px";break;
								case "right":frontMapStyle.left=mapStyle.left=parseInt(mapStyle.left,10)-screen.chipSize/4*(Model.get("chara").get("doesRun")%4)+"px";break;
								case "back":frontMapStyle.top=mapStyle.top=parseInt(mapStyle.top,10)+screen.chipSize/4*(Model.get("chara").get("doesRun")%4)+"px";break;
							}
						}
						if(Model.get("chara").get("doesWalk")>=7||Model.get("chara").get("doesWalk")>=4&&Model.get("chara").get("doesRun")!=0){
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
						view.hide("title").show("enemy");
						Canvas.battle.fillStyle="#fff";
						Canvas.battle.fillRect(0,0,screen.realWidth,screen.realHeight);
						break;
					case "talk":
						view.hide("title")
						break;
					case "menu":
						view.hide("title");
						Model.get("cursor").set("maxX",0);
						Model.get("cursor").set("maxY",mainMenu.length-2);
						Canvas.menu.beginPath();
						Canvas.menu.clearRect(0,0,Canvas.width,Canvas.height);
						Canvas.menu.rect((screen.realWidth-menu.width)/2,(screen.realHeight-menu.height)/2,menu.width,menu.height);
						Canvas.menu.fillStyle="rgba(255,255,255,0.7)";
						Canvas.menu.fill();
						Canvas.menu.stroke();
						Canvas.menu.fillStyle="#000";
						Canvas.menu.fillText(">",Model.get("cursor").get("x")+(screen.realWidth-menu.width)/2+2+10,Model.get("cursor").get("y")*20+(screen.realHeight-menu.height)/2+20+20);
						var cursorWidth=Canvas.menu.measureText("> ").width;
						for(var i=0,j=mainMenu.length;i<j;i++){
							Canvas.menu.fillText(mainMenu[i].name,(screen.realWidth-menu.width)/2+cursorWidth+10,i*20+(screen.realHeight-menu.height)/2+20);
						}
						Canvas.menu.closePath();
						break;
				}
			},
			show:function(target){
				//targetを表示する
				switch(target){
					case "map":
						frontMapStyle.display="block";
						mapStyle.display="block";
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
					case "battle":
						Canvas.battle.clearRect(0,0,screen.realWidth,screen.realHeight);
						break;
					case "enemy":
						if(isSmartPhone) Canvas.enemy.drawImage(enemy.get("img"),(screen.realWidth-200)/2,0,200,200);
						else Canvas.enemy.drawImage(enemy.get("img"),(screen.realWidth-320)/2,0,320,320);
						break;
				}
				return view;
			},
			hide:function(target){
				//targetを消す
				switch(target){
					case "map":
						frontMapStyle.display="none";
						mapStyle.display="none";
						break;
					case "charaScreen":
						break;
					case "menu":
						Canvas.menu.clearRect(0,0,Canvas.width,Canvas.height);
						Model.get("cursor").set("y",0);
						break;
					case "title":
						break;
					case "mes":
					case "battle":
					case "enemy":
						Canvas[target].clearRect(0,0,screen.realWidth,screen.realHeight);
						break;
				}
				return view;
			},
			mapPaint:function(data,sx,sy,sw,sh,dx,dy){
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
				Canvas.map.drawImage(preloadImages[data], sx, sy,sw,sh, dx*screen.chipSize, dy*screen.chipSize,screen.chipSize,screen.chipSize);
			},
			frontMapPaint:function(data,sx,sy,sw,sh,dx,dy){
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
				Canvas.frontMap.drawImage(preloadImages[data], sx, sy,sw,sh, dx*screen.chipSize, dy*screen.chipSize,screen.chipSize,screen.chipSize);
			},
			textWidth:function(str){
				return Canvas.menu.measureText(str).width
			},
			clear:function(canvas){
				Canvas[canvas].clearRect(0,0,Canvas.width,Canvas.height);
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
								if(!Model.get("isKeyPressed").get("d")){
									if(Model.get("chara").get("doesWalk")==0){
										if(key!="up"&&key!="down") Model.get("chara").walk(key);
										else if(key=="up") Model.get("chara").walk("back");
										else if(key=="down") Model.get("chara").walk("front");
									}
								}else{
									if(Model.get("chara").get("doesWalk")<=1){
										if(key!="up"&&key!="down") Model.get("chara").run(key);
										else if(key=="up") Model.get("chara").run("back");
										else if(key=="down") Model.get("chara").run("front");
									}
								}
								break;
							case "menu":
							case "setting":
								if(Model.get("isKeyPressed").get(key)===1) Model.get("cursor").move(key);
								break;
							case "battle":
								if(Model.get("isKeyPressed").get(key)===1){
									Model.get("cursor").move(key,false);
									view.mes({message:">",x:-140+Model.get("cursor").get("x")*60,y:Model.get("cursor").get("y")*20,overwrite:true,move:true,dontWait:true});
								}
								break;
						}
						break;
					case "m":
						if(situation=="menu") switchMode("map");
						else if(situation=="map") switchMode("menu");
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
									setTimeout(function(){
										talking=true;
									},21)
								}
								break;
							case "menu":
								switch(mainMenu[Model.get("cursor").get("y")+1].name){
									case "レポートに書く":
										//レポートに書く
										setCookie("save_data",JSON.stringify(_.map(Model.models,function(model){if(model.id!="mapData"&&model.id!="frontMapData") return model.toJSON()})),60)//クッキーバージョン
										view.mes({message:"レポートを書きました。"});
										break;
									case "設定":
										switchMode("setting");
										break;
									case "手持ちのポケモン":case "アイテム":
										break;
									case "ゲームに戻る":
										switchMode("map");
										break;
									case "タイトル画面に戻る":
										switchMode("title");
										break;
								}
								break;
							case "setting":
								if(setting.nest==0){
									switch(settingOption[Model.get("cursor").get("y")].name){
										case "戻る":
											switchMode("menu");
											break;
									}
								}else if(setting.nest==1){
									switch(settingOption[setting.target].name){
										case "戻る":
											switchMode("menu");
											break;
									}
								}
								break;
							case "title":
								switchMode("map");
								break;
							case "talk":
								break;
							case "battle":
								battle({decide:true});
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
				view.clear("chara")
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
				}
			}
		});
		var switchMode=(function(){
			var nowScene=situation;
			return function(scene){
				switch(nowScene){
					//切り替えでOFFにする方
					case "menu":
						view.hide("map").hide("charaScreen").hide("menu")
						break;
					case "talk":
						view.hide("map").hide("charaScreen").hide("mes")
						break;
					case "map":
						view.hide("map").hide("charaScreen")
						break;
					case "title":
						view.hide("title")
						break;
					case "battle":
						view.hide("mes").hide("battle").hide("enemy")
						break;
					case "setting":
						view.hide("menu");
						break;
				}
				switch(scene){
					case "menu":
						situation="menu";
						view.show("map").show("charaScreen").show("menu");
						break;
					case "talk":
						situation="talk";
						view.show("map").show("charaScreen").show("mes")
						break;
					case "map":
						situation="map";
						view.display("chara");
						view.show("map").show("charaScreen")
						break;
					case "title":
						situation="title";
						view.show("title")
						break;
					case "battle":
						situation="battle";
						view.show("mes").show("battle");
						break;
					case "setting":
						situation="setting";
						view.show("map").show("charaScreen").show("menu");
				}
				nowScene=scene
			}
		})()
	/*	var Audio=Backbone.View.extend({
			el:"<audio src=\"music/C.W.R.mp3\" id=\"BGM\" controls autoplay><p>音声を再生するには、audioタグをサポートしたブラウザが必要です。</p></audio>",
			play:function(){
	//			document.getElementById("BGM").play()
			}
		});
		Audio=new Audio()
		document.getElementById("audio").innerHTML=Audio.el;
		Audio.play()*/
		view=new Display();
		document.getElementById("frontMap").width=document.getElementById("map").width=Model.get("world").get("width")*screen.chipSize;
		document.getElementById("frontMap").height=document.getElementById("map").height=Model.get("world").get("height")*screen.chipSize;
		setTimeout(function(){
			App.log("map drawing start")
			for(var j=0;j<Model.get("world").get("height");j++){
				//マップの描写
				for(var i=0;i<Model.get("world").get("width");i++){
					if(Model.get("mapData").get(j)!==undefined&&Model.get("mapData").get(j)[i]!==undefined){
						var mapData=Model.get("mapData").get(j)[i];
						var mapImg=Model.get("mapAttr").get(mapData).img;
						view.mapPaint(mapImg[2], mapImg[0], mapImg[1], 16, 16, i, j);
					}else view.mapPaint(Model.get("mapAttr").get("-1").img,i*screen.chipSize,j*screen.chipSize);
					
					if(Model.get("frontMapData").get(j)!==undefined&&Model.get("frontMapData").get(j)[i]!==undefined){
						var mapData=Model.get("frontMapData").get(j)[i];
						var mapImg=Model.get("mapAttr").get(mapData).img;
						if(mapData!=0){
							console.log(Model.get("frontMapData").get(j)[i])
							view.frontMapPaint(mapImg[2], mapImg[0], mapImg[1], 16, 16, i, j);
						}
					}
				}
			}
			document.getElementById("screen").style.background="#000";//黒くする
			App.log("map drawing end")
		},100);
		
		
		move=function(dx,dy,doesMove,chara){
			//dx=xの移動量 dy=(略)
			chara=chara||"chara";
			var charax=Model.get("chara").get("x"),charay=Model.get("chara").get("y")
			if (charax + dx<= Model.get("world").get("width")-1 && charax + dx >= 0 && charay + dy <= Model.get("world").get("height")-1 && charay + dy >= 0 && Model.get("mapAttr").get(Model.get("mapData").get(charay+dy)[charax+dx]).isNotBarrier&& Model.get("mapAttr").get(Model.get("frontMapData").get(charay+dy)[charax+dx]).isNotBarrier&&Model.get("Func").villagerDoesExist(charax+dx,charay+dy)==-1) {
				if(doesMove){
					Model.get("chara").incrementX(dx);
					Model.get("chara").incrementY(dy);
				}
				doesEncount&&encount();
				return true;
			}
			return false;
		}
		var keyUp=function(e){
			if(e.keyCode==32){e.preventDefault&&e.preventDefault();Model.get("isKeyPressed").set("space",0);}//space
			if(e.keyCode==37){e.preventDefault&&e.preventDefault();Model.get("isKeyPressed").set("left",0);view.keyAction("leave left");}//left
			if(e.keyCode==38){e.preventDefault&&e.preventDefault();Model.get("isKeyPressed").set("up",0);view.keyAction("leave up");}//up
			if(e.keyCode==39){e.preventDefault&&e.preventDefault();Model.get("isKeyPressed").set("right",0);view.keyAction("leave right");}//right
			if(e.keyCode==40){e.preventDefault&&e.preventDefault();Model.get("isKeyPressed").set("down",0);view.keyAction("leave down");}//down
			if(e.keyCode==77){e.preventDefault&&e.preventDefault();Model.get("isKeyPressed").set("m",0);}//M key
			if(e.keyCode==69){e.preventDefault&&e.preventDefault();Model.get("isKeyPressed").set("e",0);}//E key
			if(e.keyCode==68){e.preventDefault&&e.preventDefault();Model.get("isKeyPressed").set("d",0);}//D key
		}
		var keyDown=function(e){
			if(e.keyCode==32){
				e.preventDefault&&e.preventDefault();
				if(Model.get("isKeyPressed").get("space")==0){
					view.keyAction("space");
					Model.get("isKeyPressed").get("space",-1);
				}
			}//space
			if(e.keyCode==37){e.preventDefault&&e.preventDefault();if(Model.get("isKeyPressed").get("left")===0){Model.get("isKeyPressed").increment("left");}}//left
			if(e.keyCode==38){e.preventDefault&&e.preventDefault();if(Model.get("isKeyPressed").get("up")===0){Model.get("isKeyPressed").increment("up");}}//up
			if(e.keyCode==39){e.preventDefault&&e.preventDefault();if(Model.get("isKeyPressed").get("right")===0){Model.get("isKeyPressed").increment("right");}}//right
			if(e.keyCode==40){e.preventDefault&&e.preventDefault();if(Model.get("isKeyPressed").get("down")===0){Model.get("isKeyPressed").increment("down");}}//down
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
		var padKey=[["space",32],["left",37],["up",38],["right",39],["down",40],["D",68],["M",77]];
		if(isSmartPhone){
			App.log("smart phone")
			document.getElementById("pad").style.display="block";
			for(var i=0;i<padKey.length;i++){
				document.getElementById("pad_"+padKey[i][0]).addEventListener("touchstart",(function(i){
					return function(e){
						e.preventDefault();
						keyDown({keyCode:padKey[i][1]});
					}
				})(i),false)
				document.getElementById("pad_"+padKey[i][0]).addEventListener("touchend",(function(i){
					return function(e){
						e.preventDefault();
						keyUp({keyCode:padKey[i][1]});
					}
				})(i),false)
			}
		}
		setInterval(view.routine,IntervalTime);
		App.log("interval setted");
	}
},false)