var testMode=true,
doesEncount=false,
IntervalTime=50;
onloadEvent.add(function(){
	var situation="title";
	var livingMonster=[
		["まさる","ドドロノゴメス","アクサワー","ヂヴァザン","ブロロウ","ヘィローセ","ビョロボロ","ボボヌザウルス","イパサスコ","チュパンディ","スサイミ","ハンシー","サイコ","ジャネン","コムシ","ンバジョー","ヒネリ"],
		["まさる","ドドロノゴメス","アクサワー","ヂヴァザン","ブロロウ","ヘィローセ","ビョロボロ","ボボヌザウルス","イパサスコ","チュパンディ","スサイミ","ハンシー","サイコ","ジャネン","コムシ","ンバジョー","ヒネリ"]
	];
	move=function(dx,dy,doesMove,chara){
		//dx=xの移動量 dy=(略)
		chara=chara||"chara";
		if (Model[chara].x + dx<= Model.get("$1").width-1 && Model[chara].x + dx >= 0 && Model[chara].y + dy <= Model.get("$1").height-1 && Model[chara].y + dy >= 0 && Model.get("$1")[Model.get("$1")[Model[chara].y+dy][Model[chara].x+dx]].isNotBarrier&&Model.get("Func").villagerDoesExist(Model[chara].x+dx,Model[chara].y+dy)) {
			if(doesMove){
				Model[chara].x += dx;
				Model[chara].y += dy;
			}
			doesEncount&&encount();
			return true;
		}
		return false;
	}
	var encount=function(test){
		if(Model.get("$1")[Model.get("$1")[Model.get("chara").y][Model.get("chara").x]]..isEncountable){
			if(test=="test"||(Math.random()*30|0)==0){
				switchMode("battle");
				battle({start:true,monster:livingMonster[Model.get("$1")[Model.get("chara").y][Model.get("chara").x]]});
			}
		}
	},
	battle=function(option){
		if(option.start){
			//バトルをスタートする時
			Model.get("$1").maxX=1;
			Model.get("$1").maxY=1;
			Model.get("$1").x=Model.get("$1").y=0;
			Model.enemy=new Pokemon(option.monster[Math.random()*option.monster.length|0]);
			Model.enemy.img=new Image();
			Model.enemy.img.src=Model.enemy.src;
			view.mes({message:Model.enemy.name+" が現れた!どうする?"});
			view.mes({message:"戦う",x:-120,overwrite:true});
			view.mes({message:"アイテム",x:-60,overwrite:true});
			view.mes({message:"ポケモン",x:-120,y:20,overwrite:true});
			view.mes({message:"逃げる",x:-60,y:20,overwrite:true});
			view.mes({message:">",x:-140+Model.get("$1").x*60,y:Model.get("$1").y*20,overwrite:true,move:true});
		}
		if(option.decide){
			//選択肢を決定した時
			switch(Model.get("$1").num()){
				case 0:
					view.mes({message:Model.friend[0].name+" の攻撃!"+Model.enemy.name+" に"+Model.friend[0].attack+" のダメージ!"})
					break;
				case 1:
					view.mes({message:"アイテム!"})
					break;
				case 2:
					view.mes({message:"交代!"})
					break;
				case 3:
					view.mes({message:"逃げる!"})
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
					view.hide("screen").hide("charaScreen").hide("menu")
					break;
				case "talk":
					view.hide("screen").hide("charaScreen").hide("mes")
					break;
				case "map":
					view.hide("screen").hide("charaScreen")
					break;
				case "title":
					view.hide("title")
					break;
				case "battle":
					view.hide("mes")
					break;
			}
			switch(scene){
				case "menu":
					situation="menu";
					view.show("screen").show("charaScreen").show("menu");
					break;
				case "talk":
					situation="talk";
					view.show("screen").show("charaScreen")
					break;
				case "map":
					situation="map";
					view.show("screen").show("charaScreen")
					break;
				case "title":
					situation="title";
					view.show("title")
					break;
				case "battle":
					situation="battle";
					view.show("mes");
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
						if(!Model.get("$1")["d"]){
							if(Model.get("chara").doesWalk==0&&key!="up"&&key!="down") Model.get("chara").walk(key);
							else if(Model.get("chara").doesWalk==0&&key=="up") Model.get("chara").walk("back");
							else if(Model.get("chara").doesWalk==0&&key=="down") Model.get("chara").walk("front");
						}else{
							if(Model.get("chara").doesWalk<=1&&key!="up"&&key!="down") Model.get("chara").run(key);
							else if(Model.get("chara").doesWalk<=1&&key=="up") Model.get("chara").run("back");
							else if(Model.get("chara").doesWalk<=1&&key=="down") Model.get("chara").run("front");
						}
						break;
				case "menu":
					if(Model.get("$1")[key]===1) Model.get("$1").move(key)
					break;
				case "battle":
					if(Model.get("$1")[key]===1){
						Model.get("$1").move(key,false);
						view.mes({message:">",x:-140+Model.get("$1").x*60,y:Model.get("$1").y*20,overwrite:true,move:true});
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
						if(Model.get("chara").doesWalk==0){
							switchMode("talk");
							view.mes({message:"たからばこをぱっけんした。"});
						}
						break;
					case "menu":
						switch(Model.get("$1").y){
							case 0:
								//レポートに書く
								view.mes({message:"レポートを書きますか?"});
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
				Model.get("chara").doesRun=0;
				break;
		}
	};
	window.onkeyup=function(e){
		if(e.keyCode==32){Model.get("$1")["space"]=0;return false;}//space
		if(e.keyCode==37){Model.get("$1")["left"]=0;keyAction("leave left");return false;}//left
		if(e.keyCode==38){Model.get("$1")["up"]=0;keyAction("leave up");return false;}//up
		if(e.keyCode==39){Model.get("$1")["right"]=0;keyAction("leave right");return false;}//right
		if(e.keyCode==40){Model.get("$1")["down"]=0;keyAction("leave down");return false;}//down
		if(e.keyCode==77){Model.get("$1")["m"]=0;return false;}//M key
		if(e.keyCode==69){Model.get("$1")["e"]=0;return false;}//E key
		if(e.keyCode==68){Model.get("$1")["d"]=0;return false;}//D key
	};
	window.onkeydown=function(e){
		if(e.keyCode==32){
			if(Model.get("$1")["space"]==0){
				keyAction("space");
				Model.get("$1")["space"]=1;
			}
			return false;
		}//space
		if(e.keyCode==37){if(Model.get("$1")["left"]===0){Model.get("$1")["left"]+=1;}return false;}//left
		if(e.keyCode==38){if(Model.get("$1")["up"]===0){Model.get("$1")["up"]+=1;}return false;}//up
		if(e.keyCode==39){if(Model.get("$1")["right"]===0){Model.get("$1")["right"]+=1;}return false;}//right
		if(e.keyCode==40){if(Model.get("$1")["down"]===0){Model.get("$1")["down"]+=1;}return false;}//down
		if(e.keyCode==68){if(Model.get("$1")["d"]===0){Model.get("$1")["d"]+=1;}return false;}//D key
		if(e.keyCode==77){
			if(Model.get("$1")["m"]==0){
				if(!Model.get("$1")["m"]){
					keyAction("m");
					Model.get("$1")["m"]=1;
				}
			}
			return false;
		}//M key
		if(e.keyCode==69&&testMode){
			if(Model.get("$1")["e"]==0){
				keyAction("e");
				Model.get("$1")["e"]=1;
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
		view.clear("chara")
		for(var key in Model.get("$1")){
			if(Model.get("$1")[key]!==0&&key!="m"&&key!="space"&&key!="e"){
				keyAction(key);
				Model.get("$1")[key]++;
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
		}
	},IntervalTime);
})