var Shop=(function(){
	var shop=function(items,name){
		this.items=items;
		for(var i=0;i<this.items.length;i++){
			this.items[i]=new Item(this.items[i]);
		}
		this.name=name;
	}
	shop.fn=shop.prototype;
	shop.fn.showItems=function(i){
		var effect=[];
		if(this.items[i].effect){
			var effects=this.items[i].effect.split(",");
			for(var i2=0;i2<effects.length;i2++){
				if(effects[i2].indexOf("attack")!=-1) effect.push("攻撃力"+effects[i2].split("attack ")[1]+"倍")
				else if(effects[i2].indexOf("all")!=-1) effect.push("すべてのステータス"+effects[i2].split("all ")[1]+"倍")
				else if(effects[i2].indexOf("hp")!=-1) effect.push("HP"+effects[i2].split("hp ")[1]+"回復")
				else if(effects[i2].indexOf("pp")!=-1) effect.push("PP"+effects[i2].split("pp ")[1]+"倍")
			}
		}
		return this.items[i].name+" "+this.items[i].price+"yen "+this.items[i].description+"効果:"+effect.join(",")
	}
	return shop
})()