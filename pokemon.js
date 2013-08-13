var testMode=true,
doesEncount=false,
IntervalTime=50;
window.addEventListener("load",function(){
	var situation="title";
	var livingMonster=[
		["まさる","ドドロノゴメス","アクサワー","ヂヴァザン","ブロロウ","ヘィローセ","ビョロボロ","ボボヌザウルス","イパサスコ","チュパンディ","スサイミ","ハンシー","サイコ","ジャネン","コムシ","ンバジョー","ヒネリ"],
		["まさる","ドドロノゴメス","アクサワー","ヂヴァザン","ブロロウ","ヘィローセ","ビョロボロ","ボボヌザウルス","イパサスコ","チュパンディ","スサイミ","ハンシー","サイコ","ジャネン","コムシ","ンバジョー","ヒネリ"]
	];
	move=function(dx,dy,doesMove,chara){
		//dx=xの移動量 dy=(略)
		chara=chara||"chara";
		if (Base[chara].x + dx<= display.world.width-1 && Base[chara].x + dx >= 0 && Base[chara].y + dy <= display.world.height-1 && Base[chara].y + dy >= 0 && Base.mapAttr[Base.mapData[Base[chara].y+dy][Base[chara].x+dx]].isNotBarrier&&Base.villager.doesExist(Base[chara].x+dx,Base[chara].y+dy)) {
			if(doesMove){
				Base[chara].x += dx;
				Base[chara].y += dy;
			}
			doesEncount&&encount();
			return true;
		}
		return false;
	}
	var encount=function(test){
		if(Base.mapAttr[Base.mapData[Base.chara.y][Base.chara.x]].isEncountable){
			if(test=="test"||(Math.random()*30|0)==0){
				switchMode("battle");
				battle({start:true,monster:livingMonster[Base.mapData[Base.chara.y][Base.chara.x]]});
			}
		}
	},
	battle=function(option){
		if(option.start){
			//バトルをスタートする時
			Base.cursor.maxX=1;
			Base.cursor.maxY=1;
			Base.cursor.x=Base.cursor.y=0;
			Base.enemy=new POKEMON(option.monster[Math.random()*option.monster.length|0]);
			Base.enemy.img=new Image();
			Base.enemy.img.src=Base.enemy.src;
			display.mes({message:Base.enemy.name+" が現れた!どうする?"});
			display.mes({message:"戦う",x:-120,overwrite:true});
			display.mes({message:"アイテム",x:-60,overwrite:true});
			display.mes({message:"ポケモン",x:-120,y:20,overwrite:true});
			display.mes({message:"逃げる",x:-60,y:20,overwrite:true});
			display.mes({message:">",x:-140+Base.cursor.x*60,y:Base.cursor.y*20,overwrite:true,move:true});
		}
		if(option.decide){
			//選択肢を決定した時
			switch(Base.cursor.num()){
				case 0:
					display.mes({message:Base.friend[0].name+" の攻撃!"+Base.enemy.name+" に"+Base.friend[0].attack+" のダメージ!"})
					break;
				case 1:
					display.mes({message:"アイテム!"})
					break;
				case 2:
					display.mes({message:"交代!"})
					break;
				case 3:
					display.mes({message:"逃げる!"})
					break;
			}
		}
	},
	switchMode=(function(){
		var nowScene=situation;
		return function(scene){
			switch(nowScene){
				//切り替えでOFFにする方
				case "menu":
					display.hide("screen").hide("charaScreen").hide("menu")
					break;
				case "talk":
					display.hide("screen").hide("charaScreen").hide("mes")
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
					display.show("screen").show("charaScreen").show("menu");
					break;
				case "talk":
					situation="talk";
					display.show("screen").show("charaScreen")
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
					display.show("mes");
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
				switch(situation){
					case "map":
						if(!Base.isKeyPressed["d"]){
							if(Base.chara.doesWalk==0&&key!="up"&&key!="down") Base.chara.walk(key);
							else if(Base.chara.doesWalk==0&&key=="up") Base.chara.walk("back");
							else if(Base.chara.doesWalk==0&&key=="down") Base.chara.walk("front");
						}else{
							if(Base.chara.doesWalk<=1&&key!="up"&&key!="down") Base.chara.run(key);
							else if(Base.chara.doesWalk<=1&&key=="up") Base.chara.run("back");
							else if(Base.chara.doesWalk<=1&&key=="down") Base.chara.run("front");
						}
						break;
				case "menu":
					if(Base.isKeyPressed[key]===1) Base.cursor.move(key)
					break;
				case "battle":
					if(Base.isKeyPressed[key]===1){
						Base.cursor.move(key,false);
						display.mes({message:">",x:-140+Base.cursor.x*60,y:Base.cursor.y*20,overwrite:true,move:true});
					}
					break;
				}
				break;
			case "m":
				if(situation=="menu") switchMode("map");
				else switchMode("menu");
				break;
			case "e":
				if(testMode&&situation!="battle") encount("test");
				break;
			case "space":
				switch(situation){
					case "map":
						if(Base.chara.doesWalk==0){
							switchMode("talk");
							display.mes({message:"たからばこをぱっけんした。"});
						}
						break;
					case "menu":
						switch(Base.cursor.y){
							case 0:
								//レポートに書く
								display.mes({message:"レポートを書きますか?"});
								break;
							case 1:
							case 2:
							case 3://ゲームに戻る
								switchMode("map");
								break;
							case 4://タイトル画面に戻る
								switchMode("title");
								break;
						}
						break;
					case "title":
						switchMode("map");
						break;
					case "talk":
						switchMode("map");
						console.log("ok");
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
				Base.chara.doesRun=0;
				break;
		}
	};
	window.onkeyup=function(e){
		if(e.keyCode==32){Base.isKeyPressed["space"]=0;return false;}//space
		if(e.keyCode==37){Base.isKeyPressed["left"]=0;keyAction("leave left");return false;}//left
		if(e.keyCode==38){Base.isKeyPressed["up"]=0;keyAction("leave up");return false;}//up
		if(e.keyCode==39){Base.isKeyPressed["right"]=0;keyAction("leave right");return false;}//right
		if(e.keyCode==40){Base.isKeyPressed["down"]=0;keyAction("leave down");return false;}//down
		if(e.keyCode==77){Base.isKeyPressed["m"]=0;return false;}//M key
		if(e.keyCode==69){Base.isKeyPressed["e"]=0;return false;}//E key
		if(e.keyCode==68){Base.isKeyPressed["d"]=0;return false;}//D key
	};
	window.onkeydown=function(e){
		if(e.keyCode==32){
			if(Base.isKeyPressed["space"]==0){
				keyAction("space");
				Base.isKeyPressed["space"]=1;
			}
			return false;
		}//space
		if(e.keyCode==37){if(Base.isKeyPressed["left"]===0){Base.isKeyPressed["left"]+=1;}return false;}//left
		if(e.keyCode==38){if(Base.isKeyPressed["up"]===0){Base.isKeyPressed["up"]+=1;}return false;}//up
		if(e.keyCode==39){if(Base.isKeyPressed["right"]===0){Base.isKeyPressed["right"]+=1;}return false;}//right
		if(e.keyCode==40){if(Base.isKeyPressed["down"]===0){Base.isKeyPressed["down"]+=1;}return false;}//down
		if(e.keyCode==68){if(Base.isKeyPressed["d"]===0){Base.isKeyPressed["d"]+=1;}return false;}//D key
		if(e.keyCode==77){
			if(Base.isKeyPressed["m"]==0){
				if(!Base.isKeyPressed["m"]){
					keyAction("m");
					Base.isKeyPressed["m"]=1;
				}
			}
			return false;
		}//M key
		if(e.keyCode==69&&testMode){
			if(Base.isKeyPressed["e"]==0){
				keyAction("e");
				Base.isKeyPressed["e"]=1;
			}
		}//E key
	};
	var padKey=[["space",32],["left",37],["up",38],["right",39],["down",40],["D",68],["M",77]];
	if("ontouchstart" in window){
		document.getElementById("pad").style.display="block";
		for(var i=0;i<padKey.length;i++){
			document.getElementById("pad_"+padKey[i][0]).ontouchstart=(function(i){
				return function(){window.onkeydown({keyCode:padKey[i][1]})}
			})(i)
			document.getElementById("pad_"+padKey[i][0]).ontouchend=(function(i){
				return function(){window.onkeyup({keyCode:padKey[i][1]})}
			})(i)
		}
	}
	setInterval(function(){
		display.clear("chara")
		for(var key in Base.isKeyPressed){
			if(Base.isKeyPressed[key]!==0&&key!="m"&&key!="space"&&key!="e"){
				keyAction(key);
				Base.isKeyPressed[key]++;
			}
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
				display("map");
				display("chara");
				display("menu");
				break;
		}
	},IntervalTime);
},false)