onloadEvent=(function(){
	var events=[];
	var onloadEvent=function(){
	}
	onloadEvent.Length=0;
	onloadEvent.add=function(f){
		events.push(f)
		console.log(events)
		onloadEvent.Length=events.length;
	}
	onloadEvent.read=function(i){
		return events[i];
	}
	return onloadEvent;
})();
window.onload=function(){
	for(var i=0;i<onloadEvent.Length;i++){
		onloadEvent.read(i).call(null);
	}
}
var Base={};
Base.isKeyPressed={"space":0,"left":0,"up":0,"right":0,"down":0,"m":0,"e":0,"d":0};
Base.chara={
	x:0,
	y:0,
	direction:"front",
	doesWalk:0,
	doesRun:0,
	walk:function(direction){
		this.direction=direction;
		if(this.direction=="left"&&move(-1,0,false)) this.doesWalk=1;
		else if(this.direction=="front"&&move(0,1,false)) this.doesWalk=1;
		else if(this.direction=="right"&&move(1,0,false)) this.doesWalk=1;
		else if(this.direction=="back"&&move(0,-1,false)) this.doesWalk=1;
	},
	run:function(direction){
		this.direction=direction;
		if(this.direction=="left"&&move(-1,0,false)){
			if(this.doesRun==0) this.doesRun=1;
			else this.doesRun++;
			this.doesWalk=2;
		}else if(this.direction=="front"&&move(0,1,false)){
			if(this.doesRun==0) this.doesRun=1;
			else this.doesRun++;
			this.doesWalk=2;
		}else if(this.direction=="right"&&move(1,0,false)){
			if(this.doesRun==0) this.doesRun=1;
			else this.doesRun++;
			this.doesWalk=2;
		}else if(this.direction=="back"&&move(0,-1,false)){
			if(this.doesRun==0) this.doesRun=1;
			else this.doesRun++;
			this.doesWalk=2;
		}else{
			this.doesWalk=0;
			this.doesRun=0;
		}
	},
	img:"chara1"
}
Base.mapData=[[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
//マップのデータ。0が草、1が砂、-1は暗黒空間
Base.mapAttr=[{isNotBarrier:true,isEncountable:true,img:"grass"},{isNotBarrier:true,isEncountable:true,img:"sand"}];
Base.mapAttr["-1"]={isNotBarrier:false,isEncountable:false,img:"black"};
Base.cursor={
	x:0,
	y:0,
	maxX:0,
	maxY:2,
	move:function(key,loop){
		//loopは一番上から一番下へ移動とかするかどうか
		if(loop===undefined) loop=true;
		switch(key){
			case "left":
				if(this.x-1>=0) this.x--;
				else if(loop) this.x=this.maxX;
				break;
			case "up":
				if(this.y-1>=0)this.y--;
				else if(loop) this.y=this.maxY;
				break;
			case "right":
				if(this.x+1<=this.maxX) this.x++;
				else if(loop) this.x=0;
				break;
			case "down":
				if(this.y+1<=this.maxY) this.y++;
				else if(loop) this.y=0;
				break;
		}
	},
	num:function(){
		return Base.cursor.x+Base.cursor.y*(Base.cursor.maxX+1)
	}
}
Base.enemy={};
Base.friend=[new POKEMON("まさる"),new POKEMON("まさる"),new POKEMON("まさる"),new POKEMON("まさる"),new POKEMON("まさる"),new POKEMON("まさる")];
Base.villager=[
	{name:"農民",job:"farmer",move:false,x:3,y:3},
	{name:"鍛冶屋",job:"blacksmith",move:false,x:6,y:3},
	{name:"肉屋",job:"butcher",move:false,x:9,y:3},
]
Base.villager.doesExist=function(x,y){
	for(var i=0,j=Base.villager.length;i<j;i++){
		if(x==Base.villager[i].x&&y==Base.villager[i].y) return false;
	}
	return true;
}