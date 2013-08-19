var Model=Backbone.Collection.extend();
(function(BB){
	var isKeyPressed=BB.Model.extend({
		increment:function(target){
			this.set(target,this.get(target)+1);
		}
	});
	var chara=BB.Model.extend({
		walk:function(direction){
			this.set("direction",direction);
			if(this.get("direction")=="left"&&move(-1,0,false)||this.get("direction")=="front"&&move(0,1,false)||this.get("direction")=="right"&&move(1,0,false)||this.get("direction")=="back"&&move(0,-1,false)) this.set("doesWalk",1);
		},
		incrementRun:function(n){
			n=n||1;
			this.set("doesRun",this.get("doesRun")+n);
		},
		incrementWalk:function(n){
			n=n||1;
			this.set("doesWalk",this.get("doesWalk")+n);
		},
		incrementX:function(n){
			this.set("x",this.get("x")+n);
		},
		incrementY:function(n){
			this.set("y",this.get("y")+n);
		},
		resetRun:function(){
			this.set("doesRun",0);
		},
		resetWalk:function(){
			this.set("doesWalk",0);
		},
		run:function(direction){
			this.set("direction",direction);
			if(this.get("direction")=="left"&&move(-1,0,false)||this.get("direction")=="front"&&move(0,1,false)||this.get("direction")=="right"&&move(1,0,false)||this.get("direction")=="back"&&move(0,-1,false)){
				if(this.get("doesRun")==0) this.set("doesRun",1);
				else this.incrementRun();
				this.set("doesWalk",2);
			}else{
				this.set("doesWalk",0);
				this.set("doesRun",0);
			}
		}
	});
	var mapData=BB.Model.extend();
	var mapAttr=BB.Model.extend();
	var cursor=BB.Model.extend({
		move:function(key,loop){
			//loopは一番上から一番下へ移動とかするかどうか
			if(loop===undefined) loop=true;
			switch(key){
				case "left":
					if(this.get("x")>=1) this.decrementX();
					else if(loop) this.set("x",this.get("maxX"));
					break;
				case "up":
					if(this.get("y")>=1) this.decrementY();
					else if(loop) this.set("y",this.get("maxY"));
					break;
				case "right":
					if(this.get("x")+1<=this.get("maxX")) this.incrementX();
					else if(loop) this.set("x",0);
					break;
				case "down":
					if(this.get("y")+1<=this.get("maxY")) this.incrementY();
					else if(loop) this.set("y",0);
					break;
			}
		},
		incrementX:function(){
			this.set("x",this.get("x")+1)
		},
		decrementX:function(){
			this.set("x",this.get("x")-1)
		},
		incrementY:function(){
			this.set("y",this.get("y")+1)
		},
		decrementY:function(){
			this.set("y",this.get("y")-1)
		},
		num:function(){
			return this.get("x")+this.get("y")*(this.get("maxX")+1)
		}
	})
	var Func=BB.Model.extend({
		searchArray:function(array,key){
			for(var i=0,j=array.length;i<j;i++){
				if(array[i].indexOf(key)!=-1) return i;
			}
			return -1;
		},
		villagerDoesExist:function(x,y){
			for(var i=0,j=villagers.length;i<j;i++){
				if(x==villagers.at(i).get("x")&&y==villagers.at(i).get("y")) return i;
			}
			return -1;
		},
		parseInt:function(num){
			if(num.indexOf("%")!=-1) return parseInt(num.split("%")[0],10)/100;
			return parseInt(num.split("%")[0],10);
		}
	});
	var world=BB.Model.extend();
	var setting=BB.Model.extend();


	isKeyPressed=new isKeyPressed({"space":0,"left":0,"up":0,"right":0,"down":0,"m":0,"e":0,"d":0});
	chara=new chara({
		x:0,
		y:0,
		direction:"front",
		doesWalk:0,
		doesRun:0,
		img:"chara1"
	});
	mapData=new mapData([[1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]);
	//マップのデータ。0が草、1が砂、-1は暗黒空間
	mapAttr=new mapAttr([{isNotBarrier:true,isEncountable:true,img:[6*16,12*16]},{isNotBarrier:true,isEncountable:true,img:[9*16,12*16]}]);
	mapAttr.set("-1",{isNotBarrier:false,isEncountable:false,img:"black"});
	cursor=new cursor({
		x:0,
		y:0,
		maxX:0,
		maxY:2
	});
	Func=new Func();
	world=new world({
		//見えない範囲つまりマップ全体のサイズ
		width:36,
		height:36
	});
	setting=new setting({
		savingMethod:"cookie"
	});



	isKeyPressed.set("id","isKeyPressed");
	chara.set("id","chara");
	mapData.set("id","mapData");
	mapAttr.set("id","mapAttr");
	cursor.set("id","cursor");
	Func.set("id","Func");
	world.set("id","world");
	setting.set("id","setting");

	Model=new Model([isKeyPressed,chara,mapData,mapAttr,cursor,Func,world,setting]);
})(Backbone);
(function(){
	function getCookie(c_name){
		var st="";
		var ed="";
		if(document.cookie.length>0){
			// クッキーの値を取り出す
			st=document.cookie.indexOf(c_name + "=");
			if(st!=-1){ 
				st=st+c_name.length+1;
				ed=document.cookie.indexOf(";",st);
				if(ed==-1) ed=document.cookie.length;
				// 値をデコードして返す
				return unescape(document.cookie.substring(st,ed));
			} 
		}
		return "";
	}
	if(getCookie("save_data")){
		var JSONCookie=JSON.parse(getCookie("save_data"))
		for(var i=0;i<JSONCookie.length;i++){
			//JSONを回す
			if(!JSONCookie) continue;
			if(Model.models[i].get("id")=="mapAttr") continue;
			for(var key in JSONCookie[i]){
				//JSONの中のkeyで回す。
				Model.models[i].set(key,JSONCookie[i][key]);
			}
		}
	}
})()

var enemy=new Backbone.Collection();
var friend=new Backbone.Collection([new Pokemon({name:"まさる",lv:5}),new Pokemon({name:"まさる",lv:5}),new Pokemon({name:"まさる",lv:5}),new Pokemon({name:"まさる",lv:5}),new Pokemon({name:"まさる",lv:5}),new Pokemon({name:"まさる",lv:5})]);//global
friend.at(0).item=new Item("生命の神秘");
var Villager=Backbone.Model.extend({
	talk:function(){
		switch(this.get("job")){
			case "farmer":
				view.mes({message:"こんにちは!農民です。野菜はいかがですか?"});
				view.mes({message:"さようなら"})
				break;
			case "blacksmith":
				view.mes({message:"こんにちは!鍛冶屋です。武器はいかがですか?"})
				view.mes({message:"さようなら"})
				break;
			case "curio shop":
				view.mes({message:"こんにちは!道具屋です。"})
				view.mes({message:"さようなら"})
				break;
			case "butcher":
				view.mes({message:"こんにちは!肉屋です。肉はいかがですか?"})
				view.mes({message:"さようなら"})
				break;
		}
	},
	defaults:{isPainted:false}
})
var villagers=new Backbone.Collection([
	new Villager({name:"農民",job:"farmer",move:false,x:3,y:3}),
	new Villager({name:"鍛冶屋",job:"blacksmith",move:false,x:6,y:3,shop:new Shop(["ぼろい弓","すごい弓","ものすごい弓","センス","和傘","お布団"],"伝説の鍛冶屋")}),
	new Villager({name:"道具屋",job:"curio shop",move:false,x:12,y:3,shop:new Shop(["ぼろい弓","すごい弓","ものすごい弓","センス","和傘","お布団"],"伝説の道具屋")}),
	new Villager({name:"肉屋",job:"butcher",move:false,x:9,y:3})
]);